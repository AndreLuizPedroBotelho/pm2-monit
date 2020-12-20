import React, { useCallback, useEffect, useState } from 'react';

import ModalContainer from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import ContainerMaterial from '@material-ui/core/Container';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';

interface LogInterface {
  titleOut: {
    text: string;
    amountText: string;
    title: string;
  };

  titleError: {
    text: string;
    amountText: string;
    title: string;
  };
  id: string;
  idProcess: any;
}

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  log: any;
}

const Modal: React.FC<ModalProps> = ({ open, handleClose, log }) => {
  return (
    <ModalContainer
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <ContainerMaterial maxWidth="lg">
        <IconButton
          aria-label="log"
          color="primary"
          onClick={handleClose}
          style={{
            color: 'white',
            position: 'fixed',
            right: 0,
            marginRight: '8%',
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          component="div"
          style={{
            backgroundColor: 'black',
            color: 'green',
            height: '100vh',
            overflowX: 'auto',
          }}
        >
          {Object.keys(log).length !== 0 && log.constructor === Object && (
            <pre style={{ maxHeight: '80vh', margin: '20px' }}>
              <h3>
                {log?.titleOut?.title}&nbsp;
                {log?.titleOut?.amountText}:
              </h3>

              <pre>{log?.titleOut?.text}</pre>

              <h3 style={{ color: 'red' }}>
                {log?.titleError?.title}&nbsp; {log?.titleError?.amountText}:
              </h3>

              <pre style={{ color: 'red' }}>{log?.titleError?.text}</pre>
            </pre>
          )}
        </Typography>
      </ContainerMaterial>
    </ModalContainer>
  );
};

export default Modal;
