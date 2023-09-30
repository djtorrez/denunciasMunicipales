const { response, request } = require('express')
const { admin } = require('../config/firebase-config')
const nomailer = require('nodemailer')

var db = admin.firestore();
var usuarios = db.collection("users");

const getUser = async (req, res) => {
    try {
        const documentoId = req.params.documentoId;
        const documentRef = usuarios.doc(documentoId);
        const documentoSnapshot = await documentRef.get();
        if (documentoSnapshot.exists) {
            res.json(documentoSnapshot.data())
        } else {
            res.json({ error: "documento no existe" })
        }

    } catch (error) {
        res.json({ error: error })
    }
}


module.exports = {
    getUser
}
