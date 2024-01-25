import s from './Header.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import CustomButton from 'components/CustomButton';

const Header = () => {
  const { date } = useParams();
  const navigate = useNavigate();

  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.raw}>
          <div className={s.logo}>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <h1 className={s.text}>Task manager</h1>
        </div>
        {date && (
          <CustomButton
            onClick={() => {
              navigate('/');
            }}
            title="Back"
            type="button"
            width="240px"
            background="#f3f5f7"
            color="#4cad66"
          />
        )}
      </div>
    </header>
  );
};

export default Header;
