import React from 'react'
import "./footer.css";
import { HeartOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import imagentaco from "./taco1.png"

const Footer = () => {
    return (
        <footer className="main-footer">
            <Row>
                <Col span={8} className="labels-footer" style={{ textAlign: 'left', paddingLeft: '20px'}}>Palo Alto - {(new Date().getFullYear())}</Col>
                {/* <Col span={8} className="labels-footer">With <a href={'https://www.youtube.com/watch?v=ZZmW0iiRGAs'} target="_blank" rel="noreferrer"><HeartOutlined spin="false" style={{ fontSize: '16px', color: 'rgb(255 0 0)' }}/></a> TI</Col> */}
                <Col span={8} className="labels-footer" ><img src={imagentaco} alt="Logo" style={{height:"25px",width:"25px"}}/>  TACO</Col>
                {/* <Col span={8} className="labels-footer">With <a href={'https://www.youtube.com/watch?v=ZZmW0iiRGAs'} target="_blank" rel="noreferrer"><HeartOutlined  style={{ fontSize: '16px', color: 'rgb(255 0 0)' }}/></a> TI</Col> */}
                <Col span={8} className="labels-footer" style={{ textAlign: 'right', paddingRight: '20px'}}><p>&copy; 2021 PA - TI | All Rights Reserved.</p></Col>
            </Row>
        </footer>
    )
}

export default Footer
