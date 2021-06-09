import React from "react";
import { PageHeader, Button } from "antd";
// import { PageHeader, Tag, Button, Statistic, Descriptions, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "./header.css";

localStorage.setItem("sta","1888.25.22500");

const tt = localStorage.getItem("sta");

console.log('LOCAL STOR:' + tt)

const jsUSer = {
  "userName": "Ing. Vergara"
}
const Header = () => {

  return (
    <header>
      <PageHeader
        className="main-header"
        onBack={() => null}
        title="Palo Alto"
        subTitle="Especialista en Pisos"
        extra={[
          // <Button key="3">Op2</Button>,
          // <Button key="2">Op1</Button>,
          <Button key="1" icon={<UserOutlined />}>
            {jsUSer.userName} {tt}
          </Button>,
        ]}
      />
    </header>
  );
};

export default Header;
