import { mongo, initMongo }  from './services/mongo.js'
import emitter from './services/emitter.js'
initMongo()

const players = [{
  name: 'Torbjorn A.',
  invite: 'firstblood',
},{
  name: 'Eirik A.',
  invite: 'audi',
},{
  name: 'Jorgen A.',
  invite: 'manu',
},{
  name: 'Alexander P.',
  invite: 'millenniumfalcon',
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
  invite: 'novaoffice',
},{
  name: 'Fredrik L.',
  invite: 'beelife',
},{
  name: 'Sondre H.',
  invite: 'javalife',
},{
  name: 'Stian S.',
  invite: 'steelsky',
}]
emitter.on('mongodbConnected', async function() {
  await mongo('players').insertMany(players)
  console.log('done')
})
