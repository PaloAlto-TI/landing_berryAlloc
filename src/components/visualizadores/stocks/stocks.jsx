import React, { useEffect, useState } from "react";
import { Avatar, Button, Divider, List } from "antd";
import { Spin } from "antd";
import { PageHeader } from "antd";
import { Row, Col } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  HomeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import "./stocks.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getGruposLineaBySubgrupo,
  getLineas,
  getSubgrupos,
  getMarcas,
  getGrupos,
} from "../../../_redux/ducks/stocks.duck";
import { getProductosByGrupo } from "../../../_redux/ducks/producto.duck";
import ProductoList from "../../productos/productoList/productoList";
import { useHistory, useRouteMatch } from "react-router";

const Stocks = () => {
  const subgrupos = useSelector((state) => state.stocks.subgrupos);
  // console.log("EL SATESTOCKS: ", subgrupos)
  const productos = useSelector((state) => state.productos.productos);
  const grupos = useSelector((state) => state.stocks.grupos);
  const _lineas = useSelector((state) => state.stocks.lineas);
  const _marcas = useSelector((state) => state.stocks.marcas);
  
  let loading = useSelector((state) => state.stocks.loading);
  const [lineas, setLineas] = useState(null);
  const [marcas, setMarcas] = useState([]);

  

  const [_grupos, set_Grupos] = useState(null);
  const [checkPoint, setCheckPoint] = useState(null);
  const [selectedLineaID, setSelectedLineaID] = useState(null);
  const [selectedMarcaID, setSelectedMarcaID] = useState(null);
  const [selectedGrupoID, setSelectedGrupoID] = useState(null);
  const [hasReturn, setHasReturn] = useState(false);
  const [title, setTitle] = useState("LINEA");
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const history = useHistory();
  const dispatch = useDispatch();
  let { path } = useRouteMatch();
  useEffect(async() => {
    // await dispatch(getSubgrupos());
    
    await dispatch(getLineas());
    
    await dispatch(getMarcas());
    await dispatch(getGrupos());
    // setLineas(_lineas);

   

  }, [dispatch]);

  // useEffect(() => {
  //   if (grupos) {
  //     setLineas(
  //       grupos
  //         .map((g) => g.fk_lineamarca.fk_linea)
  //         .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
  //     );
  //   }
  // }, [grupos]);

  useEffect(async () => {
   // _lineas.sort((a, b) => parseFloat(a.nombre) - parseFloat(b.nombre));
 
     
     await setLineas(_lineas);
  
  }, [_lineas]);



  useEffect(() => {
    if (productos) {
      console.log("Los productos", productos);
    }
  }, [productos]);

  const goGrupos = (id, marca_id) => {
    setTitle("GRUPOS");
    // dispatch()

    setSelectedMarcaID(marca_id);
    console.log(
      "marca_id: ",marca_id );

    console.log(
      "los grupos",grupos );
    set_Grupos(grupos.filter((g) =>g.fk_linea_marca===id).sort((a, b) => (a.nombre > b.nombre) ? 1 : -1));

    // set_Grupos(
    //   grupos.filter(
    //     (g) =>
    //       g.fk_lineamarca.fk_marca.id === id &&
    //       g.fk_lineamarca.fk_linea.id === selectedLineaID
    //   )
    // );
  };

  const goMarcas = (id) => {
    setTitle("MARCAS");
    setHasReturn(true);
    setSelectedLineaID(id);

    console.log("ASDF", id)
    console.log(_marcas)
    setMarcas(_marcas.filter((g)=>g.linea_id===id).sort((a, b) => (a.marca_nombre > b.marca_nombre) ? 1 : -1))
    // setMarcas(
    //   grupos
    //     .filter((g) => g.fk_lineamarca.fk_linea.id === id)
    //     .map((g) => g.fk_lineamarca.fk_marca)
    //     .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
    // );

    setCheckPoint(true);
  };

  const goLineas = (id) => {

    setTitle("LÍNEAS");
    alert("va al go lineas")
    setHasReturn(true);
    if (id === 'all'){
      dispatch(getLineas());
    }else{
      dispatch(getGruposLineaBySubgrupo(id));
    }
  };

  const goProductos = (id) => {
    setSelectedGrupoID(id);
    console.log("linea: ",selectedLineaID);
    console.log("Marca: ",selectedMarcaID);
    console.log("Grupo: ",selectedGrupoID);
    window.scrollTo(0, 0);

   
  };

  const getAll = () => {
    setHasReturn(true)
    setTitle("LINEAS")
    dispatch(getLineas());
  };

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
      //skdbfksdnfks
    };
  });

  // function  goBack (){
  //   console.log("ENTRAAA");
  //  //  setFlag(false);
  //    console.log("flag: ",flag)
  //   if(flag===true){
  //     console.log("entra ");
  //     loading=null;
  //     console.log("Loading: ",loading)
  //       setSelectedGrupoID(null);
  //       setSelectedMarcaID(null);
  //       setSelectedLineaID(null)
  //       setFlag(false);
  //       console.log("flag: ",flag)
  //      setTitle("GRUPOS");
  //   }
  //    console.log("flag: ",flag)
  //    console.log("Linea id: ",selectedLineaID)
  //   console.log("grupo id: ",selectedGrupoID)
  //   console.log("marca id: ",selectedMarcaID)
 

  // }

  const goBack = async (id) => {
    console.log("_grupos: ",_grupos)
 

   if (_grupos) {
      if (!selectedLineaID) {
        alert("EN ESTE ENTRAAA   1111"  )
        setHasReturn(false);
        setLineas(null);
        setTitle("TIPO");
      } else if (!selectedMarcaID) {
        setMarcas(null);
        setSelectedLineaID(null);
        setTitle("LÍNEAS");
      } else if (!selectedGrupoID) {
        set_Grupos(null);
        setSelectedMarcaID(null);
        setTitle("MARCAS");
      }

       else {
        await setSelectedGrupoID(null);
        dispatch(getLineas());
        // dispatch(getLineas());
        //bkjbxcvjkbcxv
      }
    }
    else{

      if (!selectedLineaID) {
        setHasReturn(false);
        setLineas(null);
        setTitle("TIPO");
      } else if (!selectedMarcaID) {
        setMarcas(null);
        setHasReturn(false);
        setSelectedLineaID(null);
        setTitle("LÍNEAS");
      } else if (!selectedGrupoID) {
        set_Grupos(null);
        setSelectedMarcaID(null);
        setTitle("MARCAS");
      }
       else {
        setSelectedLineaID(null);
        setHasReturn(false);
        dispatch(getLineas());
      }
    }
    

  };
  const goBackHome = (id) => {
    
    // setLineas(null);
    // 
    // set_Grupos(null);
    // setSelectedLineaID(null);
    // setSelectedMarcaID(null);
    // setTitle("LÍNEAS");
    window.location.reload();

  };

  if (!selectedGrupoID) {
    return !loading ? (
      <>
        {hasReturn && (
          <div><Button
            type="primary"
            style={{ marginLeft: "91vw" }}
            icon={<ArrowLeftOutlined />}
            onClick={() => goBack()}
          />&nbsp;<Button
          type="primary"
          // style={{ marginLeft: "91vw" }}
          icon={<HomeOutlined />}
         onClick={() => goBackHome()}
        /></div>
        )}

        <Divider orientation="center">{title}</Divider>
       
        <List
          itemLayout="horizontal"
          style={{ marginTop: "8vh" }}
          dataSource={
            // _grupos
            //   ? _grupos
            //   : marcas && checkPoint
            //   ? marcas
            //   : lineas
            //   ? lineas
            //   : 
             selectedLineaID?_grupos?_grupos:marcas?marcas:null: lineas
            //selectedLineaID?_grupos?_grupos:marcas?marcas:null: lineas
            
          }
          renderItem={(item) => (
            <List.Item
              style={{ textAlign: "left", marginLeft: "3.4vw", cursor: "pointer"  }}
              onClick={() =>
                _grupos
                  ? goProductos(item.id)
                  : marcas && checkPoint
                  ? goGrupos(item.id,item.marca_id)
                  : lineas
                  ? goMarcas(item.id)
                  : goLineas(item.id)
              }
            >
              <List.Item.Meta
                // avatar={
                //   <Avatar
                //     style={{ color: "white", backgroundColor: "#8a8a8a" }}
                //   >
                //     {item.marca_nombre?item.marca_nombre.charAt(0):item.nombre.charAt(0)}
                //   </Avatar>
                // }
                title={<p style={{ fontWeight: "bold" }}>{item?item.marca_nombre?item.marca_nombre:item.nombre:null}</p>}
                description={null}
              />
              <ArrowRightOutlined style={{ marginRight: "3vw" }} />
            </List.Item>
          )}
        />
      </>
    ) : (
      <Spin indicator={antIcon} className="loading" />
    );
  } else {
    return (
      <>
        {hasReturn && (
         <div> <Button
            type="primary"
            style={{ marginLeft: "91vw" }}
            icon={<ArrowLeftOutlined />}
            onClick={() => goBack()}
          />&nbsp;<Button
          type="primary"
          // style={{ marginLeft: "91vw" }}
          icon={<HomeOutlined />}
         onClick={() => goBackHome()}
        /></div>
        )}

        <ProductoList
          stocks={true}
          visualizador={true}
          lineaV={selectedLineaID}
          marcaV={selectedMarcaID}
          grupoV={selectedGrupoID}
        />
      </>
    );
  }
};

export default Stocks;