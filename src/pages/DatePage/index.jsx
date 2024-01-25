import s from './DatePage.module.css';
import { format, addDays, subDays } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TaskModal from 'components/TaskModal';
import Layout from 'components/Layout';
import CustomButton from 'components/CustomButton';
import Switcher from 'components/Switcher';
import { getTasksApi, deleteTaskApi, updateTaskApi, addTaskApi, changeTaskStatusApi } from 'service/api';
import { toast } from 'react-toastify';
import TaskList from 'components/TaskList';
import { nanoid } from 'nanoid';

const dateFormat = 'yyyy-MM-dd';

const DatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { date } = useParams();
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  const isValidParams = regex.test(date);
  const navigate = useNavigate();
  const [currentTask, setCurrentTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isModal, setIsModal] = useState(false);

  const openModal = task => {
    setIsModal(true);
    if (task) {
      setCurrentTask(task);
    }
  };
  const closeModal = () => {
    setIsModal(false);
    if (currentTask) {
      setCurrentTask(null);
    }
  };

  const handleNextDay = () => {
    const newDate = format(addDays(date, 1), dateFormat);
    navigate(`/${newDate}`);
  };

  const handlePrevDay = () => {
    const newDate = format(subDays(date, 1), dateFormat);
    navigate(`/${newDate}`);
  };

  const handleAddTask = async task => {
    setIsLoading(true);
    const newTask = { id: nanoid(), ...task };
    const res = await addTaskApi(newTask);
    if (res.success) {
      setTasks(prev => [...prev, newTask]);
      toast.success('Task has been added');
    } else {
      toast.error('Something went wrong. Task has not been added');
    }
    setIsLoading(false);
  };

  const handleEditTask = async task => {
    setIsLoading(true);
    const res = await updateTaskApi(task);
    if (res.success) {
      setTasks(prev => prev.map(el => (el.id === task.id ? task : el)));
      toast.success('Task has been updated');
    } else {
      toast.error('Something went wrong. Task has not been updated');
    }
    setIsLoading(false);
  };

  const handleDeleteTask = async taskId => {
    setIsLoading(true);
    const res = await deleteTaskApi(taskId);
    if (res.success) {
      setTasks(prev => prev.filter(el => el.id !== taskId));
      toast.success('Task has been deleted');
    } else {
      toast.error('Something went wrong. Task has not been deleted');
    }
    setIsLoading(false);
  };

  const handleChangeTaskStatus = async (completed, taskId) => {
    setIsLoading(true);
    const res = await changeTaskStatusApi({ completed, id: taskId });
    if (res.success) {
      setTasks(prev => prev.map(el => (el.id === taskId ? { ...el, completed } : el)));
    } else {
      toast.error('Something went wrong. The task status has not been changed');
    }
    setIsLoading(false);
  };

  const handleSave = currentTask ? handleEditTask : handleAddTask;

  useEffect(() => {
    const handleGetTasks = async () => {
      const [day, month] = date.split('-').reverse();
      const res = await getTasksApi({ day, month });
      if (res.success) {
        setTasks(res.tasks);
      } else {
        toast.error('Something went wrong. Can not upload tasks');
      }
    };

    if (isValidParams) {
      handleGetTasks();
    } else {
      navigate('/');
    }
  }, [date, isValidParams, navigate]);

  const formattedDate = isValidParams ? format(date, 'dd MMMM') : '';
  return (
    <Layout>
      <main className={s.container}>
        <Switcher onPrev={handlePrevDay} onNext={handleNextDay} date={formattedDate} />
        <CustomButton onClick={() => openModal(null)} title="Add task" width="240px" margin="0 auto" display="block" />
        <TaskList
          tasks={tasks}
          handleDeleteTask={handleDeleteTask}
          handleChangeTaskStatus={handleChangeTaskStatus}
          openModal={openModal}
        />
        {isModal && (
          <TaskModal closeModal={closeModal} handleSave={handleSave} currentTask={currentTask} isLoading={isLoading} />
        )}
      </main>
    </Layout>
  );
};

export default DatePage;
