import React from "react";
import { Menu, Dropdown } from "antd";
import { useHistory } from "react-router-dom";

const CrudButton = () => {
  function handleMenuClick(e) {
    console.log("click", e);
  }

  let history = useHistory();

  function handleClick() {
    history.push("/producto");
  }

  const menu = (
    <Menu onClick={handleMenuClick}>

        <Menu.Item key="1" onClick={handleClick}>
          Ver
        </Menu.Item>
    
      <Menu.Item key="2" onClick={() => console.log("editar")}>
        Editar
      </Menu.Item>
      <Menu.Item key="3" onClick={() => console.log("eliminar")}>
        Eliminar
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Dropdown.Button overlay={menu}></Dropdown.Button>
    </>
  );
};

export default CrudButton;
