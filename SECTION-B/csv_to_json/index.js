const csvFilePath='netflix_titles.csv'
const { json } = require('body-parser')
const csv=require('csvtojson')
const express=require("express")
const fs=require("fs")
const app =express()



csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(jsonObj);
    fs.writeFileSync("Netflix.json",JSON.stringify(jsonObj),"utf-8",(err)=>{
        if(err) console.log(err)
    })
})

app.get("/Netflix/:show_id",(req,res)=>{
    const users= require("./Netflix.json")
    let {show_id}=req.params
    if(show_id>users.length || show_id<1){
        res.send("Data not Available")
        return
    }
    let userById=[]
    users.forEach(checkId)
    function checkId(item) {
        if(item.show_id == show_id){
            userById.push(item)
        }
    }
    res.json(userById)
})

app.get("/Netflix",(req,res)=>{
    const users= require("./Netflix.json")
    res.json(users)
})

app.listen("3000",(req)=>{
    console.log("error hap")
})