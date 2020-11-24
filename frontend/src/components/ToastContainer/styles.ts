import styled, { css } from 'styled-components';

interface ToastProps {
  visible: boolean;
}

export const Container = styled.div<ToastProps>`
  right: 0;
  top: 0;
  padding: 30px;
  display: none;

  ${(props) =>
    props.visible &&
    css`
      display: block;
      position: absolute;
      z-index: 20;
    `}
`;
