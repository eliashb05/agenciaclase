import express from 'express';
import {paginaInicio, paginaNosotros, paginaTestimonios, paginaViajes, paginaDetalleViajes, guardarTestimonios} from "../controllers/paginaController.js";

const router = express.Router();

//req lo que enviamos / res lo que nos responde
router.get('/viajes/:slug', paginaDetalleViajes);

router.get('/', paginaInicio);

router.get('/nosotros',paginaNosotros);

router.get('/viajes',paginaViajes);

router.get('/testimonios', paginaTestimonios);

router.post("/testimonios", guardarTestimonios);


export default router;
