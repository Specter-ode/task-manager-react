import s from './Day.module.css';

const Day = ({ item, tasks, onDateSelect }) => {
  const day = item.isCurrentMonth ? +item.date.split('-')[2] : null;
  return (
    <div
      className={s.card}
      onClick={() => onDateSelect(item.date)}
      style={{
        pointerEvents: item.isCurrentMonth ? 'initial' : 'none',
        backgroundColor: item.isCurrentMonth ? 'white' : '#ededed'
      }}
    >
      {day && <span className={s.day}>{day}</span>}
      {tasks?.length > 0 && (
        <ul className={s.list}>
          {tasks.slice(0, tasks.length > 4 ? 3 : 4).map(task => (
            <li key={task.id}>
              <p className={s.title}>{task.title}</p>
            </li>
          ))}
          {tasks.length > 4 && (
            <li key="more">
              <p className={s.title}>+{tasks.length - 3} more...</p>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Day;
