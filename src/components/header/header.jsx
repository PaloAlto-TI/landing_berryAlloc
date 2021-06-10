import React from "react";
import { Menu, Button, Dropdown } from "antd";
// import { PageHeader, Tag, Button, Statistic, Descriptions, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "./header.css";
import { Row, Col } from 'antd';

const userName = JSON.parse(localStorage.getItem("user"));

console.log('LOCAL STOR:' + localStorage)

// const jsUSer = {  "userName": "Ing. Vergara"}

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        Account Info
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        Log Out
      </a>
    </Menu.Item>
  </Menu>
);

const Header = () => {

  return (
    <header className="main-header">
      <Row>
      <Col span={6} className="labels-header">PALO ALTO - Especialista en Pisos</Col>
      <Col span={12}>col-8</Col>
      <Col span={6}><Dropdown overlay={menu} placement="bottomLeft">
      <Button icon={<UserOutlined />}>{userName.nombre}</Button>
      </Dropdown></Col>
    </Row>
    </header>
  );
};

export default Header;
