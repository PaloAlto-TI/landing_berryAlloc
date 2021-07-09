import React, { useContext, useEffect, useState } from "react";
import { Spin } from "antd";
import { Button } from "antd";
import { Table } from "antd";
import { PlusOutlined, SmileOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import { ProductoContext } from "../../../contexts/productoContext";
import CrudButton from "../../crudButton/crudButton";
import { useHistory } from "react-router";
import { useRouteMatch } from "react-router-dom";
import Search from "antd/lib/input/Search";
import "./productoList.css";

const ProductoList = () => {
  const {
    productos,
    setPermiso,
    setEditProducto,
    isEmpty,
    softDeleteProducto,
  } = useContext(ProductoContext);
  let { path } = useRouteMatch();
  const [value, setValue] = useState(null);
  const [dataSource, setDataSource] = useState([]);

  console.log("path");
  const [filteredInfo, setFilteredInfo] = useState([]);
  // const size = useWindowSize();
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);

    setFilteredInfo(filters);
  };

  useEffect(() => {
    setEditProducto(null);
    console.log(productos);
    setPermiso(false);
    if (!value) {
      setDataSource(productos);
    }
  });

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const columns = [
    {
      title: "CÓDIGO",
      dataIndex: "codigo_interno",
      key: "codigo_interno",
      sorter: {
        compare: (a, b) => a.codigo_interno.localeCompare(b.codigo_interno),
      },
      showSorterTooltip: false,
    },
    {
      title: "NOMBRE",
      dataIndex: "nombre",
      key: "nombre",
      sorter: {
        compare: (a, b) => a.nombre.localeCompare(b.nombre),
      },
      showSorterTooltip: false,
      // render:(text)=><Link to='/inicio'>{text}</Link>
    },
    {
      title: "TIPO DE INVENTARIO",
      dataIndex: "tipo_inventario",
      key: "tipo_inventario",
      sorter: {
        compare: (a, b) => a.tipo_inventario.localeCompare(b.tipo_inventario),
      },
      filters: [
        { text: "PERMANENTE", value: "PERMANENTE" },
        { text: "BAJO PEDIDO", value: "BAJO PEDIDO" },
      ],
      filteredValue: filteredInfo.tipo_inventario || null,
      onFilter: (value, record) => record.tipo_inventario.includes(value),
      ellipsis: true,
      showSorterTooltip: false,
      render: (text, record) =>
        record.fk_linea_id === "60a7d6e408be1a4c6d9f019d" ? (
          <p style={{ color: "blue" }}>
            {" "}
            <SmileOutlined /> {text}
          </p>
        ) : (
          <p style={{ color: "black" }}>{text}</p>
        ),
    },
    {
      title: "PRECIO",
      dataIndex: "precio",
      key: "precio",
      sorter: {
        compare: (a, b) => a.precio - b.precio,
      },
      showSorterTooltip: false,
      render: (text, record) => (
        <p
          // onClick={() => {
          //   record["permiso"] = false;
          //   history.push(`${path}/${record.codigo_interno}/ver`, record);
          // }}
        >
          {"$" + text}
        </p>
      ),
    },

    {
      title: "ACCIONES",
      dataIndex: "",
      key: "x",
      render: (_, record) => (
        <CrudButton record={record} softDelete={softDeleteProducto} />
      ),
    },
  ];

  let history = useHistory();

  function handleClick() {
    setPermiso(true);
    let record = {
      permiso: true,
      nuevo: true,
    };
    history.push(`${path}/nuevo`, record);
  }

  function ver(record) {
    record["permiso"] = false;
    history.push(`${path}/${record.codigo_interno}/ver`, record);
  }

  const filtrar = (e) => {
    const currValue = e.target.value;
    setValue(currValue);
    const filteredData = productos.filter(
      (entry) =>
        entry.nombre.toLowerCase().includes(currValue.toLowerCase()) ||
        entry.tipo_inventario.toLowerCase().includes(currValue.toLowerCase()) ||
        entry.precio.toString().includes(currValue)
    );
    setDataSource(filteredData);
  };

  return (
    <div>
      <Button
        type="primary"
        className="success"
        icon={<PlusOutlined />}
        onClick={handleClick}
      >
        Nuevo
      </Button>
      <Search
        placeholder="Buscar producto..."
        value={value}
        onChange={(e) => filtrar(e)}
        style={{ width: 200 }}
      />
      <br />
      <br />
      {productos.length > 0 || isEmpty ? (
        <Table
          locale={{ emptyText: "No hay datos" }}
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          onChange={handleChange}
          pagination={{ defaultPageSize: 3 }}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                if (event.clientX < window.innerWidth*0.80){
                // record["permiso"] = false;
                // history.push(`${path}/${record.codigo_interno}/ver`, record);
                  ver(record)
                }
              },
            };
          }}
          
        />
      ) : (
        <Spin indicator={antIcon} />
      )}
      {/* {JSON.stringify(productos)}  */}
    </div>
  );
};

// function useWindowSize() {
//   const [windowSize, setWindowSize] = useState({
//     width: undefined,
//     height: undefined,
//   });
//   useEffect(() => {
//     function handleResize() {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     }
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []); 
//   return windowSize;
// }
export default ProductoList;
