import React, { useContext, useEffect, useState } from "react";
import { message, Row, Col, Divider, Spin, Collapse } from "antd";
import { Form, Input, Button, Checkbox, InputNumber, Radio } from "antd";
import SelectOpciones from "../../selectOpciones/selectOpciones";
import { ProductoContext } from "../../../contexts/productoContext";
import { useHistory } from "react-router";
import { useLocation, useParams, useRouteMatch } from "react-router-dom";
import "./productoForm.css";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  LoadingOutlined,
  PushpinFilled,
  SaveOutlined,
} from "@ant-design/icons";
import { ColorService } from "../../../services/colorService";
import { GrupoService } from "../../../services/grupoService";
import { LineaService } from "../../../services/lineaService";
const { TextArea } = Input;
const { Panel } = Collapse;

const FormProducto = (props) => {
  // console.log(props);
  const location = useLocation();
  let { path } = useRouteMatch();

  console.log(path);
  // console.log(props);
  const { createProducto, updateProducto, findProducto, editProducto } =
    useContext(ProductoContext);

  let history = useHistory();
  let { codigo } = useParams();
  const [selectedMarcaId, setSelectedMarcaId] = useState(undefined);
  const [selectedLineaId, setSelectedLineaId] = useState(undefined);
  const [selectedGrupoId, setSelectedGrupoId] = useState(undefined);

  const [tipoInventario, setTipoInventario] = useState(undefined);
  const [tipoProducto, setTipoProducto] = useState(undefined);
  const [id, setId] = useState(null);
  const [show, setShow] = useState(null);
  const [infoTecnica, setInfoTecnica] = useState(null);
  // const [precio, setPrecio] = useState(null)
  const [form] = Form.useForm();
  let initialValues = {
    en_sistema_externo: false,
    en_web: false,
    iva: 12,
    limite_descuento1: 0,
    limite_descuento2: 0,
    limite_descuento3: 0,
    limite_descuento4: 0,
    limite_descuento5: 0,
  };
  useEffect(() => {
    if (editProducto) {
      if (!selectedMarcaId && !selectedLineaId && !selectedGrupoId) {
        setSelectedMarcaId(editProducto.fk_marca_id);
        setSelectedLineaId(editProducto.fk_linea_id);
        setSelectedGrupoId(editProducto.fk_grupo_id);

        setId(editProducto.id);
      }
    } else {
      console.log("CODIGO: ", codigo);
      findProducto(codigo);
      console.log("PRODUCTO", editProducto);
    }

    if (show === null) {
      if (location.state) {
        setShow(location.state.permiso);
      } else {
        history.goBack();
      }
    }

    if (!infoTecnica && editProducto) {
      setInfoTecnica(editProducto.fk_linea_id);
    }

    // return () => {
    //   setSelectedLineaId(undefined);
    //   setSelectedMarcaId(undefined);
    //   setId(null);
    //   setInfoTecnica(null);
    //   setShow(null)
    // };
  });

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

  // if (location.state) {
  //   console.log(location.state)
  //   if (!location.state.nuevo) {
  //     console.log("sate",location.state);
  //     initialValues = location.state;
  //     if (!selectedMarcaId && !selectedLineaId) {
  //       setSelectedMarcaId(location.state.fk_marca_id);
  //       setSelectedLineaId(location.state.fk_linea_id);
  //       setId(location.state.id);
  //     }
  //   }

  // }
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

 

  const genExtra = () => (
    <PushpinFilled
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    />
  );
  // const randomNumber = (min, max) =>{
  //   return Math.floor(Math.random() * (max - min) + min);
  // }

  const onFinish = async (values) => {
    let data = null;

    delete values.permiso;
    // if (values["fk_color_id"]){

    //   values["fk_color_id"] = JSON.parse(values["fk_color_id"]).id;
    // }

    console.log("Success:", values);
    // values["atributos_js"] = final;
    if (id) {
      values["id"] = id;
      console.log("values", values);
      data = await updateProducto(values);
    } else {
      data = await createProducto(values);
    }

    if (data.includes("OK")) {
      console.log(data);
      //setPermiso(false);
      window.scrollTo(0, 0);
      message.info(data, 2).then((t) => history.goBack());
    } else {
      message.warning(data);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.warning("Error al guardar producto...");
  };

  const handleFormValuesChange = async (changedValues) => {
    console.log("COLOR", form.getFieldsValue());

    console.log("FORMULARIO", form.getFieldsValue());
    setSelectedMarcaId(form.getFieldValue("fk_marca_id"));

    // setFinal(form.getFieldsValue());
    // console.log("BF",form.getFieldValue("atributos_js"))
    // console.log("BF2",form.getFieldValue("atributos_js").general);

    if (form.getFieldValue("atributos_js") === undefined) {
      //form.setFieldsValue({ atributos_js: {} });
      // console.log("AF",form.getFieldValue("atributos_js"))
    }

    setInfoTecnica(form.getFieldValue("fk_linea_id"));

    const formFieldName = Object.keys(changedValues)[0];

    if (formFieldName === "fk_marca_id") {
      setSelectedMarcaId(changedValues[formFieldName]);

      form.setFieldsValue({ fk_color_id: undefined });
      form.setFieldsValue({ fk_grupo_id: undefined });
      form.setFieldsValue({ fk_proveedor_id: undefined });
      // form.setFieldsValue({ atributos_js: {"general": atributosJs , "especifico": {}} });
      // console.log("TEST", form.getFieldValue("atributos_js").especifico)
      setInfoTecnica(null);
      // form.setFieldsValue({ codigo_interno: ""})
      // form.setFieldsValue({ nombre: ""})
    } else {
    }

    // if (formFieldName === "precio") {
    //   setPrecio(changedValues[formFieldName]);

    // }

    if (formFieldName === "fk_linea_id") {
      setSelectedLineaId(changedValues[formFieldName]);
      setSelectedMarcaId(null);
      setSelectedGrupoId(null);
      form.setFieldsValue({ fk_color_id: undefined });
      form.setFieldsValue({ fk_grupo_id: undefined });
      form.setFieldsValue({ fk_marca_id: undefined });
      form.setFieldsValue({ fk_proveedor_id: undefined });
      // form.setFieldsValue({ codigo_interno: "" });
      // form.setFieldsValue({ nombre: "" });

      const lineaService = new LineaService();
      const linea = await lineaService.getOne(changedValues[formFieldName]);
      // if(form.getFieldValue("fk_linea_id") === "60d4c046e600f1b5e85d075c" ){
      //   console.log("si entra!!!!!")
      form.setFieldsValue({ codigo_interno: linea.pseudo });
      form.setFieldsValue({ nombre: linea.pseudo });

    }

    // if (formFieldName === "color") {

    //   form.setFieldsValue({ codigo_interno: form.getFieldValue("codigo_interno").split("-")[0]+"-"+JSON.parse(form.getFieldValue("color").value).codigo})
    //   form.setFieldsValue({ nombre: form.getFieldValue("nombre").split(" ")[0]+ " "+form.getFieldValue("nombre").split(" ")[1]+ " "+ form.getFieldValue("color").label })

    // }

    // if (formFieldName === "fk_color_id") {

    //   form.setFieldsValue({ codigo_interno: form.getFieldValue("codigo_interno").split("-")[0]+"-"+JSON.parse(form.getFieldValue("fk_color_id").value).codigo})
    //   form.setFieldsValue({ nombre: form.getFieldValue("nombre").split(" ")[0]+ " "+form.getFieldValue("nombre").split(" ")[1]+ " "+ form.getFieldValue("fk_color_id").label })

    // }

    // if (formFieldName === "color") {

    //   form.setFieldsValue({ codigo_interno: form.getFieldValue("codigo_interno").split("-")[0]+"-"+JSON.parse(form.getFieldValue("color").value).codigo})
    //   form.setFieldsValue({ nombre: form.getFieldValue("nombre").split(" ")[0]+ " "+form.getFieldValue("nombre").split(" ")[1]+ " "+ form.getFieldValue("color").label })

    // }

    if (formFieldName === "fk_color_id") {
      const colorService = new ColorService();
      const color2 = await colorService.getOne(
        form.getFieldValue("fk_color_id")
      );
      form.setFieldsValue({
        codigo_interno:
          form.getFieldValue("codigo_interno").split("-")[0] +
          "-" +
          color2.codigo,
      });
      form.setFieldsValue({
        nombre:
          form.getFieldValue("nombre").split(" ")[0] +
          " " +
          form.getFieldValue("nombre").split(" ")[1] +
          " " +
          color2.nombre,
      });
    }

    if (formFieldName === "fk_grupo_id") {
      form.setFieldsValue({ fk_color_id: undefined });

      setSelectedGrupoId(changedValues[formFieldName]);
      // form.setFieldsValue({ color: undefined });
      const grupoService = new GrupoService();
      const grupo = await grupoService.getOne(changedValues[formFieldName]);
      // if(form.getFieldValue("fk_grupo_id") === "60d617647b18b7ca135e1d53" ){

      form.setFieldsValue({
        codigo_interno:
          form.getFieldValue("codigo_interno").substring(0, 2) + grupo.pseudo,
      });
      form.setFieldsValue({
        nombre: form.getFieldValue("nombre").split(" ")[0] + " " + grupo.pseudo,
      });

      // }
    }

    // if (formFieldName === "fk_linea_id") {
    //   const lineaService = new LineaService();
    //   const linea = await lineaService.getOne(changedValues[formFieldName]);
    //   // if(form.getFieldValue("fk_linea_id") === "60d4c046e600f1b5e85d075c" ){
    //   //   console.log("si entra!!!!!")
    //   form.setFieldsValue({ codigo_interno: linea.pseudo });
    //   form.setFieldsValue({ nombre: linea.pseudo });

    //   // }else{
    //   //   form.setFieldsValue({ codigo_interno: ""})

    //   // }
    // }
  };

  const onChangeTipoInventario = (e) => {
    setTipoInventario(e.target.value);
  };

  const onChangeTipoProducto = (e) => {
    setTipoProducto(e.target.value);
  };

  return editProducto || location.state.nuevo ? (
    <>
      <Form
        {...layout}
        form={form}
        name="customized_form_controls"
        initialValues={editProducto ? editProducto : initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={handleFormValuesChange}
        hidden={!location.state.nuevo ? show : false}
      >
        <Divider>PRODUCTO</Divider>
        <br />

        <Collapse defaultActiveKey={["1", "2", "3", "4"]}>
          <Panel header="INFORMACIÓN GENERAL" key="1" extra={genExtra()}>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="Código Interno"
                  name="codigo_interno"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese el código interno!",
                    },
                  ]}
                >
                  <Input className="input-type" readOnly={true} />
                </Form.Item>
                <Form.Item
                  label="Nombre"
                  name="nombre"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese el nombre!",
                    },
                  ]}
                >
                  <Input className="input-type" readOnly={true} />
                </Form.Item>
                <Form.Item
                  label="Procedencia"
                  name="procedencia"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese la procedencia!",
                    },
                  ]}
                >
                  {location.state.permiso ? (
                    <SelectOpciones
                      tipo="procedencia"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                      setShow={setShow}
                    />
                  ) : (
                    <Input
                      className="input-type"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                    />
                  )}
                </Form.Item>

                <Form.Item
                  label="Línea"
                  name={location.state.permiso ? "fk_linea_id" : "linea"}
                  rules={[
                    {
                      required: true,
                      message: "Por favor, seleccione una linea!",
                    },
                  ]}
                >
                  {location.state.permiso ? (
                    <SelectOpciones
                      tipo="línea"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                      setShow={setShow}
                    />
                  ) : (
                    <Input
                      className="input-type"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Marca"
                  name={location.state.permiso ? "fk_marca_id" : "marca"}
                  rules={[
                    {
                      required: true,
                      message: "Por favor, seleccione una marca!",
                    },
                  ]}
                >
                  {location.state.permiso ? (
                    <SelectOpciones
                      tipo="marca"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                      filter={selectedLineaId}
                      setShow={setShow}
                    />
                  ) : (
                    <Input
                      className="input-type"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                    />
                  )}
                </Form.Item>

                <Form.Item
                  label="Proveedor"
                  name={
                    location.state.permiso ? "fk_proveedor_id" : "proveedor"
                  }
                  rules={[
                    {
                      required: true,
                      message: "Por favor, seleccione un proveedor!",
                    },
                  ]}
                >
                  {location.state.permiso ? (
                    <SelectOpciones
                      tipo="proveedor"
                      filter={selectedMarcaId}
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                      setShow={setShow}
                    />
                  ) : (
                    <Input
                      className="input-type"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                    />
                  )}
                </Form.Item>

                <Form.Item
                  label="Grupo"
                  name={location.state.permiso ? "fk_grupo_id" : "grupo"}
                  rules={[
                    {
                      required: true,
                      message: "Por favor, seleccione un grupo!",
                    },
                  ]}
                >
                  {location.state.permiso ? (
                    <SelectOpciones
                      tipo="grupo"
                      filter={selectedMarcaId}
                      filter2={selectedLineaId}
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                      setShow={setShow}
                    />
                  ) : (
                    <Input
                      className="input-type"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                    />
                  )}
                </Form.Item>

                <Form.Item
                  label="Color"
                  name={location.state.permiso ? "fk_color_id" : "color"}
                  rules={[
                    {
                      required: true,
                      message: "Por favor, seleccione un color!",
                    },
                  ]}
                >
                  {location.state.permiso ? (
                    <SelectOpciones
                      tipo="color"
                      filter={selectedGrupoId}
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                      setShow={setShow}
                    />
                  ) : (
                    <Input
                      className="input-type"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                    />
                  )}
                </Form.Item>

                <Form.Item
                  label="Descripción"
                  name="descripcion"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese la descripción!",
                    },
                  ]}
                >
                  <TextArea
                    maxLength={280}
                    className="input-type"
                    readOnly={location.state ? !location.state.permiso : false}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Panel>
          <Panel header="INFORMACIÓN TÉCNICA" key="4" extra={genExtra()}>
            <Form.Item
              label="Comun"
              name={["atributos_js", "general", "comun"]}
              rules={[
                {
                  required: true,
                  message: "Por favor, ingrese el campo!",
                },
              ]}
            >
              <InputNumber
                min={0}
                readOnly={location.state ? !location.state.permiso : false}
              />
            </Form.Item>
            <Form.Item
              label="Comun 2"
              name={["atributos_js", "general", "comun2"]}
              rules={[
                {
                  required: true,
                  message: "Por favor, ingrese el campo2!",
                },
              ]}
            >
              <InputNumber
                min={0}
                readOnly={location.state ? !location.state.permiso : false}
              />
            </Form.Item>
            {infoTecnica === "60d4c046e600f1b5e85d075c" ? (
              <div>
                <Form.Item
                  label="Largo"
                  name={["atributos_js", "especifico", "largo"]}
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese el largo!",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    readOnly={location.state ? !location.state.permiso : false}
                    formatter={(value) => `${value} mm`}
                    parser={(value) => value.replace(" mm", "")}
                  />
                </Form.Item>
                <Form.Item
                  label="Ancho"
                  name={["atributos_js", "especifico", "ancho"]}
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese el ancho!",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    readOnly={location.state ? !location.state.permiso : false}
                    formatter={(value) => `${value} mm`}
                    parser={(value) => value.replace(" mm", "")}
                  />
                </Form.Item>
              </div>
            ) : infoTecnica === "60a8133d2591c75004eceaa8" ? (
              <Form.Item
                label="Otro"
                name={["atributos_js", "especifico", "otro"]}
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingrese el atributo!",
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  readOnly={location.state ? !location.state.permiso : false}
                />
              </Form.Item>
            ) : null}
          </Panel>
          <Panel header="INFORMACIÓN COMERCIAL" key="2" extra={genExtra()}>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="Tipo"
                  name="tipo"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, seleccione el tipo de producto!",
                    },
                  ]}
                >
                  {location.state.permiso ? (
                    <Radio.Group
                      onChange={onChangeTipoProducto}
                      value={tipoProducto}
                      disabled={
                        location.state ? !location.state.permiso : false
                      }
                    >
                      <Radio value={"BIENES"}>BIENES</Radio>
                      <Radio value={"SERVICIOS"}>SERVICIOS</Radio>
                    </Radio.Group>
                  ) : (
                    <Input
                      className="input-type"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                    />
                  )}
                </Form.Item>
                <Form.Item
                  label="Tipo de Inventario"
                  name="tipo_inventario"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, seleccione el tipo de inventario!",
                    },
                  ]}
                >
                  {location.state.permiso ? (
                    <Radio.Group
                      onChange={onChangeTipoInventario}
                      value={tipoInventario}
                      disabled={
                        location.state ? !location.state.permiso : false
                      }
                    >
                      <Radio value={"PERMANENTE"}>PERMANENTE</Radio>
                      <Radio value={"BAJO PEDIDO"}>BAJO PEDIDO</Radio>
                    </Radio.Group>
                  ) : (
                    <Input
                      className="input-type"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                    />
                  )}
                </Form.Item>
                <Form.Item
                  label="Unidad de Medida"
                  name={
                    location.state.permiso
                      ? "fk_unidad_medida_id"
                      : "unidad_medida"
                  }
                  rules={[
                    {
                      required: true,
                      message: "Por favor, seleccione una unidad de medida!",
                    },
                  ]}
                >
                  {location.state.permiso ? (
                    <SelectOpciones
                      tipo="unidad de medida"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                      setShow={setShow}
                    />
                  ) : (
                    <Input
                      className="input-type"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                    />
                  )}
                </Form.Item>

                <Form.Item
                  label="Unidad de Venta"
                  name={
                    location.state.permiso
                      ? "fk_unidad_venta_id"
                      : "unidad_venta"
                  }
                  rules={[
                    {
                      required: true,
                      message: "Por favor, seleccione una unidad de venta!",
                    },
                  ]}
                >
                  {location.state.permiso ? (
                    <SelectOpciones
                      tipo="unidad de venta"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                      setShow={setShow}
                    />
                  ) : (
                    <Input
                      className="input-type"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                    />
                  )}
                </Form.Item>

                <Form.Item
                  label="Costo ($)"
                  name="costo"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese el costo!",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    precision={2}

                    readOnly={location.state ? !location.state.permiso : false}
                    // formatter={(value) =>
                    //   `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    // }
                    // parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  />
                </Form.Item>
                <Form.Item
                  label="Precio ($)"
                  name="precio"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese el precio!",
                    },
                  ]}
                >
                   <InputNumber
                    min={0}
                    precision={2}
                    readOnly={location.state ? !location.state.permiso : false}
                    // onBlur={() => form.setFieldsValue({precio : parseFloat(precio).toFixed(2).toString()})}
                    // formatter={(value) =>
                    //   `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    // }
                    // parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  />
                </Form.Item>
                <Form.Item
                  label="IVA"
                  name="iva"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese el IVA!",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    readOnly={location.state ? !location.state.permiso : false}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace("%", "")}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Límite Descuento 1"
                  name="limite_descuento1"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese el limite de descuento 1!",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    readOnly={location.state ? !location.state.permiso : false}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace("%", "")}
                  />
                </Form.Item>
                <Form.Item
                  label="Límite Descuento 2"
                  name="limite_descuento2"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese el limite de descuento 2!",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    readOnly={location.state ? !location.state.permiso : false}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace("%", "")}
                  />
                </Form.Item>
                <Form.Item
                  label="Límite Descuento 3"
                  name="limite_descuento3"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese el limite de descuento 3!",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    readOnly={location.state ? !location.state.permiso : false}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace("%", "")}
                  />
                </Form.Item>
                <Form.Item
                  label="Límite Descuento 4"
                  name="limite_descuento4"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese el limite de descuento 4!",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    readOnly={location.state ? !location.state.permiso : false}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace("%", "")}
                  />
                </Form.Item>
                <Form.Item
                  label="Límite Descuento 5"
                  name="limite_descuento5"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, ingrese el limite de descuento 5!",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    readOnly={location.state ? !location.state.permiso : false}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace("%", "")}
                  />
                </Form.Item>
                <Form.Item
                  label="Dimensión de Unidad de Venta"
                  name="dimension_unidad_venta"
                  rules={[
                    {
                      required: true,
                      message:
                        "Por favor, ingrese la dimensión de unidad de venta!",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    readOnly={location.state ? !location.state.permiso : false}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Panel>
          <Panel header="OTRA INFORMACIÓN" key="3" extra={genExtra()}>
            <Row>
              <Col span={12}>
                <Form.Item
                  {...tailLayout}
                  name="en_sistema_externo"
                  valuePropName="checked"
                >
                  {location.state.permiso ? (
                    <Checkbox
                      disabled={
                        location.state ? !location.state.permiso : false
                      }
                    >
                      En Sistema Externo
                    </Checkbox>
                  ) : editProducto.en_sistema_externo ? (
                    <p>
                      {" "}
                      En Sistema Externo: <CheckCircleFilled />
                    </p>
                  ) : (
                    <p>
                      {" "}
                      En Sistema Externo: <CloseCircleFilled />
                    </p>
                  )}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...tailLayout}
                  name="en_web"
                  valuePropName="checked"
                >
                  {location.state.permiso ? (
                    <Checkbox
                      disabled={
                        location.state ? !location.state.permiso : false
                      }
                    >
                      En Página Web
                    </Checkbox>
                  ) : editProducto.en_web ? (
                    <p>
                      {" "}
                      En Página Web: <CheckCircleFilled />
                    </p>
                  ) : (
                    <p>
                      {" "}
                      En Página Web: <CloseCircleFilled />
                    </p>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Panel>
        </Collapse>
        <br />
        <Row>
          <Col md={18} xs={15}>
            {location.state.permiso ? (
              <Form.Item {...tailLayout}>
                <Button
                  icon={<SaveOutlined />}
                  type="primary"
                  htmlType="submit"
                >
                  GUARDAR
                </Button>
              </Form.Item>
            ) : null}
          </Col>
        </Row>
      </Form>
      <Spin
        indicator={antIcon}
        hidden={!location.state.nuevo ? !show : true}
        className="loading-producto"
      />
    </>
  ) : null;
};

const ProductoForm = () => {
  return <FormProducto />;
};

export default ProductoForm;
