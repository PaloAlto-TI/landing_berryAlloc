import React, { useContext, useEffect, useState } from "react";
import { Spin, Button, Table } from "antd";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import CrudButton from "../../crudButton/crudButton";
import { ModeloContext } from "../../../contexts/modeloContext";
import { useHistory } from "react-router";
import { useRouteMatch } from "react-router-dom";
import Search from "antd/lib/input/Search";
import './modeloList.css';

const ModeloList = () => {
    const { /*modelos,*/ modelo_grupos_nn, setPermiso, setEditModelo, isEmpty/*, softDeleteModelo*/ } = useContext(ModeloContext);
    const [value, setValue] = useState(null);
    const [dataSource, setDataSource] = useState([]);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const [rowState, setRowState] = useState(true);
    
    // console.log("LOS MODELOS CON GRUPOS: " + JSON.stringify(modelo_grupos_nn));
    
    const columns = [
        {
          title: "NOMBRE",
          dataIndex: "nombre",
          key: "nombre",
          sorter: {
            compare: (a, b) => a.nombre.localeCompare(b.nombre),
          },
          showSorterTooltip: true,
          width: '25%'
        },
        {
          title: "PSEUDÓNIMO",
          dataIndex: "pseudo",
          key: "pseudo",
          sorter: {
            compare: (a, b) => a.pseudo.localeCompare(b.pseudo),
          },
          showSorterTooltip: false,
          width: '15%'
        },
        {
            title: "CÓDIGO",
            dataIndex: "codigo",
            key: "codigo",
            sorter: {
              compare: (a, b) => a.codigo.localeCompare(b.codigo),
            },
            showSorterTooltip: false,
            width: '20%'
        },
        {
          title: "GRUPOS",
          dataIndex: "color_grupos_nn",
          key: "color_grupos_nn",
          className: "longText",
          showSorterTooltip: false,
          render: (gruposModelo, record) => (
            <p>
              {gruposModelo.length > 0 ? gruposModelo.map(x=>x.nombre).join(", ") : 'N/A' }
            </p>
          ),
          width: '35%'
        },
        {
          title: "ACCIONES",
          dataIndex: "",
          align: "center",
          key: "x",
          render: (_, record) => (
            <CrudButton
              record={record}
              // softDelete={softDeleteProveedor}
              typeTransaction={typeTransactionData}
              setRowState={setRowState} 
            />
          ),
          width: '5%'
        },
      ];  

    let { path } = useRouteMatch();
    let history = useHistory();

    const typeTransactionData = {
      tableNamePSQL: "color",
      byIdPSQL: true,
      byInternalCodePSQL: false,
      dependenciesPSQL: false,
      labelCrudPlural: "MODELOS",
      labelCrudSingle: "MODELO"
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
      // console.log("EL CUURR VALUE: " + currValue)
      setValue(currValue);
      /*const filteredData = modelos.filter(entry =>
      entry.nombre.toLowerCase().includes(currValue.toLowerCase()));*/
      const filteredData = modelo_grupos_nn.filter(entry =>
      entry.nombre.toLowerCase().includes(currValue.toLowerCase()));
      setDataSource(filteredData);
    }
    
    useEffect(() => {
      setEditModelo(null);
      setPermiso(false);

      if (!value) {
        // setDataSource(modelos)
        setDataSource(modelo_grupos_nn)
      }
    })

    return (
        <div>
          <Button type="primary" className="success" icon={<PlusOutlined />} onClick={handleClick}>Nuevo</Button>
          <Search
            placeholder="Buscar Modelo..."
            value={value}
            onChange={e => filtrar(e)}
            style={{ width: 200 }}
          />
          <br /><br />
    
          {modelo_grupos_nn.length > 0 || isEmpty ? (
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

export default ModeloList;