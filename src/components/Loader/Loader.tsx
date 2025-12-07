import css from './Loader.module.css';
import { RotatingLines } from 'react-loader-spinner';

const Loader = () => {
  return (
    <>
      <div className="loader-wrapper">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="blue"
          strokeWidth="5"
          animationDuration="1.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          wrapperClass=""
        />
      </div>
      <p className={css.text}>Loading movies, please wait...</p>
    </>
  );
};

export default Loader;
