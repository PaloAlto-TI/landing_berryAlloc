import React from "react";
import { Menu, Button, Dropdown } from "antd";
// import { PageHeader, Tag, Button, Statistic, Descriptions, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "./header.css";
import { Row, Col } from 'antd';
import { useHistory } from "react-router";

// const jsUSer = {  "userName": "Ing. Vergara"}
const Header = () => {
  let history = useHistory();
  const userName = JSON.parse(localStorage.getItem("user"));
  console.log('LOCAL STOR HEEEEADER:' + localStorage);

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
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
      <Col span={6} className="labels-header">PALO ALTO - Especialista en Pisos</Col>
      <Col span={12}>col-8</Col>
      <Col span={6}><Dropdown overlay={menu} placement="bottomLeft">
      <Button icon={<UserOutlined />}>{userName.nombre}</Button>
      </Dropdown></Col>
    </Row>
    }
    </header>
  );
};

export default Header;
