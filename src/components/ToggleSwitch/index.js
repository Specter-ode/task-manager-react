import s from './ToggleSwith.module.css';

const ToggleSwitch = ({ onChange, checked, id }) => {
  return (
    <div className={s.switch}>
      <input id={id} type="checkbox" checked={checked} onChange={e => onChange(e.target.checked, id)} />
      <span className={`${s.slider} ${s.round}`}></span>
    </div>
  );
};

export default ToggleSwitch;
