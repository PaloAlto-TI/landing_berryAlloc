import React, { useContext, useEffect, useState } from "react";
import { Spin, Button, Table } from "antd";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import CrudButton from "../../crudButton/crudButton";
import { ProveedorContext } from "../../../contexts/proveedorContext";
import { useHistory } from "react-router";
import { useRouteMatch } from "react-router-dom";
import Search from "antd/lib/input/Search";
import './proveedorList.css';

const ProveedorList = () => {
    const { /*proveedores,*/ proveedores_marcas_nn, setPermiso, setEditProveedor, isEmpty, softDeleteProveedor } = useContext(ProveedorContext);
    const [value, setValue] = useState(null);
    const [dataSource, setDataSource] = useState([]);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const [rowState, setRowState] = useState(true);

    // console.log("LAS PROVEEDORES SIN MARCAS: " + JSON.stringify(proveedores));
    // console.log("LAS PROVEEDORES CON MARCAS: " + JSON.stringify(proveedores_marcas_nn));

    const columns = [
        {
          title: "NOMBRE",
          dataIndex: "nombre",
          key: "nombre",
          sorter: {
            compare: (a, b) => a.nombre.localeCompare(b.nombre),
          },
          showSorterTooltip: true,
          width: '30%'
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
          title: "MARCAS",
          dataIndex: "proveedor_marcas_nn",
          key: "proveedor_marcas_nn",
          className: "longText",
          showSorterTooltip: false,

          render: (proveedorMarca, record) => (
            <p>
              {proveedorMarca.length > 0 ? proveedorMarca.map(x=>x.nombre).join(", ") : 'N/A' }
            </p>
          ),
          width: '30%'
        },
        {
          title: "ACCIONES",
          dataIndex: "",
          align: "center",
          key: "x",
          render: (_, record) => (
            <CrudButton
              record={record}
              softDelete={softDeleteProveedor}
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
      tableNamePSQL: "proveedor",
      byIdPSQL: true,
      byInternalCodePSQL: false,
      dependenciesPSQL: false,
      labelCrudPlural: "PROVEEDORES",
      labelCrudSingle: "PROVEEDOR"
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
      alert("ENTRA A LA FUNCION VER" + JSON.stringify(record));
      // history.push(`${path}/${record.id}/ver`, record);
    }
    
    const filtrar = (e) => {
      const currValue = e.target.value;
      setValue(currValue);
      // const filteredData = marcas_lineas_nn.filter(entry =>
      const filteredData = proveedores_marcas_nn.filter(entry =>
        entry.nombre.toLowerCase().includes(currValue.toLowerCase()) || entry.descripcion.toLowerCase().includes(currValue.toLowerCase()));
      setDataSource(filteredData);
    }
    
    useEffect(() => {
      setEditProveedor(null);
      setPermiso(false);

      if (!value) {
        setDataSource(proveedores_marcas_nn)
      }
    })

    return (
        <div>
          <Button type="primary" className="success" icon={<PlusOutlined />} onClick={handleClick}>Nuevo</Button>
          <Search
            placeholder="Buscar Proveedor..."
            value={value}
            onChange={e => filtrar(e)}
            style={{ width: 200 }}
          />
          <br /><br />
    
          {proveedores_marcas_nn.length > 0 || isEmpty ? (
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

export default ProveedorList;