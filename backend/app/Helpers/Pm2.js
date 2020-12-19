'use strict'
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const netstat = require('node-netstat');
const Drive = use('Drive')
const os = require('os');
const { v4: uuidv4 } = require('uuid');

const listProcess = async () => {
  const execReady = await exec('pm2 jlist');
  const pm2Dados = eval(execReady.stdout)

  const listPm2 = [];

  for (let pm2 of pm2Dados) {

    listPm2.push({
      status: pm2.pm2_env.status,
      name: pm2.name,
      pid: pm2.pid === 0 ? '' : pm2.pid,
      port: pm2.pid === 0 ? '' : await getPort(pm2.pid),
      id: pm2.pm2_env.NODE_APP_INSTANCE,
      watch: pm2.pm2_env.watch ? 'enabled' : 'disabled'
    })
  }

  return listPm2;
}

const validateProcess = async (id) => {
  const list = await listProcess();


  return list.some(e => e.id === parseInt(id));
}

const getPort = async (pid) => {
  try {
    const promise = new Promise((resolve, reject) => {
      netstat({
        filter: {
          pid
        }
      }, (data) => {
        resolve(data)
      });
    });

    const [data] = await Promise.all([promise]);

    return data.local.port
  } catch (err) {
    return '';
  }

}

const getLog = async (idProcess, amount) => {
  const process = (await listProcess()).find(e => e.id === parseInt(idProcess))

  let outs = (await Drive.get(`${os.homedir()}/.pm2/logs/${process.name}-out.log`, 'utf-8'))
    .toString()
    .split("\n")
    .splice(amount * -1, amount)

  let errors = (await Drive.get(`${os.homedir()}/.pm2/logs/${process.name}-error.log`, 'utf-8'))
    .toString()
    .split("\n")
    .splice(amount * -1, amount)

  const newError = errors.map((error) => {
    return error + '\n';
  })

  const newOut = outs.map((out) => {
    return out + '\n';
  })

  return {
    titleOut: {
      title: `${os.homedir()}/.pm2/logs/${process.name}-out.log`,
      amountText: `last ${amount} lines`,
      text: newOut
    },
    titleError: {
      title: `${os.homedir()}/.pm2/logs/${process.name}-error.log`,
      amountText: `last ${amount} lines`,
      text: newError
    },
    id: uuidv4(),
    idProcess: idProcess
  }
}

module.exports = {
  listProcess,
  validateProcess,
  getLog
}
