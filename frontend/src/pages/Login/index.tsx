import React, { useCallback, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { Container, Content, Form, Logo } from './styles';
import imgLogo from '../../assets/pm2logo.png';
import api from '../../services/api';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

const Login: React.FC = () => {
  const [token, setToken] = useState('');

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        await api.post('/login', {
          token,
        });

        await signIn(token);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao logar!',
          description: '',
        });
      }
    },
    [token],
  );

  return (
    <Container>
      <Content>
        <Logo src={imgLogo} alt="logo" />

        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            id="token"
            onChange={(e) => setToken(e.target.value)}
            variant="outlined"
            label="Digite o token"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Acessar
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Login;
