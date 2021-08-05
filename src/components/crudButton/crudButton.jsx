import React, { useState } from "react";
import { Menu, Dropdown } from "antd";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Modal } from 'antd';
import { DeleteFilled, EditFilled} from "@ant-design/icons";

const CrudButton = (props) => {
  const { record, softDelete, setRowState, typeTransaction } = props;
  let { path } = useRouteMatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // console.log("EL TIPO DE TRANSACTION: " + JSON.stringify(typeTransaction));
  // console.log("EL SOFDELETE DE CRUDBUTTON: " + softDelete);
  // console.log("EL ROWSTATE = ", setRowState )
  
  const showModal = () => {
    setRowState(false);
    setIsModalVisible(true);
  };

  const handleOk = async() => {
    setRowState(true);
    softDelete(record);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setRowState(true);
    setIsModalVisible(false);
  };

  function handleMenuClick(e) {
    // console.log("click", e);
  }

  let history = useHistory();

  function eliminar() {
    showModal();
  }

  function editar() {
    record["permiso"] = true;
    // console.log("ENTRA  EL TYPE AL EDITAR DEL CRUD CON " + JSON.stringify(typeTransaction));
    // console.log("ENTRA EL RECORD AL EDITAR DEL CRUD CON " + JSON.stringify(record));
  //---------------------------Master.------------------------------------------
    history.push(`${path}/${record.codigo_interno}/editar`);
  
    //}
    //---------------------------Master.------------------------------------------

    if (typeTransaction === null || typeTransaction === undefined){

      history.push(`${path}/${record.codigo_interno}/editar`, record);
      
    } else {

      switch(typeTransaction.byIdPSQL) {
        case true:
          return history.push(`${path}/${record.id}/editar`, record);
        default:
          return history.push(`${path}/${record.codigo_interno}/editar`, record);
        } 
    }

    // typeTransaction ? ( history.push(`${path}/${record.codigo_interno}/editar`, record)
    //   ) : history.push(`${path}/${record.codigo_interno}/editar`, record);
    
      // switch(typeTransaction.byIdPSQL) {
      //   case true:
      //     return history.push(`${path}/${record.id}/editar`, record);
      //   default:
      //     return history.push(`${path}/${record.codigo_interno}/editar`, record);
      //   } 

    // : history.push(`${path}/${record.codigo_interno}/editar`, record);

    // {isLoggedIn
    //   ? <LogoutButton onClick={this.handleLogoutClick} />
    //   : <LoginButton onClick={this.handleLoginClick} />
    // }

    // history.push(`${path}/${record.codigo_interno}/editar`, record);
  }
  
  const menu = (
    <Menu onClick={handleMenuClick}>
      {/* <Menu.Item icon={<EyeFilled />}key="1" onClick={ver}>
        Ver
      </Menu.Item> */}
      <Menu.Item icon={<EditFilled />} key="2" onClick={editar}>
        Editar
      </Menu.Item>
      <Menu.Item icon={<DeleteFilled />}key="3" onClick={eliminar}>
        Eliminar
      </Menu.Item>
    </Menu>
  );
  return (
    // OBSERVACIÓN 22/07/2021: En el renderizado condiconal para la etiqueta de: ¿ Está seguro que desea eliminar : {record.nombre} se deja 
    // por default el atributo nombre para que en futuros casos que tabla no tenga el campo "nombre", se pueda asignar otro valor
    <>
      <Dropdown.Button overlay={menu} placement="bottomCenter"></Dropdown.Button>
      <Modal title={"ELIMINAR " + (typeTransaction === null || typeTransaction === undefined ? "REGISTRO" : typeTransaction.labelCrudSingle)} 
        okType="danger" okText="Eliminar" cancelText="Cancelar" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>¿ Está seguro que desea eliminar {record.nombre ? record.nombre : record.nombre } ?</p>
      </Modal>
    </>
  );
};

export default CrudButton;