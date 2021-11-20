const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const fs = require("fs");
const app = express();

const port = process.env.port || 5500;
const node_env = process.env.NODE_ENV;

app.set('port',port);
app.set('env',node_env)

app.use(morgan('tiny'));
app.use(parser.json());
//app.use(express.static("endpoint"));
//app.use('/', require(__dirname));

app.get('/', (req,res)=>{
    res.send('<p>Working, Server Up!</p>')
})


//Get Student Data
app.get("/api/v1/student/:id", async (req, res, next) => {
  //res.send("GET REQUEST CALLED");
  try {
    let data = fs.readFileSync(path.join(__dirname, "./data.json"));
    let parsed = JSON.parse(data);
    let student = parsed.find((name) => name.id == Number(req.params.id));
    if (!student) {
      const err = new Error("Student not Found");
      err.status = 404;
      throw err;
    }
    res.json(student);
  } catch (error) {
    next(error);
  }  
});

//Post New Student Data
app.post("/api/v1/student",async (req, res, next) => {
  //res.send("POST REQUEST CALLED");  
  try {
    let data = fs.readFileSync("./data.json");
    let parsed = JSON.parse(data);
    let newStudent = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
    };
    parsed.push(newStudent);
    fs.writeFileSync("./data.json", JSON.stringify(parsed));
    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }  
})

//Update Student Data
app.put("/api/v1/student/:id", async (req, res, next) => {
  //res.send("UPDATE REQUEST CALLED");
  try {
    let data = fs.readFileSync("./data.json");
    let parsed = JSON.parse(data);
    let student = parsed.find((name) => name.id === Number(req.params.id));
    if (!student) {
      const err = new Error("Student not Found");
      err.status = 404;
      throw err;
    }
    let newStudent = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
    };
    let newStudentData = parsed.map((name) => {
      if (name.id === Number(req.params.id)) {
        return newStudent;
      } else {
        return name;
      }
    });
    fs.writeFileSync("/data.json.", JSON.stringify(newStudentData));
    res.status(200).join(newStudent);
  } catch (error) {
    next(error);
  }  
})

//Delete Student Data
app.delete("/api/v1/student/:id",async (req, res, next) => {
  //res.send("DELETE REQUEST CALLED");
  try {
    let data = fs.readFileSync("./data.json");
    let parsed = JSON.parse(data);
    let student = parsed.find((name) => name.id === Number(req.params.id));
    if (!student) {
      const err = new Error("Student not Found");
      err.status = 404;
      throw err;
    }
    let newStudentData = parsed
      .map((name) => {
        if (name.id === Number(req.params.id)) {
          return null;
        } else {
          return name;
        }
      })
      .filter((name) => name !== null);
    fs.writeFileSync("./data.json", JSON.stringify(newStudentData));
    res.status(200).end();
  } catch (error) {
    next(error);
  }  
})

app.use((req,res,next)=>{
    const err= new Error(`${req.method} Not Found for ${req.url}`);
    err.status=404;
    next(err);
})

app.use((err,req,res,next)=>{
    console.error(err);
    res.status(err.status || 500);
    res.json({
        error:{
            message:err.message
        },
    })
})


app.listen(port, ()=> console.log('Server is UP!'));



