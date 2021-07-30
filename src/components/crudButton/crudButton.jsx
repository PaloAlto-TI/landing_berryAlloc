import React, { useState } from "react";
import { Menu, Dropdown } from "antd";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Modal } from 'antd';
// import { ProductoContext } from "../../contexts/productoContext";
import { DeleteFilled, EditFilled} from "@ant-design/icons";

const CrudButton = (props) => {

  
  const { record, softDelete, setRowState } = props;
  let { path } = useRouteMatch();

  console.log("path2", path);

  const [isModalVisible, setIsModalVisible] = useState(false);
  // const { softDeleteProducto, setPermiso } = useContext(ProductoContext);
  
  const showModal = () => {
    setRowState(false);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setRowState(true);
    softDelete(record);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setRowState(true);
    setIsModalVisible(false);
  };

  function handleMenuClick(e) {
    console.log("click", e);
  }

  let history = useHistory();

  // function ver() {
  //   record["permiso"] = false;
  //   history.push(`${path}/${record.codigo_interno}/ver`, record);
  // }

  function editar() {
    record["permiso"] = true;
    history.push(`${path}/${record.codigo_interno}/editar`);
  }


  const menu = (
    <Menu onClick={handleMenuClick}>
      {/* <Menu.Item icon={<EyeFilled />}key="1" onClick={ver}>
        Ver
      </Menu.Item> */}

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
      <Dropdown.Button overlay={menu} placement="bottomCenter"></Dropdown.Button>
      <Modal title="Eliminar Producto" okType="danger" okText="Eliminar" cancelText="Cancelar" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>¿Está seguro que desea eliminar {record.nombre}?</p>
      </Modal>
    </>
  );
};

export default CrudButton;
