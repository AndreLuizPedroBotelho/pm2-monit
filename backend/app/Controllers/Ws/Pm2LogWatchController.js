'use strict'
const fs = require('fs');
const { listProcess, getLog } = use('App/Helpers/Pm2')
const os = require('os');
const Ws = use('Ws')

class Pm2LogWatchController {
  constructor({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  async onMessage(message) {
    const process = (await listProcess()).find(e => e.id === parseInt(message.idProcess))

    fs.watchFile(`${os.homedir()}/.pm2/logs/${process.name}-out.log`, async (curr, prev) => {
      const topic = Ws.getChannel('logwatch').topic('logwatch')

      if (topic) {
        const logReturn = await getLog(message.idProcess, message.amount);

        this.socket.emit(message.id, { log: logReturn })
      } else {
        fs.unwatchFile(`${os.homedir()}/.pm2/logs/${process.name}-out.log`);
      }

    });

    fs.watchFile(`${os.homedir()}/.pm2/logs/${process.name}-error.log`, async (curr, prev) => {
      const topic = Ws.getChannel('logwatch').topic('logwatch')

      if (topic) {
        const logReturn = await getLog(message.idProcess, message.amount);

        this.socket.emit(message.id, { log: logReturn })
      } else {
        fs.unwatchFile(`${os.homedir()}/.pm2/logs/${process.name}-error.log`);
      }
    });

  }

}

module.exports = Pm2LogWatchController
