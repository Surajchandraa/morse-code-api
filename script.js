const express = require('express');
const morsecodedata=require('./morsedata');
const textdata=require('./text_data');
let pr=process.env.PORT || 5000;


const app = express();

const dataset=textdata;
const dataset2=morsecodedata

let requireddata1 =(req,res,next)=>{
    if(!req.query.morsedata){
        res.status(400).send("please enter a valid morse code");
    }
    else{
        next()
    }
}

let requireddata2=(req,res,next)=>{
    if(!req.query.textdata){
        res.status(400).send("please enter a valid text");
    }
    else{
        next()
    }
}


app.get('/morse-to-text', requireddata1, (req, res) => {
    let morsecode = req.query.morsedata;
    MorseCodeToText(morsecode, dataset, (err, data) => {
        if (err) {
            console.error("Error occurred:", err);
            res.status(500).send("An error occurred.");
        } else {
            res.send(data);
        }
    });
});
    
    






app.get('/text-to-morse',requireddata2, (req, res) => {
    let text = req.query.textdata;
    TextToMorse(text, dataset2, (err, response) => {
        if (err) {
            console.error("Error occurred:", err);
            res.status(500).send("An error occurred.");
        } else {
            res.send(response);
        }
    });
});

app.listen(pr, () => {
    console.log(`Server is running on http://localhost:${pr}`);
});


 function MorseCodeToText(qry,dataa,callback){
    let queryy=qry.replace(/\s/g,',');
    let emptyarray=[];

    let arrayofstring=queryy.split(',');
    console.log(arrayofstring)

    let morseedata=dataa;
    console.log(morseedata)

    for(let i=0;i<arrayofstring.length;i++){
        let morse_character = arrayofstring[i];
        let key = morseedata[morse_character];
        console.log(key)

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
    
    callback(null,emptyarray.join(''));
}



function TextToMorse(qry,dataa,callback){
    let emptyarray=[];
    let query=qry.split('');
    
    for(let i=0;i<query.length;i++){
        let char=query[i];
        let morse=dataa[char];

        if(morse==undefined){
            console.log("morse code not found for",char);
        }
        else{
            emptyarray.push(morse);
        }

    }

    callback(null,emptyarray.join(' '));
}

