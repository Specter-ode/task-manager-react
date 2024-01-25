import s from './CustomInput.module.css';

const CustomInput = ({ name, value, type = 'text', placeholder, handleChange, label, ...props }) => {
  return (
    <div className={s.inputBlock}>
      <label htmlFor={name} className={s.label}>
        {label}
        <input
          id={name}
          className={s.input}
          name={name}
          value={value}
          onChange={handleChange}
          type={type}
          placeholder={placeholder}
          {...props}
        />
      </label>
    </div>
  );
};

export default CustomInput;
