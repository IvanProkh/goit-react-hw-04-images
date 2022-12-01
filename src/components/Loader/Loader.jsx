import { RotatingLines } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Spiner } from './Loader.styled';
export const Loader = () => {
  return (
    <Spiner>
      <RotatingLines
        strokeColor="#3f51b5"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </Spiner>
  );
};
