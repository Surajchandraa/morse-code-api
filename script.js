const express = require('express');
const morsedasta=require('./data')




const app = express();

const dataset=morsedasta;

let requireddata =(req,res,next)=>{
    if(!req.query.morsedata){
        res.send("please enter a valid morse code");
    }
    else{
        next()
    }
}


app.get('/api/text-to-morse',requireddata, async(req,res)=>{
    let morsecode=req.query.morsedata

    let output= await calculation(morsecode,dataset)

    output2=output.toString();
    output3=output2.replace(/,/g,'')
    console.log(output3)
    res.send(output3)
    
    




})

app.listen(5000,()=>{
    console.log("http://localhost:5000/api/text-to-morse?morsedata=-... -.-.")
})

//... ..- .-. .- .---
async function calculation(qry,dataa){
    let queryy=qry.replace(/\s/g,',');
    let emptyarray=[];

    let arrayofstring=queryy.split(',');
    console.log(arrayofstring)

    let morseedata=dataa;

    for(let i=0;i<arrayofstring.length;i++){
        let morse_character = arrayofstring[i];
        let key = morseedata[morse_character];

        if(key!=undefined){
            emptyarray.push(key)
        }
        else if(key=='/'){
            emptyarray.push(' ')
        }
        else{
            console.log("character not found for this morsecode");
        }
    }

    return emptyarray;
}