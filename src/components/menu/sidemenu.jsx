import React, { useState } from 'react';
import './sidemenu.css';
import { Menu } from 'antd';
import { AppstoreOutlined, DollarCircleOutlined,  MenuOutlined, HighlightOutlined, HomeOutlined, LineChartOutlined, FundOutlined, WechatOutlined, BarcodeOutlined } from '@ant-design/icons';
import { useHistory } from "react-router";
import { Row, Col, Drawer } from 'antd';
import { useRouteMatch } from 'react-router-dom';

const { SubMenu } = Menu;
/*class Sider extends React.Component {
  handleClick = e => {
    console.log('click ', e);
  };*/

const SideMenu = () => {

  let { path, url } = useRouteMatch();

  console.log("path2", path);
  let history = useHistory();
  
  const showAlert = () => {
    alert('Hola Mundo');
  };

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const ir =() =>{
    history.push(`${path}/productos`)
    window.location.reload()
  }

  return (
    <>
      <Row>
          <Col span={6} className="icons-submenu">
            <MenuOutlined onClick={showDrawer}/>
          </Col>
          <Col span={18}></Col>
      </Row>
      <Drawer
      title="PRODUCTOS - PALO ALTO"
      placement="left"
      closable={true}
      onClose={onClose}
      visible={visible}
      footer="2021 PA - TI | All Rights Reserved.">
        <Menu
          style={{ width: "100%" }}
          mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>INICIO</Menu.Item>
          <Menu.Item key="2" icon={<HighlightOutlined />}>LÍNEAS</Menu.Item>
          <Menu.Item key="3" icon={<FundOutlined />}>MARCAS</Menu.Item>
          <Menu.Item key="4" icon={<WechatOutlined />}>GRUPOS</Menu.Item>
          <Menu.Item key="5" icon={<DollarCircleOutlined />}>PROVEEDORES</Menu.Item>
          <Menu.Item key="6" icon={<BarcodeOutlined />} onClick={ir}>PRODUCTOS</Menu.Item>
          <SubMenu key="sub1" icon={<LineChartOutlined />} title="REPORTES">
            <Menu.Item key="7">VENTAS</Menu.Item>
            <Menu.Item key="8">STOCKS</Menu.Item>
            <Menu.Item key="9">PROMOCIONES</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="PERSONAS">
            <Menu.Item key="10">CLIENTES</Menu.Item>
            <Menu.Item key="11">COTIZAR</Menu.Item>
          </SubMenu>
        </Menu>
    </Drawer>
    </>
  )
}

export default SideMenu;

/*
  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          <Menu.ItemGroup key="g1" title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}*/