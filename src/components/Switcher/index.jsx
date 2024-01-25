import s from './Switcher.module.css';
import { ReactComponent as LeftArrow } from 'assets/icons/left-arrow.svg';
import { ReactComponent as RightArrow } from 'assets/icons/right-arrow.svg';

const Switcher = ({ onPrev, onNext, date }) => {
  return (
    <div className={s.container}>
      <button onClick={onPrev} type="button" className={s.button}>
        <LeftArrow />
      </button>
      <span className={s.text}>{date}</span>
      <button onClick={onNext} type="button" className={s.button}>
        <RightArrow />
      </button>
    </div>
  );
};

export default Switcher;
