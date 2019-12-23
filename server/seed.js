import { mongo, initMongo }  from './services/mongo.js'
import emitter from './services/emitter.js'
initMongo()

const players = [{
  name: 'Torbjorn A.',
  invite: 'firstblood',
},{
  name: 'Eirik A.',
  invite: 'misteltein',
},{
  name: 'Jorgen A.',
  invite: 'magiskjul',
},{
  name: 'Alexander P.',
  invite: 'ribbefett',
},{
  name: 'Lucas P.',
  invite: 'lukeskywalker',
},{
  name: 'Tobias P.',
  invite: 'obiwan',
},{
  name: 'Heine P.',
  invite: 'kinnbresjnev',
},{
  name: 'Frida A.',
  invite: 'letitgo',
},{
  name: 'Erlend A.',
  invite: 'pewdiepie',
},{
  name: 'Torgeir S.',
  invite: 'iptelefoni',
},{
  name: 'Fredrik L.',
  invite: 'reactjs',
},{
  name: 'Sondre H.',
  invite: 'javalife',
}]
emitter.on('mongodbConnected', async function() {
  await mongo('players').insertMany(players)
  console.log('done')
})
