import express from 'express';
import {paginaInicio, paginaNosotros, paginaTestimonios, paginaViajes, paginaDetalleViajes, guardarTestimonios,borrarTestimonio, editarTestimonio,testimonioNuevo} from "../controllers/paginaController.js";

const router = express.Router();

//req lo que enviamos / res lo que nos responde
router.get('/viajes/:slug', paginaDetalleViajes);

router.get('/', paginaInicio);

router.get('/nosotros',paginaNosotros);

router.get('/viajes',paginaViajes);

router.get('/testimonios', paginaTestimonios);

router.get('/editarTestimonio/:id', editarTestimonio);

router.post("/testimonios", guardarTestimonios);

router.post('/borrar-testimonio/:id', borrarTestimonio);

router.post('/testimonioNuevo/:id', testimonioNuevo);


export default router;
