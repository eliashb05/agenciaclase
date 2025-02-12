//forma antigua
//const express = require('express');
//forma nueva
import express from 'express';
import router from './routers/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();


//conectar a la BBDD
db.authenticate()
    .then((user) => console.log('Conectado a la base de datos'))
    .catch((err) => console.log(err));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}`));

//Habilitar pug
app.set('view engine', 'pug');
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
    const year = new Date().getFullYear();
    res.locals.year = year;
    res.locals.tituloR= "Agencia de viajes"
    next();
})

//Definir la carpeta publica
app.use(express.static('public'));

app.use("/", router);


