'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/login', 'SessionController.login')

Route.get('/list', 'Pm2ActionController.list').middleware(['tokenAccess'])

Route.get('/log/:idProcess', 'Pm2ActionController.log').middleware(['tokenAccess'])
Route.post('/stop/:idProcess', 'Pm2ActionController.stop').middleware(['tokenAccess'])
Route.post('/start/:idProcess', 'Pm2ActionController.start').middleware(['tokenAccess'])
Route.delete('/delete/:idProcess', 'Pm2ActionController.delete').middleware(['tokenAccess'])
Route.put('/reload/:idProcess', 'Pm2ActionController.reload').middleware(['tokenAccess'])
