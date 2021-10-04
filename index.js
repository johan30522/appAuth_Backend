const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

//crear la aplicacion servidor express
const app = express();

//Se inicializa la conexion a la base de datos
dbConnection();

//Directorio publico
app.use(express.static('public'));

//CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());


//rutas
app.use('/api/auth', require('./routes/auth'));


//manejar todas las demas rutas
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
})

//
app.listen(process.env.PORT, () => {
    console.log(`escuchando puerto ${process.env.PORT}`);
})