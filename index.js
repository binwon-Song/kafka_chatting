const express=require('express');
const app=express();
const path=require('path')
const {Kafka} = require('kafkajs');
const bodyParser=require('body-parser');
var server = require('http').createServer(app);
// http server를 socket.io server로 upgrade한다
var io = require('socket.io')(server);
const port=3000;


const publicDirectoryPath = path.join(__dirname, '/public')

const kafka=new Kafka({
  clientId:'my-app',
  brokers:['localhost:9092']
})
const producer=kafka.producer()
const consumer=kafka.consumer(
  {groupId:"chat-group"}
)
// const initKafka=async()=>{
//   await producer.connect()
// }


// producer.on('error', (error) => {
//   console.error('Error connecting to Kafka:', error);
// });

app.use(express.static(publicDirectoryPath))
app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.sendFile(publicDirectoryPath+'/login.html');
  });

app.get('/chat', async(req, res)=>{
  try{
    await producer.connect();
    await consumer.subscribe({
      topic:'chat-server',
      fromBeginning:true
    })
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          
          value: message.value.toString(),
        })
      },
    })
  }
  catch(error)
  {
    console.log("Message Failed to Subscribe",error);
    res.status(500).send({success:false})
  }
  res.sendFile(publicDirectoryPath+'/room.html');
});

// 채팅을 했을 떄 producer로 값을 보냄
app.post('/chat/send', async (req, res) => {
  try {
    await producer.connect();
    const msg_content = req.body.msg;

    const payload = {
      topic: 'chat-server',
      messages: [{ value: msg_content }]
    };

    const result = await producer.send(payload);
    console.log('Message successfully published:', result);
    await producer.disconnect();
    res.send({ success: true });
  }
  catch (error) {
    console.error('Error in publishing message:', error);
    res.status(500).send({ success: false });
  }
});

// connection event handler
// connection이 수립되면 event handler function의 인자로 socket인 들어온다
io.on('connection', function(socket) {

    // 접속한 클라이언트의 정보가 수신되면
    socket.on('login', function(data) {
      console.log('Client logged-in:\n name:' + data.name + '\n userid: ' + data.userid);
  
      // socket에 클라이언트 정보를 저장한다
      socket.name = data.name;
      socket.userid = data.userid;
  
      // 접속된 모든 클라이언트에게 메시지를 전송한다
      io.emit('login', data.name );
    });
  
    // 클라이언트로부터의 메시지가 수신되면
    socket.on('chat', function(data) {
      console.log('Message from %s: %s', socket.name, data.msg);
      var msg = {
        from: {
          name: socket.name,
          userid: socket.userid
        },
        msg: data.msg
      };
  
      // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
      socket.broadcast.emit('chat', msg);
  
      // 메시지를 전송한 클라이언트에게만 메시지를 전송한다
      // socket.emit('s2c chat', msg);
  
      // 접속된 모든 클라이언트에게 메시지를 전송한다
      // io.emit('s2c chat', msg);
  
      // 특정 클라이언트에게만 메시지를 전송한다
      // io.to(id).emit('s2c chat', data);
    });
  
    // force client disconnect from server
    socket.on('forceDisconnect', function() {
      socket.disconnect();
    })
  
    socket.on('disconnect', function() {
      console.log('user disconnected: ' + socket.name);
    });
  });
server.listen(port,async ()=>{
    console.log(`Chatting server is open on ${port}`)
})