var config = require('./config');
const sql = require('mssql');


async function getUsers() {
    try {
        // console.log("getUsers")
        // console.log(config);
        let pool = await sql.connect(config);
        let users = await pool.request().query("SELECT * from Users");
        
        console.log(users);

        return users.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getUser(userName) {
    try {
        let pool = await sql.connect(config);
        let user = await pool.request()
            .input('input_parameter', sql.NVarChar, userName)
            .query("SELECT * from Users where userName = @input_parameter");
        
        console.log(user)
            return user.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function isUserExist(inputUser) {
    try {
        let pool = await sql.connect(config);
        let user = await pool.request()
        .input('userName', sql.NVarChar(50), inputUser.userName)
        .input('password', sql.NVarChar(50), inputUser.password)
            .query("SELECT * from Users where userName = @userName and password = @password");
        return user.recordset;
        // if(!user)
        //     return user.recordsets;
        // else return "ERROR"

    }
    catch (error) {
        console.log(error);
    }
}


async function addUser(user) {

    try {
        let pool = await sql.connect(config);
        let insertUser = await pool.request()
            .input('userName', sql.NVarChar(50), user.userName)
            .input('password', sql.NVarChar(50), user.password)
            .query("insert into  Users ([userName],[password]) VALUES (@userName,@password)")
            //.execute('InsertUsers');
        return insertUser.recordset;
    }
    catch (err) {
        console.log(err);
        return "ERROR"
        
    }

}


async function getContacts() {
    try {
        // console.log("getUsers")
        // console.log(config);
        let pool = await sql.connect(config);
        let contacts = await pool.request().query("SELECT * from Contacts");
        
        //console.log(contacts);

        return contacts.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getContact(id) {
    try {
        let pool = await sql.connect(config);
        let contact = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query("SELECT * from Contacts where id = @input_parameter");
        
        console.log(contact)
            return contact.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}


// async function addContact(user) {

//     try {
//         let pool = await sql.connect(config);
//         let insertUser = await pool.request()
//             .input('userName', sql.NVarChar(50), user.userName)
//             .input('password', sql.NVarChar(50), user.password)
//             .query("insert into  Contacts ([userName],[password]) VALUES (@userName,@password)")
//             //.execute('InsertUsers');
//         return insertUser.recordsets;
//     }
//     catch (err) {
//         console.log(err);
//     }

// }


module.exports = {
    getUsers: getUsers,
    getUser : getUser,
    addUser : addUser,
    getContacts:getContacts,
    getContact:getContact,
    isUserExist:isUserExist

}