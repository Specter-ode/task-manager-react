import s from './MainPage.module.css';
import { useEffect, useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { addTaskApi, getTasksApi } from 'service/api';
import { getCalendarRaws } from 'utils/getCalendarRaws';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Switcher from 'components/Switcher';
import CustomButton from 'components/CustomButton';
import Day from 'components/Day';
import TaskModal from 'components/TaskModal';
import { getTasksObjByDate } from 'utils/getTasksObjByDate';
import Layout from 'components/Layout';
import { nanoid } from 'nanoid';

const dateFormat = 'yyyy-MM-dd';

const MainPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(() => format(new Date(), dateFormat));
  const [monthTasks, setMonthTasks] = useState({});

  const [raws, setRaws] = useState([]);
  const [isModal, setIsModal] = useState(false);

  const closeModal = () => {
    setIsModal(false);
  };

  const handleNextMonth = () => {
    const newDate = format(addMonths(currentDate, 1), dateFormat);
    setCurrentDate(newDate);
  };

  const handlePrevMonth = () => {
    const newDate = format(subMonths(currentDate, 1), dateFormat);
    setCurrentDate(newDate);
  };

  const handleAddTask = async task => {
    setIsLoading(true);
    const newTask = { id: nanoid(), ...task };
    const res = await addTaskApi(newTask);
    if (res.success) {
      setMonthTasks(prev => ({
        ...prev,
        [task.date]: [...(prev[task.date] || []), { id: nanoid(), ...task }]
      }));
      toast.success('Task has been added');
    } else {
      toast.error('Something went wrong. Task has not been added');
    }
    setIsLoading(false);
  };

  const onDateSelect = date => {
    navigate(`/${date}`);
  };

  useEffect(() => {
    const handleGetTasks = async () => {
      const [year, month] = currentDate.split('-');
      const res = await getTasksApi({ year, month });

      if (res.success) {
        const tasksObj = getTasksObjByDate(res.tasks);
        setMonthTasks(tasksObj);
      } else {
        toast.error('Something went wrong. Can not upload tasks');
      }
    };
    const handleGetDays = () => {
      const res = getCalendarRaws(currentDate);
      setRaws(res);
    };

    handleGetDays();
    handleGetTasks();
  }, [currentDate]);

  const formattedDate = format(currentDate, 'MMMM yyyy');
  const nameOfDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return (
    <Layout>
      <main className={s.container}>
        <Switcher onPrev={handlePrevMonth} onNext={handleNextMonth} date={formattedDate} />
        <CustomButton
          onClick={() => {
            setIsModal(true);
          }}
          title="Add task"
          width="240px"
          margin="0 auto"
          display="block"
        />

        <div>
          <ul className={s.days}>
            {nameOfDays.map(name => (
              <li key={name}>
                <p className={s.day}>{name}</p>
              </li>
            ))}
          </ul>

          <ul className={s.raws}>
            {raws.map(raw => (
              <ul className={s.days} key={raw[0].date}>
                {raw.map(item => {
                  const tasks = monthTasks[item.date] || [];
                  return <Day key={item.date} item={item} tasks={tasks} onDateSelect={onDateSelect} />;
                })}
              </ul>
            ))}
          </ul>
        </div>
      </main>
      {isModal && <TaskModal closeModal={closeModal} handleSave={handleAddTask} isLoading={isLoading} />}
    </Layout>
  );
};

export default MainPage;
