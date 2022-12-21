import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay, OpenModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, data }) => {
  // useEffect

  // componentDidMount() {
  //   window.addEventListener('keydown', handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.addEventListener('keydown', handleKeyDown);
  //   window.removeEventListener('keydown', handleKeyDown);
  // }

  // const handleKeyDown = e => {
  //   console.log(e.code);
  //   if (e.code === 'Escape') {
  //     console.log('Escape!!!!');
  //     onClose();
  //   }
  // };

  const handleBackdropClick = event => {
    console.log(event);
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <OpenModal>
        <img src={data.source} alt={data.alt} max-height="900px" />
      </OpenModal>
    </Overlay>,
    modalRoot
  );
};

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     console.log(e.code);
//     if (e.code === 'Escape') {
//       console.log('Escape!!!!');
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = event => {
//     if (event.currentTarget === event.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { source, alt } = this.props.data;
//     return createPortal(
//       <Overlay onClick={this.handleBackdropClick}>
//         <OpenModal>
//           <img src={source} alt={alt} max-height="900px" />
//         </OpenModal>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
