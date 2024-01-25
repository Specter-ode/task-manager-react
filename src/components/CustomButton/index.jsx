import s from './CustomButton.module.css';

const CustomButton = ({
  title,
  disabled = false,
  type = 'submit',
  width = '100%',
  height = '48px',
  onClick,
  ...props
}) => {
  return (
    <button
      className={s.btn}
      disabled={disabled}
      type={type}
      style={{
        width,
        height,
        cursor: disabled ? 'auto' : 'pointer',
        ...props
      }}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
