import React, { useContext, useEffect, useState } from "react";
import { Col, Divider, Row, Spin, Space, Radio, Select } from "antd";
import { Button } from "antd";
import { Table } from "antd";
import { FilterFilled, PlusOutlined, SmileOutlined, StopOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import { ProductoContext } from "../../../contexts/productoContext";
import CrudButton from "../../crudButton/crudButton";
import { useHistory } from "react-router";
import { useRouteMatch } from "react-router-dom";
import Search from "antd/lib/input/Search";
import "./productoList.css";
// import SelectOpciones from "../../selectOpciones/selectOpciones";
// import Checkbox from "antd/lib/checkbox/Checkbox";
import QueryButton from "./queryButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductos,
  getProductosByLinea,
  getProductosByEstado,
  _softDeleteProducto,
} from "../../../_redux/ducks/producto.duck";
import { useLocation } from 'react-router-dom';
import { SesionContext } from "../../../contexts/sesionContext";

const { Option } = Select;
const ProductoList = (props) => {
  const location = useLocation();
  const { setMoved, sesions } = useContext(SesionContext);
  const { lineaV, marcaV, grupoV, visualizador, stocks } = props;
  const praps = props;
  // //console.log("LO QUE ME TRAJO EL VI: " + lineaV + " MARCAV : " + marcaV + " EL GRUPO: " + grupoV + " EL VISUALIZADOR: " + visualizador + " LOS STOCKS: " + stocks)
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

  const productos = useSelector((state) => state.productos.productos);
  const productos_estado = useSelector((state) => state.productos.productos_estado);
  const producto = useSelector((state) => state.productos.producto);
  const prueba = useSelector((state) => state);

  const [lineasDropdown, setlineasDropdown] = useState(null);
  const [marcasDropdown, setmarcasDropdown] = useState(null);
  const [gruposDropdown, setgruposDropdown] = useState(null);
  const [subgrupoDropdown, setsubgrupoDropdown] = useState(null);
  const [metodoabcDropdown, setmetodoabcDropdown] = useState(null);
  const [inventarioDropdown, setinventarioDropdown] = useState(null);
  const [stop, setstop] = useState(null);
  // const [valueEstado, setValueEstado] = useState(null);

  const loading = useSelector((state) => state.productos.loading);
  const response = useSelector((state) => state.productos.response);
  const grupos = null; // AGREGADO POR MANUEL CORONEL
  const [selectedSubgrupoId, setSelectedSubgrupoId] = useState();
  const [selectedInventarioId, setSelectedInventarioId] = useState();
  const [selectedMetodoabcId, setMetodoabcId] = useState();

  const [valueEstado, setValueEstado] = useState(
    grupos
      ? lineaV
      : !producto
        ? !response
          ? null
          : 0
        : location.state ? location.state.estadoProd : null


  );
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

  const strForSearch = (str) => {
    return str
      ? str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
      : str;
  };

  const [dataSource, setDataSource] = useState([]);
  const [rowState, setRowState] = useState(true);
  const [click, setClick] = useState(0.8);
  const [filteredInfo, setFilteredInfo] = useState([]);
  const handleChange = (pagination, filters, sorter) => {
    //console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
  };

  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getProductosByEstado(""));
  }, []);

  useEffect(async () => {
    if (productos_estado  ) {
      console.log("ERRORRR<<<<<<<<<<<<<<<<<")
      setstop(1);
      console.log("Ya cargo.....");
      // setsubgrupoDropdown

      setsubgrupoDropdown([... new Set(productos_estado.sort(function (a, b) {
        if (a.subgrupo.toLowerCase() < b.subgrupo.toLowerCase()) return -1;
        if (a.subgrupo.toLowerCase() > b.subgrupo.toLowerCase()) return 1;
        return 0;
      }).map(function (item) {
        //console.log("data en item<<<<: ",item);
        const rObj = {};
        rObj.id = item.fk_subgrupo_id;
        rObj.nombre = item.subgrupo;
        return rObj;
      }).map(JSON.stringify))].map(JSON.parse))

      console.log("dropdown subgrupos (USE EFFECT): ", subgrupoDropdown);


      setinventarioDropdown([... new Set(productos_estado.sort(function (a, b) {
        if (a.tipo_inventario.toLowerCase() < b.tipo_inventario.toLowerCase()) return -1;
        if (a.tipo_inventario.toLowerCase() > b.tipo_inventario.toLowerCase()) return 1;
        return 0;
      }).map(function (item) {
        //console.log("data en item<<<<: ",item);
        const rObj = {};
        rObj.id = item.fk_tipo_inventario_id;
        rObj.nombre = item.tipo_inventario;
        return rObj;
      }).map(JSON.stringify))].map(JSON.parse))
      console.log("dropdown inventario: ", inventarioDropdown);

      setmetodoabcDropdown([... new Set(productos_estado.sort(function (a, b) {
        if (a.metodo_abc.toLowerCase() < b.metodo_abc.toLowerCase()) return -1;
        if (a.metodo_abc.toLowerCase() > b.metodo_abc.toLowerCase()) return 1;
        return 0;
      }).map(function (item) {
        //console.log("data en item<<<<: ",item);
        const rObj = {};
        rObj.id = item.fk_metodo_abc_id;
        rObj.nombre = item.metodo_abc;
        return rObj;
      }).map(JSON.stringify))].map(JSON.parse))
      console.log("dropdown metodo_abc: ", metodoabcDropdown);



    }
  }, [productos_estado]);

  useEffect(() => {
    if (valueEstado !== null) {
      console.log("ERRORRR<<<<<<<<<<<<<<<<<")
      filtrarE(valueEstado);
      //console.log("PRODUCTOS: ",productos_estado);
      if (selectedLineaId) {
        filtrarL(selectedLineaId);
        //console.log("filtrar L: ",selectedLineaId);
      }
      if (selectedMarcaId) {
        filtrarM(selectedMarcaId);
        //console.log("filtrar L: ",selectedMarcaId);
      }
      if (selectedGrupoId) {
        filtrarG(selectedGrupoId);
        //console.log("filtrar G: ",selectedGrupoId);
      }
    }
    else {
      setSelectedLineaId(null);
      setSelectedMarcaId(null);
      setSelectedGrupoId(null);
    }
  }, [valueEstado, dispatch, selectedSubgrupoId,selectedInventarioId]);

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
            <p>{"$" + text}</p>
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
            <p>
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
        },
        {
          title: "UND. MED.",
          dataIndex: "unidad_medida_abreviatura",
          key: "unidad_medida_abreviatura",
          sorter: {
            compare: (a, b) => a.nombre.localeCompare(b.nombre),
          },
          showSorterTooltip: false,
          width: "5%",
          align: "center",
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
          title: "DESC. 1",
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
          title: "DESC. 2",
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
          title: "DESC. 3",
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
          title: "STOCK",
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
    let record = {
      permiso: true,
      nuevo: true,
    };

    history.push(`${path}/nuevo/`, record);
  }
  const recordParams = { // OBSERVACIÓN: 17/08/2021 ESTA VARIABLE SE DEBE TRAER POR PROPS, PERO COMO EL COMPONENTE QUE LA TRAE USAN TODAS LAS RAMAS QUEDA AL PENDIENTE EL CAMBIO -MC
    isVisualizador: visualizador,
    incomingPath: location.pathname,
    estadoProd: valueEstado

  };
  function ver(record) {
    //filterProductos(record.fk_linea_id);
    // record.recordParams=typeTransactionData;
    record["permiso"] = false;
    //history.push(`${path}/${record.codigo_interno}/ver`, record);
    history.push({
      pathname: `${path}/${record.codigo_interno}/ver`,

      recordParams
    }
    );
    // console.log("ver path1: ",`${path}/`);
    // console.log("ver path2: ",location.pathname);
    //console.log("ver record: ",record);
  }

  const filtrarB = (e) => {

    const currValue = e.target.value;
    setValue(currValue);

    if (valueEstado !== null) {
      if (valueEstado === 0) {
        const filteredData = productos_estado.filter(
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
      } else {

        const filteredData = productos_estado.filter(
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
      }
    }
  };
  const filtrarE = async (e) => {





    const filteredData = productos_estado.filter((entry) => (e === 0 ? productos_estado : entry.estado === e) && (selectedSubgrupoId === 0 || !selectedSubgrupoId ? productos_estado : entry.fk_subgrupo_id === selectedSubgrupoId)&& (selectedInventarioId === 0 || !selectedInventarioId? productos_estado : entry.fk_tipo_inventario_id === selectedInventarioId));
    console.log("FILTRADOS X ESTADO: ", filteredData);
    //console.log("productos estado: ", productos_estado);


    setDataSource(filteredData);

    setlineasDropdown([... new Set(filteredData.sort(function (a, b) {
      if (a.linea.toLowerCase() < b.linea.toLowerCase()) return -1;
      if (a.linea.toLowerCase() > b.linea.toLowerCase()) return 1;
      return 0;
    }).map(function (item) {
      const rObj = {};
      rObj.id = item.fk_linea_id;
      rObj.nombre = item.linea;
      return rObj;
    }).map(JSON.stringify))].map(JSON.parse))

    filtrarSub(selectedSubgrupoId,1);


    filtrarInventario(selectedInventarioId, 1);




  }
  const filtrarL = (e) => {
    let filteredData = productos_estado.filter((entry) => (valueEstado === 0 ? productos_estado : entry.estado === valueEstado) && (e === 0 ? productos_estado : entry.fk_linea_id === e) && (selectedSubgrupoId === 0 || !selectedSubgrupoId ? productos_estado : entry.fk_subgrupo_id === selectedSubgrupoId)&& (selectedInventarioId === 0 || !selectedInventarioId? productos_estado : entry.fk_tipo_inventario_id === selectedInventarioId));
    // console.log("FILTRADOS X LINEA: ", filteredData);
    setDataSource(filteredData);
    setmarcasDropdown([... new Set(filteredData.sort(function (a, b) {
      if (a.marca.toLowerCase() < b.marca.toLowerCase()) return -1;
      if (a.marca.toLowerCase() > b.marca.toLowerCase()) return 1;
      return 0;
    }).map(function (item) {
      const rObj = {};
      rObj.id = item.fk_marca_id;
      rObj.nombre = item.marca;
      return rObj;
    }).map(JSON.stringify))].map(JSON.parse))


    filtrarSub(selectedSubgrupoId,1);


    filtrarInventario(selectedInventarioId, 1);

    // //dropdown tipo


    // const filteredData1 = productos_estado.filter((entry) => (valueEstado === 0 ? productos_estado : entry.estado === valueEstado) && (e === 0 ? productos_estado : entry.fk_linea_id === e));

    // setsubgrupoDropdown([... new Set(filteredData1.sort(function (a, b) {
    //   if (a.subgrupo.toLowerCase() < b.subgrupo.toLowerCase()) return -1;
    //   if (a.subgrupo.toLowerCase() > b.subgrupo.toLowerCase()) return 1;
    //   return 0;
    // }).map(function (item) {
    //   const rObj = {};
    //   rObj.id = item.fk_subgrupo_id;
    //   rObj.nombre = item.subgrupo;
    //   return rObj;
    // }).map(JSON.stringify))].map(JSON.parse))

    // //---------------------------------------------------------------------------------


  };

  const filtrarM = (e) => {
    let filteredData = productos_estado.filter((entry) => (valueEstado === 0 ? productos_estado : entry.estado === valueEstado) && (selectedLineaId === 0 ? productos_estado : entry.fk_linea_id === selectedLineaId) && (e === 0 ? productos_estado : entry.fk_marca_id === e) && (selectedSubgrupoId === 0 || !selectedSubgrupoId ? productos_estado : entry.fk_subgrupo_id === selectedSubgrupoId)&& (selectedInventarioId === 0 || !selectedInventarioId? productos_estado : entry.fk_tipo_inventario_id === selectedInventarioId));
    // console.log("FILTRADOS X MARCA: ", filteredData);
    setDataSource(filteredData);

    setgruposDropdown([... new Set(filteredData.sort(function (a, b) {
      if (a.grupo.toLowerCase() < b.grupo.toLowerCase()) return -1;
      if (a.grupo.toLowerCase() > b.grupo.toLowerCase()) return 1;
      return 0;
    }).map(function (item) {
      const rObj = {};
      rObj.id = item.fk_grupo_id;
      rObj.nombre = item.grupo;
      return rObj;
    }).map(JSON.stringify))].map(JSON.parse))

    filtrarSub(selectedSubgrupoId,1);


    filtrarInventario(selectedInventarioId, 1);

    // //dropdown tipo


    // const filteredData1 = productos_estado.filter((entry) => (valueEstado === 0 ? productos_estado : entry.estado === valueEstado) && (selectedLineaId === 0 ? productos_estado : entry.fk_linea_id === selectedLineaId) && (e === 0 ? productos_estado : entry.fk_marca_id === e));

    // setsubgrupoDropdown([... new Set(filteredData1.sort(function (a, b) {
    //   if (a.subgrupo.toLowerCase() < b.subgrupo.toLowerCase()) return -1;
    //   if (a.subgrupo.toLowerCase() > b.subgrupo.toLowerCase()) return 1;
    //   return 0;
    // }).map(function (item) {
    //   const rObj = {};
    //   rObj.id = item.fk_subgrupo_id;
    //   rObj.nombre = item.subgrupo;
    //   return rObj;
    // }).map(JSON.stringify))].map(JSON.parse))

    // //---------------------------------------------------------------------------------

  };

  const filtrarG = (e) => {
    const filteredData = productos_estado.filter((entry) => (valueEstado === 0 ? productos_estado : entry.estado === valueEstado) && (selectedLineaId === 0 ? productos_estado : entry.fk_linea_id === selectedLineaId) && (selectedMarcaId === 0 ? productos_estado : entry.fk_marca_id === selectedMarcaId) && (e === 0 ? productos_estado : entry.fk_grupo_id === e) && (selectedSubgrupoId === 0 || !selectedSubgrupoId ? productos_estado : entry.fk_subgrupo_id === selectedSubgrupoId)&& (selectedInventarioId === 0 || !selectedInventarioId? productos_estado : entry.fk_tipo_inventario_id === selectedInventarioId));
    //console.log("FILTRADOS X GRUPO", filteredData);
    // console.log("productos en GRUPO: ", filteredData);
    setDataSource(filteredData);

    //dropdown tipo
    filtrarSub(selectedSubgrupoId,1);


    filtrarInventario(selectedInventarioId, 1);

    // const filteredData1 = productos_estado.filter((entry) => (valueEstado === 0 ? productos_estado : entry.estado === valueEstado) && (selectedLineaId === 0 ? productos_estado : entry.fk_linea_id === selectedLineaId) && (selectedMarcaId === 0 ? productos_estado : entry.fk_marca_id === selectedMarcaId) && (e === 0 ? productos_estado : entry.fk_grupo_id === e));

    // setsubgrupoDropdown([... new Set(filteredData1.sort(function (a, b) {
    //   if (a.subgrupo.toLowerCase() < b.subgrupo.toLowerCase()) return -1;
    //   if (a.subgrupo.toLowerCase() > b.subgrupo.toLowerCase()) return 1;
    //   return 0;
    // }).map(function (item) {
    //   const rObj = {};
    //   rObj.id = item.fk_subgrupo_id;
    //   rObj.nombre = item.subgrupo;
    //   return rObj;
    // }).map(JSON.stringify))].map(JSON.parse))

    // //---------------------------------------------------------------------------------
  };

  const filtrarSub = (e,flag) => {
    console.log("este es el id de subgrupo: ", e)
    const filteredData = productos_estado.filter((entry) => (valueEstado === 0 || !valueEstado ? productos_estado : entry.estado === valueEstado) && (selectedLineaId === 0 || !selectedLineaId ? productos_estado : entry.fk_linea_id === selectedLineaId) && (selectedMarcaId === 0 || !selectedMarcaId ? productos_estado : entry.fk_marca_id === selectedMarcaId) && (selectedGrupoId === 0 || !selectedGrupoId ? productos_estado : entry.fk_grupo_id === selectedGrupoId) && (e === 0 || !e ? productos_estado : entry.fk_subgrupo_id === e) && (selectedInventarioId === 0 || !selectedInventarioId ? productos_estado : entry.fk_tipo_inventario_id === selectedInventarioId));
    console.log("SUBGRUPO DATA: ", filteredData)


    if (flag === 0) {

      setDataSource(filteredData);
      console.log("INVENTARIO DATA: ", filteredData)
    }

    //dropdown tipo
    const filteredData1 = productos_estado.filter((entry) => (valueEstado === 0 || !valueEstado ? productos_estado : entry.estado === valueEstado) && (selectedLineaId === 0 || !selectedLineaId ? productos_estado : entry.fk_linea_id === selectedLineaId) && (selectedMarcaId === 0 || !selectedMarcaId ? productos_estado : entry.fk_marca_id === selectedMarcaId) && (selectedGrupoId === 0 || !selectedGrupoId ? productos_estado : entry.fk_grupo_id === selectedGrupoId) && (selectedInventarioId === 0 || !selectedInventarioId? productos_estado : entry.fk_tipo_inventario_id === selectedInventarioId));


    setsubgrupoDropdown([... new Set(filteredData1.sort(function (a, b) {
      if (a.subgrupo.toLowerCase() < b.subgrupo.toLowerCase()) return -1;
      if (a.subgrupo.toLowerCase() > b.subgrupo.toLowerCase()) return 1;
      return 0;
    }).map(function (item) {
      const rObj = {};
      rObj.id = item.fk_subgrupo_id;
      rObj.nombre = item.subgrupo;
      return rObj;
    }).map(JSON.stringify))].map(JSON.parse))

    console.log("dropdown subgrupos (ESTADO): ", subgrupoDropdown);

    //---------------------------------------------------------------------------------
    
    //dropdown Inventario
    const filteredData2 = productos_estado.filter((entry) => (valueEstado === 0 || !valueEstado ? productos_estado : entry.estado === valueEstado) && (selectedLineaId === 0 || !selectedLineaId ? productos_estado : entry.fk_linea_id === selectedLineaId) && (selectedMarcaId === 0 || !selectedMarcaId ? productos_estado : entry.fk_marca_id === selectedMarcaId) && (selectedGrupoId === 0 || !selectedGrupoId ? productos_estado : entry.fk_grupo_id === selectedGrupoId) && (e === 0 || !e ? productos_estado : entry.fk_subgrupo_id === e));


    setinventarioDropdown([... new Set(filteredData2.sort(function (a, b) {
      if (a.tipo_inventario.toLowerCase() < b.tipo_inventario.toLowerCase()) return -1;
      if (a.tipo_inventario.toLowerCase() > b.tipo_inventario.toLowerCase()) return 1;
      return 0;
    }).map(function (item) {
      //console.log("data en item<<<<: ",item);
      const rObj = {};
      rObj.id = item.fk_tipo_inventario_id;
      rObj.nombre = item.tipo_inventario;
      return rObj;
    }).map(JSON.stringify))].map(JSON.parse))
    console.log("dropdown inventario: ", inventarioDropdown);

    //---------------------------------------------------------------------------------


  }

  const filtrarInventario = (e, flag) => {
    console.log("este es el id de inventario: ", e)
    const filteredData = productos_estado.filter((entry) => (valueEstado === 0 || !valueEstado ? productos_estado : entry.estado === valueEstado) && (selectedLineaId === 0 || !selectedLineaId ? productos_estado : entry.fk_linea_id === selectedLineaId) && (selectedMarcaId === 0 || !selectedMarcaId ? productos_estado : entry.fk_marca_id === selectedMarcaId) && (selectedGrupoId === 0 || !selectedGrupoId ? productos_estado : entry.fk_grupo_id === selectedGrupoId) && (selectedSubgrupoId === 0 || !selectedSubgrupoId ? productos_estado : entry.fk_subgrupo_id === selectedSubgrupoId) && (e === 0 || !e  ? productos_estado : entry.fk_tipo_inventario_id === e));
    console.log("estos son los datos filtrados: ",filteredData)

    console.log("flag inventario: ",flag)
    if (flag === 0) {

      setDataSource(filteredData);
      console.log("INVENTARIO DATA: ", filteredData)
    }

    //dropdown INVENTARIO
    const filteredData1 = productos_estado.filter((entry) => (valueEstado === 0 || !valueEstado ? productos_estado : entry.estado === valueEstado) && (selectedLineaId === 0 || !selectedLineaId ? productos_estado : entry.fk_linea_id === selectedLineaId) && (selectedMarcaId === 0 || !selectedMarcaId ? productos_estado : entry.fk_marca_id === selectedMarcaId) && (selectedGrupoId === 0 || !selectedGrupoId ? productos_estado : entry.fk_grupo_id === selectedGrupoId) && (selectedSubgrupoId === 0 || !selectedSubgrupoId ? productos_estado : entry.fk_subgrupo_id === selectedSubgrupoId));


    setinventarioDropdown([... new Set(filteredData1.sort(function (a, b) {
      if (a.tipo_inventario.toLowerCase() < b.tipo_inventario.toLowerCase()) return -1;
      if (a.tipo_inventario.toLowerCase() > b.tipo_inventario.toLowerCase()) return 1;
      return 0;
    }).map(function (item) {
      //console.log("data en item<<<<: ",item);
      const rObj = {};
      rObj.id = item.fk_tipo_inventario_id;
      rObj.nombre = item.tipo_inventario;
      return rObj;
    }).map(JSON.stringify))].map(JSON.parse))
    console.log("dropdown inventario: ", inventarioDropdown);
    //---------------------------------------------------------------------------------

    const filteredData2 = productos_estado.filter((entry) => (valueEstado === 0 || !valueEstado ? productos_estado : entry.estado === valueEstado) && (selectedLineaId === 0 || !selectedLineaId ? productos_estado : entry.fk_linea_id === selectedLineaId) && (selectedMarcaId === 0 || !selectedMarcaId ? productos_estado : entry.fk_marca_id === selectedMarcaId) && (selectedGrupoId === 0 || !selectedGrupoId ? productos_estado : entry.fk_grupo_id === selectedGrupoId) && (e === 0 || !e? productos_estado : entry.fk_tipo_inventario_id === e));


    setsubgrupoDropdown([... new Set(filteredData2.sort(function (a, b) {
      if (a.subgrupo.toLowerCase() < b.subgrupo.toLowerCase()) return -1;
      if (a.subgrupo.toLowerCase() > b.subgrupo.toLowerCase()) return 1;
      return 0;
    }).map(function (item) {
      const rObj = {};
      rObj.id = item.fk_subgrupo_id;
      rObj.nombre = item.subgrupo;
      return rObj;
    }).map(JSON.stringify))].map(JSON.parse))

    

    //---------------------------------------------------------------------------------


  }



  return (
    <div>

      <br />
      <Divider>PRODUCTOS</Divider>
      {/* <Divider className="titleFont">{"EL TODODS- ACT -DESC: " + valueEstado}</Divider>
      {/* <Divider className="titleFont">{"RESPONSE: " + response}</Divider> */}
      {/* <Divider className="titleFont">{"EL visualizador: " + visualizador}</Divider> */}
      {/* const { lineaV, marcaV, grupoV, visualizador, stocks } = props; */}
      {/* <Divider className="titleFont">{"EL LINEAV: " + lineaV}</Divider>
      <Divider className="titleFont">{"EL MARCAV: " + marcaV}</Divider>
      <Divider className="titleFont">{"EL GRUPOV: " + grupoV}</Divider>*/}
      {/* <Divider className="titleFont">{"LOS PRODUCTOS: " + JSON.stringify(productos)}</Divider> */}
      {/* <Divider className="titleFont">{"DATA SOURCE: " + dataSource}</Divider>  */}
      {/*<Divider className="titleFont">{"LINEAS DROPDOWN: " + JSON.stringify(lineasDropdown)}</Divider>
      <Divider className="titleFont">{"MARCAS DROPDOWN: " + JSON.stringify(marcasDropdown)}</Divider>
      <Divider className="titleFont">{"GRUPOS DROPDOWN: " + JSON.stringify(gruposDropdown)}</Divider>
      <Divider className="titleFont">{"SELECTED LINEA ID: " + selectedLineaId}</Divider>
      <Divider className="titleFont">{"SELECTED MARCA ID: " + selectedMarcaId}</Divider>
     <Divider className="titleFont">{"SELECTED GRUPO ID: " + selectedGrupoId}</Divider>*/}
      {productos_estado ?
        <div>
          <Row >
            {visualizador ? (
              <Col span={1}></Col>
            ) : (
              <Col span={24}>
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
          </Row> <br />





          <Row >
            <Col span={4}>
              <Select
                style={{ width: 200 }}
                placeholder="Seleccione Estado"
                value={valueEstado}
                onChange={(e) => {
                  setValueEstado(e);
                  setSelectedLineaId(null);
                  setSelectedMarcaId(null);
                  setSelectedGrupoId(null);
                  setDataSource(null);
                  setlineasDropdown(null);
                  setmarcasDropdown(null);
                  setgruposDropdown(null);
                  setValue(null);
                  filtrarE(e);
                }}
              >
                <Option value={0}>TODOS</Option>
                <Option value={1}>ACTIVOS</Option>
                <Option value={2}>DESCONTINUADOS</Option>
              </Select>
            </Col>

            <Col span={5}>
              <Select
                virtual={false}
                showSearch
                notFoundContent="No hay coincidencias"
                style={{ width: 250 }}
                placeholder="Seleccione Línea"
                value={selectedLineaId}
                // option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                filterOption={(input, option) => {
                  if (option.props.value) {
                    return strForSearch(option.props.children).includes(
                      strForSearch(input)
                    );
                  } else {
                    return false;
                  }
                }}
                onChange={(e) => {
                  setSelectedLineaId(e);
                  setSelectedMarcaId(null);
                  setSelectedGrupoId(null);
                  setmarcasDropdown(null);
                  setgruposDropdown(null);
                  filtrarL(e);
                }}
              >
                {lineasDropdown ? <Option value={0}>TODOS</Option> : null}

                {lineasDropdown ? lineasDropdown.map((option, index) =>
                  <Option key={option.id} value={option.id}>
                    {option.nombre}
                  </Option>
                ) : null}
              </Select>
            </Col>
            <Col span={5}>
              <Select
                virtual={false}
                showSearch
                notFoundContent="No hay coincidencias"
                filterOption={(input, option) => {
                  if (option.props.value) {
                    return strForSearch(option.props.children).includes(
                      strForSearch(input)
                    );
                  } else {
                    return false;
                  }
                }}
                style={{ width: 250 }}
                placeholder="Seleccione Marca"
                onChange={(e) => {
                  setSelectedMarcaId(e);
                  setSelectedGrupoId(null);
                  setgruposDropdown(null);
                  filtrarM(e);
                }}
                value={selectedMarcaId}
              >
                {marcasDropdown ? <Option value={0}>TODOS</Option> : null}
                {marcasDropdown ? marcasDropdown.map((option, index) =>
                  <Option key={option.id} value={option.id}>
                    {option.nombre}
                  </Option>
                ) : null}
              </Select>
            </Col>
            <Col span={4}>
              <Select
                virtual={false}
                showSearch
                filterOption={(input, option) => {
                  if (option.props.value) {
                    return strForSearch(option.props.children).includes(
                      strForSearch(input)
                    );
                  } else {
                    return false;
                  }
                }}
                notFoundContent="No hay coincidencias"
                style={{ width: 250 }}
                placeholder="Seleccione Grupo"
                onChange={(e) => {
                  setSelectedGrupoId(e);
                  filtrarG(e);
                }}
                value={selectedGrupoId}
              >
                {gruposDropdown ? <Option value={0}>TODOS</Option> : null}
                {gruposDropdown ? gruposDropdown.map((option, index) =>
                  <Option key={option.id} value={option.id}>
                    {option.nombre}
                  </Option>
                ) : null}
              </Select>
            </Col>
            <Col span={6}>
              <Search
                placeholder="Buscar producto..."
                value={value}
                onChange={(e) => filtrarB(e)}
                style={{ width: 250 }}
              />
            </Col>
          </Row>
          <br />
          <Row >
            <Col span={4}>
              <Select
                style={{ width: 200 }}
                placeholder="Seleccione Tipo"
                value={selectedSubgrupoId}
                onChange={(e) => {
                  setSelectedSubgrupoId(e);
                  filtrarSub(e,0);
                }}
              >
                {subgrupoDropdown ? <Option value={0}>TODOS</Option> : null}
                {subgrupoDropdown ? subgrupoDropdown.map((option, index) =>
                  <Option key={option.id} value={option.id}>
                    {option.nombre}
                  </Option>
                ) : null}
              </Select>
            </Col>
            <Col span={5}>
              <Select
                style={{ width: 200 }}
                placeholder="Seleccione Inventario"
                value={selectedInventarioId}
                onChange={(e) => {
                  setSelectedInventarioId(e);

                  filtrarInventario(e, 0);
                }}
              >
                {inventarioDropdown ? <Option value={0}>TODOS</Option> : null}
                {inventarioDropdown ? inventarioDropdown.map((option, index) =>
                  <Option key={option.id} value={option.id}>
                    {option.nombre}
                  </Option>
                ) : null}
              </Select>
            </Col>

            <Col span={4}>
              <Select
                style={{ width: 200 }}
                placeholder="Seleccione metodo abc"
                value={selectedMetodoabcId}
                onChange={(e) => {
                  setMetodoabcId(e);
                }}
              >
                {metodoabcDropdown ? <Option value={0}>TODOS</Option> : null}
                {metodoabcDropdown ? metodoabcDropdown.map((option, index) =>
                  <Option key={option.id} value={option.id}>
                    {option.nombre}
                  </Option>
                ) : null}
              </Select>
            </Col>


          </Row>



          <br />
          <Table
            locale={{ emptyText: "No hay productos" }}
            columns={columns}
            dataSource={dataSource ? dataSource : null}
            // dataSource={productos_estado}
            rowKey="id"
            onChange={handleChange}
            pagination={{ defaultPageSize: 20 }}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  if (
                    event.clientX < window.innerWidth * click &&
                    rowState &&
                    !stocks
                  ) {
                    ver(record);
                  }
                },
              };
            }}
          />
          {/* ) : (
        <Spin indicator={antIcon} className="loading" />
      )} */}
          {/* {JSON.stringify(productos)}  */}
        </div>
        : <Spin indicator={antIcon} className="loading" />}
    </div>
  );
};

export default ProductoList;
