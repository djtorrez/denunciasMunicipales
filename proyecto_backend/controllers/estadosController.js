const { response, request } = require('express')
const { admin } = require('../config/firebase-config')

var db = admin.firestore();
var estados = db.collection("estados");

const getEstados = async (req, res) => {
    try {
        const snapshot = await estados.get();
        const listaEstados = [];
        snapshot.docs.map((doc) => {
            const datos = doc.data();
            const uid = doc.id;
            const estado = { uid, ...datos };
            listaEstados.push(estado);
        })
        res.json(listaEstados)
    } catch (error) {
        res.json({ error: error })
    }
}
const addEstado = async (req, res) => {
    const { nombre, descripcion } = req.body
    const nuevoEstado= {
        id: Math.floor((Math.random() * (1000 - 100) + 100)).toString(),
        nombre: nombre,
        descripcion: descripcion
    };
    estados.add(nuevoEstado)
        .then((docRef) => {
            res.json({ uid: docRef.id,msg:"Estado creada con exito",status:true })
        })
        .catch((error) => {
            res.json({ uid: "-1",msg:"La estado no se puedo crear: " + error,status:false })
        });
}

const editarEstado = async (req, res) => {
    const { documentId,nuevoNombre, nuevaDescripcion } = req.body
    const nuevoEstadoEditado= {
        nombre: nuevoNombre,
        descripcion: nuevaDescripcion
    };
    estados.doc(documentId).update(nuevoEstadoEditado)
        .then((docRef) => {
            res.json({ uid: docRef.id,msg:"Estado editado con exito",status:true })
        })
        .catch((error) => {
            res.json({ uid: "-1",msg:"La estado no se puedo editar: " + error,status:false })
        });
}

const eliminarEstado = async (req, res) => {
    const { documentId} = req.body
    estados.doc(documentId).delete()
        .then((docRef) => {
            res.json({ uid: docRef.id,msg:"Estado eliminado con exito",status:true })
        })
        .catch((error) => {
            res.json({ uid: "-1",msg:"La estado no se puedo eliminar: " + error,status:false })
        });
}
module.exports = {
    getEstados,
    addEstado,
    editarEstado,
    eliminarEstado
}