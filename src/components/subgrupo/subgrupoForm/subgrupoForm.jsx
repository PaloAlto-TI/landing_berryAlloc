import { Button, Col, Divider, Input, message, Row } from 'antd'
import { Redirect, useParams } from "react-router-dom";import Form from 'antd/lib/form'
import TextArea from 'antd/lib/input/TextArea'
import React,{ useContext, useEffect, useState }  from 'react'
import SelectOpciones from '../../selectOpciones/selectOpciones'
import { SubgrupoContext } from "../../../contexts/subgrupoContext";
import { useHistory } from "react-router";


const SubgrupoForm = () => {
    const [id, setId] = useState(null);
    let { codigo, operacion } = useParams();
    let history = useHistory();

    useEffect(async () => {
        console.log("EL EDITMARCA EN USEEFFECT: " + JSON.stringify(editSubgrupo))
       // console.log(crud);
        //console.log(operacion);
        if (crud === null) {
          setCrud(operacion === "editar" || codigo === "nuevo" ? true : false);
        }
        
    
        if (editSubgrupo) {
    
          setId(editSubgrupo.id);
          
        } else {
            //console.log(codigo);
             findSubgrupo(codigo);
           // console.log(editSubgrupo);
        }
    
    });
     
  const [crud, setCrud] = useState(
    operacion === "editar" || codigo === "nuevo" ? true : false
  );
  

    const {  subgrupos,updateSubgrupo, createSubgrupo,findSubgrupo,editSubgrupo } = useContext(SubgrupoContext);

    const onFinish = async (values) => {

        let data =null
        console.log("values "+JSON.stringify(values));
        console.log("id "+id);
        if (id) {
            values["id"]=id;
           data= await updateSubgrupo(values);
            
           // data = await updateMarca([values, jsonLineasMarcas]);

        }
        else
        {
           data = await createSubgrupo(values)
        }

        message.info(data).then(p=>history.push("/home/subgrupo"));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    let initialValues = {
        descripcion: ''
      };


    return (
        <>
        {editSubgrupo || codigo === "nuevo" ?
        <Form
        
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={editSubgrupo ? editSubgrupo : initialValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            
            <Divider className="titleFont">SUBGRUPO</Divider>
            <br />
            <Row >
                <Col span={18}>
                    <Form.Item
                        label="Nombre"
                        name="nombre"
                        rules={[{ required: true, message: 'Porfavor ingrese el nombre' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row >
            <Row >
                <Col span={18}>


                    <Form.Item
                        label="Descripcion"
                        name="descripcion"
                        rules={[{ required: false, message: 'Por gavor ingrese su descripcion' }]}

                    >
                        <TextArea rows={6} placeholder="Descripción del Subgrupo." />

                    </Form.Item>
                </Col>
            </Row >
            <Divider className="titleFont" orientation="left" >GRUPOS ASIGNADOS A SUBGRUPO</Divider>

            <Row >
                <Col span={12}>
                    <Form.Item
                        label="Grupo"
                        name={"subgrupo_nn"}
                    >
                        <SelectOpciones
                            tipo="Grupo"
                        // readOnly={!crud}
                        // typeTransaction={typeTransactionSelect} 
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row >
                <Col span={18}>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="GUARDAR">
                            GUARDAR
                        </Button>
                    </Form.Item>
                </Col>
            </Row >

    

        </Form>
:null}
</>

    )
}

export default SubgrupoForm
