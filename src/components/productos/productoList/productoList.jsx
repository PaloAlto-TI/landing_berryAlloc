import React, { useContext } from "react";
import { Table } from "antd";
import { Spin } from "antd";
import { Button} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { LoadingOutlined } from "@ant-design/icons";
import { ProductoContext } from "../../../contexts/productoContext";
import CrudButton from "../../crudButton/crudButton";
import { useHistory } from "react-router";

const ProductoList = () => {
  const { productos } = useContext(ProductoContext);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "CÓDIGO INTERNO",
      dataIndex: "codigo_interno",
      key: "codigo_interno",
      width: 150,
    },
    {
      title: "NOMBRE",
      dataIndex: "nombre",
      key: "nombre",
    },

    {
      title: "ACCION",
      dataIndex: "",
      key: "x",
      render: (_, record) => <CrudButton record={record} />,
    },
  ];

  let history = useHistory();

  function handleClick() {
    history.push("/producto");
  }

  
  return (
    <div>
    <Button type="primary" icon={<PlusOutlined />} onClick={handleClick}>
      Nuevo
    </Button>
      {productos.length > 0 ? (
        <Table columns={columns} dataSource={productos} rowKey='id'/>
      ) : (
        <Spin indicator={antIcon} />
      )}
      {/* {JSON.stringify(productos)}  */}
    </div>
  );
};

export default ProductoList;
