import React, { useContext, useEffect, useState } from "react";
import { Spin, Button, Table, Divider } from "antd";
import { PlusOutlined, /*SmileOutlined,*/ LoadingOutlined } from '@ant-design/icons';
import CrudButton from "../../crudButton/crudButton";
import { LineaContext } from "../../../contexts/lineaContext";
import { useHistory } from "react-router";
import { useRouteMatch } from "react-router-dom";
import Search from "antd/lib/input/Search";
import './lineaList.css';

const LineaList = () => {
  const { lineas, setPermiso, setEditLinea, isEmpty, softDeleteLinea } = useContext(LineaContext);
  // const [filteredInfo, setFilteredInfo] = useState([]);
  const [value, setValue] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [rowState, setRowState] = useState(true);
  const columns1 = [
    {
      title: "NOMBRE",
      dataIndex: "nombre",
      key: "nombre",
      sorter: {
        compare: (a, b) => a.nombre.localeCompare(b.nombre),
      },
      showSorterTooltip: false,
      width: '15%'
    },
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
      title: "DESCRIPCIÓN",
      dataIndex: "descripcion",
      key: "descripcion",
      className: "longText",
      sorter: {
        compare: (a, b) => a.descripcion.localeCompare(b.descripcion),
      },
      showSorterTooltip: false,
      width: '35%'
    },
    {
      title: "ACCIONES",
      dataIndex: "",
      key: "x",
      render: (_, record) => (
        <CrudButton 
          record={record} 
          softDelete={softDeleteLinea}
          typeTransaction={typeTransactionData}
          setRowState={setRowState} 
        />
      ),
      width: '5%'
    },
  ];
  const columns2 = [
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
      title: "CÓDIGO",
      dataIndex: "codigo",
      key: "codigo",
      align: "center",
      sorter: {
        compare: (a, b) => a.codigo.localeCompare(b.codigo),
      },
      showSorterTooltip: false
    },
    {
      title: "DESCRIPCIÓN",
      dataIndex: "descripcion",
      key: "descripcion",
      className: "longText",
      sorter: {
        compare: (a, b) => a.descripcion.localeCompare(b.descripcion),
      },
      showSorterTooltip: false
    },
    
  ];

  let { path } = useRouteMatch();
  let history = useHistory();

  const typeTransactionData = {
    tableNamePSQL: "linea",
    byIdPSQL: true,
    byInternalCodePSQL: false,
    dependenciesPSQL: false,
    labelCrudPlural: "LÍNEAS",
    labelCrudSingle: "LÍNEA"
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
    // alert("ENTRA A LA FUNCION VER" + JSON.stringify(record));
    history.push(`${path}/${record.id}/ver`, record);
  }

  const filtrar = (e) => {
    const currValue = e.target.value;
    setValue(currValue);
    const filteredData = lineas.filter(entry =>
      entry.nombre.toLowerCase().includes(currValue.toLowerCase()) || entry.codigo.toLowerCase().includes(currValue.toLowerCase()));
    setDataSource(filteredData);
  }

  useEffect(() => {
    setEditLinea(null);
    setPermiso(false);
    if (!value) {
      setDataSource(lineas)
    }
    // console.log(dataSource)
  })

  return (
    <div>
       <br />
      <Divider>LÍNEAS</Divider>
          <br />
      {JSON.parse(localStorage.getItem("user")).rol === 2?
      <Button type="primary" className="success" icon={<PlusOutlined />} onClick={handleClick}>Nuevo</Button>
      :null
      }
      <Search
        placeholder="Buscar Línea..."
        value={value}
        onChange={e => filtrar(e)}
        style={{ width: 200 }}
      />
      <br />
      <br />

      {lineas.length > 0 || isEmpty ? (
        <Table
          locale={{ emptyText: 'No hay datos' }}
          columns={JSON.parse(localStorage.getItem("user")).rol === 2?columns1:columns2}
          dataSource={dataSource}
          rowKey='id'
          onChange={handleChange}
          pagination={{ defaultPageSize: 30 }}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                if (JSON.parse(localStorage.getItem("user")).rol === 2) {
                  if (event.clientX < window.innerWidth * 0.8 && rowState) {
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
    </div>
  );
}

export default LineaList;

