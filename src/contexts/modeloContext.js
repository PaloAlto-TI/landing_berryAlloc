import React, { createContext, useState, useEffect } from "react";
import { ColorService } from "../services/colorService.js";


export const ModeloContext = createContext();

const ModeloContextProvider = (props) => {

  const colorService = new ColorService();
  const [modelos, setModelos] = useState([]);
  const [modelo_grupos_nn, set_modelo_grupos_nn] = useState([]);
  const [editModelo, setEditModelo] = useState(null);
  const [permiso, setPermiso] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  // import { ColorService } from "../../../services/colorService";

  useEffect(() => {
    setIsEmpty(false)

    colorService.getAll().then((data) => { if (data.length===0) setIsEmpty(true) ; setModelos(data)});
    if (modelos.length === 0){
      setIsEmpty(true);
    }

    colorService.get_color_grupos_nn().then((data) => set_modelo_grupos_nn(data));

  }, []);

  const createModelo = async(modelo) => {
    console.log("LO QUE VIENE PARA CREAR MODELO EM CONTEXT: " + JSON.stringify(modelo))

    const data = await colorService.create(modelo);
    
    if (data.message === "OK CREATE") {
        colorService.getAll().then((data) => setModelos(data));
        colorService.get_color_grupos_nn().then((data) => set_modelo_grupos_nn(data));
        // grupoService.get_grupo_marcas_nn().then((data) => set_grupo_marcas_nn(data));
    }
    return data;
  }

  const findModelo = (id) => {
    const modelo = modelo_grupos_nn.find((m) => m.id === id);

    if (modelo){

      modelo.modelo_grupos_nn_in = modelo.color_grupos_nn.map(x=>x.id) // 10/08/2021 - OBSERVACIÓN: PENDIENTE CAMBIO DE NOMBRE DE LAS VARIABLES UNA VEZ QUE SE CAMBIE EL NOMBRE DE TABLA DE: COLOR A: MODELO

      if (modelo.color_grupos_nn.length > 0){
        modelo.fk_linea_id = ''; // 12/08/2021 - OBSERVACIÓN: HAY QUE VALIDAR EL VALOR DE LA LINEA, POR  EL MOMENTO QUEDA ASÍ PERO SE DEBE ASIGANAR EL VALOR A TRAVÉS DE LA VISTA O LA DECISIÓN QUE SE TOME
        modelo.color_grupos_nn[0].color_grupo.fk_marca_id ?
        modelo.fk_marca_id = modelo.color_grupos_nn[0].color_grupo.fk_marca_id 
        : modelo.fk_marca_id = '';
      } else {
        modelo.fk_marca_id = '';
      }
      
      setEditModelo(modelo);
    }
  };

/*
  const softDeleteProducto = (producto) => {
    productoService
      .softDeleteProducto(producto)
      .then(() => {productoService.getProductos().then((data) => { if (data.length===0) setIsEmpty(true) ; setProductos(data)});
    });
      // .then(() => {setProductos(productos.filter((p) => p.id !== producto.id))});

  };*/

  /*const findModelo = (id) => {
    console.log(id);
    const producto = productos.find((p) => p.codigo_interno === id);
    setEditProducto(producto);
  };
*/

const updateModelo = async(modelo) => {

    console.log("LO QUE VIENE AL UPDATEMODELO CONTEXT",modelo)
    const data = await colorService.update(modelo);
    // const data = await marcaService.update(marca);
    console.log("LA DATA QUE REGRESA DE UPDATEMODELO : ", JSON.stringify(data));

    if (data.message === "OK UPDATE") {
        colorService.getAll().then((data) => setModelos(data));
      // proveedorService.get_proveedores_marcas_nn().then((data) => set_proveedores_marcas_nn(data)); // PREGUNTAR SI VA ESTO O CÓMO DEBERÍA IR
    }

    setEditModelo(null);
    return data;
  };

  return (
    <ModeloContext.Provider
      value={{
        createModelo,
        findModelo,
        updateModelo,
        // softDeleteModelo,
        modelo_grupos_nn,
        editModelo,
        modelos,
        permiso,
        setPermiso,
        setEditModelo,
        isEmpty
      }}
    >
      {props.children}
    </ModeloContext.Provider>
  );
};

export default ModeloContextProvider;
