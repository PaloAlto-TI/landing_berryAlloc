import React, { useContext, useState } from "react";
import { Menu, Dropdown } from "antd";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Modal } from 'antd';
import { DeleteFilled, EditFilled, EyeFilled } from "@ant-design/icons";

const CrudButton = (props) => {
const { record, softDelete, tableName} = props;
const [isModalVisible, setIsModalVisible] = useState(false);
let { path } = useRouteMatch();
// const { softDeleteProducto, setPermiso } = useContext(ProductoContext);
const showModal = () => {
  setIsModalVisible(true);
};

const handleOk = () => {
  softDelete(record);
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
    record["permiso"] = false;
    console.log("EL RECORD: " + JSON.stringify(record));
    console.log("EL tableName: " + tableName);

    switch(tableName) {
      case 'Linea':
      case 'Marca':
      case 'Grupo':
        return history.push(`${path}/${record.pseudo}/ver`, record);
      
      case 'Producto':
        return history.push(`${path}/${record.codigo_interno}/ver`, record);

       default:
        return history.push(`${path}/${record.codigo_interno}/ver`, record);// Definir bien esta parte ya que no todos tienen un codigo/codigo_interno
    }
    
  }

  function editar() {
    record["permiso"] = true;
    history.push(`${path}/${record.codigo_interno}/editar`, record);
  }


  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item icon={<EyeFilled />}key="1" onClick={ver}>
        Ver
      </Menu.Item>

      <Menu.Item icon={<EditFilled />} key="2" onClick={editar}>
        Editar
      </Menu.Item>
      <Menu.Item icon={<DeleteFilled />}key="3" onClick={showModal}>
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