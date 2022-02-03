const express = require("express");
const { sendFile } = require("express/lib/response");
const router = express.Router();

const cl_Producto = require("../modules/cl_Producto"); 
const Producto = new cl_Producto();


router.get("/",(req, res)=>{
    res.status(200).json(Producto.getProductos()); 
});



router.get("/:idProducto",(req, res)=>{

    let idProducto = parseInt(req.params.idProducto);
    if ( !isNaN(idProducto) ){
        let objProductoId = Producto.getProductoById(idProducto);
        objProductoId != null ? res.status(200).json(objProductoId): res.status(406).json({error:`No se encontró el producto con id: ${idProducto}`});
    }else{
        res.status(404).json({error:'El id ingresado no es numerico'});
    }    
});


router.post("",(req,res)=>{
    let objProductoBody = {...req.body};

    let objProductoNuevo = Producto.setProducto(objProductoBody);
    objProductoNuevo != null ? res.status(200).json(objProductoNuevo) : res.status(406).json({error:'Error al querer agregar el nuevo producto'});

});

router.put("/:idProducto",(req,res)=>{
    let idProducto = parseInt(req.params.idProducto);
    let objProductoBody = {...req.body};

    Producto.updateProducto(idProducto,objProductoBody) ? res.status(200).json({status:`El producto con Id ${idProducto} fue actualizado correctamente.`}) : res.status(406).json({error:`No se encontró el producto con id: ${idProducto}`});
});

router.delete("/:idProducto",(req,res)=>{
    let idProducto = parseInt(req.params.idProducto);
        Producto.deleteProducto(idProducto) ? res.status(200).json({status:`El producto con Id ${idProducto} fue eliminado correctamente.`}) : res.status(406).json({error: `No se encontró el producto con id: ${idProducto}`});
});

module.exports = router;