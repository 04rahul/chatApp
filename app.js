import express from 'express'
import router from './routes/index.js'
import session from 'express-session'
import http from 'http';
import { Server } from 'socket.io';



const app = express()


const server = http.createServer(app)
const io = new Server(server)

app.use(express.json())
app.set('view engine', 'ejs')
app.set('trust proxy', 1) 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.set('io', io);

app.use('/',router)
app.use((req,res)=>{
  res.status(404).render('not-found')
})


io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_chat', (chatId) => {
    socket.join(`chat_${chatId}`);
    console.log(`Socket ${socket.id} joined room chat_${chatId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


server.listen(3000,()=>{
    console.group("Server is running on port 3000")
})