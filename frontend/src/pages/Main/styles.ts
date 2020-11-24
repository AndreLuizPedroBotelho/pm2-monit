import styled from 'styled-components';

export const Container = styled.div`
  background: whitesmoke;
`;

export const Content = styled.div`
  width: 90%;
  height: 100vh;
`;

export const DivHeader = styled.div`
  display: flex;
  padding: 10px;

  margin-bottom: 80px;
  display: flex;
  justify-content: space-between;
  button {
    justify-content: flex-end;
    display: flex;
    justify-content: flex-end;
  }
`;

export const SearchBody = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 5%;
  margin-bottom: 30px;
`;

export const Logo = styled.img`
  width: 200px;
`;
