import React from 'react';

import AuthForm from 'components/AuthForm.js';
import {
  Modal,
  ModalBody,
} from 'reactstrap';


const LoginModal = ({ show, authState, toggle, handleAuthState, onChange, onSubmit, onLogoClick}) => {
    const externalCloseBtn = (
        <button
          className="close"
          style={{
            position: 'absolute',
            top: '15px',
            right: '20px',
            fontSize: '3rem',
          }}
          onClick={this.toggle}>
          &times;
        </button>
      );

    return (
        <Modal
            isOpen={show}
            toggle={toggle}
            size="sm"
            backdrop="static"
            backdropClassName="modal-backdrop-light"
            external={externalCloseBtn}
            centered>
            <ModalBody>
            <AuthForm
                authState={authState}
                onChangeAuthState={handleAuthState}
                onChange={onChange}
                onSubmit={onSubmit}
                onLogoClick={onLogoClick}
            />
            </ModalBody>
        </Modal>
    );
};

export default LoginModal;
