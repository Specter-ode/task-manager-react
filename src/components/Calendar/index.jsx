import Day from 'components/Day';
import s from './Switcher.module.css';

const Calendar = ({ days }) => {
  return (
    <div className={s.list}>
      {days.map((day, i) => (
        <Day key={i} day={day} />
      ))}
    </div>
  );
};

export default Calendar;
