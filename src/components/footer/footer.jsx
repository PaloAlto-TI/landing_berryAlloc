import React from 'react'
import "./footer.css";
// import { PageHeader, Button } from "antd";
// import { PageHeader, Tag, Button, Statistic, Descriptions, Row } from 'antd';
import { UserOutlined, HeartOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';

const Footer = () => {
    return (
        <footer className="main-footer">
            <Row>
                <Col span={6} className="labels-footer" style={{ alignSelf: 'end' }}>Palo Alto - {(new Date().getFullYear())}</Col>
                <Col span={12} className="labels-footer">With <a href={'https://www.youtube.com/watch?v=ZZmW0iiRGAs'} target="_blank" rel="noreferrer"><HeartOutlined spin="true" style={{ fontSize: '16px', color: 'rgb(255 0 0)' }}/></a> TI</Col>
                <Col span={6} className="labels-footer"><p>&copy; 2021 PA - TI | All Rights Reserved. <UserOutlined className="icons-footer"/></p></Col>
            </Row>
        </footer>
    )
}

export default Footer
