const { response, request } = require('express')
// Imports the Google Cloud client libraries
const vision = require('@google-cloud/vision');
// Creates a client
const client = new vision.ImageAnnotatorClient({
    keyFilename: 'topic-vision.json'
});
// const { getPrueba,visionPrueba } = require('../public/images/');

const visionReconocerObjetos = async (req = request, res = response) => {
    const { imageURL } = req.body;
    const respuesta = [];
    const [result] = await client.objectLocalization(imageURL);
    const objects = result.localizedObjectAnnotations;
    objects.forEach(object => {
        /* console.log(`Name: ${object.name}`);
        console.log(`Confidence: ${object.score}`); */
        respuesta.push(object.name)
       /*  const vertices = object.boundingPoly.normalizedVertices;
        vertices.forEach(v => console.log(`x: ${v.x}, y:${v.y}`)); */
    });
    res.json({
        msg: 'post API - ChatGPT-Controlador',
        body: respuesta
    })
}

const getPrueba = (req = request, res = response) => {
    data = {
        name: 'Freddy',
        lastname: 'Arriaga',
        age: 32,
        profession: 'Desarrollador Full Stack'
    }
    res.json({
        msg: 'Get API - Controlador',
        body: data
    })
}

module.exports = {
    getPrueba,
    visionReconocerObjetos
}