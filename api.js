var Db  = require('./dboperations');
var User = require('./User');
const dboperations = require('./dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((request,response,next)=>{
   console.log('middleware');
   next();
})

//get all users
router.route('/users').get((request,response)=>{

    dboperations.getUsers().then(result => {
       response.json(result[0]);
    })

})


//get all contacts
router.route('/contacts').get((request,response)=>{

   dboperations.getContacts().then(result => {
      response.json(result[0]);
   })

})

//get specific user
router.route('/users/:userName').get((request,response)=>{
   console.log('get specific user');
    dboperations.getUser(request.params.userName).then(result => {
       response.json(result[0]);
    })

})

//get specific cotact
router.route('/contacts/:id').get((request,response)=>{
   console.log('get specific cotact');
    dboperations.getContact(request.params.id).then(result => {
       response.json(result[0]);
    })

})

//POST - create user
router.route('/users').post((request,response)=>{
   console.log('post method');
    let user = {...request.body}

    dboperations.addUser(user).then(result => {
      console.log(result)
      if(result=="ERROR")
         response.status(500).json("ERROR");
      else
         response.status(200).json("Success");
    })

})

//POST - check if he is registed
router.route('/users/isExist').post((request,response)=>{
   console.log('post method');
    let user = {...request.body}
    console.log('users/isExist - POST ');
     dboperations.isUserExist(user).then(result => {
         response.status(200).json(result[0]);

      //console.log(response)
      //console.log(response.recordset)
      // if(response)
      //    response.status(200).send("Success");
      // else
      //     response.status(404).send("User not found");
      //  else
      //    response.status(404).send("User not found");
     })

})




var port = process.env.PORT || 3000;
app.listen(port);
console.log('User API is runnning at ' + port);


