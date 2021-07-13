import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams, useRouteMatch } from "react-router-dom";
import { Form, Input, Button, Checkbox, InputNumber, Radio, message, Row, Col, Divider, Spin } from "antd";
import SelectOpciones from "../../selectOpciones/selectOpciones";
import { useHistory } from "react-router";
import { CheckCircleFilled, CloseCircleFilled, LoadingOutlined, SaveOutlined, CloseSquareOutlined } from "@ant-design/icons";
import { LineaContext } from "../../../contexts/lineaContext";
import "./lineaForm.css";
const { TextArea } = Input;

// import { ColorService } from "../../../services/colorService";
// import { GrupoService } from "../../../services/grupoService";
// import { LineaService } from "../../../services/lineaService";

function shoot() {
  window.history.back();
}

const FormLinea = (props) => {

    const { createLinea, updateLinea, findLinea, editLinea } = useContext(LineaContext);
    const location = useLocation();
    let { path } = useRouteMatch();
    let history = useHistory();
    let { pseudo } = useParams();

    const [selectedMarcaId, setSelectedMarcaId] = useState(undefined);
    const [selectedLineaId, setSelectedLineaId] = useState(undefined);
    const [selectedGrupoId, setSelectedGrupoId] = useState(undefined);
    
    const [id, setId] = useState(null);
    const [show, setShow] = useState(null);
    const [form] = Form.useForm();
    let initialValues = {
        descripcion: ''
    };

    console.log("EL EDITLINEA: + " + editLinea);
    console.log("EL CODIGO: + " + pseudo);
    console.log("EL HISTORY: + " + JSON.stringify(history));
    console.log("EL LOCATION: + " + JSON.stringify(location));
    // console.log("lOS PROPS DE lINEA: " + JSON.stringify(props));
    //esta parte estaba despues del useeffect

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

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

        console.log("ENTRA EN USEEFFECT Y EL EDITLINEA ES: " + editLinea);
        if (editLinea){
          /*if (!selectedMarcaId && !selectedLineaId && !selectedGrupoId) {
            setSelectedMarcaId(editProducto.fk_marca_id);
            setSelectedLineaId(editProducto.fk_linea_id);
            setSelectedGrupoId(editProducto.fk_grupo_id);
            setId(editProducto.id);
          }*/
          console.log("ENTRA EN EDIT LINEA DE USEEFFECT");
    
        } else {
          
          console.log("ENTRA AL ELSE DE EDITLINEA: ");

          /* console.log("CODIGO: ",codigo);
          findProducto(codigo);
          console.log("PRODUCTO", editProducto)
         */
        }
        console.log("EL SHOW EN STATE: "+ show);
        console.log("EL LOCATION STATE: " + JSON.stringify(location.state));
        if (show === null) {
          console.log("ENTRA  AL SHOW NULL: "+ show);
          if (location.state) {
            setShow(location.state.permiso)
            console.log("EL LOCATION STATE PERMISO: " + JSON.stringify(location.state.permiso));
          } else {
            history.goBack();
            console.log("ENTRA AL HISTORY GOBACK: "+ JSON.stringify(history));
          }
        } else {
          // BORRAR ELSE
          console.log("NO ENTRA AL SHOW NULL: "+ show);
        }
        /*
        if (!infoTecnica && editProducto){
          setInfoTecnica(editProducto.fk_linea_id);
        }*/
      })

      const onFinish = async (values) => {
        let data = null;
        console.log("La Data en OnFinish: " + data);

        delete values.permiso;
        // if (values["fk_color_id"]){
        //   values["fk_color_id"] = JSON.parse(values["fk_color_id"]).id;
        // }
    
        // values["atributos_js"] = final;

        // ESTO SE DEBE REEMPLAZAR POR LA VARIABLE DE SESION EN CUANTO ESTE CULMINADA
        values["fk_empresa_id"] = "60d4bc7d22b552b5af1280bc";


        if (id) {
          values["id"] = id;
          // values["fk_empresa_id"] = "60d4bc7d22b552b5af1280bc";
          console.log("ENTRA EL IF(ID) values", values);

          data = await updateLinea(values);
        } else {
          
          // values["fk_empresa_id"] = "60d4bc7d22b552b5af1280bc";
          console.log("LO QUE VA A GUARDAR:",JSON.stringify(values));
          data = await createLinea(values);
        }
        //console.log("LA DATA QUE RETORNA EL FORMULARIO EN stringify: " + JSON.stringify(data));
        //console.log("EL DATA.DATA: " + data.data);

        if (data.includes("OK")) {
          console.log(data);

          message.info(data, 2).then((t) => history.goBack());

          // setPermiso(false);
          // message.info(data);
        } else {
          message.warning(data);
        }

      }

      const onFinishFailed = (errorInfo) => {
        // console.log("onFinishFailed - Error al guardar la Linea: " + errorInfo.errorFields, errorInfo);
        console.log("BRINCA EL ONFINISHFAILED");
        message.warning("Error al guardar la Línea");
      };

    console.log(path);
    
    return (
      editLinea || location.state.nuevo ?
      <>
        <Form
        {...layout}
        form={form}
        name="customized_form_controls"
        initialValues={editLinea ?  editLinea : initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        /*onValuesChange={handleFormValuesChange}*/
        hidden={show}
      >
        <div>
          {"EL EDIT LINEA: " + editLinea}
          {"EL SHOW: " + show}
        <br/>
          {"EL LOCATON: " + location.state.nuevo}
        <br/>
          Hola mundo!
        </div>
          <Divider>LÍNEA</Divider>
          <Row>
          <Col span={12}>
          <Form.Item
              label="Nombre"
              name="nombre"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingrese el Nombre de la Línea!!",
                },
              ]}
            >
              <Input
                placeholder="Ej: Piso Laminado"
                className="input-type"
              />
          </Form.Item>
          </Col>
          <Col span={10}>
          <Form.Item
              label="Pseudónimo"
              name="pseudo"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingrese el Pseudónimo de la Línea!",
                },
              ]}
            >
              <Input
              placeholder="Ej: PL"
                className="input-type"
              />
            </Form.Item>
            </Col>
            </Row>
            <Row justify="start">
              <Col span={18}>
                <Form.Item
                  label="Descripción"
                  name="descripcion"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese la descripción de la Línea",
                    },
                  ]}
                >
                  <TextArea rows={4} placeholder="Descripción de la Línea, esta descripción se visualizará en la página web." />
                </Form.Item>
              </Col>
            </Row>
        <br/>
        <Row>
          <Col span={18} >
            {"El permiso: " + location.state.permiso}
            {// location.state.permiso ? (
              <Form.Item {...tailLayout}>
                <Button
                  icon={<SaveOutlined />}
                  type="primary"
                  htmlType="submit"
                >
                  GUARDAR
                </Button>
                <Button
                  className="button button3"
                  icon={<CloseSquareOutlined />}
                  type="default"
                  onClick={shoot}
                >
                  CANCELAR
                </Button>
              </Form.Item>
            // ) : null
          }
          </Col>
        </Row>
        <Row>
    <Col xs={24} xl={8}>
      One of three columns
    </Col>
    <Col xs={24} xl={8}>
      One of three columns
    </Col>
    <Col xs={24} xl={8}>
      One of three columns
    </Col>
  </Row>

      </Form>
      <Spin indicator={antIcon} hidden={!show} className="loading-producto" /> 
      </>: null
    );
};

const LineaForm = () => {
  return <FormLinea />;
};

export default LineaForm;