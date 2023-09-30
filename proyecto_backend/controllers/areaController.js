const { response, request } = require('express')
const { admin } = require('../config/firebase-config')

var db = admin.firestore();
var areas = db.collection("areas");

const getArea = async (req, res) => {
    const id = req.params.id;
    // const { documentId } = req.body;
    const snapshot = await areas.doc(id).get();
    res.json(snapshot.data());
}

const getAreas = async (req, res) => {
    try {
        const snapshot = await areas.get();
        const listaAreas = [];
        snapshot.docs.map((doc) => {
            const datos = doc.data();
            const uid = doc.id;
            const area = { uid, ...datos };
            listaAreas.push(area);
        })
        res.json(listaAreas)
    } catch (error) {
        res.json({ error: error })
    }
}

const getCategoriasArea = async (req, res)=>{
    const {area} = req.body
    const snapshot = await areas.where('nombre', '==', area).get();
    res.json(snapshot.docs[0].data())
}
const addArea = async (req, res) => {
    const { nombre, descripcion } = req.body
    const nuevaArea = {
        id: Math.random() * (1000 - 100) + 100,
        nombre: nombre,
        descripcion: descripcion,
        categorias:[]
    };
    areas.add(nuevaArea)
        .then((docRef) => {
            res.json({ uid: docRef.id,msg:"Area creada con exito",status:true })
        })
        .catch((error) => {
            res.json({ uid: "-1",msg:"El Area no se puedo crear: " + error,status:false })
        });
}

const editarArea = async (req, res) => {
    const { documentId,nuevoNombre, nuevaDescripcion } = req.body
    const nuevaAreaEditado= {
        nombre: nuevoNombre,
        descripcion: nuevaDescripcion
    };

    console.log("nuevoNombre:", nuevoNombre);
    console.log("nuevaDescripcion:", nuevaDescripcion);
    areas.doc(documentId).update(nuevaAreaEditado)
        .then((docRef) => {
            res.json({ uid: docRef.id,msg:"Area editada con exito",status:true })
        })
        .catch((error) => {
            res.json({ uid: "-1",msg:"Area no se puedo editar: " + error,status:false })
        });
}

const eliminarArea = async (req, res) => {
    const { documentId} = req.body
    areas.doc(documentId).delete()
        .then((docRef) => {
            res.json({ uid: docRef.id,msg:"Area eliminado con exito",status:true })
        })
        .catch((error) => {
            res.json({ uid: "-1",msg:"Area no se puedo eliminar: " + error,status:false })
        });
}

const addCategoriaAlArea = async (req, res) => {
    const { documentId, categoria } = req.body;
  
    try {
      const areaRef = areas.doc(documentId);
      const areaDoc = await areaRef.get();
  
      if (!areaDoc.exists) {
        return res.json({ msg: "El área no existe", status: false });
      }
  
      const areaData = areaDoc.data();
      const nuevasCategorias = [...areaData.categorias, categoria];
  
      await areaRef.update({ categorias: nuevasCategorias });
  
      return res.json({ msg: "Categoría agregada con éxito", status: true });
    } catch (error) {
      console.error("Error al agregar la categoría al área:", error);
      return res.json({ msg: "Error al agregar la categoría al área", status: false });
    }
  };
  
  
module.exports = {
    getAreas,
    addArea,
    editarArea,
    eliminarArea,
    getArea,
    addCategoriaAlArea,
    getCategoriasArea
}
