const express = require("express");
const Model = require("./models");
const app = express();
const {spawn} = require('child_process');

//Driver Routes
//Create Driver
app.post("/add_driver", async (request, response) => {
    const user = new Model.Driver(request.body);
  
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});

//Get all Drivers
app.get("/drivers", async (request, response) => {
    const users = await Model.Driver.find({});
  
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });

//Update drivers location
app.patch("/drivers/:id", async (request, response) => {
  
  var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python', ["script1.py",request.body.location.latitude,request.body.location.longitude]);
    // collect data from script
    python.stdout.on('data', function (data) {
     console.log('Pipe data from python script ...');
     dataToSend = data.toString().split(" | ")[1];
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', async (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    console.log(dataToSend);
    const users = await Model.Driver.updateOne(
    {_id : request.params.id},
    { $set : {location:{ latitude: request.body.location.latitude ,
                        longitude: request.body.location.longitude,
                        last_update: dataToSend}}});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});
});

//Get driver info
app.get("/drivers/:id", async (request, response) => {
  const users = await Model.Driver.findById(request.params.id);

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

//delete driver info
app.delete("/drivers/:id", async (request, response) => {
  const users = await Model.Driver.remove({_id : request.params.id});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});


// ...
module.exports = app;