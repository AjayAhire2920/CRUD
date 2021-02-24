const path = require('path');
const http = require("http");
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const server = http.createServer(app);
const port = process.env.PORT || 3000;
var fs = require('fs');

const publicDirectoryPath = path.join(__dirname,'src/app/app.module.ts')
app.use(express.static(publicDirectoryPath));



var https_options = {
  // key: fs.readFileSync("/var/www/html/SSL/private.key"),
  // cert: fs.readFileSync('/var/www/html/SSL/certificate.crt'),
  // ca: [ fs.readFileSync('/var/www/html/SSL/ca_bundle.crt') ]

  // key: fs.readFileSync("./SSL/private.key"),
  // cert: fs.readFileSync('./SSL/certificate.crt'),
  // ca: [ fs.readFileSync('./SSL/ca_bundle.crt') ]
  
};
const server = http.createServer(app);
// var httpsServer = https.createServer(https_options, app);
// httpsServer.listen(3000);

server.listen(port,()=>{
  console.log('API server started on: ' + port);
});

const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  // password : 'sadfs4as56',
  database : 'empolyees'
});

// connect to database
mc.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
   next();
});


app.post('/register', function (req, res) {
  
    console.log("++++++++++++++++++++++++++++"+JSON.stringify(req.body))
    mc.query("INSERT INTO `employeedata` (`Name`, `Surname`, `Nationality`, `Contact`) VALUES (  '"+req.body.Name+"', '"+req.body.Surname+"', '"+req.body.Nationality+"', '"+req.body.Contact+"')",  function (err, res1) {
        if(err) {
             console.log("[mysql error]",err);
             console.log("error: ", err);
             res.json({
              "message":  "",
              "status":  "0",
              "data": null
            });
        
            }else{
              res.json({
                "message":  "",
                "status":  "1",
                "data": res1
              });
            }
          });
 
})
// var routes = require('./app/routes/approutes'); //importing route
// routes(app); //register the route

app.get('/getdata', function (req, res){

  console.log("++++++++++++++++" + JSON.stringify(req.body));
 
  mc.query("SELECT * FROM `employeedata`" , function (err, res1) {
    if(err) {
      console.log(SELECT * FROM `employeedata`)
      console.log("[mysql error]", err);
      console.log("error: ", err);
     // result(err,null); 
     res.json({
      "message":  "",
      "status":  "0",
      "data": null
    });

    }else{
      res.json({
        "message":  "",
        "status":  "1",
        "data": res1
      });
      console.log(res);
     // result(null, res);

    }
  });

})