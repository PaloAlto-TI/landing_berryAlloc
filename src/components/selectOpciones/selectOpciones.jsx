import React, { useEffect, useState } from "react";
import { Select } from 'antd';
import { LineaMarcaService } from "../../services/lineaMarcaService";
import { MedidaService } from "../../services/medidaService";
import { paises } from "../../utils/paises";
import { LineaService } from "../../services/lineaService";
import { GrupoMarcaService } from "../../services/grupoMarcaService";
import { ProveedorMarcaService } from "../../services/proveedorMarcaService";
import { ColorGrupoService } from "../../services/colorGrupoService";


const { Option } = Select;
const SelectOpciones = (props) => {

  // console.log(props)
    const {tipo, onChange, value, filter, filter2, readOnly, setShow} = props;
    const [opciones, setOpciones] = useState([])
    console.log(props);
    useEffect(() => {

      let cancel = false;

      async function fetch() {

        console.log(filter);

        if (tipo === 'línea'){
          const lineaService = new LineaService();
          lineaService.getAll().then( (data) =>  {if (cancel) return; setOpciones(data)});
        }
        
        if (tipo === 'marca' && filter){
          const lineaMarcaService= new LineaMarcaService();
          lineaMarcaService.getAll().then((data) =>  {if (cancel) return; setOpciones(data.filter((p) => p.linea_id === filter))});
        }else{
          // setOpciones([]);
        }
  
        if (tipo === 'grupo' && filter && filter2){
          console.log("FILTER-MARCA",filter)
          console.log("FILTER-LINEA",filter2)

          const grupoService= new GrupoMarcaService();
          grupoService.getAll().then((data) =>  {if (cancel) return; setOpciones(data.filter((p) => p.marca_id === filter && p.linea_id === filter2))});

        }else{
          // setOpciones([]);
        }
        if (tipo === 'color' && filter){
          console.log("FILTER-COLOR:",filter)
          const colorService= new ColorGrupoService();
          await colorService.getAll().then((data) => {if (cancel) return;setOpciones(data.filter((p) => p.grupo_id === filter))});
          setShow(false);
          
        }else{
          // setOpciones([]);
        }
  
      
  
        if (tipo === 'proveedor' && filter){
          const proveedorService= new ProveedorMarcaService();
          proveedorService.getAll().then((data) => {if (cancel) return;setOpciones(data.filter((p) => p.marca_id === filter))});
        }else{
          // setOpciones([]);
        }
  
        if (tipo === 'unidad de medida' || tipo === 'unidad de venta'){
          const medidaService= new MedidaService();
          if (tipo === 'unidad de medida'){
            medidaService.getAll().then((data) =>{if (cancel) return; setOpciones(data.filter((p) => p.tipo_unidad.toUpperCase() === "MEDIDA" ))});
          }else{
            medidaService.getAll().then((data) => {if (cancel) return; setOpciones(data.filter((p) => p.tipo_unidad.toUpperCase() === "VENTA"))});
            // setShow(false);
          }
        }else{
          // setOpciones([]);
        }
  
        if (tipo === 'procedencia'){
          setOpciones(paises);
        }


  
      }
      
     
        fetch();

        return () => { 
          cancel = true;
        }


    }, [filter])
  

    function handleChange(value) {
       console.log("value!!!!!!!!",value);
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
        
        if (opcion.codigo){
  
          return (
          
            <Option key={opcion.id} value={opcion.id}>{opcion.nombre.toUpperCase()}</Option> 
  
          );
        }else{
          return (
          
            <Option key={opcion.id} value={opcion.id}>{opcion.nombre.toUpperCase()}</Option> 
  
          );
        }
        
      });

  return (
    <Select
      // labelInValue={tipo ==="color" ? true : false}
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
