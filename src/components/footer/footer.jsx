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
                <Col span={8} className="labels-footer">Palo Alto - {(new Date().getFullYear())}</Col>
                <Col span={8} className="labels-footer">With <HeartOutlined spin="true" style={{ fontSize: '16px', color: 'rgb(255 0 0)' }}/> TI</Col>
                <Col span={8} className="labels-footer"><p>&copy; 2021 PA - TI | All Rights Reserved. <UserOutlined className="icons-footer"/></p></Col>
            </Row>
        </footer>
    )
}

export default Footer
