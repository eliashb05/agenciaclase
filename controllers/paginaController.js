import {Viaje} from "../models/Viaje.js";
import {Testimonial} from "../models/testimoniales.js";
import moment from 'moment';
import {Model as Testimonio} from "sequelize";


const paginaInicio = async (req, res) => {

    const promiseDB = [];

    promiseDB.push(Viaje.findAll({
        limit: 3,
        order: [["Id", "DESC"]],
    }));
    promiseDB.push(Testimonial.findAll({
        limit: 3
    }));

    try{
        const resultado = await Promise.all(promiseDB);
        res.render('inicio', {
            titulo: "Testimonio",
            clase: 'home',
            viajes: resultado[0],
            testimonios: resultado[1],
            moment: moment,

    });
    }catch(error){
        console.error(error);
    }



}
const paginaNosotros = async (req, res) => {
    const titulo = "Nosotros";
    res.render("nosotros",{
       titulo,
    });
}

const paginaViajes = async (req, res) => {
        const titulo = "Viajes Disponibles";
        const viajes = await Viaje.findAll();
        res.render("viajes",{
            titulo,
            viajes,
            moment: moment,
        })
}

const paginaTestimonios = async (req, res) => {
    try {
        const testimonios = await Testimonial.findAll({
            limit: 6,
            order: [["id", "DESC"]],
        });
        console.log(testimonios);
        res.render('testimonios', {
            titulo: 'Testimonios',
            testimonios: testimonios,
            moment: moment,
        })
    }catch(err){
        console.log(err);
    }
}

const paginaDetalleViajes = async (req, res) => {
    const {slug} = req.params;
    try {
        const resultado = await Viaje.findOne({where: {slug:slug}});
        res.render("viaje", {
            titulo: "Informacion del Viaje",
            resultado,
            moment: moment,
        });
    } catch (error) {
        console.log("Dato no encontrado");
    }
}

const guardarTestimonios = async (req, res) => {
    const {nombre, correoelectronico, mensaje} = req.body;

    const errores = [];

    if (nombre.trim()===''){
        errores.push("el nombre está vacío")
    }
    if (correoelectronico.trim()===''){
        errores.push("el correo está vacío")
    }
    if (mensaje.trim()===''){
        errores.push("el mensaje está vacío")
    }

    if (errores.length>0){
        res.render('testimonios', {
            titulo: 'Testimonios',
            errores: errores,
            nombre: nombre,
            correoelectronico: correoelectronico,
            mensaje: mensaje,
    })
}else{
        //Si me envia los 3 campos rellenos debo meterlos en la base de datos
        try{
            await Testimonial.create({nombre: nombre, correoelectronico: correoelectronico, mensaje: mensaje,})
            res.redirect('/testimonios');
        }catch(error){
            console.log(error);
        }
    }
}

const borrarTestimonio = async (req, res) => {
    try {
        const { id } = req.params;
        await Testimonial.destroy({ where: { id } });
        res.redirect("/testimonios");
    } catch (error) {
        console.error("Error al borrar testimonio:", error);
    }
};

const editarTestimonio = async (req, res) => {
    const { id } = req.params;
    try {
        const testimonio = await Testimonial.findByPk(id);
        if (!testimonio) {
            res.redirect("/testimonios");
        }

        res.render("editarTestimonio", {
            titulo: "Editar Testimonio",
            testimonio,
        });
    } catch (error) {
        console.error("Error al editar testimonio:", error);
        res.redirect("/testimonios");
    }
};

const testimonioNuevo = async (req, res) => {
    const { id } = req.params; // Obtener ID del testimonio
    const { nombre, correoelectronico, mensaje } = req.body;

    try {
        // Buscar el testimonio existente
        const testimonio = await Testimonial.findByPk(id);
        if (!testimonio) {
            return res.status(404).send('Testimonio no encontrado');
        }

        // Actualizar testimonio existente
        await Testimonial.update(
            { nombre, correoelectronico, mensaje },
            { where: { id } }
        );

        res.redirect('/testimonios'); // Redirigir a la lista de testimonios después de actualizar
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar testimonio');
    }
}







export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimonios,
    paginaDetalleViajes,
    guardarTestimonios,
    borrarTestimonio,
    editarTestimonio,
    testimonioNuevo
}