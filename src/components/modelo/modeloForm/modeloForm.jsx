import React, { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Form, Input, Button, message, Row, Col, Divider } from "antd";
import { useHistory } from "react-router";
import { SaveOutlined, CloseSquareOutlined, RollbackOutlined } from "@ant-design/icons";
import { ModeloContext } from "../../../contexts/modeloContext";
import SelectOpciones from "../../selectOpciones/selectOpciones";
import "./modeloForm.css";

const FormModelo = (props) => {

  const { createModelo, /*updateModelo,*/ findModelo, editModelo } = useContext(ModeloContext);
  let history = useHistory();
  let { codigo, operacion } = useParams();

  let formHasChanges = false;
  const [crud, setCrud] = useState(
    operacion === "editar" || codigo === "nuevo" ? true : false
  );

  // console.log("EL EDIT MODELO QUE TENGO: ", JSON.stringify(editModelo))

  const [id, setId] = useState(null);
  const [selectedLineaId, setSelectedLineaId] = useState(undefined);
  const [selectedMarcaId, setSelectedMarcaId] = useState(undefined);
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

  const typeTransactionSelectGrupo = {
    mode: "multiple",
    placeHoldertext: "Grupos",
    hasFilter: true
  };
  const typeTransactionSelectMarca = {
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
    
    if (editModelo) {
      // console.log("ENTRA AL EDIT MODELO DE USEEFFECT CON: " + JSON.stringify(editModelo))

      if (!selectedMarcaId && !selectedLineaId) { // OBSERVACIÓN 13/08/2021 SE DEBE CONTROLAR DESDE ACÁ LA CARGA DE LOS COMBOS DE LINEA Y MARCA, ESTO SE DEBE A QUE NO TODOS TIENS UNA MARCA, SOLO MATERIAL DE MARKETING
        
        /*console.log("ACA SE SETEA LA LINEA Y MARCA!!!! " + editModelo.fk_linea_id + "   EEE :  " + editModelo.fk_marca_id + " YYY EL DURO: " + editModelo.color_grupos_nn[0].id)
        const grupoService = new GrupoMarcaService();
        grupoService.getAll().then((data) => { 
          // console.log("LA DATA DE GRUPO MARCA QUE ME TRAE: " + JSON.stringify(data))
          // data.filter((gm) => gm.marca_id === editModelo.fk_marca_id && gm.id === editModelo.id)

          console.log("LO QUE ME INTERESA SI TENGO EL  LINEA: " + JSON.stringify(data.filter((gm) => gm.marca_id === editModelo.fk_marca_id && gm.id === editModelo.color_grupos_nn[0].id)))
          let tempLinea = JSON.stringify(data.filter((gm) => gm.marca_id === editModelo.fk_marca_id && gm.id === editModelo.color_grupos_nn[0].id)); 
          
          // console.log("MAPPING SOLO LINEA: " + JSON.stringify(data.filter((gm) => gm.marca_id === editModelo.fk_marca_id && gm.id === editModelo.color_grupos_nn[0].id))[0].linea_id)

          let array1 = data.filter((gm) => gm.marca_id === editModelo.fk_marca_id && gm.id === editModelo.color_grupos_nn[0].id).map(x=>x.linea_id);  
         console.log("LA RESPUESTA: " + array1)
         editModelo.fk_linea_id = array1;
         setSelectedLineaId(array1);

        });*/
      
        setSelectedLineaId(editModelo.fk_linea_id);
        setSelectedMarcaId(editModelo.fk_marca_id);
        setId(editModelo.id);

      }

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

    // console.log("EL ID QUE TRAE: " + id);
    // console.log("LOS VALUES DEL FORMULARIO: " + JSON.stringify(values));

    if (id) {

        // values["id"] = id;
        // data = await updateModelo(values);
        // console.log("LA DATA QUE RETORNA EL FORMULARIO EN EDITAR LINEA stringify: " + JSON.stringify(data));
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

    const formFieldName = Object.keys(changedValues)[0];

    if (formFieldName === "fk_linea_id") {
      // console.log("HAY CAMBIO EN LINEA, VA A: " + changedValues[formFieldName])
      form.setFieldsValue({ modelo_grupos_nn_in: undefined });
      setSelectedLineaId(changedValues[formFieldName]);
      setSelectedMarcaId(null);

      if (selectedLineaId !== "60d4c04b894c18b5e810e025"){
        // console.log("SE VA A SETEAR LA LINEA FK CON ESTO: " + selectedLineaId)
        form.setFieldsValue({ fk_marca_id: undefined });
      }
    }
    if (formFieldName === "fk_marca_id") {
      // console.log("HAY CAMBIO EN MARCA, VA CON: " + changedValues[formFieldName])
      form.setFieldsValue({ modelo_grupos_nn_in: undefined });
      setSelectedMarcaId(changedValues[formFieldName]);
    }

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
            {/*"SELECTED LINEA: " + selectedLineaId + " SELECTED MARCA: " + selectedMarcaId*/}
            {" EL CRUD: " + crud}
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
            <br />
            <Divider className="titleFont" orientation="left" >GRUPOS DEL MODELO</Divider>
            <br />
            <Row>
              <Col span={10}>
              {crud ? (
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
                      ]: []}
                    >
                      {crud ? (
                          <SelectOpciones
                            tipo="línea"
                            readOnly={!crud}
                            // setShow={setShow}
                          />
                        ) : (
                          <Input className="input-type" readOnly={!crud} />
                        )}
                    </Form.Item>
                    ) : (
                      null
                    )}
              </Col>
              <Col span={12}>
              {selectedLineaId === "60d4c04b894c18b5e810e025" ? (
              <Form.Item
                  label="Marca"
                  name={crud ? "fk_marca_id" : "marca"}
                  rules={[
                    {
                      required: true,
                      message: "Por favor, seleccione una Marca!",
                    },
                  ]}
                >
                  {crud ? (
                      <SelectOpciones
                        tipo="marcas"
                        readOnly={!crud}
                        filter={selectedLineaId}
                        typeTransaction={typeTransactionSelectMarca}
                        // setShow={setShow}
                      />
                    ) : (
                      <Input className="input-type" readOnly={!crud} />
                    )}
                </Form.Item>
                ): null }
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={10}>
                <Form.Item
                  label="Grupos"
                  name={"modelo_grupos_nn_in"}
                  hidden={(selectedLineaId === '' || selectedLineaId) && selectedLineaId !== "60d4c04b894c18b5e810e025" ?( false ): ( selectedMarcaId ? false : true )} // 12/08/2021 - OBSERVACIÓN: HAY QUE VALIDAR EL VALOR DE LA LINEA, POR  EL MOMENTO QUEDA ASÍ PERO SE DEBE ASIGANAR EL VALOR A TRAVÉS DE LA VISTA O LA DECISIÓN QUE SE TOME
                  rules={
                    crud
                      ? [
                          {
                            required: true,
                            message: "Por favor, seleccione un Grupo!",
                          },
                        ]
                      : []
                  }
                  >
                  <SelectOpciones
                    tipo="grupos"
                    readOnly={!crud}
                    filter={selectedMarcaId}
                    filter2={selectedLineaId}
                    typeTransaction={typeTransactionSelectGrupo}
                    disabled
                  />
                </Form.Item>
                {/* <Form.Item
                    label="Grupo"
                    name={crud ? "fk_grupo_id" : "grupo"}
                    rules={
                      crud
                        ? [
                            {
                              required: true,
                              message: "Por favor, seleccione un grupo!",
                            },
                          ]
                        : []
                    }
                  >
                    {crud ? (
                      <SelectOpciones
                        tipo="grupo"
                        filter={selectedMarcaId}
                        filter2={selectedLineaId}
                        readOnly={!crud}
                        // setShow={setShow}
                      />
                    ) : (
                      <Input className="input-type" readOnly={!crud} />
                    )}
                  </Form.Item> */}
              </Col>
            </Row>
            <br />
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
            <br />
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