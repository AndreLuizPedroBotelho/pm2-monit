'use strict'
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const netstat = require('node-netstat');

const listProcess  = async () =>{
  const execReady = await exec('pm2 jlist');
  const pm2Dados = eval(execReady.stdout)

  const listPm2 = [];

  for (let pm2 of pm2Dados){

    listPm2.push({
      status: pm2.pm2_env.status,
      name:pm2.name,
      pid: pm2.pid === 0 ? '' : pm2.pid,
      port: pm2.pid === 0 ? '': await getPort(pm2.pid),
      id:pm2.pm2_env.NODE_APP_INSTANCE,
      watch : pm2.pm2_env.watch ? 'enabled':'disabled'
    })
  }

  return listPm2;
}

const validateProcess = async (id) =>{
  const list = await listProcess();


  return list.some(e => e.id === parseInt(id));
}

const getPort = async (pid)=>{
  try{
    const promise = new Promise((resolve, reject) => {
      netstat({filter: {
        pid
      }}, (data)=>{
        resolve(data)
      } );
    });

    const [data] = await Promise.all([promise]);

    return data.local.port
  }catch(err){
    return '';
  }

}

module.exports = {
  listProcess,
  validateProcess
}
