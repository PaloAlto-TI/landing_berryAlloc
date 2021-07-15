import React, { useContext, useEffect, useState } from "react";
import { Spin, Button, Table } from "antd";
import { PlusOutlined, /*SmileOutlined,*/ LoadingOutlined } from '@ant-design/icons';
import CrudButton from "../../crudButton/crudButton";
import { LineaContext } from "../../../contexts/lineaContext";
import { useHistory } from "react-router";
import { useRouteMatch } from "react-router-dom";
import Search from "antd/lib/input/Search";
import './lineaList.css';

const LineaList = () => {
  const { lineas, setPermiso, setEditLinea, isEmpty, softDeleteLinea } = useContext(LineaContext);
  const [filteredInfo, setFilteredInfo] = useState([])
  const [value, setValue] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [rowState, setRowState] = useState(true);

  const columns = [
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
      title: "PSEUDÓNIMO",
      dataIndex: "pseudo",
      key: "pseudo",
      align: "center",
      sorter: {
        compare: (a, b) => a.pseudo.localeCompare(b.pseudo),
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
    {
      title: "ACCIONES",
      dataIndex: "",
      key: "x",
      render: (_, record) => <CrudButton record={record} sofDelete={softDeleteLinea} tableName={"Linea"} setRowState={setRowState} />,
    }
  ]

  let { path } = useRouteMatch();
  let history = useHistory();

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
  };

  function handleClick() {
    console.log("ENTRA AL HANDLE CLICK");
    setPermiso(true);
    let record = {
      permiso: true,
      nuevo: true,
    };
    history.push(`${path}/nuevo`, record);
  }

  function ver(record) {
    record["permiso"] = false;
    alert("ENTRA A LA FUNCION VER" + JSON.stringify(record));
    history.push(`${path}/${record.id}/ver`, record);
  }

  const filtrar = (e) => {
    const currValue = e.target.value;
    setValue(currValue);
    const filteredData = lineas.filter(entry =>
      entry.nombre.toLowerCase().includes(currValue.toLowerCase()) || entry.pseudo.toLowerCase().includes(currValue.toLowerCase()));
    setDataSource(filteredData);
  }

  useEffect(() => {
    setEditLinea(null);
    // console.log("Usse Effect -> Value: " + value)
    setPermiso(false);
    if (!value) {
      setDataSource(lineas)
    }
  })

  return (
    <div>
      <Button type="primary" className="success" icon={<PlusOutlined />} onClick={handleClick}>Nuevo</Button>
      <Search
        placeholder="Buscar línea..."
        value={value}
        onChange={e => filtrar(e)}
        style={{ width: 200 }}
      />
      <br />
      <br />

      {/*lineas.length === 0 || isEmpty ? (
        // dataSource={state.hasData ? data : null}
        
        <Table locale={{ emptyText: 'No hay datos' }} columns={columns} dataSource={null} rowKey='id' onChange={handleChange} />) : (
        // <Spin indicator={antIcon} />

        <Table locale={{ emptyText: 'No hay datos' }} columns={columns} dataSource={dataSource} rowKey='id' onChange={handleChange} />
        )*/}

      {lineas.length > 0 || isEmpty ? (
        <Table
          locale={{ emptyText: 'No hay datos' }}
          columns={columns}
          dataSource={dataSource}
          rowKey='id'
          onChange={handleChange}
          pagination={{ defaultPageSize: 30 }}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                console.log(event);

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

