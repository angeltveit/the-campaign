import Router from 'express/lib/router/index.js'
import campaign from './campaign/index.js'

export default new Router()
  .use('/campaign', campaign)
