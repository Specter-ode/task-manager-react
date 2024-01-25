import ToggleSwitch from 'components/ToggleSwitch';
import s from './TaskList.module.css';
import CustomButton from 'components/CustomButton';

const TaskList = ({ tasks, openModal, handleDeleteTask, handleChangeTaskStatus }) => {
  return (
    <div>
      {tasks.length > 0 ? (
        <ul className={s.list}>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={s.task}>
                <div>
                  <p className={s.title}>Title</p>
                  <p className={s.text}>{task.title}</p>
                </div>
                <div>
                  <p className={s.title}>Description</p>
                  <p className={s.text}>{task.description}</p>
                </div>
                <div className={s.raw}>
                  <p className={s.title}>Completed</p>
                  <ToggleSwitch checked={task.completed} id={task.id} onChange={handleChangeTaskStatus} />
                </div>
                <div className={s.raw}>
                  <CustomButton onClick={() => openModal(task)} title="Edit" type="button" width="240px" />
                  <CustomButton onClick={() => handleDeleteTask(task.id)} title="Delete" type="button" width="240px" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={s.message}>You don't have tasks for this day</p>
      )}
    </div>
  );
};

export default TaskList;
