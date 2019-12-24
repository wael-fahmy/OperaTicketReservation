const mysql = require('mysql');
const express = require('express');
const db = mysql.createConnection(
    {
        host : 'localhost',
        user : 'root',
        database : 'Opera_Reservation_System'
    }
)

function connectDatabase()
{
    db.connect((err)=>
{
    if(err)
    {
        console.log('not connected')
    }

    console.log ('database is connected ...')
})
return db
}

module.exports=connectDatabase();