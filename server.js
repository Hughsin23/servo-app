const express = require('express');
const res = require('express/lib/response');
const app = express()
const PORT = 8080

const { Pool } = require("pg");

const pool = new Pool({
    database: "servo_app_db",
});


app.use(express.static('public'))

app.get('/', (req, res) => {

    res.send('hello')
})
// Level 1 quest : GET /api/stations/all
app.get('/api/stations/all',(req,res)=>{
    let sql = "SELECT * FROM stations LIMIT 10;"

    pool.query(sql, (err, dbRes) => {
        // console.log(dbRes);
        res.json(dbRes.rows);
        
      });

}) 

app.listen(PORT, () => {
    console.log('server listening to 8080');
})

