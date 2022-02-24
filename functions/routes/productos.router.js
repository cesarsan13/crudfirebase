const { Router } = require("express");
const admin = require("firebase-admin");
const router = Router();

admin.initializeApp({
    credential: admin.credential.cert("./credenciales.json"),
});//para pdoer usar la base de datos, 

const db = admin.firestore();
router.post('/api/productos', async (req, res) => {
    try {
        const { id, nombre, modelo, marca, precio, descripcion } = req.body;
        await db.collection('productos')
            .doc('/' + id + '/')
            .create({
                nombre: nombre,
                modelo: modelo,
                marca: marca,
                precio: precio,
                descripcion: descripcion
            });
        return res.status(200).json();

    } catch (error) {
        return res.status(500).send(error);
    }
});
router.get('/api/productos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const doc = db.collection('productos').doc(id);
        const item = await doc.get();
        const respuesta = item.data();
        return res.status(200).json(respuesta);
    } catch (error) {
        return res.status(500).send(error);
    }
});
router.get('/api/productos', async (req, res) => {
    try {
        const doc = db.collection('productos');
        const items = await doc.get();
        const docs = items.docs;
        const response = docs.map((doc) => ({
            id: doc.id,
            nombre: doc.data().nombre,
            modelo: doc.data().modelo,
            marca: doc.data().marca,
            precio: doc.data().precio,
            descripcion: doc.data().descripcion
        }));

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send(error);
    }
});
router.delete('/api/productos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const doc = db.collection('productos').doc(id);
        await doc.delete();
        return res.status(200).json();
    } catch (error) {
        return res.status(500).send(error);
    }
});
router.put('/api/productos/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, modelo, marca, precio, descripcion } = req.body;
    try {
        const doc = db.collection('productos').doc(id);
        await doc.update({
            nombre: nombre,
            modelo: modelo,
            marca: marca,
            precio: precio,
            descripcion: descripcion
        });
        return res.status(200).json();
    } catch (error) {
        return res.status(500).send(error);
    }
});
module.exports = router;