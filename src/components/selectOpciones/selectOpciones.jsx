import React, { useContext } from "react";
import { Select } from 'antd';
import { ProveedorContext } from "../../contexts/proveedorContext";
const { Option } = Select;
const SelectOpciones = () => {

    const { proveedores } = useContext(ProveedorContext);
  

    function onChange(value) {
        console.log(`selected ${value}`);
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

      var proveedoresList = proveedores.map(function (proveedor) {
    
        return (
    
          <Option value={proveedor.id}>{proveedor.nombre.toUpperCase()}</Option>

        );
      });

  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Seleccione un proveedor"
      optionFilterProp="children"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      notFoundContent="No hay coincidencias"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >


     {proveedoresList}
    </Select>
  );
};

export default SelectOpciones;
