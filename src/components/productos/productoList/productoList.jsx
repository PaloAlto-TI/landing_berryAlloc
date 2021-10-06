import React, { useContext, useEffect, useState } from "react";
import { Col, Divider, Row, Spin, Space, Radio, Select } from "antd";
import { Button } from "antd";
import { Table } from "antd";
import { PlusOutlined, SmileOutlined, StopOutlined } from "@ant-design/icons";
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
import { useDispatch, useSelector } from "react-redux";
import {
  getProductos,
  getProductosByLinea,
  getProductosByEstado,
  _softDeleteProducto,
} from "../../../_redux/ducks/producto.duck";
import { SesionContext } from "../../../contexts/sesionContext";

const { Option } = Select;
const ProductoList = (props) => {
  const { setMoved, sesions } = useContext(SesionContext);
  const { lineaV, marcaV, grupoV, visualizador, stocks } = props;
  // console.log("LO QUE ME TRAJO EL VI: " + lineaV + " MARCAV : " + marcaV + " EL GRUPO: " + grupoV + " EL VISUALIZADOR: " + visualizador + " LOS STOCKS: " + stocks)
  // const {
  //   // productos,
  //   setPermiso,
  //   setEditProducto,
  //   isEmpty,
  //   softDeleteProducto,
  //   editProducto,
  //   filterProductos,
  // } = useContext(ProductoContext);
  let { path } = useRouteMatch();
  const [value, setValue] = useState(null);
  // const [valueRadio, setValueRadio] = useState(null);
  const [valueEstado, setValueEstado] = useState(null);
 const productos = useSelector((state) => state.productos.productos);
 const prueba = useSelector((state) => state);

  const producto = useSelector((state) => state.productos.producto);
  
  const loading = useSelector((state) => state.productos.loading);
  const response = useSelector((state) => state.productos.response);
  // const grupos = useSelector((state) => state.stocks.grupos);
  const grupos = useSelector((state) => state.productostocks.grupos); // AGREGADO POR MANUEL CORONEL
  // console.log("LOS GRUPOS DEL STATE EN LISTADO PRODUCTOS: " + JSON.stringify(grupos))
  // const [selectedLineaId, setSelectedLineaId] = useState(
  //   grupos
  //     ? lineaV
  //     : !producto
  //       ? !response
  //         ? "60d4c046e600f1b5e85d075c"
  //         : response.data.fk_linea_id
  //       : producto.fk_linea_id
  // );
  const [selectedLineaId, setSelectedLineaId] = useState(
    grupos
      ? lineaV
      : !producto
        ? !response
          ? null
          : response.data.fk_linea_id
        : producto.fk_linea_id
  );

  const [selectedMarcaId, setSelectedMarcaId] = useState(
    grupos
      ? marcaV
      : !producto
        ? !response
          ? null
          : response.data.fk_marca_id
        : producto.fk_marca_id
  );
  const [selectedGrupoId, setSelectedGrupoId] = useState(
    grupos
      ? grupoV
      : !producto
        ? !response
          ? null
          : response.data.fk_grupo_id
        : producto.fk_grupo_id
  );
  function handleChangeEstado(value) {
    // console.log(value);
    setValueEstado(value);
    
    if (value == 1) {
      alert("LE DIO CLICK A TODOS")
      setSelectedLineaId(null);
      setSelectedMarcaId(null);
      setSelectedGrupoId(null);
      setFilterAll(true);

    } else if (value == 2) {
      setSelectedLineaId("60d4c046e600f1b5e85d075c");
      setFilterAll(false);

    } else if (value == 3) {
      setSelectedLineaId(null);
      setSelectedMarcaId(null);
      setSelectedGrupoId(null);
      setFilterAll(false);
    }
  }

  const onChangeEstado = e => {
    
    console.log('radio checked', e.target.value);
    setValueEstado(e.target.value);

    if (e.target.value == 1) {
      alert("LE DIO CLICK A TODOS")
      setSelectedLineaId(null);
      setSelectedMarcaId(null);
      setSelectedGrupoId(null);
      setFilterAll(true);

    } else if (e.target.value == 2) {
      setSelectedLineaId("60d4c046e600f1b5e85d075c");
      setFilterAll(false);
    } else if (e.target.value == 3) {

      setSelectedLineaId(null);
      setSelectedMarcaId(null);
      setSelectedGrupoId(null);
      setFilterAll(false);
    }


    /*
    const filtroGlobal = (e) => {
    if (e.target.checked) {
      //filterProductos("all");
      setSelectedLineaId(null);
      setSelectedMarcaId(null);
      setSelectedGrupoId(null);
    } else {
      console.log("AQUI!!!!");
      setSelectedLineaId("60d4c046e600f1b5e85d075c");
      //filterProductos("60d4c046e600f1b5e85d075c");
    }

    setFilterAll(e.target.checked);
    setFiltro(null);
  };*/
  };

  const [filtro, setFiltro] = useState(null);
  const [filterAll, setFilterAll] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [rowState, setRowState] = useState(true);
  const [click, setClick] = useState(0.8);

  const [filteredInfo, setFilteredInfo] = useState([]);
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
  };

  // useEffect(() => {
  //   setEditProducto(null);
  //   console.log("LOS PRODUCTOS", productos);
  //   setPermiso(false);
  //   if (!value && !filtro ) {
  //     setDataSource(productos);
  //   }
  // });
  // console.log("state", productos);
  const dispatch = useDispatch();

  // useEffect(() => { -- COMENTADO FUNCIONAL
  //   //dispatch(getProducto('005-004-001-001'));
  //   //dispatch(getProductosByLinea('60d4c0476e8514b5e8c66fd5'));
  //   console.log(" QUIERE HACER DISPATCH")
  //   dispatch(
  //     selectedLineaId ? getProductosByLinea(selectedLineaId) : getProductos()
  //   );
  // }, [dispatch, selectedLineaId]);

 useEffect(() => {
  //dispatch(getProducto('005-004-001-001'));
  //dispatch(getProductosByLinea('60d4c0476e8514b5e8c66fd5'));
  
  console.log(" QUIERE HACER DISPATCH de productos por estado: ", valueEstado)
  dispatch(
    valueEstado ? getProductosByEstado(valueEstado) : getProductos()
  );

  console.log(" VA EL OTRO DISPACTH ")
  dispatch(getProductosByEstado(2))


  console.log("DISPACTH DE PRODUCTOS: ", prueba)
}, [dispatch, valueEstado]);

  // getProductosByEstado

  useEffect(() => {
    //dispatch(getProducto('005-004-001-001'));
    //dispatch(getProductosByLinea('60d4c0476e8514b5e8c66fd5'));
    //  console.log("el filtro", filtro)
    // if (productos && producto){

    //   if (selectedMarcaId){

    //       filtrarM(selectedMarcaId)
    //   }

    //   if (selectedGrupoId){

    //       filtrarG(selectedGrupoId);
    //   }
    // }

    // if (!value && !filtro) {
    if (valueEstado && !value && !filtro) {
      // console.log("ENTRA AL !VALUE !FILTRO CON : ", JSON.stringify(productos))
      // setDataSource(null);
      setDataSource(productos);
    } else {
      console.log("ENTRA EN ELSEEEEEEEEEEEEEEEEE")
      setDataSource(null);
    }
  });

  useEffect(() => {
    // filtrarG(producto.fk_grupo_id)
    // console.log("VA A ENTRAR A SETEAR TODO LOS PRODUCTOS, ", JSON.stringify(productos))
    setDataSource(productos);

    if (productos) {
      if (selectedMarcaId) {
        filtrarM(selectedMarcaId);
      }

      if (selectedGrupoId) {
        filtrarG(selectedGrupoId);
      }
    }
  }, [productos]);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const columns =
    sesions && sesions._usuario[0].rol === 2
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
          width: "15%",
          align: "center",
        },
        {
          title: "PRODUCTO",
          dataIndex: "nombre",
          key: "nombre",
          sorter: {
            compare: (a, b) => a.nombre.localeCompare(b.nombre),
          },
          showSorterTooltip: false,
          width: "30%",
          align: "center",
        },
        {
          title: "UND. MED.",
          dataIndex: "unidad_medida_abreviatura",
          key: "unidad_medida_abreviatura",
          sorter: {
            compare: (a, b) => a.nombre.localeCompare(b.nombre),
          },
          showSorterTooltip: false,
          width: "10%",
          align: "center",
        },
        // {
        //   title: "COSTO",
        //   dataIndex: "costo",
        //   key: "costo",
        //   sorter: {
        //     compare: (a, b) => a.nombre.localeCompare(b.nombre),
        //   },
        //   showSorterTooltip: false,
        //   width: "5%",
        //   align: "center",
        //   render: (text, record) =>
        //     record.costo && (
        //       <p>
        //         {"$" + text}
        //       </p>
        //     ),
        // },
        {
          title: "PRECIO",
          dataIndex: "precio",
          key: "precio",
          sorter: {
            compare: (a, b) => a.precio - b.precio,
          },
          align: "center",
          width: "10%",
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
          title: "DESC. 1",
          dataIndex: "limite_descuento1",
          key: "limite_descuento1",
          sorter: {
            compare: (a, b) => a.precio - b.precio,
          },
          align: "center",
          width: "10%",
          showSorterTooltip: false,
          filters: [
            { text: "0%", value: "0" },
            { text: "5%", value: "5" },
            { text: "10%", value: "10" },
            { text: "40%", value: "40" },
            { text: "50%", value: "50" },
          ],
          filteredValue: filteredInfo.limite_descuento1 || null,
          onFilter: (value, record) => record.limite_descuento1 === value,
          render: (text, record) => (
            <p
            // onClick={() => {
            //   record["permiso"] = false;
            //   history.push(`${path}/${record.codigo_interno}/ver`, record);
            // }}
            >
              {text + "%"}
            </p>
          ),
        },

        {
          title: "DESC. 2",
          dataIndex: "limite_descuento2",
          key: "limite_descuento2",
          sorter: {
            compare: (a, b) => a.precio - b.precio,
          },
          align: "center",
          width: "10%",
          filters: [
            { text: "0%", value: "0" },
            { text: "5%", value: "5" },
            { text: "10%", value: "10" },
            { text: "15%", value: "15" },
          ],
          filteredValue: filteredInfo.limite_descuento2 || null,
          onFilter: (value, record) => record.limite_descuento2 === value,
          showSorterTooltip: false,
          render: (text, record) => (
            <p
            // onClick={() => {
            //   record["permiso"] = false;
            //   history.push(`${path}/${record.codigo_interno}/ver`, record);
            // }}
            >
              {text + "%"}
            </p>
          ),
        },

        {
          title: "DESC. 3",
          dataIndex: "limite_descuento3",
          key: "limite_descuento3",
          sorter: {
            compare: (a, b) => a.precio - b.precio,
          },
          align: "center",
          width: "10%",
          showSorterTooltip: false,
          filters: [
            { text: "0%", value: "0" },
            { text: "5%", value: "5" },
            { text: "15%", value: "15" },
            { text: "18%", value: "18" },
            { text: "20%", value: "20" },
            { text: "25%", value: "25" },
            { text: "35%", value: "35" },
          ],
          filteredValue: filteredInfo.limite_descuento3 || null,
          onFilter: (value, record) => record.limite_descuento3 === value,
          render: (text, record) => (
            <p
            // onClick={() => {
            //   record["permiso"] = false;
            //   history.push(`${path}/${record.codigo_interno}/ver`, record);
            // }}
            >
              {text + "%"}
            </p>
          ),
        },

        {
          title: "STOCK",
          dataIndex: "",
          key: "y",
          render: (_, record) => <QueryButton record={record} />,
          align: "center",
          width: "5%",
        },

        {
          title: "ACCIONES",
          dataIndex: "",
          key: "x",
          align: "center",
          render: (_, record) =>
            record.url_pagina_web || !visualizador ? (
              <CrudButton
                record={record}
                softDelete={_softDeleteProducto}
                setRowState={setRowState}
                permiso={sesions && sesions._usuario[0].rol === 2}
                visualizador={visualizador}
              />
            ) : (
              <StopOutlined style={{ fontSize: 18, marginLeft: "2vw" }} />
            ),
          width: "5%",
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
          width: "16%",
        },
        {
          title: "PRODUCTO",
          dataIndex: "nombre",
          key: "nombre",
          sorter: {
            compare: (a, b) => a.nombre.localeCompare(b.nombre),
          },
          showSorterTooltip: false,
          width: "34%",

          // render:(text)=><Link to='/inicio'>{text}</Link>
        },
        {
          title: "UNIDAD MEDIDA",
          dataIndex: "unidad_medida_abreviatura",
          key: "unidad_medida_abreviatura",
          sorter: {
            compare: (a, b) => a.nombre.localeCompare(b.nombre),
          },
          showSorterTooltip: false,
          width: "5%",
          align: "center",

          // render:(text)=><Link to='/inicio'>{text}</Link>
        },
        {
          title: "COSTO",
          dataIndex: "costo",
          key: "costo",
          sorter: {
            compare: (a, b) => a.nombre.localeCompare(b.nombre),
          },
          showSorterTooltip: false,
          width: "5%",
          align: "center",
          render: (text, record) =>
            record.costo && (
              <p
              // onClick={() => {
              //   record["permiso"] = false;
              //   history.push(`${path}/${record.codigo_interno}/ver`, record);
              // }}
              >
                {"$" + text}
              </p>
            ),
          // render:(text)=><Link to='/inicio'>{text}</Link>
        },
        {
          title: "PRECIO",
          dataIndex: "precio",
          key: "precio",
          sorter: {
            compare: (a, b) => a.precio - b.precio,
          },
          align: "center",
          width: "5%",
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
          title: "ESPECIALISTA",
          dataIndex: "limite_descuento1",
          key: "limite_descuento1",
          sorter: {
            compare: (a, b) => a.precio - b.precio,
          },
          align: "center",
          width: "5%",
          showSorterTooltip: false,
          filters: [
            { text: "0%", value: "0" },
            { text: "5%", value: "5" },
            { text: "10%", value: "10" },
            { text: "40%", value: "40" },
            { text: "50%", value: "50" },
          ],
          filteredValue: filteredInfo.limite_descuento1 || null,
          onFilter: (value, record) => record.limite_descuento1 === value,
          render: (text, record) => (
            <p
            // onClick={() => {
            //   record["permiso"] = false;
            //   history.push(`${path}/${record.codigo_interno}/ver`, record);
            // }}
            >
              {text + "%"}
            </p>
          ),
        },

        {
          title: "LÍDER RETAIL",
          dataIndex: "limite_descuento2",
          key: "limite_descuento2",
          sorter: {
            compare: (a, b) => a.precio - b.precio,
          },
          align: "center",
          width: "5%",
          filters: [
            { text: "0%", value: "0" },
            { text: "5%", value: "5" },
            { text: "10%", value: "10" },
            { text: "15%", value: "15" },
          ],
          filteredValue: filteredInfo.limite_descuento2 || null,
          onFilter: (value, record) => record.limite_descuento2 === value,
          showSorterTooltip: false,
          render: (text, record) => (
            <p
            // onClick={() => {
            //   record["permiso"] = false;
            //   history.push(`${path}/${record.codigo_interno}/ver`, record);
            // }}
            >
              {text + "%"}
            </p>
          ),
        },

        {
          title: "LÍDER PROYECTOS",
          dataIndex: "limite_descuento3",
          key: "limite_descuento3",
          sorter: {
            compare: (a, b) => a.precio - b.precio,
          },
          align: "center",
          width: "5%",
          showSorterTooltip: false,
          filters: [
            { text: "0%", value: "0" },
            { text: "5%", value: "5" },
            { text: "15%", value: "15" },
            { text: "18%", value: "18" },
            { text: "20%", value: "20" },
            { text: "25%", value: "25" },
            { text: "35%", value: "35" },
          ],
          filteredValue: filteredInfo.limite_descuento3 || null,
          onFilter: (value, record) => record.limite_descuento3 === value,
          render: (text, record) => (
            <p
            // onClick={() => {
            //   record["permiso"] = false;
            //   history.push(`${path}/${record.codigo_interno}/ver`, record);
            // }}
            >
              {text + "%"}
            </p>
          ),
        },

        {
          title: "STOCK GENERAL",
          dataIndex: "",
          key: "y",
          render: (_, record) => (
            <QueryButton record={record} setClick={setClick} />
          ),
          align: "center",
          width: "5%",
        },

        {
          title: "ACCIONES",
          dataIndex: "",
          key: "x",
          align: "center",
          render: (_, record) =>
            record.url_pagina_web ? (
              <CrudButton
                record={record}
                softDelete={_softDeleteProducto}
                setRowState={setRowState}
                permiso={sesions && sesions._usuario[0].rol === 2}
                visualizador={visualizador}
              />
            ) : (
              <StopOutlined style={{ fontSize: 18, marginLeft: "2vw" }} />
            ),
          width: "5%",
        },
      ];

  let history = useHistory();

  function handleClick() {
    //filterProductos("60d4c046e600f1b5e85d075c");
    //setPermiso(true);
    let record = {
      permiso: true,
      nuevo: true,
    };

    history.push(`${path}/nuevo/`, record);
  }

  function ver(record) {
    //filterProductos(record.fk_linea_id);
    record["permiso"] = false;
    history.push(`${path}/${record.codigo_interno}/ver`, record);
  }

  const filtrarB = (e) => {
    const currValue = e.target.value;
    setValue(currValue);
    const filteredData = productos.filter(
      (entry) =>
        (entry.codigo_interno.toLowerCase().includes(currValue.toLowerCase()) ||
          entry.nombre.toLowerCase().includes(currValue.toLowerCase()) ||
          entry.unidad_medida_abreviatura
            .toLowerCase()
            .includes(currValue.toLowerCase()) ||
          entry.precio.toString().includes(currValue)) &&
        (selectedMarcaId ? entry.fk_marca_id === selectedMarcaId : true) &&
        (selectedGrupoId ? entry.fk_grupo_id === selectedGrupoId : true)
    );

    setDataSource(filteredData);
  };

  const filtrarE = (e) => {
    alert("VA A FILTRAR X ESTADOS: " + e)
    setFiltro(e);

    const filteredData = productos.filter((entry) => entry.fk_marca_id === e);

    console.log("FILTRADOS X MARCA", filteredData);

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

  const filtroGlobal = (e) => {
    if (e.target.checked) {
      //filterProductos("all");
      setSelectedLineaId(null);
      setSelectedMarcaId(null);
      setSelectedGrupoId(null);
    } else {
      console.log("AQUI!!!!");
      setSelectedLineaId("60d4c046e600f1b5e85d075c");
      //filterProductos("60d4c046e600f1b5e85d075c");
    }

    setFilterAll(e.target.checked);
    setFiltro(null);
  };

  //---------------------------------------------------------------------

  //-----------------------------------------------------------------------

  return (
    <div>
      <br />
      <Divider>PRODUCTOS</Divider>
      <Divider className="titleFont">{"EL TODODS- ACT -DESC: " + valueEstado}</Divider>
      <Divider className="titleFont">{"EL VALUE: " + value + " EL VALUE ESTADO: " + valueEstado +  "  EL FILTRO: " + filtro}</Divider>
      {/* <Divider className="titleFont">{"RESPONSE: " + response}</Divider> */}
      {/* <Space ><Search
        placeholder="Buscar producto..."
        value={value}
        onChange={(e) => filtrarB(e)}
        style={{ width: 200 }}
      /></Space> */}
      {/* <Divider className="titleFont">{"EL visualizador: " + visualizador}</Divider> */}
      {/* const { lineaV, marcaV, grupoV, visualizador, stocks } = props; */}
      {/* <Divider className="titleFont">{"EL LINEAV: " + lineaV}</Divider>
      <Divider className="titleFont">{"EL MARCAV: " + marcaV}</Divider>
      <Divider className="titleFont">{"EL GRUPOV: " + grupoV}</Divider>*/}
      {/* <Divider className="titleFont">{"LOS PRODUCTOS: " + JSON.stringify(productos)}</Divider> */}
      <Divider className="titleFont">{"SELECTED LINEA ID: " + selectedLineaId}</Divider> 
      <Divider className="titleFont">{"SELECTED MARCA ID: " + selectedMarcaId}</Divider> 
      <Divider className="titleFont">{"SELECTED GRUPO ID: " + selectedGrupoId}</Divider> 
      <br />
      <Row>
        {visualizador ? (
          <Col span={1}></Col>
        ) : (
          <Col span={2}>
            <Button
              type="primary"
              className="success"
              icon={<PlusOutlined />}
              onClick={() => handleClick()}
              disabled={sesions && sesions._usuario[0].rol === 2 ? false : true}
            >
              Nuevo
            </Button>
          </Col>
        )}
        {/* <Col span={2}> */}
          {/* <Radio.Group options={plainOptions} onChange={this.onChange1} value = { value1 } /> */}
          {/* {/* < Radio.Group onChange={onChangeRadio} value={valueRadio}> */}
            {/*<Radio className="containerRadio" value={1}>TODOS</Radio>
            <Radio className="containerRadio" value={2}>ACTIVOS</Radio>
            <Radio className="containerRadio" value={3}>DESCONTINUADOS</Radio>
          </Radio.Group>
        </Col> */}
        <Col span={4}>
          <Select
            showSearch
            style={{ width: 180 }}
            placeholder="Seleccione Estado"
            // onChange={handleChangeEstado}
            onChange={(e) => {
              // dispatch(getProductosByLinea(e));
              setValueEstado(e);
              setSelectedLineaId(null);
              setSelectedMarcaId(null);
              setSelectedGrupoId(null);
              setFiltro(null);
              setValue(null);
              setFilterAll(false);
            }}
          >
            <Option value={3}>TODOS</Option>
            <Option value={1}>ACTIVOS</Option>
            <Option value={2}>DESCONTINUADOS</Option>
          </Select>
        </Col>
        {/* <Col span={2}>
          <Checkbox onChange={(e) => filtroGlobal(e)} checked={filterAll}>
            Todos
          </Checkbox>
        </Col> */}
        <Col span={5}>
          <SelectOpciones
            tipo="línea"
            onChange={(e) => {
              dispatch(getProductosByLinea(e));
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
        <Col span={4}>
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
        <Col span={5}>
          <Search
            placeholder="Buscar producto..."
            value={value}
            onChange={(e) => filtrarB(e)}
            style={{ width: 200 }}
          />
        </Col>
        
        {/* <Col span={2}>
          <Checkbox onChange={(e) => filtroGlobal(e)} checked={filterAll}>
            Todos
          </Checkbox>
        </Col> */}
      </Row>

      <br />
      {!loading ? (
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

                if (
                  event.clientX < window.innerWidth * click &&
                  rowState &&
                  !stocks
                ) {
                  // record["permiso"] = false;
                  // history.push(`${path}/${record.codigo_interno}/ver`, record);
                  ver(record);
                }
              },
            };
          }}
        />
      ) : (
        <Spin indicator={antIcon} className="loading" />
      )}
      {/* {JSON.stringify(productos)}  */}
    </div>
  );
};

export default ProductoList;
