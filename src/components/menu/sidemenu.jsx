import React, { useState } from 'react';
import './sidemenu.css';
import { Menu } from 'antd';
import { StarOutlined,FormatPainterOutlined, DollarCircleOutlined,  MenuOutlined, HighlightOutlined, HomeOutlined, /*LineChartOutlined,*/ FundOutlined, WechatOutlined, BarcodeOutlined } from '@ant-design/icons';
// import { useHistory } from "react-router";
//LDKJVBLKSJDBVKLDBVLK
import { Row, Col, Drawer } from 'antd';
import { useRouteMatch } from 'react-router-dom';

// const { SubMenu } = Menu;
const SideMenu = () => {
let { path} = useRouteMatch();
  // let history = useHistory();
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
// onClick={e => { history.push(`${path}`); window.location.reload(); }}
  return (
    <>
      <Row>
          <Col span={2} className="icons-submenu" onClick={showDrawer}>
            <MenuOutlined/>
            &nbsp;&nbsp;Menú
          </Col>
          <Col span={22}></Col>
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
          <Menu.Item key="1" icon={<HomeOutlined />}><a href={`${path}`}>INICIO</a></Menu.Item>
          <Menu.Item key="2" icon={<HighlightOutlined />}><a href={`${path}/lineas`}>LÍNEAS</a></Menu.Item>
          <Menu.Item key="3" icon={<FundOutlined />}><a href={`${path}/marcas`}>MARCAS</a></Menu.Item>
          <Menu.Item key="4" icon={<WechatOutlined />}><a href={`${path}/grupos`}>GRUPOS</a></Menu.Item>
          <Menu.Item key="5" icon={<DollarCircleOutlined />}><a href={`${path}/proveedores`}>PROVEEDORES</a></Menu.Item>
          <Menu.Item key="6" icon={<BarcodeOutlined />}><a href={`${path}/productos`}>PRODUCTOS</a></Menu.Item>
          <Menu.Item key="8" icon={<FormatPainterOutlined />}><a href={`${path}/modelos`}>MODELO</a></Menu.Item>
          <Menu.Item key="7" icon={<StarOutlined />}><a href={`${path}/subgrupo`}>SUBGRUPO</a></Menu.Item>

          {/* <SubMenu key="sub1" icon={<LineChartOutlined />} title="REPORTES">
            <Menu.Item key="7">VENTAS</Menu.Item>
            <Menu.Item key="8">STOCKS</Menu.Item>
            <Menu.Item key="9">PROMOCIONES</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="PERSONAS">
            <Menu.Item key="10">CLIENTES</Menu.Item>
            <Menu.Item key="11">COTIZAR</Menu.Item>
          </SubMenu> */}
        </Menu>
    </Drawer>
    </>
  )
}

export default SideMenu;