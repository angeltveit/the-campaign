import { mongo } from '../../services/mongo.js'
import api from '../../middlewares/api.js'
import joi from '../../middlewares/joi.js'
import Joi from 'joi'

const schema = Joi.object().keys({
  invite: Joi.string().required(),
  nickname: Joi.string().required(),
})

export default [
  joi(schema),
  api(async function createQuiz(req, res, next) {
    console.log('finding', req.joi.invite)
    const player = await mongo('players').findOne({
      invite: req.joi.invite,
    })

    if(!player) {
      throw new Error('Unknown player')
    }
    if(player.nickname) {
      return player
    }

    const updatedPlayer = await mongo('players').findOneAndUpdate({
      invite: req.joi.invite,
    },{
      $set: {
        joined: new Date(),
        nickname: req.joi.nickname,
      },
    },{
      returnOriginal: false,
    })

    global.socketio.in('campaign').emit('player')

    return updatedPlayer.value
  }),
]
