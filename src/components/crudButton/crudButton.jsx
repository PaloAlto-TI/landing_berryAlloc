import React, { useContext, useState } from "react";
import { Menu, Dropdown } from "antd";
import { useHistory } from "react-router-dom";
import { Modal } from 'antd';
import { ProductoContext } from "../../contexts/productoContext";

const CrudButton = (props) => {


  const { record } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const { softDeleteProducto, setPermiso } = useContext(ProductoContext);
  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    softDeleteProducto(record);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function handleMenuClick(e) {
    console.log("click", e);
  }

  let history = useHistory();

  function ver() {
    localStorage.setItem("permiso", false)
    history.push("/producto", record);
  }

  function editar() {
    setPermiso(true);
    history.push("/producto", record);
  }


  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" onClick={ver}>
        Ver
      </Menu.Item>

      <Menu.Item key="2" onClick={editar}>
        Editar
      </Menu.Item>
      <Menu.Item key="3" onClick={showModal}>
        Eliminar
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Dropdown.Button overlay={menu}></Dropdown.Button>
      <Modal title="Eliminar Producto" okType="danger" okText="Eliminar" cancelText="Cancelar" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>¿Está seguro que desea eliminar {record.nombre}?</p>
      </Modal>
    </>
  );
};

export default CrudButton;
