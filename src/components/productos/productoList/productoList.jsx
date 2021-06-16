import React, { useContext, useEffect, useState } from "react";
import { Spin } from "antd";
import { Button} from 'antd';
import { Table } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { LoadingOutlined } from "@ant-design/icons";
import { ProductoContext } from "../../../contexts/productoContext";
import CrudButton from "../../crudButton/crudButton";
import { useHistory } from "react-router";
import { useRouteMatch } from "react-router-dom";
import Search from "antd/lib/input/Search";
import './productoList.css'

const ProductoList = () => {
  const { productos, setPermiso } = useContext(ProductoContext);
  let { path } = useRouteMatch();
  const [value, setValue] = useState(null);
  const [dataSource, setDataSource] = useState([]);
 
  console.log("path")
  const [filteredInfo, setFilteredInfo] = useState([])

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    
    setFilteredInfo(filters);
  };

  useEffect(() => {
    setPermiso(false);
    if (!value){
      setDataSource(productos)
    }
  })
  
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const columns = [
  
    {
      title: "CÓDIGO",
      dataIndex: "codigo_interno",
      key: "codigo_interno",
      sorter: {
        compare: (a, b) => a.codigo_interno.localeCompare(b.codigo_interno),
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
      showSorterTooltip: false
     
    },
    {
      title: "TIPO DE INVENTARIO",
      dataIndex: "tipo_inventario",
      key: "tipo_inventario",
      sorter: {
        compare: (a, b) => a.tipo_inventario.localeCompare(b.tipo_inventario),
      },
      filters: [
        { text: 'PERMANENTE', value: 'PERMANENTE' },
        { text: 'BAJO PEDIDO', value: 'BAJO PEDIDO' },
      ],
      filteredValue: filteredInfo.tipo_inventario || null,
      onFilter: (value, record) => record.tipo_inventario.includes(value),
      ellipsis: true,
      showSorterTooltip: false

    },
    {
      title: "PRECIO ($)",
      dataIndex: "precio",
      key: "precio",
      sorter: {
        compare: (a, b) => a.precio - b.precio,
      },
      showSorterTooltip: false

    },

    {
      title: "ACCIONES",
      dataIndex: "",
      key: "x",
      render: (_, record) => <CrudButton record={record} />,
    },
  ];

  let history = useHistory();

  function handleClick() {
    setPermiso(true);
    let record = {
      "permiso" : true,
      "nuevo" : true
    };
    history.push(`${path}/nuevo`, record);
  }

  
  return (
    <div>
    <Button type="primary" className="success" icon={<PlusOutlined />} onClick={handleClick}>Nuevo</Button>
    <Search
      placeholder="Buscar producto..."
      value={value}
      onChange={e => {
        const currValue = e.target.value;
        setValue(currValue);
        const filteredData = productos.filter(entry => 
          entry.nombre.toLowerCase().includes(currValue.toLowerCase()) || entry.tipo_inventario.toLowerCase().includes(currValue.toLowerCase()) || entry.precio.toString().includes(currValue)
        );
        setDataSource(filteredData);
      }}
      style={{ width: 200 }} 
    />
      {productos.length > 0 ? (
        <Table locale={{ emptyText: 'No hay datos' }} columns={columns} dataSource={dataSource} rowKey='id' onChange={handleChange} />
      ) : (
        <Spin indicator={antIcon} />
      )}
      {/* {JSON.stringify(productos)}  */}
    </div>
  );
};

export default ProductoList;
