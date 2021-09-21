import React, { useEffect, useState } from "react";
import { Button, Divider, List } from "antd";
import { Spin } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined, LoadingOutlined } from "@ant-design/icons";

import "./stocks.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getGruposLineaBySubgrupo,
  getSubgrupos,
} from "../../../_redux/ducks/stocks.duck";
import { getProductosByGrupo } from "../../../_redux/ducks/producto.duck";
import ProductoList from "../../productos/productoList/productoList";
import { useHistory, useRouteMatch } from "react-router";

const Stocks = () => {
  const subgrupos = useSelector((state) => state.stocks.subgrupos);
  const productos = useSelector((state) => state.productos.productos);
  const grupos = useSelector((state) => state.stocks.grupos);
  const loading = useSelector((state) => state.stocks.loading);
  const [lineas, setLineas] = useState(null);
  const [marcas, setMarcas] = useState([]);
  const [_grupos, set_Grupos] = useState(null);
  const [checkPoint, setCheckPoint] = useState(null)
  const [selectedLineaID, setSelectedLineaID] = useState(null)
  const [selectedMarcaID, setSelectedMarcaID] = useState(null)
  const [selectedGrupoID, setSelectedGrupoID] = useState(null)
  const [hasReturn, setHasReturn] = useState(false)
  const [title, setTitle] = useState("TIPO")
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const history = useHistory()
  const dispatch = useDispatch();
  let { path } = useRouteMatch();
  useEffect(() => {
    dispatch(getSubgrupos());
  }, [dispatch]);

  useEffect(() => {
    if (grupos) {
      setLineas(
        grupos
          .map((g) => g.fk_lineamarca.fk_linea)
          .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
      );
     
    }
  }, [grupos]);

  useEffect(() => {
    if (productos) {
      console.log("Los productos", productos);
    }
  }, [productos]);

  const goGrupos = (id) => {

    setTitle("GRUPOS")

    setSelectedMarcaID(id)
    console.log(
      "los grupos",
      grupos.filter((g) => g.fk_lineamarca.fk_linea.id === id)
    );
    set_Grupos(grupos.filter((g) => g.fk_lineamarca.fk_marca.id === id && g.fk_lineamarca.fk_linea.id === selectedLineaID));
  };

  const goMarcas = (id) => {

    setTitle("MARCAS")

    setSelectedLineaID(id);
    
    setMarcas(grupos.filter((g) => g.fk_lineamarca.fk_linea.id === id).map((g) => g.fk_lineamarca.fk_marca)
    .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i));
  
    setCheckPoint(true)
  };

  const goLineas = (id) => {
    setTitle("LÍNEAS")
    setHasReturn(true)
    dispatch(getGruposLineaBySubgrupo(id));
  };

  const goProductos = (id) => {
    setSelectedGrupoID(id)
  };

  const goBack = (id) => {

    if (grupos){

      if (!selectedLineaID){
        setHasReturn(false)
        setLineas(null)
        setTitle("TIPO")
      }else if (!selectedMarcaID){
        setMarcas(null)
        setSelectedLineaID(null)
        setTitle("LÍNEAS")
      }else if (!selectedGrupoID){
        set_Grupos(null)
        setSelectedMarcaID(null)
        setTitle("MARCAS")
      }
    }
  };

  if (!selectedGrupoID) {
    return !loading ? (
      <>
  
      { hasReturn &&
       <Button type="primary" style={{marginLeft:"91vw"}} icon={<ArrowLeftOutlined />} onClick={()=>goBack()}/>
      }
      <Divider orientation="left">{title}</Divider>

      <List
        itemLayout="horizontal"
        style={{ marginTop: "8vh" }}
        dataSource={_grupos ? _grupos : marcas && checkPoint ? marcas : lineas ? lineas : subgrupos}
        renderItem={(item) => (
          <List.Item
            style={{ textAlign: "left", marginLeft: "3vw" }}
            onClick={() =>
              _grupos
                ? goProductos(item.id)
                : marcas && checkPoint
                ? goGrupos(item.id)
                : lineas
                ? goMarcas(item.id)
                : goLineas(item.id)
            }
          >
            <List.Item.Meta
              title={<p style={{ fontWeight: "bold" }}>{item.nombre}</p>}
              description={_grupos && item.fk_lineamarca.fk_marca.nombre}
            />
              <ArrowRightOutlined style={{marginRight:"3vw"}}/>

          </List.Item>
        )}
      />
       </>
    ) : (
      <Spin indicator={antIcon} className="loading" />
    );
  } else {
    return <ProductoList visualizador={true} lineaV={selectedLineaID} marcaV={selectedMarcaID} grupoV={selectedGrupoID}  />;
  }
};

export default Stocks;
