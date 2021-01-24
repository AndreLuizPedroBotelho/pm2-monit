'use strict'
const Env = use('Env')
const Hash = use('Hash')

class SessionController {
  async login({ request, response }) {
    const { token } = request.all()

    if (Env.get('TOKEN') !== token) {
      return response.status(401).send({ status: false, message: "Token invalid" })
    }

    const tokenEncrypt = await Hash.make(token)

    return response.status(200).send({ status: true, message: "Token valid", token: tokenEncrypt })
  }
}

module.exports = SessionController
