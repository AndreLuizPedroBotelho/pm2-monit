'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Env = use('Env')

class TokenAccess {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request,response,auth }, next) {
    if(Env.get('TOKEN') !== request.headers().authorization){
        return response.status(401).send({message:"Action doesn't permitted"})
    }
    await next()
  }
}

module.exports = TokenAccess
