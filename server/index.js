import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import SocketIO from 'socket.io'
import cors from 'cors'
import routes from './routes/index.js'

// Fire up mongo
import { initMongo } from './services/mongo.js'
initMongo()

const PORT = process.env.PORT || 3000
const app = express()

const server = http.createServer(app)
global.socketio = SocketIO(server)
global.socketio.on('connection', (socket) => {
  // Add token verification
  socket.on('enter', (data) => {
    socket.join('campaign')
  })
})

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('../public'))
app.set('view engine', 'pug')
app.use('/api', routes)
app.get('/:invite', (req, res, next) => {
  res.render('index', { invite: req.params.invite })
})
app.use('/*', async function(error, req, res, next) {
  if(!res.statusCode || res.statusCode === 200) res.status(500)
  res.json({ error: (error.message || 'Unknown error') })
})

server.listen(PORT, () => console.log(`Campaign is listening on port ${PORT}`))

export default app
