import React, { useContext, useEffect, useState } from "react";
import { Spin, Button, Table } from "antd";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import CrudButton from "../../crudButton/crudButton";
import { GrupoContext } from "../../../contexts/grupoContext";
import { useHistory } from "react-router";
import { useRouteMatch } from "react-router-dom";
import Search from "antd/lib/input/Search";
import './grupoList.css';

const GrupoList = () => {
  const { /*grupos,*/ grupo_marcas_nn, setPermiso, setEditGrupo, isEmpty, softDeleteGrupo } = useContext(GrupoContext);
  const [value, setValue] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [rowState, setRowState] = useState(true);

  // const [filteredInfo, setFilteredInfo] = useState([]);
  // console.log("LOS GRUPOS SIN MARCAS: " + JSON.stringify(grupos));
  // console.log("LOS GRUPOS CON MARCAS: " + JSON.stringify(grupo_marcas_nn));

  const columns = [
    {
      title: "NOMBRE",
      dataIndex: "nombre",
      key: "nombre",
      sorter: {
        compare: (a, b) => a.nombre.localeCompare(b.nombre),
      },
      showSorterTooltip: true,
      width: '15%'
    },
    {
      title: "PSEUDÓNIMO",
      dataIndex: "pseudo",
      key: "pseudo",
      align: "center",
      sorter: {
        compare: (a, b) => a.pseudo.localeCompare(b.pseudo),
      },
      showSorterTooltip: false,
      width: '10%'
    },
    // 06/08/2021 - OBSERVACIÓN: ANALIZAR SI SE DEBE VER UNA MANERA DE QUE PUEDA BUSCAR POR LOS ANIDADOS -MC 
    {
      title: "SUBGRUPO",
      dataIndex: "fk_subgrupo",
      key: "fk_subgrupo",
      // className: "longText",
      showSorterTooltip: false,
      sorter: {
        compare: (a, b) => a.fk_subgrupo.localeCompare(b.fk_subgrupo),
      },
      render: (subgrupoGrupo, record) => (
        <p>
          {subgrupoGrupo? subgrupoGrupo.nombre : 'N/A' }
        </p>
      ),
      width: '15%'
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
      width: '25%'
    },
    {
      title: "MARCAS",
      dataIndex: "grupo_marcas_nn",
      key: "grupo_marcas_nn",
      className: "longText",
      showSorterTooltip: false,
      sorter: {
        compare: (a, b) => a.grupo_marcas_nn.localeCompare(b.grupo_marcas_nn),
      },
      render: (grupoMarca, record) => (
        <p>
          {grupoMarca.length > 0 ? grupoMarca.map(x=>x.nombre).join(", ") : 'N/A' }
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
          softDelete={softDeleteGrupo}
          typeTransaction={typeTransactionData}
          setRowState={setRowState} 
        />
      ),
      width: '5%'
    },
  ]

   let { path } = useRouteMatch();
   let history = useHistory()

   const typeTransactionData = {
     tableNamePSQL: "grupo",
     byIdPSQL: true,
     byInternalCodePSQL: false,
     dependenciesPSQL: false,
     labelCrudPlural: "GRUPOS",
     labelCrudSingle: "GRUPO"
   };

  const handleChange = (pagination, filters, sorter) => {
    // setFilteredInfo(filters); No se usa a nivel de Grupo porque no tiene un filtro directo a nivel de tabla
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
    const filteredData = grupo_marcas_nn.filter(entry =>
      entry.nombre.toLowerCase().includes(currValue.toLowerCase()) || entry.pseudo.toLowerCase().includes(currValue.toLowerCase())
      );
    setDataSource(filteredData);
  }

  useEffect(() => {
    
    setEditGrupo(null);
    setPermiso(false);

    if (!value) {
      setDataSource(grupo_marcas_nn)
    }
  })

  return (
    <div>
      <Button type="primary" className="success" icon={<PlusOutlined />} onClick={handleClick}>Nuevo</Button>
      <Search
        placeholder="Buscar Grupo..."
        value={value}
        onChange={e => filtrar(e)}
        style={{ width: 200 }}
      />
      <br /><br />

      {grupo_marcas_nn.length > 0 || isEmpty ? (
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

export default GrupoList;