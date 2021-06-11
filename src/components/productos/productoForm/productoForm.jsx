import React, { useContext, useState } from "react";
import { Row, Col, Divider } from "antd";
import { Form, Input, Button, Checkbox, InputNumber, Radio } from "antd";
import SelectOpciones from "../../selectOpciones/selectOpciones";
import { ProductoContext } from "../../../contexts/productoContext";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import "./productoForm.css";
import { SaveOutlined } from "@ant-design/icons";
const FormProducto = (props) => {
  // console.log(props);
  const location = useLocation();
  
  // console.log(props);
  const { createProducto, updateProducto, setPermiso } =
    useContext(ProductoContext);

  const [selectedMarcaId, setSelectedMarcaId] = useState(undefined);
  const [selectedLineaId, setSelectedLineaId] = useState(undefined);
  const [tipoInventario, setTipoInventario] = useState(undefined);
  const [tipoProducto, setTipoProducto] = useState(undefined);
  const [id, setId] = useState(null);

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
  };


  if (location.state) {
    if (!location.state.nuevo) {
      console.log(location.state.permiso);
      initialValues = location.state;

      if (!selectedMarcaId && !selectedLineaId) {
        setSelectedMarcaId(location.state.fk_marca_id);
        setSelectedLineaId(location.state.fk_linea_id);
        setId(location.state.id);
      }

    }
  }

  const onFinish = (values) => {
    delete values.permiso;
    console.log("Success:", values);
    if (id) {
      values["id"] = id;
      console.log("values", values);
      updateProducto(values);
    } else {
      createProducto(values);
    }
    history.push("/productos");
    setPermiso(false);
  };

  let history = useHistory();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleFormValuesChange = (changedValues) => {
    const formFieldName = Object.keys(changedValues)[0];
    if (formFieldName === "fk_marca_id") {
      setSelectedMarcaId(changedValues[formFieldName]);
      form.setFieldsValue({ fk_linea_id: undefined });
      form.setFieldsValue({ fk_grupo_id: undefined });
      setSelectedLineaId(null); //reset product selection
      //reset product selection
    }
    if (formFieldName === "fk_linea_id") {
      setSelectedLineaId(changedValues[formFieldName]);
      form.setFieldsValue({ fk_grupo_id: undefined }); //reset product selection
    }
  };

  const onChangeTipoInventario = (e) => {
    setTipoInventario(e.target.value);
  };

  const onChangeTipoProducto = (e) => {
    setTipoProducto(e.target.value);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="customized_form_controls"
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onValuesChange={handleFormValuesChange}
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
            <Input className="input-type" readOnly={location.state ? !location.state.permiso : false} />
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
            <Input className="input-type" readOnly={location.state ? !location.state.permiso : false} />
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
            <SelectOpciones tipo="procedencia" readOnly={location.state ? !location.state.permiso : false} />
          </Form.Item>
          <Form.Item
            label="Proveedor"
            name="fk_proveedor_id"
            rules={[
              {
                required: true,
                message: "Por favor, seleccione un proveedor!",
              },
            ]}
          >
            <SelectOpciones tipo="proveedor" readOnly={location.state ? !location.state.permiso : false} />
          </Form.Item>
          <Form.Item
            label="Marca"
            name="fk_marca_id"
            rules={[
              {
                required: true,
                message: "Por favor, seleccione una marca!",
              },
            ]}
          >
            <SelectOpciones tipo="marca" readOnly={location.state ? !location.state.permiso : false} />
          </Form.Item>
          <Form.Item
            label="Línea"
            name="fk_linea_id"
            rules={[
              {
                required: true,
                message: "Por favor, seleccione una linea!",
              },
            ]}
          >
            <SelectOpciones
              tipo="línea"
              filter={selectedMarcaId}
              readOnly={location.state ? !location.state.permiso : false}
            />
          </Form.Item>
          <Form.Item
            label="Grupo"
            name="fk_grupo_id"
            rules={[
              {
                required: true,
                message: "Por favor, seleccione un grupo!",
              },
            ]}
          >
            <SelectOpciones
              tipo="grupo"
              filter={selectedLineaId}
              readOnly={location.state ? !location.state.permiso : false}
            />
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
            <Input className="input-type" readOnly={location.state ? !location.state.permiso : false} />
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
            <Radio.Group
              onChange={onChangeTipoProducto}
              value={tipoProducto}
              disabled={location.state ? !location.state.permiso : false}
            >
              <Radio value={"BIENES"}>BIENES</Radio>
              <Radio value={"SERVICIOS"}>SERVICIOS</Radio>
            </Radio.Group>
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
            <Radio.Group
              onChange={onChangeTipoInventario}
              value={tipoInventario}
              disabled={location.state ? !location.state.permiso : false}
            >
              <Radio value={"PERMANENTE"}>PERMANENTE</Radio>
              <Radio value={"BAJO PEDIDO"}>BAJO PEDIDO</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Unidad de Medida"
            name="fk_unidad_medida_id"
            rules={[
              {
                required: true,
                message: "Por favor, seleccione una unidad de medida!",
              },
            ]}
          >
            <SelectOpciones tipo="unidad de medida" readOnly={location.state ? !location.state.permiso : false} />
          </Form.Item>

          <Form.Item
            label="Unidad de Venta"
            name="fk_unidad_venta_id"
            rules={[
              {
                required: true,
                message: "Por favor, seleccione una unidad de venta!",
              },
            ]}
          >
            <SelectOpciones tipo="unidad de venta" readOnly={location.state ? !location.state.permiso : false} />
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
            <InputNumber min={0} readOnly={location.state ? !location.state.permiso : false} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={value => value.replace(/\$\s?|(,*)/g, '')}/>
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
            <InputNumber min={0} readOnly={location.state ? !location.state.permiso : false}  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={value => value.replace(/\$\s?|(,*)/g, '')} />
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
            <InputNumber min={0} readOnly={location.state ? !location.state.permiso : false}  formatter={value => `${value}%`}
            parser={value => value.replace('%', '')} />
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
            <InputNumber min={0} readOnly={location.state ? !location.state.permiso : false}  formatter={value => `${value}%`}
            parser={value => value.replace('%', '')}/>
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
            <InputNumber min={0} readOnly={location.state ? !location.state.permiso : false}  formatter={value => `${value}%`}
            parser={value => value.replace('%', '')} />
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
            <InputNumber min={0} readOnly={location.state ? !location.state.permiso : false}  formatter={value => `${value}%`}
            parser={value => value.replace('%', '')} />
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
            <InputNumber min={0} readOnly={location.state ? !location.state.permiso : false}  formatter={value => `${value}%`}
            parser={value => value.replace('%', '')} />
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
            <InputNumber min={0} readOnly={location.state ? !location.state.permiso : false} formatter={value => `${value}%`}
            parser={value => value.replace('%', '')} />
          </Form.Item>
          <Form.Item
            label="Dimensión de Unidad de Venta"
            name="dimension_unidad_venta"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese la dimensión de unidad de venta!",
              },
            ]}
          >
            <InputNumber min={0} readOnly={location.state ? !location.state.permiso : false} />
          </Form.Item>
          <Form.Item
            {...tailLayout}
            name="en_sistema_externo"
            valuePropName="checked"
          >
            <Checkbox disabled={location.state ? !location.state.permiso : false}>En Sistema Externo</Checkbox>
          </Form.Item>
          <Form.Item {...tailLayout} name="en_web" valuePropName="checked">
            <Checkbox disabled={location.state ? !location.state.permiso : false}>En Página Web</Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={12} offset={7}>
          {location.state.permiso ? (
            <Form.Item {...tailLayout}>
              <Button icon={<SaveOutlined />} type="primary" htmlType="submit">
                GUARDAR
          </Button>
            </Form.Item>
          ) : null}
        </Col>

      </Row>
    </Form>
  );
};

const ProductoForm = () => {
  return <FormProducto />;
};

export default ProductoForm;
