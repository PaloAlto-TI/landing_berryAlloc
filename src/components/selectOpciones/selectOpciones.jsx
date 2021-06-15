import React, { useEffect, useState } from "react";
import { Select } from 'antd';
import { MarcaService } from "../../services/marcaService";
import { LineaMarcaService } from "../../services/lineaMarcaService";
import { GrupoService } from "../../services/grupoService";
import { ProveedorService } from "../../services/proveedorService";
import { MedidaService } from "../../services/medidaService";
import { paises } from "../../utils/paises";

const { Option } = Select;
const SelectOpciones = (props) => {

  // console.log(props)
    const {tipo, onChange, value, filter, readOnly, setShow} = props;
    const [opciones, setOpciones] = useState([])
    console.log(props);
    // console.log(filter);
    useEffect(async () => {
      if (tipo === 'marca'){
        const marcaService = new MarcaService();
        marcaService.getAll().then((data) => setOpciones(data));
      }
      
      if (tipo === 'línea'){
        const lineaMarcaService= new LineaMarcaService();
        lineaMarcaService.getAll().then((data) => setOpciones(data.filter((p) => p.marca_id === filter)));
      }else{
        setOpciones([]);
      }

      if (tipo === 'grupo'){
        const grupoService= new GrupoService();
        grupoService.getAll().then((data) => setOpciones(data.filter((p) => p.fk_linea_id === filter)));
      }else{
        setOpciones([]);
      }

      if (tipo === 'proveedor'){
        const proveedorService= new ProveedorService();
        proveedorService.getAll().then((data) => setOpciones(data));
      }else{
        setOpciones([]);
      }

      if (tipo === 'unidad de medida' || tipo === 'unidad de venta'){
        const medidaService= new MedidaService();
        if (tipo === 'unidad de medida'){
          medidaService.getAll().then((data) => setOpciones(data.filter((p) => p.tipo_unidad.toUpperCase() === "MEDIDA" )));
        }else{
          await medidaService.getAll().then((data) => setOpciones(data.filter((p) => p.tipo_unidad.toUpperCase() === "VENTA")));
          setShow(false);
        }
      }else{
        setOpciones([]);
      }

      if (tipo === 'procedencia'){
        setOpciones(paises);

      }


    }, [filter])
  

    function handleChange(value) {
        onChange(value);
      }
      
      function onBlur() {
        console.log('blur');
      }
      
      function onFocus() {
        console.log('focus');
      }
      
      function onSearch(val) {
        console.log('search:', val);
      }

      var opcionesList = opciones.map(function (opcion) {
    
        return (
    
          <Option key={opcion.id} value={opcion.id}>{opcion.nombre.toUpperCase()}</Option>

        );
      });

  return (
    <Select
      showSearch
      disabled={readOnly}
      style={{ width: 200 }}
      placeholder={"Seleccione "+tipo}
      optionFilterProp="children"
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      value={opcionesList.length > 0 ? value : null}
      onSearch={onSearch}
      notFoundContent="No hay coincidencias"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >


     {opcionesList}
    </Select>
  );
};

export default SelectOpciones;
