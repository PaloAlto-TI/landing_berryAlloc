import React, { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Form, Input, Button, message, Row, Col, Divider } from "antd";
import { useHistory } from "react-router";
import { SaveOutlined, CloseSquareOutlined, RollbackOutlined } from "@ant-design/icons";
import { MarcaContext } from "../../../contexts/marcaContext";
import SelectOpciones from "../../selectOpciones/selectOpciones";
import "./marcaForm.css";
const { TextArea } = Input;

const FormMarca = (props) => {

  const { createMarca, updateMarca, findMarca, editMarca } = useContext(MarcaContext);
  // let { path } = useRouteMatch();
  // console.log("EL PATH A NIVEL PRINCIPAL: ", path);
  console.log("LO QUE ESTA EN EDIT MARCA: " + JSON.stringify(editMarca))

  let history = useHistory();
  let { codigo, operacion } = useParams();
  // console.log("El codigo de params: ", codigo);
  // console.log("La operacion de params: ", operacion);
  let formHasChanges = false;
  
  const [crud, setCrud] = useState(
    operacion === "editar" || codigo === "nuevo" ? true : false
  );

  const [id, setId] = useState(null);
  // const [show, setShow] = useState(null);
  const [form] = Form.useForm();
  
  let initialValues = {
    descripcion: ''
  };

  function cancelConfirm() {
    if (formHasChanges !== null) {
      if (formHasChanges === true) {
        if (window.confirm("¿ ESTÁ SEGURO QUE DESEA SALIR ?, LOS CAMBIOS NO SE GUARDARÁN.")) {
          history.push("/home/marcas/");
        }
      } else {
        history.push("/home/marcas/");
      }
    } else {
      if (window.confirm("¿ ESTÁ SEGURO QUE DESEA SALIR ?, LOS CAMBIOS NO SE GUARDARÁN.")) {
        history.push("/home/marcas/");
      }
    }
  }

  function goBackHistory() {
    history.push("/home/marcas/")
    // window.history.back();
  }

  // console.log("EL EDITMARCA: + " + JSON.stringify(editMarca));
  // console.log("EL CODIGO: + " + pseudo);
  // console.log("EL HISTORY: + " + JSON.stringify(history));
  // console.log("EL LOCATION: + " + JSON.stringify(location));
  // console.log("lOS PROPS DE MARCA: " + JSON.stringify(props));
  // const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  // 29/07/2021 - OBSERVACIÓN: ACÁ SE DEBE DEFINIR UNA PROPUESTA COMO UN typeTransactionSelect, PARA VER QUE TIPO DE SELECT SE VA A LLAMAR. -MC

  const typeTransactionSelect = {
    mode: "multiple",
    placeHoldertext: "Líneas"
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

    if (editMarca) {

      setId(editMarca.id);
      
    } else {

      findMarca(codigo);

    }
  })

  const onFinish = async (values) => {

    let data = null;
    let messagesOnFinish = operacion === "editar" ? ["EDITAR", "EDITÓ"] : ["CREAR", "CREÓ"];
    delete values.permiso;

    // OBSERVACIÓN: ESTO SE DEBE REEMPLAZAR POR LA VARIABLE DE SESION EN CUANTO ESTE CULMINADA - MC
    // values["fk_empresa_id"] = "60d4bc7d22b552b5af1280bc";

    // console.log("EL ID QUE TRAE: " + id);
    // console.log("LOS VALUES DEL FORMULARIO: " + JSON.stringify(values));

    if (id) {

      values["id"] = id;
      let array1 = editMarca.lineas_nn.map(x=>x.id); // LINEAS INICIALES (BD)
      let array2 = values.lineas_nn_in; // LINEAS DE FORM

      // console.log("como el array1: " + array1);
      // console.log("como el array2: " + array2);
      // console.log("C1: ", array2.filter(x => !array1.includes(x)));

      // SETTING LINEAS_MARCAS TO CREATE OR UPDATE
      let temp_toCreateMarcaLineasN = array2.filter(x => !array1.includes(x));
      let toCreateMarcaLineasN = temp_toCreateMarcaLineasN.map(x => ({ fk_linea_id:x , fk_marca_id:id })) // SET FORMAT JSON
      
      // SETTING LINEAS_MARCAS TO DELETE (SOFTDELETE)
      // console.log("C2: ", array1.filter(x => !array2.includes(x)))
      let toDeleteMarcaLineasN = array1.filter(x => !array2.includes(x));

      // console.log("LO QUE ESTABA AL INICIO (CONTEXT): " + array1);
      // console.log("LO QUE ESTA EN EL FORMULARIO: " + array2);
      // console.log("LA DATA QUE QUE VIENE (FORM): " + JSON.stringify(values) + " MAS EL LENGHT : " +  values.lineas_nn_in.length);
      // console.log("LA DATA QUE QUE VIENE (FORM): " + JSON.stringify(values) + " MAS EL LENGHT : " +  values.lineas_nn.length);

      // let jsonLineasMarcas = {id_marca: id, marcas_lineas_create: toCreateMarcaLineasN, marcas_lineas_delete: toDeleteMarcaLineasN};
      let jsonLineasMarcas = {id_marca: id, marcas_lineas_create: toCreateMarcaLineasN, marcas_lineas_delete: toDeleteMarcaLineasN};

      // console.log("EL JSON LINEAS_MARCAS A MANDAR: " + JSON.stringify(jsonLineasMarcas))

      data = await updateMarca([values, jsonLineasMarcas]);
      // console.log("LA DATA QUE RETORNA EL FORMULARIO EN EDITAR LINEA stringify: " + JSON.stringify(data));

    } else {

      values["fk_empresa_id"] = "60d4bc7d22b552b5af1280bc";
      data = await createMarca(values);

    }
    console.log("LA DTAA QUE SALIO: " + JSON.stringify(data))

    if (data.message.includes("OK")) {

      // console.log("el detalle de data " + Object.keys(data.data).length + "ACA PUEDE IR LO OTRO:: " + values.nombre)
      if (Object.keys(data.data).length > 0){
        message.info(JSON.stringify(data.message) + " -  LA MARCA: " + JSON.stringify(data.data.nombre) + " SE " + messagesOnFinish[1] 
        + " CON ÉXITO", 2).then((t) => history.push("/home/marcas/"));
      
      } else {
        console.log("MENSAJE DE VALIDACION DE OBJECTS EN DATA RES: " + values.nombre)
        // history.push("/home/marcas/");
      }

    } else {
      // 01/08/2021 - OBSERVACIÓN: ACÁ SE PODRÍA DAR UN MENSAJE MÁS DETALLADO Ó CONTROLAR CON LAS BANDERAS isMarcasLineasCreated/isMarcasLineasDeleted -MC
      // A LA INTERFAZ DE USUARIO, INCLUSO SE DEBE ANALLIZAR SI SE USA UN ROLLBACK & COMMIT
      message.error("ERROR AL MOMENTO DE " + messagesOnFinish[0] + " LA MARCA - \n" + JSON.stringify(data.errorDetails.description), 15);
    }
  }

  const onFinishFailed = (errorInfo) => {
    // console.log("onFinishFailed - Error al guardar la Linea: " + errorInfo.errorFields, errorInfo);
    // console.log("BRINCA EL ONFINISHFAILED"); // OBSER

    // 21/07/2021 - OBSERVACIÓN: ACÁ SE DEBE CONTROLAR DESDE EL TYPETRANSACTION QUE TIPO DE ELIMINADO LÓGICO SE DEBE HACER. - MC
    // AL MOMENTO TODOS VAN A SOFDELETE, DESPUÉS SE VERÁ UNO POR DEFAULT
    // console.log("ENTRA AL ELIMINAR EN HANDLEOK LINEA CON RECORD: " + JSON.stringify(record))
    message.warning("ERROR AL GUARDAR LA MARCA");
  };

  const handleFormValuesChange = async (changedValues) => {
    // console.log("ONCHANGE", form.getFieldsValue());
    formHasChanges = operacion === "editar" || codigo === "nuevo" ? true : false;
  };

  if (JSON.parse(localStorage.getItem("user")).rol === 2 || operacion === "ver") {
    return (
      editMarca || codigo === "nuevo" ?
        <>
          <Form
            {...layout}
            form={form}
            name="customized_form_controls"
            initialValues={editMarca ? editMarca : initialValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={handleFormValuesChange}
          >
            <Divider className="titleFont">MARCA</Divider>
            <br />
            <Row>
              <Col span={12}>
                <Form.Item
                  label="Nombre"
                  name="nombre"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese el Nombre de la Marca!!",
                    },
                  ]}
                >
                  <Input
                    readOnly={!crud}
                    placeholder="Ej: BerryAlloc"
                    className="input-type"
                  />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  label="Pseudónimo"
                  name="pseudo"
                  rules={[
                    { required: true, message: "Por favor, ingrese el Pseudónimo de la Marca!" },
                    { max: 3, message: 'El Pseudónimo debe tener como máximo 3 caracteres' },
                  ]}
                >
                  <Input
                    readOnly={operacion === "editar" ? crud : !crud}
                    placeholder="Ej: BA"
                    className="input-type"
                  />
                </Form.Item>
              </Col>
            </Row>
            <br /><br />
            <Row justify="start">
              <Col span={18}>
                <Form.Item
                  label="Descripción"
                  name="descripcion"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese la descripción de la Marca",
                    },
                  ]}
                >
                  <TextArea rows={6} readOnly={!crud} placeholder="Descripción de la Marca, esta descripción se visualizará en la página web." />
                </Form.Item>
              </Col>
            </Row>
            <br /><br />
            <Divider className="titleFont" orientation="left" >LÍNEAS DE LA MARCA</Divider>
            <br />
            <Row >
              <Col span={9}>
                <Form.Item
                  label="Línea"
                  name={"lineas_nn_in"}
                  >
                  <SelectOpciones
                    tipo="línea"
                    readOnly={!crud}
                    typeTransaction={typeTransactionSelect} />
                </Form.Item>
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

const MarcaForm = () => {
  return <FormMarca />;
};

export default MarcaForm;