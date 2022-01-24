const express = require('express')
const app = express()
const PORT = 8080

app.use(express.static('public'))

app.get('/', (req, res) => {

    res.send('hello')
})

app.listen(PORT, () => {
    console.log('server listening to 8080');
})

