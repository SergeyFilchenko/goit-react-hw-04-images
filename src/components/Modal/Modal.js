import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export default function Modal({ handleTogleModal, modalImg, tag }) {
  const onCloseModalByEsc = e => {
    if (e.keyCode === 27) {
      handleTogleModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onCloseModalByEsc);

    return () => {
      window.removeEventListener('keydown', onCloseModalByEsc);
    };
  });

  return (
    <div
      className={s.Overlay}
      onClick={e => {
        if (e.target === e.currentTarget) {
          handleTogleModal();
        }
      }}
    >
      <div className={s.Modal}>
        <img src={modalImg} alt={tag} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  modalImg: PropTypes.string.isRequired,
  handleTogleModal: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};
