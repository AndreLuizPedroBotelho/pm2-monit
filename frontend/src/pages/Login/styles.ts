import styled from 'styled-components';

export const Container = styled.div`
  background: #3b3bce;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  height: 100vh;
  margin: 0;
`;

export const Content = styled.div`
  background: whitesmoke;
  width: 500px;
  height: 80%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const Form = styled.form`
  background: whitesmoke;
  display: flex;
  flex-direction: column;
  width: 90%;

  div {
    margin-bottom: 30px;
  }
`;

export const Logo = styled.img`
  width: 200px;
  margin-bottom: 80px;
`;
