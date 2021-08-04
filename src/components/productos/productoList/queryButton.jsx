import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd'
import React, { useState } from 'react'
import { ProductoService } from '../../../services/productoService';

const QueryButton = (props) => {

    const {setClick} = props
    const [stock, setStock] = useState("CONSULTAR")
    return (
        stock === "CONSULTAR" ?
        <Button icon={<SearchOutlined />} onClick={() => {new ProductoService().getStock(props.record.codigo_interno).then(data => setStock(data)) }}>
            {stock}
        </Button> : <p>{stock}</p>
    )
}

export default QueryButton
