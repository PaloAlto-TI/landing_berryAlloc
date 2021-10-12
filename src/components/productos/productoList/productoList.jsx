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


  const [product, setProduct] = useState(null);

  const prueba = useSelector((state) => state);

  const [lineasDropdown, setlineasDropdown] = useState(null);
  const [marcasDropdown, setmarcasDropdown] = useState(null);
  const [gruposDropdown, setgruposDropdown] = useState(null);
  // const [valueEstado, setValueEstado] = useState(null);


  const loading = useSelector((state) => state.productos.loading);
  const response = useSelector((state) => state.productos.response);
  // const grupos = useSelector((state) => state.stocks.grupos);
  const grupos = null; // AGREGADO POR MANUEL CORONEL
  //console.log("LOS GRUPOS DEL STATE EN LISTADO PRODUCTOS: " + JSON.stringify(grupos))
  //console.log("estado location: ",(location.state&&location.state.estadoProd)?location.state.estadoProd:null)
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


  // const [selectedLineaId, setSelectedLineaId] = useState(
  //   null);

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

  function handleChangeEstado(value) {
    // //console.log(value);
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

    //console.log('radio checked', e.target.value);
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
      //console.log("AQUI!!!!");
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
    //console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
  };

  // useEffect(() => {
  //   setEditProducto(null);
  //   //console.log("LOS PRODUCTOS", productos);
  //   setPermiso(false);
  //   if (!value && !filtro ) {
  //     setDataSource(productos);
  //   }
  // });
  // //console.log("state", productos);
  const dispatch = useDispatch();

  // useEffect(() => { -- COMENTADO FUNCIONAL
  //   //dispatch(getProducto('005-004-001-001'));
  //   //dispatch(getProductosByLinea('60d4c0476e8514b5e8c66fd5'));
  //   //console.log(" QUIERE HACER DISPATCH")
  //   dispatch(
  //     selectedLineaId ? getProductosByLinea(selectedLineaId) : getProductos()
  //   );
  // }, [dispatch, selectedLineaId]);




  useEffect(async () => {
    //console.log("location PASADOS: ",location);
    await dispatch(getProductosByEstado(""));

    // HAY QUE ARREGLAR ESTO JONNATHAN, SE HABLLÓ E DÍA JUEVES
    // }, [valueEstado,dispatch]);
  }, []);

  useEffect(() => {

    if (valueEstado !== null) {

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
    // HAY QUE ARREGLAR ESTO JONNATHAN, SE HABLLÓ E DÍA JUEVES
  }, [valueEstado, dispatch]);

  // }, [valueEstado]);
  // useEffect(async () => {
  // console.log("entra en state dispatch")

  //   if (valueEstado !== null) {
  //     if (valueEstado === 0) {

  //       await dispatch(getProductos())

  //       await setDataSource(productos?productos:null);
  //       console.log("esto en data source:sç ",dataSource);
  //     } else {

  //      await dispatch(getProductosByEstado(valueEstado))
  //       await setDataSource(productos_estado?productos_estado:null);
  //     }
  //   }


  // }, [valueEstado]);


  // useEffect(() => {

  //   if (valueEstado !== null && !dataSource) {
  //     if (valueEstado === 0) {

  //       // setDataSource(productos);

  //       if (productos) { // --- ACA SE DEBE REVISAR
  //         setlineasDropdown([... new Set(productos.map(function (item) {
  //           const rObj = {};
  //           rObj.id = item.fk_linea_id;
  //           rObj.nombre = item.linea;
  //           return rObj;
  //         }).map(JSON.stringify))].map(JSON.parse))
  //       }
  //     } else {
  //       // setDataSource(productos_estado);

  //       if (productos_estado) {
  //         setlineasDropdown([... new Set(productos_estado.map(function (item) {
  //           const rObj = {};
  //           rObj.id = item.fk_linea_id;
  //           rObj.nombre = item.linea;
  //           return rObj;
  //         }).map(JSON.stringify))].map(JSON.parse))
  //       }
  //     }

  //   }
  // },[valueEstado]);

  // useEffect(() => { COMENTADO X MC & JC
  //   //dispatch(getProducto('005-004-001-001'));
  //   //dispatch(getProductosByLinea('60d4c0476e8514b5e8c66fd5'));
  //   //  //console.log("el filtro", filtro)
  //   // if (productos && producto){

  //   //   if (selectedMarcaId){

  //   //       filtrarM(selectedMarcaId)
  //   //   }

  //   //   if (selectedGrupoId){

  //   //       filtrarG(selectedGrupoId);
  //   //   }
  //   // }

  //   // if (!value && !filtro) {
  //   if (valueEstado && !value && !filtro) {
  //     //console.log("ENTRA AL !VALUE !FILTRO CON : ",productos)
  //     // setDataSource(null);
  //     setDataSource(productos);
  //   } else {
  //     //console.log("ENTRA EN ELSEEEEEEEEEEEEEEEEE")
  //     setDataSource(null);
  //   }
  // });

  //------------------------------------------------comentado por JC
  // useEffect(() => {
  //   setDataSource(productos);

  //   if (productos) {
  //     if (selectedMarcaId) {
  //       filtrarM(selectedMarcaId);
  //     }
  //     if (selectedGrupoId) {
  //       filtrarG(selectedGrupoId);
  //     }
  //   }
  // }, [productos]);
  //------------------------------------------------------------------------

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
        // { //--- SE DEBE AGREGAR EN OTRAS VALIDACIONES O VISUALIZADORES
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
          title: "UND. MED.",
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
        //{
        //  title: "COSTO",
        //  dataIndex: "costo",
        //  key: "costo",
        //  sorter: {
        //    compare: (a, b) => a.nombre.localeCompare(b.nombre),
        //  },
        //  showSorterTooltip: false,
        //  width: "5%",
        //  align: "center",
        //  render: (text, record) =>
        //    record.costo && (
        //      <p
        //      // onClick={() => {
        //      //   record["permiso"] = false;
        //      //   history.push(`${path}/${record.codigo_interno}/ver`, record);
        //      // }}
        //      >
        //        {"$" + text}
        //      </p>
        //    ),
        //  // render:(text)=><Link to='/inicio'>{text}</Link>
        //},
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
    //filterProductos("60d4c046e600f1b5e85d075c");
    //setPermiso(true);
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

    // controlar la busqueda en null

    /* const filteredData = productos.filter(
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
     setDataSource(filteredData);*/


  };
  const filtrarE = async (e) => {


    //console.log("entra con E<<<> ", e?e:valueEstado);
    if (productos_estado) {
      // console.log("productos Estado: ",productos_estado);
      if (e === 0) {
        const filteredData = productos_estado;
        setDataSource(filteredData);
        // console.log("entra con E1<<<> ", filteredData);

        // setDataSource(productos);
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

      }
      else {
        const filteredData = productos_estado.filter((entry) => entry.estado === (e ? e : valueEstado));
        setDataSource(filteredData);
        // console.log("entra con E2<<<> ", filteredData);

        // setDataSource(productos);
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
      }
    }
  }
  const filtrarL = (e) => {


    let filteredData =  valueEstado === 0 ? productos_estado.filter((entry) => (e===0?productos_estado:entry.fk_linea_id === e)) : productos_estado.filter((entry) => entry.estado === valueEstado && (e===0?productos_estado:entry.fk_linea_id === e));

    console.log("FILTRADOS X LINEA: ", e);
    // if (e === 0) {


    //   filteredData = valueEstado === 0 ? productos_estado : productos_estado.filter((entry) => entry.estado === valueEstado);

    // }
    // else {
    //   filteredData = valueEstado === 0 ? productos_estado.filter((entry) => entry.fk_linea_id === e) : productos_estado.filter((entry) => entry.estado === valueEstado && entry.fk_linea_id === e);
    // }
    console.log("productos en tabla: ", filteredData);
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
  };

  const filtrarM = (e) => {
    //console.log("ENTRA A FILTARM CON: ", e)
    setFiltro(e);

    /* //console.log("QUIERE FILTRAR ESTA DATA EN MARCAS: ", dataSource)
    const filteredData = dataSource.filter((entry) => entry.fk_marca_id === e);
    //console.log("FILTRADOS X MARCA", filteredData);
    setDataSource(filteredData);
     ---COMENTADO!!! */



    // setDataSource(productos);
    //console.log("QUIERE FILTRAR ESTA DATA EN MARCAS: ", productos)

    // const filteredData =valueEstado===0? productos_estado.filter((entry) => entry.fk_linea_id === e):productos_estado.filter((entry) =>entry.estado===valueEstado && entry.fk_linea_id === e);
    let filteredData = null;

    // filteredData=selectedMarcaId===0?selectedLineaId===0? valueEstado === 0 ? productos_estado : productos_estado.filter((entry) => entry.estado === valueEstado)
    //  :valueEstado === 0 ? productos_estado.filter((entry) => entry.fk_linea_id === selectedLineaId ) : productos_estado.filter((entry) => entry.estado === valueEstado && entry.fk_linea_id === selectedLineaId ) 
    //  :selectedLineaId===0?valueEstado === 0 ? productos_estado.filter((entry) => entry.fk_marca_id === e) : productos_estado.filter((entry) => entry.estado === valueEstado  && entry.fk_marca_id === e) 
    //  : valueEstado === 0 ? productos_estado.filter((entry) => entry.fk_linea_id === selectedLineaId && entry.fk_marca_id === e) : productos_estado.filter((entry) => entry.estado === valueEstado && entry.fk_linea_id === selectedLineaId && entry.fk_marca_id === e);
    if (e === 0) {
      if (selectedLineaId === 0) {
        filteredData = valueEstado === 0 ? productos_estado : productos_estado.filter((entry) => entry.estado === valueEstado);

      }
      else {

        filteredData = valueEstado === 0 ? productos_estado.filter((entry) => entry.fk_linea_id === selectedLineaId) : productos_estado.filter((entry) => entry.estado === valueEstado && entry.fk_linea_id === selectedLineaId);
      }

    }
    else {
      if (selectedLineaId === 0) {
        filteredData = valueEstado === 0 ? productos_estado.filter((entry) => entry.fk_marca_id === e) : productos_estado.filter((entry) => entry.estado === valueEstado && entry.fk_marca_id === e);

      }
      else {

        filteredData = valueEstado === 0 ? productos_estado.filter((entry) => entry.fk_linea_id === selectedLineaId && entry.fk_marca_id === e) : productos_estado.filter((entry) => entry.estado === valueEstado && entry.fk_linea_id === selectedLineaId && entry.fk_marca_id === e);
      }

    }



    console.log("FILTRADOS X LINEA & MARCA: ", filteredData);
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


    /*setgruposDropdown([... new Set(filteredData.map(function (item) {
      const rObj = {};
      rObj.id = item.fk_grupo_id;
      rObj.nombre = item.grupo;
      return rObj;
    }).map(JSON.stringify))].map(JSON.parse))*/

  };

  const filtrarG = (e) => {
    //console.log("ENTRA A FILTARG CON: ", e)
    setFiltro(e);

    /*const filteredData = productos.filter(
      (entry) =>
        entry.fk_grupo_id === e && entry.fk_marca_id === selectedMarcaId
    );
    //console.log("FILTRADOS X GRUPO", filteredData);
    setDataSource(filteredData);*/

    //console.log("QUIERE FILTRAR ESTA DATA EN GRUPOS: ", dataSource)
 

    //const filteredData = valueEstado === 0 ? productos_estado.filter((entry) => entry.fk_linea_id === selectedLineaId && entry.fk_marca_id === selectedMarcaId && entry.fk_grupo_id === e) : productos_estado.filter((entry) => entry.estado === valueEstado && entry.fk_linea_id === selectedLineaId && entry.fk_marca_id === selectedMarcaId && entry.fk_grupo_id === e);

//    const filteredData = valueEstado === 0 ? productos_estado.filter((entry) => (selectedLineaId===0?productos_estado:entry.fk_linea_id === selectedLineaId) && (selectedMarcaId===0?productos_estado:entry.fk_marca_id === selectedMarcaId) && (e===0?productos_estado:entry.fk_grupo_id === e)) : productos_estado.filter((entry) => entry.estado === valueEstado && (selectedLineaId===0?productos_estado:entry.fk_linea_id === selectedLineaId) && (selectedMarcaId===0?productos_estado:entry.fk_marca_id === selectedMarcaId) && (e===0?productos_estado:entry.fk_grupo_id === e));
    const filteredData =   productos_estado.filter((entry) => (valueEstado===0?productos_estado:entry.estado === valueEstado) && (selectedLineaId===0?productos_estado:entry.fk_linea_id === selectedLineaId) && (selectedMarcaId===0?productos_estado:entry.fk_marca_id === selectedMarcaId) && (e===0?productos_estado:entry.fk_grupo_id === e));

    //console.log("FILTRADOS X GRUPO", filteredData);
    console.log("productos en GRUPO: ", filteredData);
    setDataSource(filteredData);

  };

  const filtroGlobal = (e) => {
    if (e.target.checked) {
      //filterProductos("all");
      setSelectedLineaId(null);
      setSelectedMarcaId(null);
      setSelectedGrupoId(null);
    } else {
      //console.log("AQUI!!!!");
      setSelectedLineaId("60d4c046e600f1b5e85d075c");
      //filterProductos("60d4c046e600f1b5e85d075c");
    }

    setFilterAll(e.target.checked);
    setFiltro(null);
  };

  return (
    <div>

      <br />
      <Divider>PRODUCTOS</Divider>
      {/* <Divider className="titleFont">{"EL TODODS- ACT -DESC: " + valueEstado}</Divider>
      <Divider className="titleFont">{"EL VALUE: " + value + " EL VALUE ESTADO: " + valueEstado + "  EL FILTRO: " + filtro}</Divider> */}
      {/* <Divider className="titleFont">{"RESPONSE: " + response}</Divider> */}
      {/* <Divider className="titleFont">{"EL visualizador: " + visualizador}</Divider> */}
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
{productos_estado?
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
        {/* <Col span={2}> */}
        {/* <Radio.Group options={plainOptions} onChange={this.onChange1} value = { value1 } /> */}
        {/* {/* < Radio.Group onChange={onChangeRadio} value={valueRadio}> */}
        {/*<Radio className="containerRadio" value={1}>TODOS</Radio>
            <Radio className="containerRadio" value={2}>ACTIVOS</Radio>
            <Radio className="containerRadio" value={3}>DESCONTINUADOS</Radio>
          </Radio.Group>
        </Col> */}
      </Row> <br />
      <Row >
        <Col span={4}>
          <Select
            style={{ width: 200 }}
            placeholder="Seleccione Estado"
            value={valueEstado}
            // onChange={handleChangeEstado}
            onChange={(e) => {

              // dispatch(getProductosByLinea(e));
              // dispatch(getProductos())
              // dispatch(getProductosByEstado(valueEstado))
              setValueEstado(e);
              setSelectedLineaId(null);
              setSelectedMarcaId(null);
              setSelectedGrupoId(null);
              setDataSource(null);
              setlineasDropdown(null);
              setmarcasDropdown(null);
              setgruposDropdown(null);
              setFiltro(null);
              setValue(null);
              setFilterAll(false);
              filtrarE(e);
            }}
          >
            <Option value={0}>TODOS</Option>
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
          {/* <SelectOpciones
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
          /> */}
          <Select
            showSearch
            showArrow
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
          {/* <select onChange={handleChange}>
     {this.props.listOption.map((option, index) =>
       <option key={index} value={index}>
        {option.name}
       </option>
      )}
      </select> */}
          {/* <SelectOpciones
            // tipo="línea"
            tipo="lineas"
            filter={lineasDropdown}
            onChange={(e) => {
              // dispatch(getProductosByLinea(e));
              // setDataSource(null);
              setSelectedLineaId(e);
              setSelectedMarcaId(null);
              setSelectedGrupoId(null);
              setmarcasDropdown(null);
              setgruposDropdown(null);
              filtrarL(e);
              // setFiltro(null);
              // setValue(null);
              // setFilterAll(false);
            }}
            value={selectedLineaId}
          /> */}
        </Col>
        <Col span={5}>
          <Select
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
          {/* <SelectOpciones
            tipo="_marcas"
            filter={marcasDropdown ? marcasDropdown : null}
            onChange={(e) => {
              setSelectedMarcaId(e);
              setSelectedGrupoId(null);
              setgruposDropdown(null);
              // setDataSource(null);
              filtrarM(e);
            }}
            value={selectedMarcaId}
          /> */}
        </Col>
        <Col span={4}>
          <Select
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
          {/* <SelectOpciones
            tipo="_grupos"
            // filter={selectedMarcaId}
            filter={gruposDropdown}

            // filter2={selectedLineaId}
            onChange={(e) => {
              setSelectedGrupoId(e);
              filtrarG(e);
            }}
            value={selectedGrupoId}
          /> */}
        </Col>
        <Col span={6}>
          <Search
            placeholder="Buscar producto..."
            value={value}
            onChange={(e) => filtrarB(e)}
            style={{ width: 250 }}
          />
        </Col>

        {/* <Col span={2}>
          <Checkbox onChange={(e) => filtroGlobal(e)} checked={filterAll}>
            Todos
          </Checkbox>
        </Col> */}
      </Row>

      <br />
      {/* {!loading ? ( */}
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
              //console.log(event);

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
      {/* ) : (
        <Spin indicator={antIcon} className="loading" />
      )} */}
      {/* {JSON.stringify(productos)}  */}
    </div>
    :  <Spin indicator={antIcon} className="loading" />}
    </div>
  );
};

export default ProductoList;
