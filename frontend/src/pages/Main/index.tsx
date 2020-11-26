import React, { useCallback, useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { IconButton, TextField } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import ContainerMaterial from '@material-ui/core/Container';
import SettingsPowerIcon from '@material-ui/icons/SettingsPower';
import CloseIcon from '@material-ui/icons/Close';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Loading from '../../components/Loading';
import { Container, Content, Logo, SearchBody, DivHeader } from './styles';
import imgLogo from '../../assets/pm2logo.png';
import api from '../../services/api';
import Table from '../../components/Table';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface MethodInterface {
  startFunction(id: number, watch: boolean): Promise<void>;
  stopFunction(id: number): Promise<void>;
  logFunction(id: number): Promise<void>;
  reloadFunction(id: number, watch: boolean): Promise<void>;
  deleteFunction(id: number): Promise<void>;
}

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
}

const Main: React.FC = () => {
  const [listProcess, setListProcess] = useState([]);
  const [listProcessComplete, setListProcessComplete] = useState([]);
  const { signOut } = useAuth();
  const { addToast } = useToast();

  const [methods, setMethods] = useState({} as MethodInterface);
  const [open, setOpen] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);

  const [log, setLog] = useState<LogInterface>({} as LogInterface);

  const handleClose = useCallback(() => {
    setOpen(false);
    setLog({} as LogInterface);
  }, []);

  const [loadProcess, setLoadProcess] = useState(true);

  const handleCheckBox = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
      try {
        setOpenLoading(true);

        await api.post(`/start/${id}`, {
          watch: event.target.checked,
        });

        addToast({
          type: 'success',
          title: 'Sucesso ao alterar!',
          description: '',
        });

        setLoadProcess(true);
      } catch (err) {
        setLoadProcess(false);
        setOpenLoading(false);

        addToast({
          type: 'error',
          title: 'Erro ao alterar!',
          description: '',
        });
      }
    },
    [],
  );

  const handleInputSearch = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        if (listProcessComplete.length > 0) {
          const resultado = listProcessComplete.filter(
            (process: any) =>
              process.name.includes(event.target.value) ||
              process.id === parseInt(event.target.value, 10),
          );

          setListProcess(resultado);
        }
      } catch (err) {
        alert(err);
      }
    },
    [listProcessComplete],
  );

  useEffect(() => {
    async function loadListProcess(): Promise<void> {
      try {
        setOpenLoading(true);

        const result = await api.get('/list');

        const process = result.data.list.map(
          ({ id, name, status, watch, pid, port }: any) => {
            let statusIcon = <ClearIcon color="error" />;

            switch (status) {
              case 'online':
                statusIcon = (
                  <RadioButtonCheckedIcon
                    titleAccess="Online"
                    htmlColor="green"
                  />
                );
                break;

              case 'stopped':
                statusIcon = (
                  <HighlightOffIcon titleAccess="Parado" htmlColor="red" />
                );
                break;

              default:
                statusIcon = (
                  <ClearIcon
                    titleAccess="Erro encontrado"
                    fontSize="large"
                    htmlColor="red"
                  />
                );

                break;
            }

            return {
              id,
              pid,
              name,
              port,
              status: statusIcon,
              watchStatus: watch === 'enabled',
              statusProcess: status === 'online',
              watch: (
                <Checkbox
                  key={id}
                  onChange={(e) => handleCheckBox(e, id)}
                  checked={watch === 'enabled'}
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              ),
            };
          },
        );

        setListProcess(process);
        setListProcessComplete(process);

        setLoadProcess(false);
        setOpenLoading(false);
      } catch (error) {
        setLoadProcess(false);
        setOpenLoading(false);

        addToast({
          type: 'error',
          title: 'Erro ao listar!',
          description: '',
        });
      }
    }

    async function loadMethods(): Promise<void> {
      const methodsFunction: MethodInterface = {
        startFunction: async (id: number, watch: boolean) => {
          try {
            setOpenLoading(true);

            await api.post(`/start/${id}`, {
              watch,
            });

            addToast({
              type: 'success',
              title: 'Processo iniciado com sucesso!',
              description: '',
            });
            setLoadProcess(true);
          } catch (err) {
            setOpenLoading(false);

            addToast({
              type: 'error',
              title: 'Erro ao iniciar processo!',
              description: '',
            });
          }
        },
        stopFunction: async (id: number) => {
          try {
            setOpenLoading(true);

            await api.post(`/stop/${id}`, {});

            addToast({
              type: 'success',
              title: 'Processo pausado com sucesso!',
              description: '',
            });

            setLoadProcess(true);
          } catch (err) {
            setOpenLoading(false);

            addToast({
              type: 'error',
              title: 'Erro ao parar processo!',
              description: '',
            });
          }
        },
        logFunction: async (id: number) => {
          try {
            setOpenLoading(true);

            const { data } = await api.get(`/log/${id}`, {
              params: {
                amount: 50,
              },
            });

            setLog(data.log);

            setOpen(true);

            setLoadProcess(true);
          } catch (err) {
            setOpenLoading(false);

            addToast({
              type: 'error',
              title: 'Erro a exibir log!',
              description: '',
            });
          }
        },
        reloadFunction: async (id: number, watch: boolean) => {
          try {
            setOpenLoading(true);

            await api.put(`/reload/${id}`, {
              watch,
            });

            addToast({
              type: 'success',
              title: 'Processo reiniciado com sucesso!',
              description: '',
            });

            setLoadProcess(true);
          } catch (err) {
            setOpenLoading(false);

            addToast({
              type: 'error',
              title: 'Erro ao reiniciar!',
              description: '',
            });
          }
        },
        deleteFunction: async (id: number) => {
          try {
            setOpenLoading(true);

            await api.delete(`/delete/${id}`);

            addToast({
              type: 'success',
              title: 'Processo deletado com sucesso!',
              description: '',
            });

            setLoadProcess(true);
          } catch (err) {
            setOpenLoading(false);

            addToast({
              type: 'error',
              title: 'Erro ao deletar!',
              description: '',
            });
          }
        },
      };

      setMethods(methodsFunction);
    }

    loadListProcess();
    loadMethods();
  }, [loadProcess]);

  return (
    <Container>
      <Loading open={openLoading} />
      <Content>
        <DivHeader>
          <Logo src={imgLogo} alt="logo" />
          <IconButton aria-label="log" color="primary" onClick={signOut}>
            <SettingsPowerIcon />
          </IconButton>
        </DivHeader>
        <SearchBody>
          <TextField
            id="token"
            onChange={handleInputSearch}
            style={{ width: '350px' }}
            variant="standard"
            label="Pesquise pelo nome ou código"
          />
        </SearchBody>
        <Table
          headsText={['Código', 'Nome', 'Pid', 'Port', 'Status', 'Watch']}
          heads={['id', 'name', 'pid', 'port', 'status', 'watch']}
          rows={listProcess}
          methods={methods}
        />
      </Content>
      <Modal
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
      </Modal>
    </Container>
  );
};

export default Main;
