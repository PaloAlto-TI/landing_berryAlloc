import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Spin } from "antd";
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
import SelectOpciones from "../../selectOpciones/selectOpciones";
import Checkbox from "antd/lib/checkbox/Checkbox";
import QueryButton from "./queryButton";

const ProductoList = () => {
  const {
    productos,
    setPermiso,
    setEditProducto,
    isEmpty,
    softDeleteProducto,
    editProducto,
    filterProductos,
  } = useContext(ProductoContext);
  let { path } = useRouteMatch();
  const [value, setValue] = useState(null);
  const [selectedLineaId, setSelectedLineaId] = useState(
    !editProducto ? "60d4c046e600f1b5e85d075c" : editProducto.fk_linea_id
  );
  const [selectedMarcaId, setSelectedMarcaId] = useState(null);
  const [selectedGrupoId, setSelectedGrupoId] = useState(null);
  const [filtro, setFiltro] = useState(null);
  const [filterAll, setFilterAll] = useState(false)
  const [dataSource, setDataSource] = useState([]);
  const [rowState, setRowState] = useState(true);
  const [click, setClick] = useState(0.75)
  console.log("path");
  const [filteredInfo, setFilteredInfo] = useState([]);
  // const size = useWindowSize();
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);

    setFilteredInfo(filters);
  };

  useEffect(() => {
    setEditProducto(null);
    console.log("LOS PRODUCTOS", productos);
    setPermiso(false);
    if (!value && !filtro ) {
      setDataSource(productos);
    }
  });

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const columns =
    JSON.parse(localStorage.getItem("user")).rol === 2
      ? [
          {
            title: "CÓDIGO",
            dataIndex: "codigo_interno",
            key: "codigo_interno",
            sorter: {
              compare: (a, b) =>
                a.codigo_interno.localeCompare(b.codigo_interno),
            },
            showSorterTooltip: false,
            width: '10%'
          },
          {
            title: "NOMBRE",
            dataIndex: "nombre",
            key: "nombre",
            sorter: {
              compare: (a, b) => a.nombre.localeCompare(b.nombre),
            },
            showSorterTooltip: false,
            width: '35%'

            // render:(text)=><Link to='/inicio'>{text}</Link>
          },
          {
            title: "TIPO DE INVENTARIO",
            dataIndex: "tipo_inventario",
            key: "tipo_inventario",
            sorter: {
              compare: (a, b) =>
                a.tipo_inventario.localeCompare(b.tipo_inventario),
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
            title: "STOCK GENERAL",
            dataIndex: "",
            key: "y",
            render: (_, record) => (
              <QueryButton
                record={record}
                setClick={setClick}
              />
            ),
            width: '15%'
          },
          {
            title: "ACCIONES",
            dataIndex: "",
            key: "x",
            render: (_, record) => (
              <CrudButton
                record={record}
                softDelete={softDeleteProducto}
                setRowState={setRowState}
              />
            ),
            width: '10%'

          },

        ]
      : [
          {
            title: "CÓDIGO",
            dataIndex: "codigo_interno",
            key: "codigo_interno",
            sorter: {
              compare: (a, b) =>
                a.codigo_interno.localeCompare(b.codigo_interno),
            },
            showSorterTooltip: false,
            width: '10%'

          },
          {
            title: "NOMBRE",
            dataIndex: "nombre",
            key: "nombre",
            sorter: {
              compare: (a, b) => a.nombre.localeCompare(b.nombre),
            },
            showSorterTooltip: false,
            width: '35%'

            // render:(text)=><Link to='/inicio'>{text}</Link>
          },
          {
            title: "TIPO DE INVENTARIO",
            dataIndex: "tipo_inventario",
            key: "tipo_inventario",
            sorter: {
              compare: (a, b) =>
                a.tipo_inventario.localeCompare(b.tipo_inventario),
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
            title: "STOCK GENERAL",
            dataIndex: "",
            key: "y",
            render: (_, record) => (
              <QueryButton
                record={record}
                setClick={setClick}
              />
            ),
            width: '15%'
          }
        ];

  let history = useHistory();

  function handleClick() {
    filterProductos("60d4c046e600f1b5e85d075c");
    setPermiso(true);
    let record = {
      permiso: true,
      nuevo: true,
    };
    history.push(`${path}/nuevo/`, record);
  }

  function ver(record) {
    record["permiso"] = false;
    history.push(`${path}/${record.codigo_interno}/ver`, record);
  }

  const filtrarB = (e) => {
    const currValue = e.target.value;
    setValue(currValue);
    const filteredData = productos.filter(
      (entry) =>
        entry.codigo_interno.toLowerCase().includes(currValue.toLowerCase()) ||
        entry.nombre.toLowerCase().includes(currValue.toLowerCase()) ||
        entry.tipo_inventario.toLowerCase().includes(currValue.toLowerCase()) ||
        entry.precio.toString().includes(currValue)
    );
    setDataSource(filteredData);
  };

  const filtrarM = (e) => {
    setFiltro(e);

    const filteredData = productos.filter((entry) => entry.fk_marca_id === e);

    console.log("FILTRADOS X MARCA", filteredData);

    setDataSource(filteredData);
  };

  const filtrarG = (e) => {
    setFiltro(e);

    const filteredData = productos.filter(
      (entry) =>
        entry.fk_grupo_id === e && entry.fk_marca_id === selectedMarcaId
    );

    console.log("FILTRADOS X GRUPO", filteredData);

    setDataSource(filteredData);
  };

  const filtroGlobal =  (e) => {
    if (e.target.checked){
      filterProductos("all");
      setSelectedLineaId(null)
      setSelectedMarcaId(null)
      setSelectedGrupoId(null)
    }else{
      console.log("AQUI!!!!")
      setSelectedLineaId("60d4c046e600f1b5e85d075c")
      filterProductos("60d4c046e600f1b5e85d075c");
    }

    setFilterAll(e.target.checked);
    setFiltro(null);
  }

  return (
    <div>
      <br />

      <Row>
        <Col span={3}>
          {JSON.parse(localStorage.getItem("user")).rol === 2 && (
            <Button
              type="primary"
              className="success"
              icon={<PlusOutlined />}
              onClick={handleClick}
            >
              Nuevo
            </Button>
          )}
        </Col>
        <Col span={4}>
          <Search
            placeholder="Buscar producto..."
            value={value}
            onChange={(e) => filtrarB(e)}
            style={{ width: 200 }}
          />
        </Col>
        <Col span={5}>
          <SelectOpciones
            tipo="línea"
            onChange={(e) => {
              filterProductos(e);
              setSelectedLineaId(e);
              setSelectedMarcaId(null);
              setSelectedGrupoId(null);
              setFiltro(null);
              setValue(null);
              setFilterAll(false);
            }}
            value={selectedLineaId}
          />
        </Col>
        <Col span={5}>
          <SelectOpciones
            tipo="marca"
            filter={selectedLineaId}
            onChange={(e) => {
              setSelectedMarcaId(e);
              setSelectedGrupoId(null);
              setDataSource(null);
              filtrarM(e);
            }}
            value={selectedMarcaId}
          />
        </Col>
        <Col span={5}>
          <SelectOpciones
            tipo="grupo"
            filter={selectedMarcaId}
            filter2={selectedLineaId}
            onChange={(e) => {
              setSelectedGrupoId(e);
              filtrarG(e);
            }}
            value={selectedGrupoId}
          />
        </Col>
        <Col span={2}>

              
        <Checkbox onChange={(e)=>filtroGlobal(e)  } checked={filterAll}>Todos</Checkbox>
        </Col>

      </Row>

      <br />
      {productos.length > 0 || isEmpty ? (
        <Table
          locale={{ emptyText: "No hay productos" }}
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          onChange={handleChange}
          pagination={{ defaultPageSize: 20 }}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                console.log(event);

                if (JSON.parse(localStorage.getItem("user")).rol === 2) {
                  if (event.clientX < window.innerWidth * click && rowState) {
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
