import React, { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Form, Input, Button, message, Row, Col, Divider } from "antd";
import { useHistory } from "react-router";
import { SaveOutlined, CloseSquareOutlined, RollbackOutlined } from "@ant-design/icons";
import { MarcaContext } from "../../../contexts/marcaContext";
import { Select } from "antd";
import "./marcaForm.css";
import SelectOpciones from "../../selectOpciones/selectOpciones";
const { TextArea } = Input;
const { Option } = Select;

const FormMarca = (props) => {

  const { createMarca, updateMarca, findMarca, editMarca } = useContext(MarcaContext);
  // let { path } = useRouteMatch();
  // console.log("EL PATH A NIVEL PRINCIPAL: ", path);

  let history = useHistory();
  let { codigo, operacion } = useParams();
  // console.log("El codigo de params: ", codigo);
  // console.log("La operacion de params: ", operacion);
  let formHasChanges = false;
  const [crud, setCrud] = useState(
    operacion === "editar" || codigo === "nuevo" ? true : false
  );

  const [id, setId] = useState(null);
  // const [tempS, setTempS] = useState(["60faeee1a412169c92c778c2"]);
  // const [selectedLineaId, setSelectedLineaId] = useState(undefined);
  const [opcionesLineaId, setOpcionesLineaId] = useState([]);
  

  var lineasList = [];

  // const [show, setShow] = useState(null);
  const [form] = Form.useForm();
  let initialValues = {
    descripcion: ''
  };

  // var lineasList = editMarca.map(function (opcion) {
  //   return (
  //     <Option key={opcion.id} value={opcion.id}>
  //       {opcion.nombre.toUpperCase()}
  //     </Option>
  //   );
  // });

  
  //  var lineasList = <Option key="60faeee1a412169c92c778c2" value="60faeee1a412169c92c778c2">
  //         {"Hola "}
  //       </Option>;

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


  // 29/07/2021 - OBSERVACIÓN: ACÁ SE DEBE DEFINIR UNA PROPUESTA COMO UN typeTransactionSelect, PARA VER QUE TIPO DE SELECT SE VA A LLAMAR. 

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

    console.log("EL EDITMARCA EN USEEFFECT DE MARCAFORM: " + JSON.stringify(editMarca));

    if (editMarca) {

      console.log("LINEAS NN:  " + JSON.stringify(editMarca.lineas_nn));
      
      setId(editMarca.id);
      editMarca.newList = editMarca.lineas_nn.map(x=>x.id)
      

      console.log("XYZ: " + JSON.stringify(editMarca) )

      // editMarca.lineas_nn = [{id: "60faeee1a412169c92c778c2", nombre: "MATERIAL DE EXHIBICIÓN"}]

      
      // editMarca.newList = editMarca.lineas_nn.map(x=>x.id)
      
      // console.log("EL NEWLISYT: " + editMarca.newList)
      // if (selectedLineaId) {
        
        // ineasMarca.length > 0 ? lineasMarca.map(x=>x.nombre).join(", ") : 'N/A' }
        // setSelectedLineaId(editMarca.lineas_nn.map(x=>x.id))
      //}
    // console.log("ENTRA EN EDIT MARCA DE USEEFFECT Y DESPUES DEL SETID QUEDA: " + id);
    
    
  //   if (opcionesLineaId.length === 0){ setOpcionesLineaId(editMarca.lineas_nn.map(function (opcion) {
  //     return (
  //       <Option key={opcion.id} value={opcion.id}>
  //         {opcion.nombre.toUpperCase()}
  //       </Option>
  //     );
  //   })) 
  // }
    // editMarca.lineas_nn.map(function (opcion) {
    //   return (
    //     <Option key={opcion.id} value={opcion.id}>
    //       {opcion.nombre.toUpperCase()}
    //     </Option>
    //   );
    // });
    // console.log("EL LINEA LIST EN USEEFFECT: " + JSON.stringify(lineasList))
    // console.log("TEEEEEEEEEST: " + editMarca)

    } else {
      findMarca(codigo);
    }

    // if (show === null) { setShow(crud); }
  })

  const onFinish = async (values) => {

    let data = null;
    let messagesOnFinish = operacion === "editar" ? ["EDITAR", "EDITÓ"] : ["CREAR", "CREÓ"];
    delete values.permiso;

    // OBSERVACIÓN: ESTO SE DEBE REEMPLAZAR POR LA VARIABLE DE SESION EN CUANTO ESTE CULMINADA
    // values["fk_empresa_id"] = "60d4bc7d22b552b5af1280bc";

    console.log("EL ID QUE TRAE: " + id);

    if (id) {

      values["id"] = id;
      console.log("LA DATA ANTES DE LLAMAR A UPDATE CONTEXT: " + JSON.stringify(values));
      data = await updateMarca(values);
      console.log("LA DATA QUE RETORNA EL FORMULARIO EN EDITAR LINEA stringify: " + JSON.stringify(data));

    } else {
      values["fk_empresa_id"] = "60d4bc7d22b552b5af1280bc";
      console.log("LO QUE TRAE DEL FORMULARIO Y VA A GUARDAR:", JSON.stringify(values));
      data = await createMarca(values);

    }

    console.log("LA DTAA QUE SALIO: " + JSON.stringify(data))

    if (data.message.includes("OK")) {
      message.info(JSON.stringify(data.message) + " -  LA MARCA: " + JSON.stringify(data.data.nombre) + " SE " + messagesOnFinish[1] + " CON ÉXITO", 4).then((t) => history.push("/home/marcas/"));
    } else {
      message.error("ERROR AL MOMENTO DE " + messagesOnFinish[0] + " LA MARCA - \n" + JSON.stringify(data.errorDetails.description), 15);
    }
    /// console.log("LA DATA QUE RETORNA EL FORMULARIO EN stringify: " + JSON.stringify(data));
    //  console.log("LA DATA ERROR Q RETORNA: " + JSON.stringify(data.errorDetails));
    // console.log("EL DATA.MESSAGE: " + JSON.stringify(data.message));
    // console.log("EL DATA.DATA: " + JSON.stringify(data.data));
  }

  const onFinishFailed = (errorInfo) => {
    // console.log("onFinishFailed - Error al guardar la Linea: " + errorInfo.errorFields, errorInfo);
    // console.log("BRINCA EL ONFINISHFAILED"); // OBSER

    // 21/07/2021 - OBSERVACIÓN: ACÁ SE DEBE CONTROLAR DESDE EL TYPETRANSACTION QUE TIPO DE ELIMINADO LÓGICO SE DEBE HACER. 
    // AL MOMENTO TODOS VAN A SOFDELETE, DESPUÉS SE VERÁ UNO POR DEFAULT
    // console.log("ENTRA AL ELIMINAR EN HANDLEOK LINEA CON RECORD: " + JSON.stringify(record))
    message.warning("ERROR AL GUARDAR LA MARCA");
  };

  const handleFormValuesChange = async (changedValues) => {
    console.log("ONCHANGE", form.getFieldsValue());

    formHasChanges = operacion === "editar" || codigo === "nuevo" ? true : false;
  };

  // console.log("EL ROL DEL USER ID: " + JSON.parse(localStorage.getItem("user")).rol);

  if (JSON.parse(localStorage.getItem("user")).rol === 2 || operacion === "ver") {
    return (
      editMarca || codigo === "nuevo" ?
        <>
        {"ddd" + editMarca.newList ? editMarca.newList : null}
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
            {"eee" + editMarca.newList}
            <Row >
              <Col span={9}>
                <Form.Item
                  label="Línea"
                  name={"newList"}>
                    {/* <Select
                        mode="multiple"
                        allowClear
                        placeholder="Seleccione Línea"
                        readOnly={!crud}
                      >
                        {opcionesLineaId}
                      </Select> editMarca.lineas_nn.map*/ }
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