'use strict'
const Drive = use('Drive')
const os = require('os');

const util = require('util')
const exec = util.promisify(require('child_process').exec)
const { listProcess, validateProcess} = use('App/Helpers/Pm2')

class Pm2ActionController {

  async list({response}){
    const list = await listProcess();
    return  response.status(200).send({list})
  }

  async log({response,params}){
    if(!(await validateProcess(params.idProcess))){
      return response.status(400).send({message:"Error proccess doesn't exist"})
    }

    const process = (await listProcess()).find(e => e.id === parseInt(params.idProcess))

    const out = await Drive.get(`${os.homedir()}/.pm2/logs/${process.name}-out.log`,'utf-8')
    const error = await Drive.get(`${os.homedir()}/.pm2/logs/${process.name}-error.log`,'utf-8')

    return response.status(200).send({
      log:{
        titleOut:{
          title:`${os.homedir()}/.pm2/logs/${process.name}-out.log`,
          text:out
        },
        titleError:{
          title:`${os.homedir()}/.pm2/logs/${process.name}-error.log`,
          text:error
        },
      }
    })
   }

   async start({response,request,params}){
    const { watch } = request.all()

    if(!(await validateProcess(params.idProcess))){
      return response.status(400).send({message:"Error proccess doesn't exist"})
    }
    const watchParameters = watch ? "--watch" : '';

    await exec(`pm2 start ${params.idProcess}  ${watchParameters}`);

     return response.status(200).send({message:'Process was started'})
   }

   async stop({response,params}){
    if(!(await validateProcess(params.idProcess))){
      return response.status(400).send({message:"Error proccess doesn't exist"})
    }

    await exec(`pm2 stop ${params.idProcess}`);

     return response.status(200).send({message:'Process was stopped'})
   }

   async reload({response,request,params}){
    const { watch } = request.all()

    if(!(await validateProcess(params.idProcess))){
      return response.status(400).send({message:"Error proccess doesn't exist"})
    }

    const watchParameters = watch ? "--watch" : '';

    await exec(`pm2 reload ${params.idProcess} ${watchParameters}`);

     return response.status(200).send({message:'Process was reload'})
   }

   async delete({response,params}){
    if(!(await validateProcess(params.idProcess))){
      return response.status(400).send({message:"Error proccess doesn't exist"})
    }

    await exec(`pm2 delete ${params.idProcess}`);

     return response.status(200).send({message:'Process was delete'})
   }

}

module.exports = Pm2ActionController
