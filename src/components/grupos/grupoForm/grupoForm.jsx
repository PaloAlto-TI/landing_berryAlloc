import React, { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Form, Input, Button, message, Row, Col, Divider } from "antd";
import { useHistory } from "react-router";
import { SaveOutlined, CloseSquareOutlined, RollbackOutlined } from "@ant-design/icons";
import { GrupoContext } from "../../../contexts/grupoContext";
// import { LineaService } from "../../../services/lineaService";
import SelectOpciones from "../../selectOpciones/selectOpciones";
import "./grupoForm.css";
const { TextArea } = Input;

const FormGrupo = (props) => {

  const { createGrupo, updateGrupo, findGrupo, editGrupo } = useContext(GrupoContext);

  let history = useHistory();
  let { codigo, operacion } = useParams();


  let formHasChanges = false;
  const [crud, setCrud] = useState(
    operacion === "editar" || codigo === "nuevo" ? true : false
  );

  const [id, setId] = useState(null);
  const [selectedLineaId, setSelectedLineaId] = useState(undefined);
  const [form] = Form.useForm();
  let initialValues = {
    descripcion: ''
  };

  function cancelConfirm() {
    if (formHasChanges !== null) {
      if (formHasChanges === true) {
        if (window.confirm("¿ ESTÁ SEGURO QUE DESEA SALIR ?, LOS CAMBIOS NO SE GUARDARÁN.")) {
          history.push("/home/grupos/");
        }
      } else {
        history.push("/home/grupos/");
      }
    } else {
      if (window.confirm("¿ ESTÁ SEGURO QUE DESEA SALIR ?, LOS CAMBIOS NO SE GUARDARÁN.")) {
        history.push("/home/grupos/");
      }
    }
  }

  function goBackHistory() {
    history.push("/home/grupos/")
  }

  //04/08/2021 - OBSERVACIÓN: ACÁ SE DEBE DEFINIR UNA PROPUESTA COMO UN typeTransactionSelect, PARA VER QUE TIPO DE SELECT SE VA A LLAMAR. - MC

  const typeTransactionSelect = {
    mode: null,
    placeHoldertext: "Subgrupo"
  };

  const typeTransactionSelectMarca = {
    mode: "multiple",
    placeHoldertext: "Marca",
    hasFilter: true
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
    // console.log("EN EN USEEFFECT EL EDIITGRUPO CON: " + JSON.stringify(editGrupo) + "Y LA LINEA SELECTED: " + selectedLineaId)

    if (editGrupo) {
      //  console.log("QUIERO SETEAR CON ESTO:  "+ editGrupo.grupo_marcas_nn[0].grupo_marca.fk_linea_id)
      console.log("QUIERO SETEAR CON ESTO:  " + JSON.stringify(editGrupo));

      if (!selectedLineaId) {
        // setSelectedLineaId(editGrupo.grupo_marcas_nn[0].grupo_marca.fk_linea_id);
        setSelectedLineaId(editGrupo.fk_linea_id);
        setId(editGrupo.id);
      }
    } else {
      findGrupo(codigo);
    }
  })

  const onFinish = async (values) => {

    let data = null;
    let messagesOnFinish = operacion === "editar" ? ["EDITAR", "EDITÓ"] : ["CREAR", "CREÓ"];
    delete values.permiso;

    // OBSERVACIÓN: ESTO SE DEBE REEMPLAZAR POR LA VARIABLE DE SESIÓN EN CUANTO ESTE CULMINADA
    // values["fk_empresa_id"] = "60d4bc7d22b552b5af1280bc";

    // console.log("EL ID QUE TRAE: " + id);
    // console.log("LOS VALUES DEL FORMULARIO: " + JSON.stringify(values));

    if (id) {

      values["id"] = id;
      let array1 = editGrupo.grupo_marcas_nn.map(x => x.id); // MARCAS INICIALES (BD)
      let array2 = values.grupo_marcas_nn_in; // MARCAS DE FORM

      // 05/08/2021 - OBSERVACIÓN: Tener en cuenta si se cambia de Línea en el formulario qué pasa con las ingresadas anteriormente. -MC

      // SETTING GRUPO_MARCAS TO CREATE OR UPDATE
      // let temp_toCreateProveedorMarcasN = array2.filter(x => !array1.includes(x));
      // let toCreateProveedorMarcasN = temp_toCreateProveedorMarcasN.map(x => ({ fk_marca_id:x , fk_proveedor_id:id })) // SET FORMAT JSON
      let temp_toCreateGrupoMarcasN = array2.filter(x => !array1.includes(x));
      let toCreateGrupoMarcasN = temp_toCreateGrupoMarcasN.map(x => ({ fk_marca_id: x, fk_linea_id: values.fk_linea_id, fk_grupo_id: id })) // SET FORMAT JSON

      // SETTING LINEAS_MARCAS TO DELETE (SOFTDELETE)
      let toDeleteGrupoMarcasN = array1.filter(x => !array2.includes(x));
      let jsonGruposMarcas = { id_grupo: id, fk_linea_id: values.fk_linea_id, grupo_marcas_create: toCreateGrupoMarcasN, grupo_marcas_delete: toDeleteGrupoMarcasN };
      // console.log("EL JSON GRUPOS_MARCAS A MANDAR: " + JSON.stringify(jsonGruposMarcas))

      data = await updateGrupo([values, jsonGruposMarcas]);
      // console.log("LA DATA QUE RETORNA EL FORMULARIO EN EDITAR GRUPO stringify: " + JSON.stringify(data));
    } else {

      values["fk_empresa_id"] = "60d4bc7d22b552b5af1280bc";
      data = await createGrupo(values);
    }

    if (data.message.includes("OK"))
      // console.log("el detalle de data " + Object.keys(data.data).length + "ACA PUEDE IR LO OTRO:: " + values.nombre)
      if (Object.keys(data.data).length > 0) {
        message.info(JSON.stringify(data.message) + " -  EL GRUPO: " + JSON.stringify(data.data.nombre) + " SE " + messagesOnFinish[1]
          + " CON ÉXITO", 2).then((t) => history.push("/home/grupos/"));

      } else {
        console.log("MENSAJE DE VALIDACION DE OBJECTS EN DATA RES: " + values.nombre)

      } else {
      // 05/08/2021 - OBSERVACIÓN: ACÁ SE PODRÍA DAR UN MENSAJE MÁS DETALLADO Ó CONTROLAR CON LAS BANDERAS isMarcasLineasCreated/isMarcasLineasDeleted - MC
      // A LA INTERFAZ DE USUARIO, INCLUSO SE DEBE ANALLIZAR SI SE USA UN ROLLBACK & COMMIT
      message.error("ERROR AL MOMENTO DE " + messagesOnFinish[0] + " EL GRUPO - \n" + JSON.stringify(data.errorDetails.description), 15);
    }
  }

  const onFinishFailed = (errorInfo) => {

    // 04/08/2021 - OBSERVACIÓN: ACÁ SE DEBE CONTROLAR DESDE EL TYPETRANSACTION QUE TIPO DE ELIMINADO LÓGICO SE DEBE HACER. -MC
    // AL MOMENTO TODOS VAN A SOFDELETE, DESPUÉS SE VERÁ UNO POR DEFAULT
    message.warning("ERROR AL GUARDAR EL GRUPO");
  };

  const handleFormValuesChange = async (changedValues) => {
    // console.log("ONCHANGE", form.getFieldsValue());

    formHasChanges = operacion === "editar" || codigo === "nuevo" ? true : false;

    const formFieldName = Object.keys(changedValues)[0];

    if (formFieldName === "fk_linea_id") {
      // console.log("ENTRA EN CHANGE DE fk_linea_id CON: " + changedValues[formFieldName])
      setSelectedLineaId(changedValues[formFieldName]);

      // const lineaService = new LineaService();
      // const linea = await lineaService.getOne(changedValues[formFieldName]);

      // console.log("LO QUE ME DVUELVE DE LINEA SERVICE EN CHANGES: " + JSON.stringify(linea))

      /*form.setFieldsValue({ codigo_interno: linea.pseudo });
      if (changedValues[formFieldName] === "60d4c04b894c18b5e810e025") {
      } else {
        form.setFieldsValue({ nombre: linea.pseudo });
      }*/
    }

  };

  if (JSON.parse(localStorage.getItem("user")).rol === 2 || operacion === "ver") {
    return (
      editGrupo || codigo === "nuevo" ?
        <>
          <Form
            {...layout}
            form={form}
            name="customized_form_controls"
            initialValues={editGrupo ? editGrupo : initialValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={handleFormValuesChange}
          >
            <Divider className="titleFont">GRUPO</Divider>
            <br />
            <Row>
              <Col span={12}>
                <Form.Item
                  label="Nombre"
                  name="nombre"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese el Nombre del Grupo!!",
                    },
                  ]}
                >
                  <Input
                    readOnly={!crud}
                    placeholder="Ej: FIRSTLINE PRO"
                    className="input-type"
                  />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  label="Pseudónimo"
                  name="pseudo"
                  rules={[
                    { required: true, message: "Por favor, ingrese el Pseudónimo del Grupo!" },
                    { max: 3, message: 'El Pseudónimo debe tener como máximo 3 caracteres' },
                  ]}
                >
                  <Input
                    readOnly={operacion === "editar" ? crud : !crud}
                    placeholder="Ej: FP"
                    className="input-type"
                  />
                </Form.Item>
              </Col>
            </Row>
            <br />
            {/* //----------------------------LINEA---------------------------------- */}
            <Row>
              <Col span={12}>
                <Form.Item
                  label="Línea"
                  // name={crud ? "grupo_marcas_nn_in" : "linea"} 
                  // name={["grupo_marcas_nn_in",]}
                  name="fk_linea_id"
                  rules={crud ? [
                    {
                      required: true,
                      message: "Por favor, seleccione una Línea!",
                    },
                  ] : []}
                >
                  {/* {crud ? ( */}
                  <SelectOpciones
                    tipo="línea"
                    readOnly={crud ? false : true}
                  // setShow={setShow}
                  />
                  {/* ) : (
                    
                    // <Input className="input-type" readOnly={!crud} />
                  )}*/}
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  label="Subgrupo"
                  //name={!crud ? "fk_subgrupo_id" : "subgrupo"}
                  name="fk_subgrupo_id"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese el Nombre del Subgrupo!!",
                    },
                  ]}
                >
                  {/* {crud ? ( */}
                  <SelectOpciones
                    tipo="subgrupo"
                    readOnly={!crud}
                    typeTransaction={typeTransactionSelect}
                  />
                  {/* ) : (
                    <Input className="input-type" readOnly={!crud} />
                  )} */}
                </Form.Item>
              </Col>
            </Row>


            <br />
            {/* <Row> */}
              <Col span={12}>
                <Form.Item
                
                  label="Marcas"
                  //name={crud ? "grupo_marcas_nn_in" : "marca"}
                  name="grupo_marcas_nn_in"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, seleccione una Marca!",
                    },
                  ]}
                >

                  <SelectOpciones
                    tipo="marcas"
                    readOnly={!crud}
                    filter={selectedLineaId}
                    typeTransaction={typeTransactionSelectMarca}
                  // setShow={setShow}
                  />

                </Form.Item>
              </Col>

            {/* </Row> */}
            <Row justify="start">
              <Col span={18}>
                <Form.Item
                  label="Descripción"
                  name="descripcion"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese la descripción del Grupo",
                    },
                  ]}
                >
                  <TextArea rows={6} readOnly={!crud} placeholder="Descripción del Grupo, esta descripción se visualizará en la página web." />
                </Form.Item>
              </Col>
            </Row>
            <br /><br />
            {/* <Divider className="titleFont" orientation="left" >MARCAS DEL GRUPO</Divider>
            <br />
            <Row >
              <Col span={9}>
                <Form.Item
                  label="Marca"
                  name={"proveedor_marcas_nn_in"}
                  >
                  <SelectOpciones
                    tipo="marcas"
                    readOnly={!crud}
                    typeTransaction={typeTransactionSelect} />
                </Form.Item>
              </Col>
            </Row> */}
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
            <br></br>
          </Form>
        </> : null
    );

  } else {
    return <Redirect to="/home" />;
  }
};

const GrupoForm = () => {
  return <FormGrupo />;
};

export default GrupoForm;