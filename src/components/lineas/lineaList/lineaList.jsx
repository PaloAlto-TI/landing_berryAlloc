import React, { useContext } from "react";
// import { Table } from "antd";
// import { Spin } from 'antd';
// import { LoadingOutlined } from '@ant-design/icons';
import { LineaContext } from "../../../contexts/lineaContext";

const LineaList = () => {
    const { lineas } = useContext(LineaContext);
        return (<div>
            <span>HOLA A TODOS</span>
            {JSON.stringify(lineas)}
            </div>
            );

}

export default LineaList;

