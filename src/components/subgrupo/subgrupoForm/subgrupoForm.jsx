import { Button, Col, Divider, Input, message, Row } from 'antd'
import { Redirect, useParams } from "react-router-dom";import Form from 'antd/lib/form'
import TextArea from 'antd/lib/input/TextArea'
import React,{ useContext, useEffect, useState }  from 'react'
import SelectOpciones from '../../selectOpciones/selectOpciones'
import { SubgrupoContext } from "../../../contexts/subgrupoContext";
import { useHistory } from "react-router";
import { CloseSquareOutlined, RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import { SesionContext } from '../../../contexts/sesionContext';


const SubgrupoForm = () => {
  var { setMoved, sesions } = useContext(SesionContext);
    let formHasChanges = false;
    const [id, setId] = useState(null);
    let { codigo, operacion } = useParams();
    let history = useHistory();
    const {  subgrupos,updateSubgrupo, createSubgrupo,findSubgrupo,editSubgrupo } = useContext(SubgrupoContext);
    const [crud, setCrud] = useState(
        operacion === "editar" || codigo === "nuevo" ? true : false
      );
     
      let initialValues = {
        descripcion: ''
      };

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
  //..................................................................................
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

    function cancelConfirm() {
        if (formHasChanges !== null) {
          if (formHasChanges === true) {
            if (window.confirm("¿ ESTÁ SEGURO QUE DESEA SALIR ?, LOS CAMBIOS NO SE GUARDARÁN.")) {
              history.push("/home/subgrupo");
            }
          } else {
            history.push("/home/subgrupo/");
          }
        } else {
          if (window.confirm("¿ ESTÁ SEGURO QUE DESEA SALIR ?, LOS CAMBIOS NO SE GUARDARÁN.")) {
            history.push("/home/subgrupo/");
          }
        }
      }
      
   
      function goBackHistory() {
        history.push("/home/subgrupo")
      }
      const handleFormValuesChange = async (changedValues) => {
        // console.log("ONCHANGE", form.getFieldsValue());
        
        formHasChanges = operacion === "editar" || codigo === "nuevo" ? true : false;
    
        const formFieldName = Object.keys(changedValues)[0];
      };
//_-------------------------------------------------------------------------------------------
      if (sesions){
      if (sesions._usuario[0].rol ===2|| operacion === "ver") {

    return (
        <>
        {editSubgrupo || codigo === "nuevo" ?
        <Form
        
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={editSubgrupo ? editSubgrupo : initialValues}
            onValuesChange={handleFormValuesChange}
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
            {/* <Divider className="titleFont" orientation="left" >GRUPOS ASIGNADOS A SUBGRUPO</Divider>

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
            </Row> */}

            <Row >
            {crud ? (
                <Col md={18} xs={15}>
                  <Form.Item {...tailLayout}>
                    <Button
                      icon={<SaveOutlined />}
                      type="primary"
                      htmlType="submit"
                    >
                      GUARDAR
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      className="button button3"
                      icon={<CloseSquareOutlined />}
                      type="default"
                      onClick={cancelConfirm}
                    >
                      CANCELAR
                    </Button>
                  </Form.Item>
                </Col>
              ) :
                <Col md={24} xs={15}>
                  <Button
                    icon={<RollbackOutlined />}
                    type="primary"
                    onClick={goBackHistory}
                  >
                    REGRESAR
                  </Button>
                </Col>
              }
            </Row >

    

        </Form>
:null}
</>

    )}
    else
    {
        return <Redirect to="/home" />;
    }
  }
}

export default SubgrupoForm
