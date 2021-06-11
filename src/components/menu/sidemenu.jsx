import React, { useState } from 'react';
import './sidemenu.css';
import { Menu } from 'antd';
import { AppstoreOutlined, DollarCircleOutlined,  MenuOutlined, HighlightOutlined, HomeOutlined, LineChartOutlined, FundOutlined, WechatOutlined, BarcodeOutlined } from '@ant-design/icons';
import { useHistory } from "react-router";
import { Row, Col, Drawer } from 'antd';
import { useRouteMatch } from 'react-router-dom';

const { SubMenu } = Menu;
const SideMenu = () => {

  let { path} = useRouteMatch();
  let history = useHistory();

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

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
          <Menu.Item key="1" icon={<HomeOutlined />} onClick={e => { history.push(`${path}`); window.location.reload(); }}>INICIO</Menu.Item>
          <Menu.Item key="2" icon={<HighlightOutlined />}>LÍNEAS</Menu.Item>
          <Menu.Item key="3" icon={<FundOutlined />}>MARCAS</Menu.Item>
          <Menu.Item key="4" icon={<WechatOutlined />}>GRUPOS</Menu.Item>
          <Menu.Item key="5" icon={<DollarCircleOutlined />}>PROVEEDORES</Menu.Item>
          <Menu.Item key="6" icon={<BarcodeOutlined />} onClick={e => { history.push(`${path}/productos`); window.location.reload(); }}>PRODUCTOS</Menu.Item>
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