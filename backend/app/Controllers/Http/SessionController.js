'use strict'
const Env = use('Env')

class SessionController {
  async login({request,response}){
    const {token} = request.all()

    if(Env.get('TOKEN') !== token){
      return response.status(401).send({status:false,message:"Token invalid"})
    }

    return response.status(200).send({status:true,message:"Token valid"})
  }
}

module.exports = SessionController
