const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nwsmaterials',
    port: 3306
});

app.get('/materials', (req,res) => {
    db.query('SELECT * FROM materials',(err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
});

app.post('/create', (req,res) => {
    const name = req.body.name;
    const description = req.body.description;
    console.log(req.body)
    db.query(
        'INSERT INTO materials (name, description) VALUES (?,?)',
        [name, description],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send('Values inserted')
            }
});
});

app.put('/update', (req,res) => {
    const id = req.body.idmaterials;
    const name = req.body.name;
    const description = req.body.description;
    db.query(
        'UPDATE materials SET name = ?, description = ? WHERE id = ?',
        [name, description, id],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    );
});

app.delete('/delete/:idmaterials', (req, res) => {
    const idmaterials = req.params.idmaterials;
    db.query('DELETE FROM materials WHERE idmaterials = ?', idmaterials, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
});

app.listen(3001, () => {
    console.log('Server listening on port 3001')
})