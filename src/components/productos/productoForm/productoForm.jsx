import React, { useContext, useEffect, useState } from "react";
import { message, Row, Col, Divider, Spin, Collapse, Select } from "antd";
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
import {
  usosCartuchos,
  usosMallasCeramica,
  usosMallasPisosFlotantes,
  usosPegamentos,
  usosSubcapa,
  usosTermostatos,
} from "../../../utils/usos";
import { Option } from "antd/lib/mentions";
import { tiposFilamento } from "../../../utils/tipoFilamento";
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
  const [generacionClick, setGeneracionClick] = useState(undefined);
  const [tieneSubcapaAdherida, setTieneSubcapaAdherida] = useState(undefined);
  const [usoCesped, setUsoCesped] = useState(undefined);
  const [rangoAlturaHebra, setRangoAlturaHebra] = useState(undefined);
  const [metodoABC, setMetodoABC] = useState(undefined);

  const [id, setId] = useState(null);
  const [show, setShow] = useState(null);
  const [infoTecnicaLinea, setinfoTecnicaLinea] = useState(null);
  const [infoTecnicaGrupo, setinfoTecnicaGrupo] = useState(null);

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

  var tiposFilamentoList = tiposFilamento.map(function (opcion) {
    return (
      <Option key={opcion.id} value={opcion.id}>
        {opcion.nombre.toUpperCase()}
      </Option>
    );
  });

  var cartuchosList = usosCartuchos.map(function (opcion) {
    return (
      <Option key={opcion.id} value={opcion.id}>
        {opcion.nombre.toUpperCase()}
      </Option>
    );
  });

  var mallasCeramicaList = usosMallasCeramica.map(function (opcion) {
    return (
      <Option key={opcion.id} value={opcion.id}>
        {opcion.nombre.toUpperCase()}
      </Option>
    );
  });

  var mallasPisosFlotantesList = usosMallasPisosFlotantes.map(function (
    opcion
  ) {
    return (
      <Option key={opcion.id} value={opcion.id}>
        {opcion.nombre.toUpperCase()}
      </Option>
    );
  });

  var pegamentosList = usosPegamentos.map(function (opcion) {
    return (
      <Option key={opcion.id} value={opcion.id}>
        {opcion.nombre.toUpperCase()}
      </Option>
    );
  });

  var subcapaList = usosSubcapa.map(function (opcion) {
    return (
      <Option key={opcion.id} value={opcion.id}>
        {opcion.nombre.toUpperCase()}
      </Option>
    );
  });

  var termostatosList = usosTermostatos.map(function (opcion) {
    return (
      <Option key={opcion.id} value={opcion.id}>
        {opcion.nombre.toUpperCase()}
      </Option>
    );
  });

  // useEffect(() => {
  //   if (infoTecnicaLinea === "60d4c0476e8514b5e8c66fd5") {
  //     console.log("piso de ingenieria!!!");
  //     setCapaDesgaste("LACA ULTIMTEC");
  //   } else if (infoTecnicaLinea === "60d4c04851cbd1b5e83632d3") {
  //     console.log("bambú!!");

  //     setCapaDesgaste("LACA UV DE ÓXIDO DE ALUMINIO");
  //   } else if (infoTecnicaLinea === "60d4c0491b6606b5e836f80f") {
  //     console.log("lvt!!");

  //     setCapaDesgaste("PUR");
  //   }
  // }, [infoTecnicaLinea]);

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

    if (!infoTecnicaLinea && editProducto) {
      setinfoTecnicaLinea(editProducto.fk_linea_id);
      setinfoTecnicaGrupo(editProducto.fk_grupo_id);
    }

    // return () => {
    //   setSelectedLineaId(undefined);
    //   setSelectedMarcaId(undefined);
    //   setId(null);
    //   setinfoTecnicaLinea(null);
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
    values["precio"] = parseFloat(values["precio"]).toFixed(2);
    values["costo"] = parseFloat(values["costo"]).toFixed(3);

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

    // form.setFieldsValue({'atributos_js.general.capa_desgaste' : "cambio"})

    const formFieldName = Object.keys(changedValues)[0];

    if (formFieldName === "fk_marca_id") {
      setSelectedMarcaId(changedValues[formFieldName]);

      form.setFieldsValue({ fk_color_id: undefined });
      form.setFieldsValue({ fk_grupo_id: undefined });
      form.setFieldsValue({ fk_proveedor_id: undefined });
      // form.setFieldsValue({ atributos_js: {"general": atributosJs , "especifico": {}} });
      // console.log("TEST", form.getFieldValue("atributos_js").especifico)
      // setinfoTecnicaLinea(null);
      // form.setFieldsValue({ codigo_interno: ""})
      // form.setFieldsValue({ nombre: ""})
    } else {
    }

    // if (formFieldName === "precio") {
    //   setPrecio(changedValues[formFieldName]);

    // }

    if (formFieldName === "fk_linea_id") {
      setinfoTecnicaLinea(form.getFieldValue("fk_linea_id"));

      setinfoTecnicaGrupo(null);

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

      if (changedValues[formFieldName] === "60d4c0476e8514b5e8c66fd5") {
        form.setFieldsValue({
          atributos_js: { general: { capa_desgaste: "LACA ULTIMTEC" } },
        });
      } else if (changedValues[formFieldName] === "60d4c04851cbd1b5e83632d3") {
        form.setFieldsValue({
          atributos_js: {
            general: { capa_desgaste: "LACA UV DE ÓXIDO DE ALUMINIO" },
          },
        });
      } else if (changedValues[formFieldName] === "60d4c0491b6606b5e836f80f") {
        form.setFieldsValue({
          atributos_js: { general: { capa_desgaste: "PUR" } },
        });
      }
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
      if (form.getFieldValue("fk_grupo_id") === "60d617738d422eca134f6685") {
        form.setFieldsValue({
          atributos_js: { especifico: { ca_conexion: "WI-FI" } },
        });
        form.setFieldsValue({
          atributos_js: { especifico: { ca_tipo_sensor: "NTC 10K" } },
        });
      }

      setinfoTecnicaGrupo(form.getFieldValue("fk_grupo_id"));
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

  const onChangeGeneracionClick = (e) => {
    setGeneracionClick(e.target.value);
  };

  const onChangeTieneSubcapaAdherida = (e) => {
    setTieneSubcapaAdherida(e.target.value);
  };

  const onChangeUsoCesped = (e) => {
    setUsoCesped(e.target.value);
  };

  const onChangeRangoAlturaHebra = (e) => {
    setRangoAlturaHebra(e.target.value);
  };

  const onChangeMetodoABC = (e) => {
    setMetodoABC(e.target.value);
  };

  const plainOptions = ["INTERIOR", "EXTERIOR"];

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
                  label="Línea"
                  name={location.state.permiso ? "fk_linea_id" : "linea"}
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message: "Por favor, seleccione una linea!",
                          },
                        ]
                      : []
                  }
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
                <Form.Item
                  label="Marca"
                  name={location.state.permiso ? "fk_marca_id" : "marca"}
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message: "Por favor, seleccione una marca!",
                          },
                        ]
                      : []
                  }
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
                  label="Grupo"
                  name={location.state.permiso ? "fk_grupo_id" : "grupo"}
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message: "Por favor, seleccione un grupo!",
                          },
                        ]
                      : []
                  }
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
                  label="Modelo"
                  name={location.state.permiso ? "fk_color_id" : "color"}
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message: "Por favor, seleccione un color!",
                          },
                        ]
                      : []
                  }
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
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Procedencia"
                  name="procedencia"
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message: "Por favor, ingrese la procedencia!",
                          },
                        ]
                      : []
                  }
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
                  label="Proveedor"
                  name={
                    location.state.permiso ? "fk_proveedor_id" : "proveedor"
                  }
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message: "Por favor, seleccione un proveedor!",
                          },
                        ]
                      : []
                  }
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
                  label="Código Interno"
                  name="codigo_interno"
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message: "Por favor, ingrese el código interno!",
                          },
                        ]
                      : []
                  }
                >
                  <Input className="input-type" readOnly={true} />
                </Form.Item>
                <Form.Item
                  label="Nombre"
                  name="nombre"
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message: "Por favor, ingrese el nombre!",
                          },
                        ]
                      : []
                  }
                >
                  <Input className="input-type" readOnly={true} />
                </Form.Item>

                <Form.Item
                  label="Descripción"
                  name="descripcion"
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message: "Por favor, ingrese la descripción!",
                          },
                        ]
                      : []
                  }
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
          <Panel
            className="tecnica"
            header="INFORMACIÓN TÉCNICA"
            key="4"
            extra={genExtra()}
          >
            <Row>
              <Col span={12}>
                <Form.Item
                  label={
                    infoTecnicaLinea !== "60d4c0477f7255b5e8cca2b7" &&
                    infoTecnicaLinea !== "60d4c04a8e4f5ab5e8b93218" &&
                    infoTecnicaLinea !== "60d4c04a145bfab5e81b4626" &&
                    infoTecnicaLinea !== "60d4c04ba23e72b5e8f93e11" &&
                    infoTecnicaLinea !== "60d4c04bc02e32b5e8ac7b68" &&
                    infoTecnicaLinea !== "60d4c04b894c18b5e810e025"
                      ? "Garantía Residencial (años)"
                      : "Garantía (años)"
                  }
                  name={["atributos_js", "general", "garantia1"]}
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message: "Por favor, ingrese la garantía!",
                          },
                        ]
                      : []
                  }
                >
                  {location.state.permiso ? (
                    <SelectOpciones
                      tipo="garantía"
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

                {infoTecnicaLinea === "60d4c046e600f1b5e85d075c" ||
                infoTecnicaGrupo === "60d6176a3e1331ca13a5f649" ||
                infoTecnicaGrupo === "60d4c04c0a5d5fb5e8e1ce12" ||
                infoTecnicaGrupo === "60d61769637c1aca1384fe74" ||
                infoTecnicaLinea === "60d4c04851cbd1b5e83632d3" ||
                infoTecnicaLinea === "60d4c0491b6606b5e836f80f" ||
                infoTecnicaLinea === "60d4c04c0a5d5fb5e8e1ce12" ||
                infoTecnicaLinea === "60d4c04880c445b5e8b87047" ||
                infoTecnicaLinea === "60db4816d2a990117e29ad6b" ? (
                  <Form.Item
                    label="Garantía Comercial (años)"
                    name={["atributos_js", "general", "garantia2"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, ingrese el tiempo de garantía!",
                            },
                          ]
                        : []
                    }
                  >
                    {location.state.permiso ? (
                      <SelectOpciones
                        tipo="garantía"
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
                ) : null}

                {infoTecnicaGrupo === "60d61769637c1aca1384fe74" ? (
                  <Form.Item
                    label="Garantía Industrial (años)"
                    name={["atributos_js", "general", "garantia3"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, ingrese el tiempo de garantía!",
                            },
                          ]
                        : []
                    }
                  >
                    {location.state.permiso ? (
                      <SelectOpciones
                        tipo="garantía"
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
                ) : null}

                <Form.Item
                  label="Formato"
                  name={["atributos_js", "general", "formato"]}
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message: "Por favor, seleccione el formato!",
                          },
                        ]
                      : []
                  }
                >
                  {location.state.permiso ? (
                    <SelectOpciones
                      tipo="formato"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
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
                {infoTecnicaLinea === "60d4c0476e8514b5e8c66fd5" ||
                infoTecnicaLinea === "60d4c04851cbd1b5e83632d3" ||
                infoTecnicaLinea === "60d4c0491b6606b5e836f80f" ? (
                  <Form.Item
                    label="Capa de Desgaste"
                    name={["atributos_js", "general", "capa_desgaste"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, ingrese la capa de desgaste!",
                            },
                          ]
                        : []
                    }
                  >
                    <Input
                      // defaultValue={capaDesgaste}
                      className="input-type"
                      readOnly={true}
                    />
                  </Form.Item>
                ) : null}
              </Col>
              <Col span={12}>
                {infoTecnicaLinea !== "60d4c0477f7255b5e8cca2b7" &&
                infoTecnicaLinea !== "60d4c04ba23e72b5e8f93e11" &&
                infoTecnicaLinea !== "60d4c04bc02e32b5e8ac7b68" ? (
                  <Form.Item
                    label="Composición"
                    name={["atributos_js", "general", "composicion"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message: "Por favor, seleccione la composicion!",
                            },
                          ]
                        : []
                    }
                  >
                    {location.state.permiso ? (
                      <Radio.Group
                        disabled={
                          location.state ? !location.state.permiso : false
                        }
                      >
                        <Radio value={"HOMOGÉNEO"}>HOMOGÉNEO</Radio>
                        <Radio value={"HETEROGÉNEO"}>HETEROGÉNEO</Radio>
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
                ) : null}

                {infoTecnicaLinea !== "60d4c04ba23e72b5e8f93e11" &&
                infoTecnicaLinea !== "60d4c04a145bfab5e81b4626" &&
                infoTecnicaLinea !== "60d4c04bc02e32b5e8ac7b68" ? (
                  <div>
                    <Form.Item
                      label="Resistencia al Agua"
                      name={["atributos_js", "general", "resitencia_agua"]}
                      rules={
                        location.state.permiso
                          ? [
                              {
                                required: true,
                                message:
                                  "Por favor, si es resistente al agua o no!",
                              },
                            ]
                          : []
                      }
                    >
                      {location.state.permiso ? (
                        <Radio.Group
                          disabled={
                            location.state ? !location.state.permiso : false
                          }
                        >
                          <Radio value={"SI"}>SI</Radio>
                          <Radio value={"NO"}>NO</Radio>
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
                      label="Tono"
                      name={["atributos_js", "general", "tono"]}
                      rules={
                        location.state.permiso
                          ? [
                              {
                                required: true,
                                message: "Por favor, seleccione el tono!",
                              },
                            ]
                          : []
                      }
                    >
                      {location.state.permiso ? (
                        <SelectOpciones
                          tipo="tono"
                          readOnly={
                            location.state ? !location.state.permiso : false
                          }
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
                      label="Textura"
                      name={["atributos_js", "general", "textura"]}
                      rules={
                        location.state.permiso
                          ? [
                              {
                                required: true,
                                message: "Por favor, seleccione la textura!",
                              },
                            ]
                          : []
                      }
                    >
                      {location.state.permiso ? (
                        <Radio.Group
                          disabled={
                            location.state ? !location.state.permiso : false
                          }
                        >
                          <Radio value={"MADERADO"}>MADERADO</Radio>
                          <Radio value={"NO MADERADO"}>NO MADERADO</Radio>
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
                  </div>
                ) : null}
                {infoTecnicaLinea !== "60d4c0477f7255b5e8cca2b7" &&
                infoTecnicaLinea !== "60d4c04a8e4f5ab5e8b93218" &&
                infoTecnicaLinea !== "60d4c04a145bfab5e81b4626" &&
                infoTecnicaLinea !== "60d4c04ba23e72b5e8f93e11" &&
                infoTecnicaLinea !== "60d4c04bc02e32b5e8ac7b68" &&
                infoTecnicaLinea !== "60d4c04b894c18b5e810e025" ? (
                  <Form.Item
                    label="Clase Residencial"
                    name={["atributos_js", "general", "clase_residencial"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, seleccione la clase residencial!",
                            },
                          ]
                        : []
                    }
                  >
                    {location.state.permiso ? (
                      <SelectOpciones
                        tipo="clase residencial"
                        readOnly={
                          location.state ? !location.state.permiso : false
                        }
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
                ) : null}

                {infoTecnicaLinea === "60d4c046e600f1b5e85d075c" ||
                infoTecnicaGrupo === "60d6176a3e1331ca13a5f649" ||
                infoTecnicaGrupo === "60d4c04c0a5d5fb5e8e1ce12" ||
                infoTecnicaGrupo === "60d61769637c1aca1384fe74" ||
                infoTecnicaLinea === "60d4c04851cbd1b5e83632d3" ||
                infoTecnicaLinea === "60d4c0491b6606b5e836f80f" ||
                infoTecnicaLinea === "60d4c04c0a5d5fb5e8e1ce12" ||
                infoTecnicaLinea === "60d4c04880c445b5e8b87047" ||
                infoTecnicaLinea === "60db4816d2a990117e29ad6b" ? (
                  <Form.Item
                    label="Clase Comercial"
                    name={["atributos_js", "general", "clase_comercial"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, seleccione la clase comercial!",
                            },
                          ]
                        : []
                    }
                  >
                    {location.state.permiso ? (
                      <SelectOpciones
                        tipo="clase comercial"
                        readOnly={
                          location.state ? !location.state.permiso : false
                        }
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
                ) : null}

                {infoTecnicaGrupo === "60d61769637c1aca1384fe74" ? (
                  <Form.Item
                    label="Clase Industrial"
                    name={["atributos_js", "general", "clase_industrial"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, seleccione la clase industrial!",
                            },
                          ]
                        : []
                    }
                  >
                    {location.state.permiso ? (
                      <SelectOpciones
                        tipo="clase industrial"
                        readOnly={
                          location.state ? !location.state.permiso : false
                        }
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
                ) : null}

                {infoTecnicaLinea !== "60d4c04bc02e32b5e8ac7b68" ? (
                  <div>
                    <Form.Item
                      label="Largo"
                      name={["atributos_js", "general", "largo"]}
                      rules={
                        location.state.permiso
                          ? [
                              {
                                required: true,
                                message:
                                  "Por favor, ingrese la medida de largo!",
                              },
                            ]
                          : []
                      }
                    >
                      <InputNumber
                        min={0}
                        precision={0}
                        readOnly={
                          location.state ? !location.state.permiso : false
                        }
                        formatter={(value) => `${value} mm`}
                        parser={(value) => value.replace(" mm", "")}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Ancho"
                      name={["atributos_js", "general", "ancho"]}
                      rules={
                        location.state.permiso
                          ? [
                              {
                                required: true,
                                message:
                                  "Por favor, ingrese la medida de ancho!",
                              },
                            ]
                          : []
                      }
                    >
                      <InputNumber
                        min={0}
                        precision={0}
                        readOnly={
                          location.state ? !location.state.permiso : false
                        }
                        formatter={(value) => `${value} mm`}
                        parser={(value) => value.replace(" mm", "")}
                      />
                    </Form.Item>
                  </div>
                ) : null}

                {(infoTecnicaLinea !== "60d4c04ba23e72b5e8f93e11" &&
                  infoTecnicaLinea !== "60d4c04bc02e32b5e8ac7b68") ||
                infoTecnicaGrupo === "60d617738d422eca134f6685" ? (
                  <Form.Item
                    label="Espesor"
                    name={["atributos_js", "general", "espesor"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, ingrese la medida de espesor!",
                            },
                          ]
                        : []
                    }
                  >
                    <InputNumber
                      min={0}
                      precision={0}
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                      formatter={(value) => `${value} mm`}
                      parser={(value) => value.replace(" mm", "")}
                    />
                  </Form.Item>
                ) : null}
              </Col>
            </Row>
            <Divider />
            {infoTecnicaLinea !== "60d4c04663852fb5e8ad40d7" &&
            infoTecnicaLinea !== "60d4c0477f7255b5e8cca2b7" &&
            infoTecnicaLinea !== "60d4c04ba23e72b5e8f93e11" ? (
              <Form.Item
                label="Densidad"
                name={["atributos_js", "general", "densidad"]}
                rules={
                  location.state.permiso
                    ? [
                        {
                          required: true,
                          message: "Por favor, ingrese la densidad!",
                        },
                      ]
                    : []
                }
              >
                <InputNumber
                  min={0}
                  precision={2}
                  readOnly={location.state ? !location.state.permiso : false}
                  formatter={(value) => `${value} kg/m3`}
                  parser={(value) => value.replace(" kg/m3", "")}
                />
              </Form.Item>
            ) : null}
            {infoTecnicaLinea === "60d4c046e600f1b5e85d075c" ||
            infoTecnicaLinea === "60d4c04851cbd1b5e83632d3" ||
            infoTecnicaLinea === "60d4c04c0a5d5fb5e8e1ce12" ||
            infoTecnicaLinea === "60d4c0491b6606b5e836f80f" ||
            infoTecnicaLinea === "60d4c0476e8514b5e8c66fd5" ||
            infoTecnicaLinea === "60d4c04880c445b5e8b87047" ? (
              <div>
                <Form.Item
                  label="Core"
                  name={["atributos_js", "general", "core"]}
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message: "Por favor, seleccione el core!",
                          },
                        ]
                      : []
                  }
                >
                  {location.state.permiso ? (
                    <SelectOpciones
                      tipo="core"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
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
                  label="Terminado"
                  name={["atributos_js", "general", "terminado"]}
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message: "Por favor, seleccione el terminado!",
                          },
                        ]
                      : []
                  }
                >
                  {location.state.permiso ? (
                    <SelectOpciones
                      tipo="terminado"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
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
              </div>
            ) : null}

            {infoTecnicaLinea === "60d4c046e600f1b5e85d075c" ||
            infoTecnicaLinea === "60d4c0476e8514b5e8c66fd5" ||
            infoTecnicaLinea === "60d4c04c0a5d5fb5e8e1ce12" ||
            infoTecnicaLinea === "60d4c0491b6606b5e836f80f" ? (
              <Row>
                <Col span={12}>
                  <Form.Item
                    label="Biseles"
                    name={["atributos_js", "especifico", "pl_biseles"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, ingrese el número de biseles!",
                            },
                          ]
                        : []
                    }
                  >
                    <InputNumber
                      min={0}
                      precision={0}
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                      // formatter={(value) => `${value} mm`}
                      // parser={(value) => value.replace(" mm", "")}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Resistencia a la Abrasión"
                    name={[
                      "atributos_js",
                      "especifico",
                      "pl_resistencia_abrasion",
                    ]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, seleccione la resistencia a la abrasión!",
                            },
                          ]
                        : []
                    }
                  >
                    {location.state.permiso ? (
                      <SelectOpciones
                        tipo="resistencia a la abrasion"
                        readOnly={
                          location.state ? !location.state.permiso : false
                        }
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
                    label="Sistema de Click"
                    name={["atributos_js", "especifico", "pl_sistema_click"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, seleccione el sistema de click!",
                            },
                          ]
                        : []
                    }
                  >
                    {location.state.permiso ? (
                      <SelectOpciones
                        tipo="sistema de click"
                        readOnly={
                          location.state ? !location.state.permiso : false
                        }
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
                    label="Generación de Click "
                    name={["atributos_js", "especifico", "pl_generacion_click"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, seleccione si la generación de click!",
                            },
                          ]
                        : []
                    }
                  >
                    {location.state.permiso ? (
                      <Radio.Group
                        onChange={onChangeGeneracionClick}
                        value={generacionClick}
                        disabled={
                          location.state ? !location.state.permiso : false
                        }
                      >
                        <Radio value={"3G"}>3G</Radio>
                        <Radio value={"5G"}>5G</Radio>
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
                    label="Subcapa Adherida"
                    name={["atributos_js", "especifico", "pl_subcapa_adherida"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, seleccione si tiene subcapa adherida!",
                            },
                          ]
                        : []
                    }
                  >
                    {location.state.permiso ? (
                      <Radio.Group
                        onChange={onChangeTieneSubcapaAdherida}
                        value={tieneSubcapaAdherida}
                        disabled={
                          location.state ? !location.state.permiso : false
                        }
                      >
                        <Radio value={"SI"}>SI</Radio>
                        <Radio value={"NO"}>NO</Radio>
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
                </Col>
                <Col span={12}></Col>
              </Row>
            ) : infoTecnicaLinea === "60d4c0477f7255b5e8cca2b7" ? (
              <Row>
                <Col span={12}>
                  <Form.Item
                    label="Uso(s)"
                    name={["atributos_js", "especifico", "cs_uso"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message: "Por favor, ingrese el/los uso(s)!",
                            },
                          ]
                        : []
                    }
                  >
                    {location.state.permiso ? (
                      <Radio.Group
                        onChange={onChangeUsoCesped}
                        value={usoCesped}
                        disabled={
                          location.state ? !location.state.permiso : false
                        }
                      >
                        <Radio value={"DECORATIVO"}>DECORATIVO</Radio>
                        <Radio value={"DEPORTIVO"}>DEPORTIVO</Radio>
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
                    label="Aplicación"
                    name={["atributos_js", "especifico", "cs_aplicacion"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message: "Por favor, ingrese la aplicación!",
                            },
                          ]
                        : []
                    }
                  >
                    {location.state.permiso ? (
                      <Checkbox.Group options={plainOptions} />
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
                    label="Rango de Altura de Hebra"
                    name={[
                      "atributos_js",
                      "especifico",
                      "cs_rango_altura_hebra",
                    ]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, seleccione el rango de altura de la hebra!",
                            },
                          ]
                        : []
                    }
                  >
                    {location.state.permiso ? (
                      <Radio.Group
                        onChange={onChangeRangoAlturaHebra}
                        value={rangoAlturaHebra}
                        disabled={
                          location.state ? !location.state.permiso : false
                        }
                        de
                      >
                        <Radio value={"5 mm - 11 mm"}>5 mm - 11 mm</Radio>
                        <Radio value={"18 mm - 45 mm"}>18 mm - 45 mm</Radio>
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
                    label="Altura de Hebra"
                    name={["atributos_js", "especifico", "cs_altura_hebra"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, ingrese la altura de la hebra!",
                            },
                          ]
                        : []
                    }
                  >
                    <InputNumber
                      min={0}
                      precision={0}
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                      formatter={(value) => `${value} mm`}
                      parser={(value) => value.replace(" mm", "")}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Puntadas cada 10 cm"
                    name={["atributos_js", "especifico", "cs_puntadas_10cm"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, ingrese el número de puntadas cada 10cm!",
                            },
                          ]
                        : []
                    }
                  >
                    <InputNumber
                      min={0}
                      precision={0}
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Puntadas por m2"
                    name={["atributos_js", "especifico", "cs_puntadas_m2"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, ingrese el número de puntadas por m2!",
                            },
                          ]
                        : []
                    }
                  >
                    <InputNumber
                      min={0}
                      precision={0}
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Filamentos por Puntada"
                    name={[
                      "atributos_js",
                      "especifico",
                      "cs_filamentos_puntada",
                    ]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, ingrese el número de filamentos por puntada!",
                            },
                          ]
                        : []
                    }
                  >
                    <InputNumber
                      min={0}
                      precision={0}
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Filamentos por m2"
                    name={["atributos_js", "especifico", "cs_filamentos_m2"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, ingrese el número de filamentos por m2!",
                            },
                          ]
                        : []
                    }
                  >
                    <InputNumber
                      min={0}
                      precision={0}
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Galga"
                    name={["atributos_js", "especifico", "cs_galga"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message: "Por favor, ingrese la medida de galga!",
                            },
                          ]
                        : []
                    }
                  >
                    <Input
                      suffix="''"
                      className="input-type"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    label="Tipo(s) de Filamento"
                    name={["atributos_js", "especifico", "cs_tipo_filamento"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, seleccione el tipo(s) de filamento!",
                            },
                          ]
                        : []
                    }
                  >
                    {location.state.permiso ? (
                      <Select
                        mode="multiple"
                        allowClear
                        placeholder="Seleccione tipo de filamento"
                        readOnly={
                          location.state ? !location.state.permiso : false
                        }
                      >
                        {tiposFilamentoList}
                      </Select>
                    ) : (
                      <TextArea
                        readOnly={
                          location.state ? !location.state.permiso : false
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            ) : infoTecnicaLinea === "60d4c04a145bfab5e81b4626" ? (
              <Row>
                <Col span={12}>
                  <Form.Item
                    label="Material:"
                    name={["atributos_js", "especifico", "sc_material"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message: "Por favor, seleccione el material!",
                            },
                          ]
                        : []
                    }
                  >
                    {location.state.permiso ? (
                      <SelectOpciones
                        tipo="material"
                        readOnly={
                          location.state ? !location.state.permiso : false
                        }
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
                    label="Color:"
                    name={["atributos_js", "especifico", "sc_color"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, seleccione el color de la subcapa",
                            },
                          ]
                        : []
                    }
                  >
                    {location.state.permiso ? (
                      <SelectOpciones
                        tipo="color de subcapa"
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
                    label="Tipo de Esponja"
                    name={["atributos_js", "especifico", "sc_tipo_esponja"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, seleccione el tipo de esponja!",
                            },
                          ]
                        : []
                    }
                  >
                    {location.state.permiso ? (
                      <Radio.Group
                        disabled={
                          location.state ? !location.state.permiso : false
                        }
                      >
                        <Radio value={"EVA"}>EVA</Radio>
                        <Radio value={"EPE"}>EPE</Radio>
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
                </Col>
              </Row>
            ) : infoTecnicaLinea === "60d4c04851cbd1b5e83632d3" ? (
              <Form.Item
                label="Tipo de Hebra"
                name={["atributos_js", "especifico", "pb_tipo_hebra"]}
                rules={
                  location.state.permiso
                    ? [
                        {
                          required: true,
                          message: "Por favor, seleccione el tipo de hebra!",
                        },
                      ]
                    : []
                }
              >
                {location.state.permiso ? (
                  <Radio.Group
                    disabled={location.state ? !location.state.permiso : false}
                  >
                    <Radio value={"TEJIDA"}>TEJIDA</Radio>
                    <Radio value={"HORIZONTAL"}>HORIZONTAL</Radio>
                  </Radio.Group>
                ) : (
                  <Input
                    className="input-type"
                    readOnly={location.state ? !location.state.permiso : false}
                  />
                )}
              </Form.Item>
            ) : infoTecnicaLinea === "60d4c04ba23e72b5e8f93e11" ? (
              <Row>
                <Col span={12}>
                  {infoTecnicaGrupo === "60d617738d422eca134f6685" ? (
                    <div>
                      <Form.Item
                        label="Dimensión de la pantalla"
                        name={[
                          "atributos_js",
                          "especifico",
                          "ca_dimension_pantalla",
                        ]}
                        rules={
                          location.state.permiso
                            ? [
                                {
                                  required: true,
                                  message:
                                    "Por favor, seleccione el tipo de hebra!",
                                },
                              ]
                            : []
                        }
                      >
                        {location.state.permiso ? (
                          <Radio.Group
                            disabled={
                              location.state ? !location.state.permiso : false
                            }
                          >
                            <Radio value={"72 X 54 MM"}>72 X 54 MM</Radio>
                            <Radio value={"35 X 50 MM"}>35 X 50 MM</Radio>
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
                        label="Conexión"
                        name={["atributos_js", "especifico", "ca_conexion"]}
                        rules={
                          location.state.permiso
                            ? [
                                {
                                  required: true,
                                  message:
                                    "Por favor, ingrese el tipo de conexión!",
                                },
                              ]
                            : []
                        }
                      >
                        <Input
                          // defaultValue="WI-FI"
                          className="input-type"
                          readOnly={true}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Tipo de Sensor"
                        name={["atributos_js", "especifico", "ca_tipo_sensor"]}
                        rules={
                          location.state.permiso
                            ? [
                                {
                                  required: true,
                                  message:
                                    "Por favor, ingrese el tipo de sensor!",
                                },
                              ]
                            : []
                        }
                      >
                        <Input
                          // defaultValue="NTC 10K"
                          className="input-type"
                          readOnly={true}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Color del Calefactor"
                        name={[
                          "atributos_js",
                          "especifico",
                          "ca_color_calefactor",
                        ]}
                        rules={
                          location.state.permiso
                            ? [
                                {
                                  required: true,
                                  message:
                                    "Por favor, seleccione el color del calefactor!",
                                },
                              ]
                            : []
                        }
                      >
                        {location.state.permiso ? (
                          <Radio.Group
                            disabled={
                              location.state ? !location.state.permiso : false
                            }
                          >
                            <Radio value={"BLANCO"}>BLANCO</Radio>
                            <Radio value={"NEGRO"}>NEGRO</Radio>
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
                    </div>
                  ) : null}

                  <Form.Item
                    label="Alimentación"
                    name={["atributos_js", "especifico", "ca_alimentacion"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, ingrese el valor de la alimentación!",
                            },
                          ]
                        : []
                    }
                  >
                    <InputNumber
                      min={0}
                      precision={0}
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                      formatter={(value) => `${value} V`}
                      parser={(value) => value.replace(" V", "")}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Longitud del Cable de Alimentación"
                    name={[
                      "atributos_js",
                      "especifico",
                      "ca_longitud_cable_alimentacion",
                    ]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, ingrese la longitud del cable de alimentación!",
                            },
                          ]
                        : []
                    }
                  >
                    <InputNumber
                      min={0}
                      precision={0}
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                      formatter={(value) => `${value} m`}
                      parser={(value) => value.replace(" m", "")}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Potencia"
                    name={["atributos_js", "especifico", "ca_potencia"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message: "Por favor, ingrese la potencia!",
                            },
                          ]
                        : []
                    }
                  >
                    <InputNumber
                      min={0}
                      precision={2}
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                      formatter={(value) => `${value} W/m2`}
                      parser={(value) => value.replace(" W/m2", "")}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Presentación"
                    name={["atributos_js", "especifico", "ca_presentacion"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message: "Por favor, ingrese la presentación!",
                            },
                          ]
                        : []
                    }
                  >
                    <InputNumber
                      min={0}
                      precision={0}
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                      formatter={(value) => `${value} m2`}
                      parser={(value) => value.replace(" m2", "")}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Corriente"
                    name={["atributos_js", "especifico", "ca_corriente"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message: "Por favor, ingrese la corriente!",
                            },
                          ]
                        : []
                    }
                  >
                    <InputNumber
                      min={0}
                      precision={2}
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                      formatter={(value) => `${value} A`}
                      parser={(value) => value.replace(" A", "")}
                    />
                  </Form.Item>
                </Col>
              </Row>
            ) : infoTecnicaLinea === "60d4c0476e8514b5e8c66fd5" ? (
              <Form.Item
                label="Espesor de Capa de Madera"
                name={["atributos_js", "especifico", "pi_espesor_capa_madera"]}
                rules={
                  location.state.permiso
                    ? [
                        {
                          required: true,
                          message:
                            "Por favor, ingrese el espesor de la capa de madera",
                        },
                      ]
                    : []
                }
              >
                <InputNumber
                  min={0}
                  precision={2}
                  readOnly={location.state ? !location.state.permiso : false}
                  formatter={(value) => `${value} mm`}
                  parser={(value) => value.replace(" mm", "")}
                />
              </Form.Item>
            ) : infoTecnicaLinea === "60d4c04bc02e32b5e8ac7b68" ? (
              <Row>
                <Col span={12}>
                  <Form.Item
                    label="Rodamiento de Carga"
                    name={[
                      "atributos_js",
                      "especifico",
                      "pa_capacidad_rodamiento_carga",
                    ]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, seleccione la capacidad de rodamiento de carga!",
                            },
                          ]
                        : []
                    }
                  >
                    {location.state.permiso ? (
                      <SelectOpciones
                        tipo="capacidad de Rodamiento de Carga"
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

                  {infoTecnicaGrupo === "60d61771f30664ca137cf63f" ? (
                    <div>
                      <Form.Item
                        label="Tiempo de Trabajo"
                        name={[
                          "atributos_js",
                          "especifico",
                          "pa_tiempo_trabajo",
                        ]}
                        rules={
                          location.state.permiso
                            ? [
                                {
                                  required: true,
                                  message:
                                    "Por favor, ingrese el tiempo de trabajo!",
                                },
                              ]
                            : []
                        }
                      >
                        <InputNumber
                          min={0}
                          precision={0}
                          readOnly={
                            location.state ? !location.state.permiso : false
                          }
                          formatter={(value) => `${value} min`}
                          parser={(value) => value.replace(" min", "")}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Tiempo de Oreo"
                        name={["atributos_js", "especifico", "pa_tiempo_oreo"]}
                        rules={
                          location.state.permiso
                            ? [
                                {
                                  required: true,
                                  message:
                                    "Por favor, ingrese el tiempo de oreo!",
                                },
                              ]
                            : []
                        }
                      >
                        <InputNumber
                          min={0}
                          precision={0}
                          readOnly={
                            location.state ? !location.state.permiso : false
                          }
                          formatter={(value) => `${value} min`}
                          parser={(value) => value.replace(" min", "")}
                        />
                      </Form.Item>
                    </div>
                  ) : null}
                  <Form.Item
                    label="Presentación"
                    name={["atributos_js", "especifico", "pa_presentacion"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message: "Por favor, ingrese la presentacion!",
                            },
                          ]
                        : []
                    }
                  >
                    <Input
                      suffix="gal"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Color"
                    name={["atributos_js", "especifico", "pa_color_pegamento"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message: "Por favor, seleccione el color!",
                            },
                          ]
                        : []
                    }
                  >
                    <SelectOpciones
                      tipo="color de pegamento"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                      setShow={setShow}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Olor"
                    name={["atributos_js", "especifico", "pa_olor_pegamento"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message: "Por favor, seleccione el tipo de olor!",
                            },
                          ]
                        : []
                    }
                  >
                    <SelectOpciones
                      tipo="olor"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                      setShow={setShow}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Adherencia"
                    name={["atributos_js", "especifico", "pa_adherencia"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, seleccione el tipo adherencia!",
                            },
                          ]
                        : []
                    }
                  >
                    <SelectOpciones
                      tipo="adherencia"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                      setShow={setShow}
                    />
                  </Form.Item>
                </Col>
              </Row>
            ) : infoTecnicaLinea === "60db4816d2a990117e29ad6b" ? (
              <Row>
                <Col span={12}>
                  <Form.Item
                    label="Proceso de Fabricación"
                    name={["atributos_js", "especifico", "pe_presentacion"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, ingrese el proceso de fabricación!",
                            },
                          ]
                        : []
                    }
                  >
                    <Input readOnly={true} defaultValue="MONOCOCCIÓN" />
                  </Form.Item>
                  <Form.Item
                    label="Rectificado"
                    name={["atributos_js", "especifico", "pe_rectificado"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, seleccione rectificado o no!",
                            },
                          ]
                        : []
                    }
                  >
                    {location.state.permiso ? (
                      <Radio.Group
                        disabled={
                          location.state ? !location.state.permiso : false
                        }
                      >
                        <Radio value={"SI"}>SI</Radio>
                        <Radio value={"NO"}>NO</Radio>
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
                    label="Absorción de Agua"
                    name={["atributos_js", "especifico", "pe_absorcion_agua"]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, ingrese el valor de absorción de agua!",
                            },
                          ]
                        : []
                    }
                  >
                    <Input readOnly={true} defaultValue="<0.5%" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Resistencia al Deslizamiento"
                    name={[
                      "atributos_js",
                      "especifico",
                      "pa_resistencia_deslizamiento",
                    ]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, seleccione la resistencia al deslizamiento!",
                            },
                          ]
                        : []
                    }
                  >
                    <SelectOpciones
                      tipo="resistencia al deslizamiento"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                      setShow={setShow}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Resistencia a la Abrasión"
                    name={[
                      "atributos_js",
                      "especifico",
                      "pa_resistencia_abrasion",
                    ]}
                    rules={
                      location.state.permiso
                        ? [
                            {
                              required: true,
                              message:
                                "Por favor, seleccione la resistencia a la abrasión!",
                            },
                          ]
                        : []
                    }
                  >
                    <SelectOpciones
                      tipo="resistencia a la abrasión"
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                      setShow={setShow}
                    />
                  </Form.Item>
                </Col>
              </Row>
            ) : null}
            {infoTecnicaLinea === "60d4c04a145bfab5e81b4626" ||
            infoTecnicaLinea === "60d4c04bc02e32b5e8ac7b68" ||
            infoTecnicaLinea === "60d4c04ba23e72b5e8f93e11" ? (
              <Form.Item
                label="Usos"
                name={["atributos_js", "general", "usos"]}
                rules={
                  location.state.permiso
                    ? [
                        {
                          required: true,
                          message: "Por favor, seleccione los usos!",
                        },
                      ]
                    : []
                }
              >
                {location.state.permiso ? (
                  <Select
                    mode="multiple"
                    allowClear
                    placeholder="Seleccione usos"
                    readOnly={location.state ? !location.state.permiso : false}
                  >
                    {infoTecnicaLinea === "60d4c04a145bfab5e81b4626"
                      ? subcapaList
                      : infoTecnicaGrupo === "60d617738d422eca134f6685"
                      ? termostatosList
                      : infoTecnicaGrupo === "60d61771a442edca131848b6"
                      ? cartuchosList
                      : infoTecnicaGrupo === "60d61771f30664ca137cf63f"
                      ? pegamentosList
                      : infoTecnicaGrupo === "60d617724ce2a1ca13e92920"
                      ? mallasCeramicaList
                      : infoTecnicaGrupo === "60d617724cbea5ca130847e1"
                      ? mallasPisosFlotantesList
                      : null}
                  </Select>
                ) : (
                  <TextArea
                    // className="input-type"
                    readOnly={location.state ? !location.state.permiso : false}
                  />
                )}
              </Form.Item>
            ) : null}
          </Panel>
          <Panel header="INFORMACIÓN COMERCIAL" key="2" extra={genExtra()}>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="Método ABC"
                  name={["atributos_js", "general", "metodo_abc"]}
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message: "Por favor, ingrese el método ABC!",
                          },
                        ]
                      : []
                  }
                >
                  {location.state.permiso ? (
                    <Radio.Group
                      onChange={onChangeMetodoABC}
                      value={metodoABC}
                      disabled={
                        location.state ? !location.state.permiso : false
                      }
                    >
                      <Radio value={"A"}>A</Radio>
                      <Radio value={"B"}>B</Radio>
                      <Radio value={"C"}>C</Radio>
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
                  label="Tipo"
                  name="tipo"
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message:
                              "Por favor, seleccione el tipo de producto!",
                          },
                        ]
                      : []
                  }
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
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message:
                              "Por favor, seleccione el tipo de inventario!",
                          },
                        ]
                      : []
                  }
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
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message:
                              "Por favor, seleccione una unidad de medida!",
                          },
                        ]
                      : []
                  }
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
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message:
                              "Por favor, seleccione una unidad de venta!",
                          },
                        ]
                      : []
                  }
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
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message: "Por favor, ingrese el costo!",
                          },
                        ]
                      : []
                  }
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
                  label="Precio sin IVA ($)"
                  name="precio"
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message: "Por favor, ingrese el precio!",
                          },
                        ]
                      : []
                  }
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

                {!location.state.permiso ? (
                  <Form.Item label="Precio con IVA ($)">
                    <InputNumber
                      value={
                        (form.getFieldValue("precio") *
                          (parseFloat(form.getFieldValue("iva")) + 100)) /
                        100
                      }
                      min={0}
                      precision={2}
                      readOnly={
                        location.state ? !location.state.permiso : false
                      }
                      // onBlur={() => form.setFieldsValue({precio : parseFloat(precio).toFixed(2).toString()})}
                      // formatter={(value) =>
                      //   `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      // }
                      // parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    />
                  </Form.Item>
                ) : null}

                <Form.Item
                  label="IVA"
                  name="iva"
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message: "Por favor, ingrese el IVA!",
                          },
                        ]
                      : []
                  }
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
                  label="Descuento Especialista"
                  name="limite_descuento1"
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message:
                              "Por favor, ingrese el limite de descuento 1!",
                          },
                        ]
                      : []
                  }
                >
                  <InputNumber
                    min={0}
                    readOnly={location.state ? !location.state.permiso : false}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace("%", "")}
                  />
                </Form.Item>
                <Form.Item
                  label="Descuento Líder Retail"
                  name="limite_descuento2"
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message:
                              "Por favor, ingrese el limite de descuento 2!",
                          },
                        ]
                      : []
                  }
                >
                  <InputNumber
                    min={0}
                    readOnly={location.state ? !location.state.permiso : false}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace("%", "")}
                  />
                </Form.Item>
                <Form.Item
                  label="Descuento Líder Proyectos"
                  name="limite_descuento3"
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message:
                              "Por favor, ingrese el limite de descuento 3!",
                          },
                        ]
                      : []
                  }
                >
                  <InputNumber
                    min={0}
                    readOnly={location.state ? !location.state.permiso : false}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace("%", "")}
                  />
                </Form.Item>
                <Form.Item
                  label="Descuento Eventos"
                  name="limite_descuento4"
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message:
                              "Por favor, ingrese el limite de descuento 4!",
                          },
                        ]
                      : []
                  }
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
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message:
                              "Por favor, ingrese el limite de descuento 5!",
                          },
                        ]
                      : []
                  }
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
                  rules={
                    location.state.permiso
                      ? [
                          {
                            required: true,
                            message:
                              "Por favor, ingrese la dimensión de unidad de venta!",
                          },
                        ]
                      : []
                  }
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
                      En Sistema Externo: <CheckCircleFilled />
                    </p>
                  ) : (
                    <p>
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
                      En Página Web: <CheckCircleFilled />
                    </p>
                  ) : (
                    <p>
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
