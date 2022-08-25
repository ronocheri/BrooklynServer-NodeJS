var express = require('express');
var app = express();

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sean',
        password: 'sean',
        database: 'BrooklynDB',
        server: 'DESKTOP-7IMBLDM',

        options: {
          encrypt: false, // for azure
          trustServerCertificate: true // change to true for local dev / self-signed certs
        }
    };

    

console.log(config);

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from Users', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

var server = app.listen(3000, function () {
    console.log('Server is running..');
});