//importing required modules 
const express = require('express');//web framework of node.js
const mysql = require ('mysql2');//database driver for node.js
require('dotenv').config();//used to load environment variables
const cors = require('cors');
 
const app = express();//will handle requests and routes
const PORT = process.env.PORT || 5000;//set the server port

app.use(express.json());//parse insoming json request
app.use(cors());

//connection using values from environment variables in the .env file


const pool = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    connectionLimit:10,   //max no. of concurrent connections
    
});


// Root route handler
app.get('/', (req, res) => {
    res.send('Welcome to the Attendance Backend API!');
});

// //define an api endpoint to fetch data
app.get('/api/attendance',(req,res)=>{
    console.log('Endpoint /api/attendance was hit');


    const query = `SELECT * FROM attendance_data;`;

    //execute the query 
    pool.query(query,(err,results)=>{
        if(err){
            console.error('Error fetching data:',err);
            res.status(500).json({error: 'Database query failed'});
    
        }else{
            console.log('Fetched attendance data:',results);
            res.json(results);
        }
    });
});


//endpoint to update attendace for a specific day
app.post('/api/attendance/update',(req,res) => {
    const {SN, RollNo, status, day } = req.body;

    if(!SN || !RollNo || !status || !day ){
        return res.status(400).json({error: 'Missing required fields'});
    }

    //Query to update the attendance for the given day 
    const query = `UPDATE attendance_data SET \`${day}\` =? WHERE SN = ? AND RollNo = ?`;

    pool.query(query,[status,SN,RollNo],(err,results) => {
        if (err) {
            console.error('Error updating attendance:',err);
            res.status(500).json({error:'Failed to update attendance'});
        }else{
            res.json({message: 'Attendance updated succesfully'});
        }
    });
});

//start the server
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});



    

