const express=require('express')
const app=express()
const port=3000
const {Kafka} = require('kafkajs')

const kafka=new Kafka({
    clientId:'my-app',
    brokers:['localhost:9092']
})
const producer=kafka.producer()
const initKafka=async()=>{
    await producer.connect()
}

app.post('/events/:event',async(req,res)=>{
    await producer.send({
        topic:'quickstart-events',
        messages:[
            {value:req.params.event},

        ],
    })
    res.send('event : '+req.params.event+'\n')
})
app.listen(port,async ()=>{
    console.log(`kafca app listening on port ${port}`)
})
initKafka();