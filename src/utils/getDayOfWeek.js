import { addDays, format, startOfWeek } from 'date-fns';

export const getDayOfWeek = currentMonth => {
  const days = [];
  let startDate = startOfWeek(currentMonth);

  for (let i = 0; i < 7; i++) {
    days.push(<div key={i}>{format(addDays(startDate, i), 'EEEE')}</div>);
  }

  return days;
};
