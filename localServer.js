const express=require('express')
const app=express()
const port=4000


app.post('/events/:event',(req,res)=>{
    res.send('event : '+req.params.event+'\n')
})
app.listen(port,async ()=>{
    console.log(`local server app listening on port ${port}`)
})
