import { Table, Spin, Divider, Button, Input } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import CrudButton from '../../crudButton/crudButton';
import { SubgrupoContext } from "../../../contexts/subgrupoContext";
import { useHistory } from "react-router";
import { useRouteMatch } from "react-router-dom";
import Search from 'antd/lib/input/Search';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { SesionContext } from '../../../contexts/sesionContext';
import Hashids from 'hashids';
import GoogleDocsViewer from '../../DocsVIewer/DocsViewer';
 let { REACT_APP_SEED } = process.env;
const hashids = new Hashids(REACT_APP_SEED);

export const SubgrupoList = () => {
  var { setMoved, sesions } = useContext(SesionContext);

  useEffect(() => {
    setEditSubgrupo(null);
    if (!value) {
      setDataSource(subgrupos)
    }

  });





  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [value, setValue] = useState(null);
  let { path } = useRouteMatch();
  let history = useHistory();
  const { subgrupos, setPermiso, softDeleteSubgrupo, setEditSubgrupo } = useContext(SubgrupoContext);
  const [rowState, setRowState] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const columns1 = [
    {
      title: "NOMBRE",
      dataIndex: "nombre",
      key: "nombre",
      sorter: {
        compare: (a, b) => a.nombre.localeCompare(b.nombre),
      },
      showSorterTooltip: false,
      width: '20%'
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
      width: '20%'
    },*/
    /*{
      title: "LÍNEAS",
      dataIndex: "lineas_nn",
      key: "lineas_nn",
      className: "longText",
      showSorterTooltip: false,
      width: '55%'
    },*/
    {
      title: "ACCIONES",
      dataIndex: "",
      key: "x",
      render: (_, record) => (
        <CrudButton
          record={record}
          typeTransaction={typeTransactionData}
          softDelete={softDeleteSubgrupo}
          setRowState={setRowState}
        />
      ),
      width: '5%'
    },
  ]

  const columns2 = [
    {
      title: "NOMBRE",
      dataIndex: "nombre",
      key: "nombre",
      sorter: {
        compare: (a, b) => a.nombre.localeCompare(b.nombre),
      },
      showSorterTooltip: false,
      width: '20%'
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
      width: '20%'
    },*/
    /*{
      title: "LÍNEAS",
      dataIndex: "lineas_nn",
      key: "lineas_nn",
      className: "longText",
      showSorterTooltip: false,
      width: '60%'
    },*/
  ]

  const typeTransactionData = {
    tableNamePSQL: "subgrupo",
    byIdPSQL: true,
    byInternalCodePSQL: false,
    dependenciesPSQL: false,
    labelCrudPlural: "SUBGRUPO",
    labelCrudSingle: "SUBGRUPOS"
  };

  function ver(record) {
    setEditSubgrupo(null);
    record["permiso"] = false;
    // history.push(`${path}/${record.id}/ver`, record);
    history.push(`${path}/${hashids.encodeHex(record.id)}/ver`, record);
  }

  

  function handleClick() {
    setPermiso(true);
    let record = {
      permiso: true,
      nuevo: true,
    };
    history.push(`${path}/nuevo`, record);
  }



    const filtrar = (e) => {
      const currValue = e.target.value;
      setValue(currValue);
      // const filteredData = marcas.filter(entry => //-- Estaba antes de cambiar a nn
      const filteredData = subgrupos.filter((response) =>
        response.nombre.toLowerCase().includes(currValue.toLowerCase()) ||
        response.descripcion.toLowerCase().includes(currValue.toLowerCase())
  
      );
  }
  const [prueba, setprueba] = useState("");
  return (
    <div>
{/* <GoogleDocsViewer
  width="600px"
  height="100px"
  fileUrl="https://drive.google.com/file/d/1rm_6zCtQt7dj29yC_8yEIjYSHa_0asao/view"
/> */}

<Input name="123" placeholder="Basic usage" onChange={e=> setprueba(e.target.value)} />

{prueba.includes("drive.google.com")?<GoogleDocsViewer
  //source="https://drive.google.com/file/d/1rm_6zCtQt7dj29yC_8yEIjYSHa_0asao/preview"
  source={prueba}
/>:null}
 




      <br />
      <Divider>SUBGRUPOS</Divider>
      <br />
      <>
        {sesions ? sesions._usuario[0].rol === 2 ?
          <Button type="primary" className="success" icon={<PlusOutlined />} onClick={handleClick}>Nuevo</Button>
          : null : null}
      </>
      <Search
        placeholder="Buscar Subgrupo..."
        value={value}
        onChange={e => filtrar(e)}
        style={{ width: 200, marginLeft: 20 }}
      />
      <br /><br />
      {subgrupos.length > 0 ?
        <Table
          dataSource={dataSource}
          columns={sesions ? sesions._usuario[0].rol === 2 ? columns1 : columns2 : null}
          rowKey="id"
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                if (sesions) {

                  if (sesions._usuario[0].rol === 2) {
                    if (event.clientX < window.innerWidth * 0.7 && rowState) {
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
        : <Spin indicator={antIcon} />}
    </div>
  )
}
