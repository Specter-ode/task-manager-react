import s from './Layout.module.css';
import Footer from 'components/Footer';
import Header from 'components/Header';

const Layout = ({ children }) => {
  return (
    <div className={s.container}>
      <Header />
      {children}
      {<Footer />}
    </div>
  );
};

export default Layout;
