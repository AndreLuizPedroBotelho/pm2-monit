import React from 'react';
import ReactLoading from 'react-loading';
import { Container } from './styles';

interface LoadingProps {
  open: boolean;
}

const Loading: React.FC<LoadingProps> = ({ open }) => {
  return (
    <Container open={open}>
      {open}
      <ReactLoading type="spin" color="#3b3bce" height={200} width={120} />
    </Container>
  );
};

export default Loading;
