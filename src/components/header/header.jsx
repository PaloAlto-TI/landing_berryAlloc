import React from "react";
import { Menu, Button, Dropdown, Row, Col} from "antd";
import { UserOutlined } from '@ant-design/icons';
import SideMenu from "../../components/menu/sidemenu";
import "./header.css";
import { useHistory } from "react-router";

const Header = () => {
  let history = useHistory();
  const userName = JSON.parse(localStorage.getItem("user"));

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <a target="_blank" rel="noopener noreferrer" href="./">
          Account Info
        </a>
      </Menu.Item>
      <Menu.Item key="2" onClick={e => { logOut();   }}>
          Log Out
      </Menu.Item>
    </Menu>
    
  );
  
  function logOut() {
    localStorage.clear();
    history.push("/login");
  }

  return (
    <header className="main-header">
      { localStorage.getItem("user") === null ? logOut():
      <Row>
      <Col span={8} className="labels-header">PALO ALTO - Especialista en Pisos</Col>
      <Col span={8}></Col>
      <Col span={8} className="icons-end-header"><Dropdown overlay={menu} placement="bottomLeft">
        <Button icon={<UserOutlined />}>{userName.nombre}</Button>
        </Dropdown>
      </Col>
    </Row>
    
    }
    </header>
  );
};

export default Header;
