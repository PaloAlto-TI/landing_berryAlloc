import React, { useContext, useEffect, useState } from "react";
import { Spin } from "antd";
import { Button} from 'antd';
import { Table } from "ant-table-extensions";
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { LoadingOutlined } from "@ant-design/icons";
import { ProductoContext } from "../../../contexts/productoContext";
import CrudButton from "../../crudButton/crudButton";
import { useHistory } from "react-router";

const ProductoList = () => {
  const { productos, setPermiso } = useContext(ProductoContext);

  const [filteredInfo, setFilteredInfo] = useState([])

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    
    setFilteredInfo(filters);
  };

  useEffect(() => {
    setPermiso(false);
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
      title: "PRECIO",
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
    history.push("/producto", record);
  }

  
  return (
    <div>
    <Button type="primary"  icon={<PlusOutlined />} onClick={handleClick}>Nuevo</Button>
    
      {productos.length > 0 ? (
        <Table locale={{ emptyText: 'No hay datos' }} columns={columns} dataSource={productos} rowKey='id' onChange={handleChange} searchableProps={{
        // dataSource,
        // setDataSource: setSearchDataSource,
        inputProps: {
          placeholder: "Buscar producto...",
          prefix: <SearchOutlined />,
          style: {
            width:"25%",
            marginLeft: "75vw"
          }

        },
      }}/>
      ) : (
        <Spin indicator={antIcon} />
      )}
      {/* {JSON.stringify(productos)}  */}
    </div>
  );
};

export default ProductoList;
