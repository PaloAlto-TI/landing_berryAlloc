import React, { useContext, useState } from 'react';
import './sidemenu.css';
import { Menu } from 'antd';
import { /*StarOutlined, FormatPainterOutlined,*/ PlusCircleOutlined, DollarCircleOutlined,
  MenuOutlined, HighlightOutlined, HomeOutlined, LineChartOutlined, CodeSandboxOutlined,
  FundOutlined, BarcodeOutlined, BlockOutlined, BorderOutlined, DropboxOutlined, AppstoreAddOutlined
} from '@ant-design/icons';
import { SesionContext } from "../../contexts/sesionContext";
// import { useHistory } from "react-router";
//LDKJVBLKSJDBVKLDBVLK
import { Row, Col, Drawer } from 'antd';
import { useRouteMatch } from 'react-router-dom';
import Icon from '@ant-design/icons';
const Leafsvg = () => (
  <svg
    width="20px" height="20px" viewBox="0 0 414.000000 403.000000"
  >
<g transform="translate(0.000000,403.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M3050 3398 c-623 -76 -1105 -263 -1482 -577 -162 -135 -281 -304
-347 -495 -35 -100 -35 -103 -35 -271 -1 -150 2 -180 23 -255 30 -104 69 -202
121 -298 22 -41 40 -79 40 -86 0 -7 -30 -49 -66 -92 -230 -276 -339 -505 -360
-760 -6 -75 -5 -83 15 -103 26 -26 42 -26 71 -3 19 15 24 33 31 108 15 155 35
220 115 373 54 102 150 238 238 336 l45 50 78 -42 c101 -53 210 -96 315 -124
67 -18 110 -22 218 -22 148 0 196 9 310 54 376 151 672 576 839 1208 21 80 44
171 50 201 6 30 15 78 21 105 17 87 39 265 50 404 22 299 21 302 -122 300 -51
-1 -127 -6 -168 -11z m180 -214 c0 -58 -4 -135 -9 -172 -6 -37 -15 -105 -22
-152 -45 -335 -174 -755 -304 -995 -109 -202 -269 -396 -399 -483 -249 -168
-525 -179 -830 -34 -57 27 -107 55 -111 62 -5 8 93 113 287 309 410 412 588
611 588 655 0 32 -33 60 -63 52 -13 -3 -81 -70 -159 -158 -133 -150 -731 -758
-746 -758 -19 0 -113 212 -143 325 -32 117 -32 320 0 425 52 169 136 299 285
444 155 149 372 281 633 385 287 114 656 196 901 200 l92 1 0 -106z"/>
</g>
  </svg>

);

const Bambusvg = () => (
  <svg
    width="20px" height="20px" viewBox="0 0 185.000000 221.000000"
  >
<g transform="translate(0.000000,221.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M860 1835 c0 -220 -2 -265 -14 -265 -19 0 -107 67 -140 107 -56 66
-80 139 -86 258 l-5 110 -119 3 -119 3 6 -118 c8 -192 64 -329 182 -447 51
-51 102 -86 223 -155 l72 -42 0 -220 0 -221 -47 27 c-258 149 -359 214 -399
258 -63 70 -86 139 -92 270 l-4 107 -121 0 -120 0 7 -108 c12 -206 63 -331
185 -452 66 -65 109 -94 334 -224 l257 -149 0 -184 0 -183 115 0 115 0 2 316
3 317 172 96 c277 155 341 211 413 366 45 94 58 151 66 285 l7 100 -120 0
-121 0 -4 -107 c-3 -96 -7 -116 -35 -175 -18 -38 -51 -86 -76 -110 -39 -39
-272 -178 -297 -178 -7 0 -10 169 -10 490 l0 490 -115 0 -115 0 0 -265z"/>
</g>

  </svg>

);



const Leafico = props => <Icon component={Leafsvg} {...props} />;
const Bambuico = props => <Icon component={Bambusvg} {...props} />;

const { SubMenu } = Menu;
const SideMenu = () => {
  var { setMoved, sesions } = useContext(SesionContext);
  let { path } = useRouteMatch();
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
          <MenuOutlined />
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
        width="270px"

        footer="2021 PA - TI | All Rights Reserved." >
        <Menu
          style={{ width: "100%" }}
          mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}><a href={`${path}`}>INICIO</a></Menu.Item>
          {sesions ? sesions._usuario[0].rol === 2 ?
            <SubMenu key="sub1" icon={<PlusCircleOutlined />} title="CREAR">
              <Menu.Item key="2" icon={<HighlightOutlined />}><a href={`${path}/lineas`}>LÍNEAS</a></Menu.Item>
              <Menu.Item key="3" icon={<FundOutlined />}><a href={`${path}/marcas`}>MARCAS</a></Menu.Item>
              <SubMenu key="sub2" icon={<AppstoreAddOutlined />} title="GRUPOS">
                <Menu.Item key="4" icon={<BorderOutlined />}><a href={`${path}/grupos`}>GRUPOS</a></Menu.Item>
                <Menu.Item key="5" icon={<BlockOutlined />}><a href={`${path}/subgrupo`}>SUBGRUPOS</a></Menu.Item>
              </SubMenu>
              <Menu.Item key="6" icon={<DollarCircleOutlined />}><a href={`${path}/proveedores`}>PROVEEDORES</a></Menu.Item>
              <Menu.Item key="7" icon={<BarcodeOutlined />}><a href={`${path}/productos`}>PRODUCTOS</a></Menu.Item>
            </SubMenu>

            : <Menu.Item key="0" icon={<HomeOutlined />} style={{ backgroundColor: "white" }}>CREAR</Menu.Item> : null}
          {/*<Menu.Item key="2" icon={<HighlightOutlined />}><a href={`${path}/lineas`}>LÍNEAS</a></Menu.Item>
          <Menu.Item key="3" icon={<FundOutlined />}><a href={`${path}/marcas`}>MARCAS</a></Menu.Item>
          <SubMenu key="sub1" title="GRUPOS">
            <Menu.Item key="4" icon={<BorderOutlined />}><a href={`${path}/grupos`}>GRUPOS</a></Menu.Item>
            <Menu.Item key="5" icon={<BlockOutlined />}><a href={`${path}/subgrupo`}>SUBGRUPOS</a></Menu.Item>
          </SubMenu>
          <Menu.Item key="6" icon={<DollarCircleOutlined />}><a href={`${path}/proveedores`}>PROVEEDORES</a></Menu.Item>
  <Menu.Item key="7" icon={<BarcodeOutlined />}><a href={`${path}/productos`}>PRODUCTOS</a></Menu.Item>*/}
          {/* <Menu.Item key="8" icon={<FormatPainterOutlined />}><a href={`${path}/modelos`}>MODELOS</a></Menu.Item> */}
          {<SubMenu key="sub3" icon={<LineChartOutlined />} title="VISUALIZADORES">
            {/*<Menu.Item key="8" icon={<DropboxOutlined />}><a href={`${path}/visualizadores/stocks`}>STOCKS - OLD</a></Menu.Item>*/}
            {/* <Menu.Item key="8" icon={<DropboxOutlined />}><a href={`${path}/visualizadores/productoStocks`}>STOCKS</a></Menu.Item> */}
            {/* <Menu.Item key="8" icon={<DropboxOutlined />}><a href={`${path}/visualizadores/stocks`}>STOCKS</a></Menu.Item> */}

            <Menu.Item key="8" icon={<Leafico />}><a href={`${path}/visualizadores/productoshoja`}>PRODUCTOS HOJA</a></Menu.Item>
            <Menu.Item key="9" icon={<Bambuico />}><a href={`${path}/visualizadores/productospalo`}>PRODUCTOS PALO</a></Menu.Item>
          </SubMenu>
          /*<SubMenu key="sub2" icon={<AppstoreOutlined />} title="PERSONAS">
            <Menu.Item key="10">CLIENTES</Menu.Item>
            <Menu.Item key="11">COTIZAR</Menu.Item>
          </SubMenu> */}
        </Menu>
      </Drawer>
    </>
  )
}

export default SideMenu;