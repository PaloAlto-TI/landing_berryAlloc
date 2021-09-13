import { InfoCircleOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Spin, Tooltip } from 'antd'
import React, { useState } from 'react'
import { ProductoService } from '../../../services/productoService';

const QueryButton = (props) => {

    console.log(props.record);
    const [stock, setStock] = useState("CONSULTAR")
    const [isLoading, setIsLoading] = useState(false)
  const [stockBodegas, setstockBodegas] = useState(null);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const stockPorBodegas = async () => {
        let data = await new ProductoService().getStockBodegas(stock.id);
    
        var list = data.map(function (d) {
          return <div style={{fontSize:13}} key={d.bodega_id}>{d.bodega_nombre + " : " + d.cantidad}</div>;
        });
    
        setstockBodegas(list);
      };

    return (
        stock === "CONSULTAR" && !isLoading  ?
        <Button style={{fontSize:12}} icon={<SearchOutlined />} onClick={() => {  setIsLoading(true); new ProductoService().getStock(props.record.codigo_temporal ? props.record.codigo_temporal : 'N/A').then(data => {setStock(data); setIsLoading(false)}) }}>
            {stock}
        </Button> : isLoading ?  <Spin indicator={antIcon} /> : <p>{stock.cantidad_stock} <Tooltip
                            onClick={() => stockPorBodegas()}
                            trigger="click"
                            placement="right"
                            title={stockBodegas ? stockBodegas : "Cargando..."}
                          >
                            {stock && stock.cantidad_stock !== "N/A" && (
                              <InfoCircleOutlined />
                            )}
                          </Tooltip></p>
    )
}

export default QueryButton
