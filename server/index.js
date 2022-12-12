const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const axios = require('axios');
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'db',
    user: 'enzo',
    password: 'herichard',
    database: 'nwsmaterials',
    port: 3306,
});

/* const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nwsmaterials',
    port: 3306,
}); */
app.get("/", (req, res) => {
    res.status(200).json({
      status: 'ok',
      message: 'connected'
    });
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
app.get('/materialsNR', (req,res) => {
    db.query('SELECT * FROM materials WHERE isreserved = 0',(err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
});
app.get('/materialID/:idmaterials', (req,res) => {
    const idmaterials = req.params.idmaterials;
    db.query('SELECT * FROM materials WHERE idmaterials = ?',idmaterials,(err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
});
app.get('/reservations', (req,res) => {
    db.query('SELECT * FROM reservations INNER JOIN materials ON reservations.idmaterials = materials.idmaterials',(err, result) => {
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
    db.query(
        'INSERT INTO materials (name, description) VALUES (?,?)',
        [name, description],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send('Values inserted')
            }
})
});
app.post('/createReservation', (req,res) => {
   /*  const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email; */
    const idStudent = req.body.idStudent;
    const dateDeb = req.body.dateDeb;
    const dateFin = req.body.dateFin;
    const idmaterials = req.body.idmaterials;
    console.log(req.body)
    db.query(
        'INSERT INTO reservations (idStudent, dateDeb, dateFin, idmaterials) VALUES (?,?,?,?)',
        [idStudent, dateDeb, dateFin, idmaterials],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send('Values inserted')
            }
})
    db.query(
        'UPDATE materials SET isreserved = 1 WHERE idmaterials = ?',
        [idmaterials]
    )
});

app.put('/update/:idmaterials', (req,res) => {
    const idmaterials = req.params.idmaterials;
    const name = req.body.name;
    const description = req.body.description;
    db.query(
        'UPDATE materials SET name = ?, description = ? WHERE idmaterials = ?',
        [name, description, idmaterials],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
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
app.delete('/deleteReservation/:idreservation', (req, res) => {
    const idreservation = req.params.idreservation;
    db.query('DELETE FROM reservations WHERE idreservation = ?', idreservation, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })

});

app.get('/Student', (req,res) => {
    try {
        axios.get("http://vps-a47222b1.vps.ovh.net:4242/Student")
        .then((response) => {
            const students = response.data
            if (students) {
                res.json({
                    data: students
                })
            }
        });
    } catch (err) {
        console.error(err);
    }
});
if (require.main === module) {
    app.listen(3001, () => {
        console.log(`Server listening`);
    });
}

module.exports = app;