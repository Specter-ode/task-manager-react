import s from './Loader.module.css';
import Spinner from 'react-spinners/CircleLoader';

const Loader = ({ size = 250, isAbsolute = false }) => (
  <div className={isAbsolute ? `${s.box} ${s.absolute}` : s.box}>
    <Spinner color="#4cad66" loading size={size} aria-label="Loading Spinner" speedMultiplier={0.7} />
  </div>
);

export default Loader;
