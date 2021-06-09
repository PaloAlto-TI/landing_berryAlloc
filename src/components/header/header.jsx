import React from "react";
import { PageHeader, Button } from "antd";
// import { PageHeader, Tag, Button, Statistic, Descriptions, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "./header.css";




// const jsUSer = {  "userName": "Ing. Vergara"}
const Header = () => {
  const userName = JSON.parse(localStorage.getItem("user"));
  console.log('LOCAL STOR:' + localStorage)

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
            {userName.nombre}
          </Button>,
        ]}
      />
    </header>
  );
};

export default Header;
