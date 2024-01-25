import CustomButton from 'components/CustomButton';
import s from './TaskModal.module.css';
import { useState } from 'react';
import CustomInput from 'components/CustomInput';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

const TaskModal = ({ currentTask = null, handleSave, closeModal, isLoading }) => {
  const { date: dateParams } = useParams();

  const dateArr = dateParams ? dateParams.split('-') : [];

  const [task, setTask] = useState(
    currentTask || {
      date: dateParams || '',
      title: '',
      description: '',
      year: dateArr.length === 2 ? dateArr[0] : '',
      month: dateArr.length === 2 ? dateArr[1] : '',
      day: dateArr.length === 2 ? dateArr[2] : '',
      completed: false
    }
  );

  const handleSubmit = e => {
    e.preventDefault();
    handleSave(task);
    closeModal();
  };

  const onBackdropClose = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const today = format(new Date(), 'yyyy-MM-dd');
  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'date') {
      const [year, month, day] = value.split('-');
      setTask(prev => ({ ...prev, [name]: value, year, month, day }));
    } else {
      setTask(prev => ({ ...prev, [name]: value }));
    }
  };

  const { date, title, description } = task;

  const isNotEmpty = title && date && description;
  const isNew = currentTask ? title !== currentTask.title || description !== currentTask.description : true;
  const isDisabled = isLoading || !isNotEmpty || !isNew;

  return (
    <div onClick={onBackdropClose} className={s.overlay}>
      <div className={s.modal}>
        <form className={s.form} onSubmit={handleSubmit}>
          <h3 className={s.title}>{currentTask ? 'Edit task' : 'Add task'} </h3>
          {!dateParams && !currentTask && (
            <CustomInput name="date" value={date} handleChange={handleChange} type="date" label="Date" min={today} />
          )}
          <CustomInput name="title" value={title} handleChange={handleChange} label="Title" />
          <CustomInput name="description" value={description} handleChange={handleChange} label="Description" />
          <div className={s.raw}>
            <CustomButton title="Save" disabled={isDisabled} />
            <CustomButton type="button" title="Close" onClick={closeModal} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
