'use strict'
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const listProcess  = async () =>{
  const execReady = await exec('pm2 jlist');
  const list = eval(execReady.stdout)

  const listPm2 = list.map( ( pm2 ) => {
   return {
     status: pm2.pm2_env.status,
     name:pm2.name,
     pid: pm2.pid,
     id:pm2.pm2_env.NODE_APP_INSTANCE,
     watch : pm2.pm2_env.watch ? 'enabled':'disabled'
   }
  });

  return listPm2;
}

const validateProcess = async (id) =>{
  const list = await listProcess();


  return list.some(e => e.id === parseInt(id));
}

module.exports = {
  listProcess,
  validateProcess
}
