import React, { useEffect, useState } from "react";
import { Select } from 'antd';
import { ProveedorService } from "../../services/proveedorService";
import { SubgrupoService } from "../../services/subgrupoService";
const { Option } = Select;
const SelectOpciones = (props) => {

  console.log(props)
    const {tipo, onChange, value} = props;
    const [opciones, setOpciones] = useState([])
    
    useEffect(() => {
      
      if (tipo === 'proveedor'){
        const proveedorService = new ProveedorService();
        proveedorService.getProveedores().then((data) => setOpciones(data));
      }else{
        const subgrupoService = new SubgrupoService();
        subgrupoService.getSubgrupos().then((data) => setOpciones(data));
      }
      
    }, [])
  

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
      style={{ width: 200 }}
      placeholder={"Seleccione un "+tipo}
      optionFilterProp="children"
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
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
