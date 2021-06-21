import React, { useContext, useEffect, useState } from "react";
import { message, Row, Col, Divider, Spin } from "antd";
import { Form, Input, Button, Checkbox, InputNumber, Radio } from "antd";
import SelectOpciones from "../../selectOpciones/selectOpciones";
import { ProductoContext } from "../../../contexts/productoContext";
import { useHistory } from "react-router";
import { useLocation, useParams, useRouteMatch } from "react-router-dom";
import "./productoForm.css";
import { CheckCircleFilled, CloseCircleFilled, LoadingOutlined, SaveOutlined } from "@ant-design/icons";
const FormProducto = (props) => {
  // console.log(props);
  const location = useLocation();
  let { path } = useRouteMatch();

  console.log(path);
  // console.log(props);
  const { createProducto, updateProducto, setPermiso, findProducto, editProducto } =
    useContext(ProductoContext);

  let history = useHistory();
  let { codigo } = useParams();
  const [selectedMarcaId, setSelectedMarcaId] = useState(undefined);
  const [selectedLineaId, setSelectedLineaId] = useState(undefined);
  const [tipoInventario, setTipoInventario] = useState(undefined);
  const [tipoProducto, setTipoProducto] = useState(undefined);
  const [id, setId] = useState(null);
  const [show, setShow] = useState(null);
  const [infoTecnica, setInfoTecnica] = useState(null)


  useEffect(() => {


    console.log(location.state);
    console.log("CODIGO: ",codigo);
    findProducto(codigo);
    console.log("PRODUCTO", editProducto)
    
    if (editProducto){

      if (!selectedMarcaId && !selectedLineaId) {
        setSelectedMarcaId(editProducto.fk_marca_id);
        setSelectedLineaId(editProducto.fk_linea_id);
        setId(editProducto.id);
      }

    }
    
    if (show === null) {
      if (location.state){
        setShow(location.state.permiso)
      }else{
        history.goBack();
      }
    }

    if (!infoTecnica && editProducto){

      setInfoTecnica(editProducto.fk_linea_id);

    }
  })

  const [form] = Form.useForm();
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

  let initialValues = {
    en_sistema_externo: false,
    en_web: false,
    iva: 12,
    limite_descuento1 :0,
    limite_descuento2 :0,
    limite_descuento3 :0,
    limite_descuento4 :0,
    limite_descuento5 :0,
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


  const onFinish = async (values) => {
    let data = null;

    delete values.permiso;
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
      history.goBack();
      setPermiso(false);
      message.info(data);
    } else {
      message.warning(data);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.warning("Error al guardar producto...");
  };

  const handleFormValuesChange = (changedValues) => {


    // setFinal(form.getFieldsValue());
    // console.log("BF",form.getFieldValue("atributos_js"))
    // console.log("BF2",form.getFieldValue("atributos_js").general);

    if ( form.getFieldValue("atributos_js") === undefined){
      //form.setFieldsValue({ atributos_js: {} });
      // console.log("AF",form.getFieldValue("atributos_js"))
      
    }
    


    setInfoTecnica(form.getFieldValue("fk_linea_id"));
    
    const formFieldName = Object.keys(changedValues)[0];

    if (formFieldName === "fk_marca_id") {
      
      setSelectedMarcaId(changedValues[formFieldName]);
      form.setFieldsValue({ fk_linea_id: undefined });
      form.setFieldsValue({ fk_grupo_id: undefined });
      // form.setFieldsValue({ atributos_js: {"general": atributosJs , "especifico": {}} });
      // console.log("TEST", form.getFieldValue("atributos_js").especifico)
      setSelectedLineaId(null); 
      setInfoTecnica(null);


    }else{


    }
    if (formFieldName === "fk_linea_id") {
      setSelectedLineaId(changedValues[formFieldName]);
      form.setFieldsValue({ fk_grupo_id: undefined }); 
    }
  };

  const onChangeTipoInventario = (e) => {
    setTipoInventario(e.target.value);
  };

  const onChangeTipoProducto = (e) => {
    setTipoProducto(e.target.value);
  };

  return (

    editProducto || location.state.nuevo ?
    <>
      <Form
        {...layout}
        form={form}
        name="customized_form_controls"
        initialValues={editProducto ?  editProducto : initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={handleFormValuesChange}
        hidden={show}
      >
        <Divider>PRODUCTO</Divider>
        <br />
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
              <Input
                className="input-type"
                readOnly={location.state ? !location.state.permiso : false}
              />
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
              <Input
                className="input-type"
                readOnly={location.state ? !location.state.permiso : false}
              />
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
             { location.state.permiso ?
              <SelectOpciones
                tipo="procedencia"
                readOnly={location.state ? !location.state.permiso : false}
                setShow={setShow}
              />: <Input
                className="input-type"
                readOnly={location.state ? !location.state.permiso : false}
              />
            }
            </Form.Item>
            <Form.Item
              label="Proveedor"
              name={location.state.permiso ? "fk_proveedor_id" : "proveedor"}
              rules={[
                {
                  required: true,
                  message: "Por favor, seleccione un proveedor!",
                },
              ]}
            >
             { location.state.permiso ?
              <SelectOpciones
                tipo="proveedor"
                readOnly={location.state ? !location.state.permiso : false}
                setShow={setShow}
              />: <Input
                className="input-type"
                readOnly={location.state ? !location.state.permiso : false}
              />
            }
            </Form.Item>
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
            { location.state.permiso ?
            
              <SelectOpciones
                tipo="marca"
                readOnly={location.state ? !location.state.permiso : false}
                setShow={setShow}
              /> : <Input
                className="input-type"
                readOnly={location.state ? !location.state.permiso : false}
              />
            }
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
            { location.state.permiso ?
              <SelectOpciones
                tipo="línea"
                filter={selectedMarcaId}
                readOnly={location.state ? !location.state.permiso : false}
                setShow={setShow}
              />: <Input
                className="input-type"
                readOnly={location.state ? !location.state.permiso : false}
              />
            }
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
            { location.state.permiso ?
              <SelectOpciones
                tipo="grupo"
                filter={selectedLineaId}
                readOnly={location.state ? !location.state.permiso : false}
                setShow={setShow}
              />: <Input
                className="input-type"
                readOnly={location.state ? !location.state.permiso : false}
              />
            }
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
              <Input
                className="input-type"
                readOnly={location.state ? !location.state.permiso : false}
              />
            </Form.Item>
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
            { location.state.permiso ?
              <Radio.Group
                onChange={onChangeTipoProducto}
                value={tipoProducto}
                disabled={location.state ? !location.state.permiso : false}
              >
                <Radio value={"BIENES"}>BIENES</Radio>
                <Radio value={"SERVICIOS"}>SERVICIOS</Radio>
              </Radio.Group>: <Input
                className="input-type"
                readOnly={location.state ? !location.state.permiso : false}
              />}
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
             { location.state.permiso ?
              <Radio.Group
                onChange={onChangeTipoInventario}
                value={tipoInventario}
                disabled={location.state ? !location.state.permiso : false}
              >
                <Radio value={"PERMANENTE"}>PERMANENTE</Radio>
                <Radio value={"BAJO PEDIDO"}>BAJO PEDIDO</Radio>
              </Radio.Group>: <Input
                className="input-type"
                readOnly={location.state ? !location.state.permiso : false}
              />}
            </Form.Item>
            <Form.Item
              label="Unidad de Medida"
              name={location.state.permiso ? "fk_unidad_medida_id" : "unidad_medida"}
              rules={[
                {
                  required: true,
                  message: "Por favor, seleccione una unidad de medida!",
                },
              ]}
            >
             { location.state.permiso ?
              <SelectOpciones
                tipo="unidad de medida"
                readOnly={location.state ? !location.state.permiso : false}
                setShow={setShow}
              />: <Input
                className="input-type"
                readOnly={location.state ? !location.state.permiso : false}
              />
            }
            </Form.Item>

            <Form.Item
              label="Unidad de Venta"
              name={location.state.permiso ? "fk_unidad_venta_id" : "unidad_venta"}
              rules={[
                {
                  required: true,
                  message: "Por favor, seleccione una unidad de venta!",
                },
              ]}
            >
             { location.state.permiso ?
              <SelectOpciones
                tipo="unidad de venta"
                readOnly={location.state ? !location.state.permiso : false}
                setShow={setShow}
              />: <Input
                className="input-type"
                readOnly={location.state ? !location.state.permiso : false}
              />
            }
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Costo"
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
                readOnly={location.state ? !location.state.permiso : false}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
            <Form.Item
              label="Precio"
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
                readOnly={location.state ? !location.state.permiso : false}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
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
            <Form.Item
              {...tailLayout}
              name="en_sistema_externo"
              valuePropName="checked"
            >
            { location.state.permiso ?
              <Checkbox
                disabled={location.state ? !location.state.permiso : false}
              >
                En Sistema Externo
              </Checkbox> : editProducto.en_sistema_externo ? <p> En Sistema Externo: <CheckCircleFilled /></p> : <p> En Sistema Externo: <CloseCircleFilled /></p>}
            </Form.Item>
            <Form.Item {...tailLayout} name="en_web" valuePropName="checked">
            { location.state.permiso ?
              <Checkbox
                disabled={location.state ? !location.state.permiso : false}
              >
                En Página Web
              </Checkbox>: editProducto.en_web ? <p> En Página Web: <CheckCircleFilled /></p> : <p> En Página Web: <CloseCircleFilled /></p>}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
              label="Comun"
              name={['atributos_js', 'general', 'comun']}
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
              name={['atributos_js', 'general', 'comun2']}
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
        { infoTecnica==="60a7d6e408be1a4c6d9f019d" ? (<div><Form.Item
              label="Largo"
              name={['atributos_js', 'especifico', 'largo']}
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
              name={['atributos_js', 'especifico', 'ancho']}
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
            </Form.Item></div>) : infoTecnica==="60a8133d2591c75004eceaa8" ? <Form.Item
              label="Otro"
              name={['atributos_js', 'especifico', 'otro']}
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
            </Form.Item> : null}
        <br />
        <Row>
          <Col span={12} offset={4}>
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
      <Spin indicator={antIcon} hidden={!show} className="loading-producto" /> 
    </>: null
  );
};

const ProductoForm = () => {
  return <FormProducto />;
};

export default ProductoForm;
