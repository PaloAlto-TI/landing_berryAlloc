import React, { useContext, useEffect, useState } from "react";
import { Spin, Button, Table } from "antd";
import { PlusOutlined, SmileOutlined, LoadingOutlined } from '@ant-design/icons';
import CrudButton from "../../crudButton/crudButton";
import { LineaContext } from "../../../contexts/lineaContext";
import { useHistory } from "react-router";
import { useRouteMatch } from "react-router-dom";
import Search from "antd/lib/input/Search";
import './lineaList.css';


const LineaList = () => {
    const { lineas, setEditLinea } = useContext(LineaContext);
    const [filteredInfo, setFilteredInfo] = useState([])
    const [value, setValue] = useState(null);
    const [dataSource, setDataSource] = useState([]);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const columns = [
        {
          title: "CÓDIGO",
          dataIndex: "id",
          key: "id",
          sorter: {
            compare: (a, b) => a.id.localeCompare(b.id),
          },
          showSorterTooltip: false
        },
        {
          title: "NOMBRE",
          dataIndex: "nombre",
          key: "nombre",
          sorter: {
            compare: (a, b) => a.nombre.localeCompare(b.nombre),
          },
          showSorterTooltip: false,
         
        }
    ]

    let { path } = useRouteMatch();
    let history = useHistory();

    // console.log("LOS COLUMMNS: " + columns);

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);  
        setFilteredInfo(filters);
    };

    function handleClick() {
        // setPermiso(true);
        let record = {
        // "permiso" : true,
        "nuevo" : true
        };
        history.push(`${path}/nuevo`, record);
    }

    const filtrar = (e) => {
        const currValue = e.target.value;
        setValue(currValue);
        const filteredData = lineas.filter(entry => 
          entry.nombre.toLowerCase().includes(currValue.toLowerCase()));
        setDataSource(filteredData);
      }

    useEffect(() => {
        setEditLinea(null);
        // console.log("Usse Effect -> Las lineas: " + lineas)
        // setPermiso(false);
        if (!value){
          setDataSource(lineas)
        }
      })

    return (
    <div>
        {/*JSON.stringify(lineas)*/}
        {lineas.length + " las lineas length" }
        {lineas.length + " las lineas length" }
        
        {lineas.length > 0 ? (
           // dataSource={state.hasData ? data : null}

        <Table locale={{ emptyText: 'No hay datos' }} columns={columns} dataSource={null} rowKey='id' onChange={handleChange} />) : (
        <Spin indicator={antIcon} />
      )}
    </div>
    );
}

export default LineaList;

