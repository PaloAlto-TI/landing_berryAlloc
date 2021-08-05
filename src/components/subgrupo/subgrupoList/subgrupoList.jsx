import { Table } from 'antd';
import React,{ useContext, useEffect, useState } from 'react'
import CrudButton from '../../crudButton/crudButton';
import { SubgrupoContext } from "../../../contexts/subgrupoContext";
import { useHistory } from "react-router";
import { useRouteMatch } from "react-router-dom";
import { Button } from 'antd/lib/radio';
import Search from 'antd/lib/input/Search';
import { PlusOutlined } from '@ant-design/icons';


export const SubgrupoList = () => {
  useEffect(() => {
    setEditSubgrupo(null);


  },[]);

  const [value, setValue] = useState(null);

    let { path } = useRouteMatch();
    let history = useHistory();
    const {  subgrupos,setPermiso, softDeleteSubgrupo,setEditSubgrupo } = useContext(SubgrupoContext);
    const [rowState, setRowState] = useState(true);
    const [dataSource, setDataSource] = useState([]);
    const columns = [
        {
          title: "NOMBRE",
          dataIndex: "nombre",
          key: "nombre",
          sorter: {
            compare: (a, b) => a.nombre.localeCompare(b.nombre),
          },
          showSorterTooltip: false
        },
       
        {
          title: "DESCRIPCIÓN",
          dataIndex: "descripcion",
          key: "descripcion",
          className: "longText",
          sorter: {
            compare: (a, b) => a.descripcion.localeCompare(b.descripcion),
          },
          showSorterTooltip: false
        },
        {
            title: "ACCIONES",
            dataIndex: "",
            key: "x",
            render: (_, record) => (
              <CrudButton
                record={record}
                typeTransaction={typeTransactionData}
                softDelete={softDeleteSubgrupo}
                setRowState={setRowState}
              />
          ),
        },
      ]
      const typeTransactionData = {
        tableNamePSQL: "subgrupo",
        byIdPSQL: true,
        byInternalCodePSQL: false,
        dependenciesPSQL: false,
        labelCrudPlural: "SUBGRUPO",
        labelCrudSingle: "SUBGRUPOS"
      };

      function ver(record) {
        setEditSubgrupo(null);
        record["permiso"] = false;
      //alert("ENTRA A LA FUNCION VER" + JSON.stringify(record));
      //setEditSubgrupo(record);
        history.push(`${path}/${record.id}/ver`, record);

      }
      const filtrar = (e) => {
        const currValue = e.target.value;
        setValue(currValue);
        // const filteredData = marcas.filter(entry => //-- Estaba antes de cambiar a nn
        const filteredData = null;
      }
      function handleClick() {
        setPermiso(true);
        let record = {
          permiso: true,
          nuevo: true,
        };
        history.push(`${path}/nuevo`, record);
      }
    
    return (

        <div>
  <Button type="primary" className="success" icon={<PlusOutlined />} onClick={handleClick}>Nuevo</Button>
      <Search
        placeholder="Buscar Marca..."
        value={value}
       // onChange={e => filtrar(e)}
        style={{ width: 200 }}
      />
      <br /><br />
            <Table
             dataSource={subgrupos} 
             columns={columns}
             rowKey="id" 
             onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    if (JSON.parse(localStorage.getItem("user")).rol === 2) {
                      if (event.clientX < window.innerWidth * 0.7 && rowState) {
                          console.log("hola")
                        // record["permiso"] = false;
                        // history.push(`${path}/${record.codigo_interno}/ver`, record);
                        ver(record);
                      }
                    } else {
                      ver(record);
                    }
                  },
                };
              }}
             />
        </div>
    )
}
