import React, { useContext } from "react";
import { Table } from "antd";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ProductoContext } from "../../../contexts/productoContext";

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
    },
    {
      title: "NOMBRE",
      dataIndex: "nombre",
      key: "nombre",
    },
  ];
  return (
    <div>
    {
        productos.length > 0 ?
      <Table columns={columns} dataSource={productos} /> : <Spin indicator={antIcon} />
    }
      {/* {JSON.stringify(productos)}  */}
    </div>
  );
};

export default ProductoList;
