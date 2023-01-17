const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const connection = mysql.createConnection({
  host: 'host.docker.internal',
  user: 'root',
  password: '123456',
  database: 'testeando'
});

const app = express();

app.use(cors());
app.use(express.json());


app.get('/getConsultas', (req, res) => {
  connection.query('SELECT * FROM agenda', (err, results) => {
    if (err) res.json("MALO");
    res.json(results);
  });
});


app.post('/createConsulta', (req, res) => {

    const { nombre_alumno, mail_alumno, nombre_profesor, mail_profesor, fecha_hora } = req.body;
    const sql = `INSERT INTO agenda (nombre_alumno, mail_alumno, nombre_profesor, mail_profesor, fecha_hora) VALUES ('${nombre_alumno}', '${mail_alumno}', '${nombre_profesor}', '${mail_profesor}', '${fecha_hora}')`;
    connection.query(sql, (err, result) => {
    if (err) throw err;
  
      res.json({
        message: 'Cita creada satisfactoriamente'
      });
    });
  });


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});