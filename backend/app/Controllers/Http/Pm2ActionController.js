'use strict'
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const { listProcess, validateProcess, getLog } = use('App/Helpers/Pm2')

class Pm2ActionController {

  async list({ response }) {
    const list = await listProcess();
    return response.status(200).send({ list })
  }

  async log({ response, request, params }) {
    const { amount } = request.get();

    if (!(await validateProcess(params.idProcess))) {
      return response.status(400).send({ message: "Error proccess doesn't exist" })
    }

    const logReturn = await getLog(params.idProcess, amount);


    return response.status(200).send({
      log: logReturn
    })
  }

  async start({ response, request, params }) {
    const { watch } = request.all()

    if (!(await validateProcess(params.idProcess))) {
      return response.status(400).send({ message: "Error proccess doesn't exist" })
    }
    const watchParameters = watch ? "--watch" : '';

    await exec(`pm2 start ${params.idProcess}  ${watchParameters}`);

    return response.status(200).send({ message: 'Process was started' })
  }

  async stop({ response, params }) {
    if (!(await validateProcess(params.idProcess))) {
      return response.status(400).send({ message: "Error proccess doesn't exist" })
    }

    await exec(`pm2 stop ${params.idProcess}`);

    return response.status(200).send({ message: 'Process was stopped' })
  }

  async reload({ response, request, params }) {
    const { watch } = request.all()

    if (!(await validateProcess(params.idProcess))) {
      return response.status(400).send({ message: "Error proccess doesn't exist" })
    }

    const watchParameters = watch ? "--watch" : '';

    await exec(`pm2 reload ${params.idProcess} ${watchParameters}`);

    return response.status(200).send({ message: 'Process was reload' })
  }

  async delete({ response, params }) {
    if (!(await validateProcess(params.idProcess))) {
      return response.status(400).send({ message: "Error proccess doesn't exist" })
    }

    await exec(`pm2 delete ${params.idProcess}`);

    return response.status(200).send({ message: 'Process was delete' })
  }

}

module.exports = Pm2ActionController
