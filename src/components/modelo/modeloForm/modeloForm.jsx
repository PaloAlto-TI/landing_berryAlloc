import React, { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Form, Input, Button, message, Row, Col, Divider } from "antd";
import { useHistory } from "react-router";
import { SaveOutlined, CloseSquareOutlined, RollbackOutlined } from "@ant-design/icons";
import { ModeloContext } from "../../../contexts/modeloContext";
import SelectOpciones from "../../selectOpciones/selectOpciones";
import "./modeloForm.css";

const FormModelo = (props) => {

  const { createModelo, updateModelo, findModelo, editModelo } = useContext(ModeloContext);
  let history = useHistory();
  let { codigo, operacion } = useParams();

  let formHasChanges = false;
  const [crud, setCrud] = useState(
    operacion === "editar" || codigo === "nuevo" ? true : false
  );

  const [id, setId] = useState(null);
  const [form] = Form.useForm();
  let initialValues = {};

  function cancelConfirm() {
    if (formHasChanges !== null) {
      if (formHasChanges === true) {
        if (window.confirm("¿ ESTÁ SEGURO QUE DESEA SALIR ?, LOS CAMBIOS NO SE GUARDARÁN.")) {
          history.push("/home/modelos/");
        }
      } else {
        history.push("/home/modelos/");
      }
    } else {
      if (window.confirm("¿ ESTÁ SEGURO QUE DESEA SALIR ?, LOS CAMBIOS NO SE GUARDARÁN.")) {
        history.push("/home/modelos/");
      }
    }
  }

  function goBackHistory() {
    history.push("/home/modelos/")
  }

  //04/08/2021 - OBSERVACIÓN: ACÁ SE DEBE DEFINIR UNA PROPUESTA COMO UN typeTransactionSelect, PARA VER QUE TIPO DE SELECT SE VA A LLAMAR. 

  const typeTransactionSelect = {
    mode: "multiple",
    placeHoldertext: "Marcas"
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  useEffect(() => {
    if (crud === null) {
      setCrud(operacion === "editar" || codigo === "nuevo" ? true : false);
    }
    
    if (editModelo) {

      setId(editModelo.id);
      
    } else {

      findModelo(codigo);

    }
  })

  const onFinish = async (values) => {

    let data = null;
    let messagesOnFinish = operacion === "editar" ? ["EDITAR", "EDITÓ"] : ["CREAR", "CREÓ"];
    delete values.permiso;

    // OBSERVACIÓN: ESTO SE DEBE REEMPLAZAR POR LA VARIABLE DE SESION EN CUANTO ESTE CULMINADA
    // values["fk_empresa_id"] = "60d4bc7d22b552b5af1280bc";

    console.log("EL ID QUE TRAE: " + id);
    console.log("LOS VALUES DEL FORMULARIO: " + JSON.stringify(values));

    if (id) {

        values["id"] = id;
        data = await updateModelo(values);
        console.log("LA DATA QUE RETORNA EL FORMULARIO EN EDITAR LINEA stringify: " + JSON.stringify(data));
      // console.log("LA DATA QUE RETORNA EL FORMULARIO EN EDITAR LINEA stringify: " + JSON.stringify(data));
/*
      values["id"] = id;
      let array1 = editProveedor.proveedor_marcas_nn.map(x=>x.id); // LINEAS INICIALES (BD)
      let array2 = values.proveedor_marcas_nn_in; // LINEAS DE FORM

      // SETTING LINEAS_MARCAS TO CREATE OR UPDATE
      let temp_toCreateProveedorMarcasN = array2.filter(x => !array1.includes(x));
      let toCreateProveedorMarcasN = temp_toCreateProveedorMarcasN.map(x => ({ fk_marca_id:x , fk_proveedor_id:id })) // SET FORMAT JSON
      
      // SETTING LINEAS_MARCAS TO DELETE (SOFTDELETE)
      let toDeleteProveedorMarcasN = array1.filter(x => !array2.includes(x));

      let jsonProveedoresMarcas = {id_proveedor: id, proveedor_marcas_create: toCreateProveedorMarcasN, proveedor_marcas_delete: toDeleteProveedorMarcasN};
      // console.log("EL JSON LINEAS_MARCAS A MANDAR: " + JSON.stringify(jsonProveedoresMarcas))

      data = await updateProveedor([values, jsonProveedoresMarcas]);
      // console.log("LA DATA QUE RETORNA EL FORMULARIO EN EDITAR LINEA stringify: " + JSON.stringify(data));
*/
    } else {

      values["fk_empresa_id"] = "60d4bc7d22b552b5af1280bc";
      data = await createModelo(values);

    }

    if (data.message.includes("OK")) {

      // console.log("el detalle de data " + Object.keys(data.data).length + "ACA PUEDE IR LO OTRO:: " + values.nombre)
      if (Object.keys(data.data).length > 0){
        message.info(JSON.stringify(data.message) + " -  EL MODELO: " + JSON.stringify(data.data.nombre) + " SE " + messagesOnFinish[1] 
        + " CON ÉXITO", 2).then((t) => history.push("/home/modelos/"));
      
      } else {
        console.log("MENSAJE DE VALIDACION DE OBJECTS EN DATA RES: " + values.nombre)
      }

    } else {
      // 01/08/2021 - OBSERVACIÓN: ACÁ SE PODRÍA DAR UN MENSAJE MÁS DETALLADO Ó CONTROLAR CON LAS BANDERAS isMarcasLineasCreated/isMarcasLineasDeleted
      // A LA INTERFAZ DE USUARIO, INCLUSO SE DEBE ANALLIZAR SI SE USA UN ROLLBACK & COMMIT
      message.error("ERROR AL MOMENTO DE " + messagesOnFinish[0] + " EL MODELO - \n" + JSON.stringify(data.errorDetails.description), 15);
    }
  }

  const onFinishFailed = (errorInfo) => {
    
    // 04/08/2021 - OBSERVACIÓN: ACÁ SE DEBE CONTROLAR DESDE EL TYPETRANSACTION QUE TIPO DE ELIMINADO LÓGICO SE DEBE HACER. 
    // AL MOMENTO TODOS VAN A SOFDELETE, DESPUÉS SE VERÁ UNO POR DEFAULT
    message.warning("ERROR AL GUARDAR EL MODELO");
  };

  const handleFormValuesChange = async (changedValues) => {
    // console.log("ONCHANGE", form.getFieldsValue());
    formHasChanges = operacion === "editar" || codigo === "nuevo" ? true : false;
  };

  if (JSON.parse(localStorage.getItem("user")).rol === 2 || operacion === "ver") {
    return (
      editModelo || codigo === "nuevo" ?
        <>
          <Form
            {...layout}
            form={form}
            name="customized_form_controls"
            initialValues={editModelo ? editModelo : initialValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={handleFormValuesChange}
          >
            <Divider className="titleFont">MODELO</Divider>
            <br />
            <Row>
              <Col span={10}>
                <Form.Item
                  label="Nombre"
                  name="nombre"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese el Nombre del Modelo!!",
                    },
                  ]}
                >
                  <Input
                    readOnly={!crud}
                    placeholder="Ej: JAVA LIGHT GREY"
                    className="input-type"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item
                  label="Pseudónimo"
                  name="pseudo"
                  rules={[
                    { required: true, message: "Por favor, ingrese el Pseudónimo del Modelo!" },
                    { max: 3, message: 'El Pseudónimo debe tener como máximo 3 caracteres' },
                  ]}
                >
                  <Input
                    readOnly={operacion === "editar" ? crud : !crud}
                    placeholder="Ej: CS"
                    className="input-type"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Form.Item
                  label="Código"
                  name="codigo"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese el Código del Modelo!!",
                    },
                  ]}
                >
                  <Input
                    readOnly={!crud}
                    placeholder="Ej: 01"
                    className="input-type"
                  />
                </Form.Item>
              </Col>
            </Row>
            <br /><br />
            {/* <Divider className="titleFont" orientation="left" >GRUPOS DEL MODELO</Divider>
            <br /> */}
            <Row >
              <Col span={9}>
                {/* <Form.Item
                  label="Marca"
                  name={"proveedor_marcas_nn_in"}
                  >
                  <SelectOpciones
                    tipo="marcas"
                    readOnly={!crud}
                    typeTransaction={typeTransactionSelect} />
                </Form.Item> */}
              </Col>
            </Row>
            <Row>
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
            </Row>
          </Form>
        </> : null
    );

  } else {
    return <Redirect to="/home" />;
  }
};

const ModeloForm = () => {
  return <FormModelo />;
};

export default ModeloForm;