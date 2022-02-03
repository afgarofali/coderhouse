//Clase
module.exports = class cl_Producto {

    //productos 
    static #arrProductos = [
        {
            id: 1,
            title: "Lapiz",
            price: 60,
            thumbnail: "/public/images/lapiz.jpg",
        },
        {
            id: 2,
            title: "Birome",
            price: 80,
            thumbnail: "/public/images/birome.jpg",
        },
        {
            id: 3,
            title: "Corrector",
            price: 150,
            thumbnail: "/public/images/corrector.jpg",
        },
    ];


    #getMaxId(){
        return cl_Producto.#arrProductos.length === 0 ? 0 : cl_Producto.#arrProductos.reduce((acum,proximo)=> acum>proximo.id? acum:proximo.id,0);
    }

 
    getProductos(){
        return  cl_Producto.#arrProductos.length === 0 ? null : cl_Producto.#arrProductos;
    }


    getProductoById(idProducto){
        return idProducto != undefined && typeof(idProducto) === "number" ? cl_Producto.#arrProductos.find(producto=> producto.id === idProducto): null;
    }


    setProducto(objProductoIN){

        if(objProductoIN.title != undefined && 
            (objProductoIN.price != undefined && parseInt(objProductoIN.price) != NaN) && 
            (objProductoIN.thumbnail != undefined && objProductoIN.thumbnail != "")){

            let id = this.#getMaxId(); 
            id++;  
            objProductoIN.id = id; 
            
                let objProductoOUT =  {   
                id:objProductoIN.id,
                title:objProductoIN.title,
                price:objProductoIN.price,
                thumbnail:objProductoIN.thumbnail,
            };
            cl_Producto.#arrProductos.push(objProductoOUT); 
            return objProductoOUT; 
        }else{
            return null;
        }
    }

    updateProducto(idProducto,objProducto){

        if(objProducto.title != undefined && 
            (objProducto.thumbnail != undefined && objProducto.thumbnail != "") && 
            (objProducto.price != undefined && parseInt(objProducto.price) != NaN) && 
            (idProducto != undefined && typeof(idProducto) === "number")){
            
           
            let posicion = cl_Producto.#arrProductos.findIndex(producto=> producto.id === idProducto);
            
           
            if( posicion > -1){
               
                cl_Producto.#arrProductos.splice(posicion,1);
               
                cl_Producto.#arrProductos.push(
                    {   
                        id:objProducto.id,
                        title:objProducto.title,
                        price:objProducto.price,
                        thumbnail:objProducto.thumbnail,
                    }
                );
                return true; 
            }
        }
        return false;
    }

    deleteProducto(idProducto){

        if(idProducto != undefined && typeof(idProducto) === "number"){
            
            let posicion = cl_Producto.#arrProductos.findIndex(element=> element.id === idProducto);
            
            if( posicion > -1){
                cl_Producto.#arrProductos.splice(posicion,1); 
                return true; 
            }
        }
        return false; 
    }
}