import { mongo } from '../../services/mongo.js'
import api from '../../middlewares/api.js'
import joi from '../../middlewares/joi.js'
import Joi from 'joi'

const schema = Joi.object().keys({
  invite: Joi.string().required(),
})

export default [
  joi(schema),
  api(async function createQuiz(req, res, next) {
    const players = await mongo('players').find({
      nickname: {
        $exists: true,
      },
    },{
      invite: false,
    }).toArray()

    const you = players.find(p => p.invite === req.joi.invite)
    
    return {
      you,
      players,
    }

  }),
]
