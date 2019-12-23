import Router from 'express/lib/router/index.js'
import join from './join.js'
import load from './load.js'

export default new Router()
  .post('/', join)
  .get('/:invite', load)
