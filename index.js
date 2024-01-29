import  express, { json }  from "express";
import dbConnection from './database/db.js'
import cors from 'cors'
import path from 'path'

import routes from "./routes/route.js";

const __dirname=path.resolve();
const app=express();
const PORT=process.env.PORT|| 8000;

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json({extended:true}))
app.use('/',routes);

app.use(express.static(path.join(__dirname,"./client/build")))
app.get('*',function(_,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"),function(err){
        res.status(500).send(err);
    })

})
dbConnection()
app.listen(PORT,()=>{
    console.log(`Server started on Port : ${PORT}`);
})