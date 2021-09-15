import React, { useContext, useEffect, useState } from "react";
import { Spin, Button, Table, Divider } from "antd";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import CrudButton from "../../crudButton/crudButton";
import { MarcaContext } from "../../../contexts/marcaContext";
import { useHistory } from "react-router";
import { useRouteMatch } from "react-router-dom";
import Search from "antd/lib/input/Search";
import './marcaList.css';
import { SesionContext } from "../../../contexts/sesionContext";
import Hashids from 'hashids';
let { REACT_APP_SEED } = process.env;
const hashids = new Hashids(REACT_APP_SEED);

const MarcaList = () => {
  var { setMoved, sesions } = useContext(SesionContext);

  const { /*marcas,*/ marcas_lineas_nn, setPermiso, setEditMarca, isEmpty, softDeleteMarca } = useContext(MarcaContext);
  // const [filteredInfo, setFilteredInfo] = useState([]);
  // console.log("LAS MARCAS SIN LINEAS: " + JSON.stringify(marcas));
  // 05/08/2021 - OBSERVACIÓN: No esta mostrando el SUBGRUPO en el listado, pendiente de hacer y definir -MC
  // console.log("LAS MARCAS CON LINEAS: " + JSON.stringify(marcas_lineas_nn));
  
  const [value, setValue] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [rowState, setRowState] = useState(true);
  const columns1 = [
    {
      title: "CÓDIGO",
      dataIndex: "codigo",
      key: "codigo",
      align: "center",
      sorter: {
        compare: (a, b) => a.codigo.localeCompare(b.codigo),
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
    },
    {
      title: "LÍNEAS",
      dataIndex: "lineas_nn",
      key: "lineas_nn",
      className: "longText",
      showSorterTooltip: false,
      render: (lineasMarca, record) => (
        <p>
          {lineasMarca.length > 0 ? lineasMarca.map(x => x.nombre).join(", ") : 'N/A'}
        </p>
      ),
      width: '50%'
    },
    /*{
      title: "DESCRIPCIÓN",
      dataIndex: "descripcion",
      key: "descripcion",
      className: "longText",
      sorter: {
        compare: (a, b) => a.descripcion.localeCompare(b.descripcion),
      },
      showSorterTooltip: false,
      width: '35%'
    },*/
    {
      title: "ACCIONES",
      dataIndex: "",
      align: "center",
      key: "x",
      render: (_, record) => (
        <CrudButton
          record={record}
          softDelete={softDeleteMarca}
          typeTransaction={typeTransactionData}
          setRowState={setRowState}
        />
      ),
      width: '5%'
    },
  ]

  const columns2 = [
    {
      title: "CÓDIGO",
      dataIndex: "codigo",
      key: "codigo",
      align: "center",
      sorter: {
        compare: (a, b) => a.codigo.localeCompare(b.codigo),
      },
      showSorterTooltip: false,
      width: '15%'
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
    },
    {
      title: "LÍNEAS",
      dataIndex: "lineas_nn",
      key: "lineas_nn",
      className: "longText",
      showSorterTooltip: false,
      render: (lineasMarca, record) => (
        <p>
          {lineasMarca.length > 0 ? lineasMarca.map(x => x.nombre).join(", ") : 'N/A'}
        </p>
      ),
      width: '50%'
    },
    /*{
      title: "DESCRIPCIÓN",
      dataIndex: "descripcion",
      key: "descripcion",
      className: "longText",
      sorter: {
        compare: (a, b) => a.descripcion.localeCompare(b.descripcion),
      },
      showSorterTooltip: false,
      width: '35%'
    },*/
   
  ]

  let { path } = useRouteMatch();
  let history = useHistory();

  const typeTransactionData = {
    tableNamePSQL: "marca",
    byIdPSQL: true,
    byInternalCodePSQL: false,
    dependenciesPSQL: false,
    labelCrudPlural: "MARCAS",
    labelCrudSingle: "MARCA"
  };

  const handleChange = (pagination, filters, sorter) => {
    // setFilteredInfo(filters); No se usa a nivel de Línea porque no tiene un filtro directo a nivel de tabla
  };

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
    // history.push(`${path}/${record.id}/ver`, record);
    history.push(`${path}/${hashids.encodeHex(record.id)}/ver`, record);
  }

  const filtrar = (e) => {
    const currValue = e.target.value;
    setValue(currValue);
    // const filteredData = marcas.filter(entry => //-- Estaba antes de cambiar a nn
    const filteredData = marcas_lineas_nn.filter(entry =>
      entry.nombre.toLowerCase().includes(currValue.toLowerCase()) || entry.codigo.toLowerCase().includes(currValue.toLowerCase()));
    setDataSource(filteredData);
  }

  useEffect(() => {
    //console.log("LAS MARCAS EN LIST : " + JSON.stringify(marcas_lineas_nn))

    setEditMarca(null);
    setPermiso(false);

    // if (marcas_lineas_nn.length > 0 && isEmpty === false){

    //   let values = [{id:"2222",name:"qwerty"},{id:"3333",name:"asdfg"}]
    //   let values_mapped = values.map(txt => txt.name);

    //   console.log("EL MAPEADO LET: " + values_mapped );

    //   // console.log("DATA MAPPED XXX= " + JSON.stringify(marcas_lineas_nn));

    //   let tempMarcasLinea = marcas_lineas_nn.map(marcas_map => marcas_map.lineas_nn);

    //   let tempMarcasLinea2 = tempMarcasLinea.map(x => x.nombre);

    //   console.log("DATA MAPPED LENGTH= " + JSON.stringify(tempMarcasLinea.length));

    //   console.log("DATA MAPPED = " + JSON.stringify(tempMarcasLinea));
    //   console.log("DATA MAPPED 2 = " + JSON.stringify(tempMarcasLinea2));

    // }

    if (!value) {
      setDataSource(marcas_lineas_nn)
    }
  })

  return (
    <div>
      <br />
      <Divider>MARCAS</Divider>
      <br />
      {sesions ? sesions._usuario[0].rol === 2 ?
        <Button type="primary" className="success" icon={<PlusOutlined />} onClick={handleClick}>Nuevo</Button>
        : null : null}
      <Search
        placeholder="Buscar Marca..."
        value={value}
        onChange={e => filtrar(e)}
        style={{ width: 200,marginLeft:20 }}
      />
      <br /><br />

      {marcas_lineas_nn.length > 0 || isEmpty ? (
        <Table
          locale={{ emptyText: 'No hay datos' }}
          columns={sesions ? sesions._usuario[0].rol === 2 ? columns1 : columns2 : null}
          dataSource={dataSource}
          rowKey='id'
          onChange={handleChange}
          pagination={{ defaultPageSize: 30 }}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                if (sesions) {
                  if (sesions._usuario[0].rol ===2) {
                    if (event.clientX < window.innerWidth * 0.8 && rowState) {
                      // record["permiso"] = false;
                      // history.push(`${path}/${record.codigo_interno}/ver`, record);
                      ver(record);
                    }
                  } else {
                    ver(record);
                  }
                }
              },
            };
          }}
        />
      ) : (
        <Spin indicator={antIcon} />
      )}
    </div>
  );
}

export default MarcaList;