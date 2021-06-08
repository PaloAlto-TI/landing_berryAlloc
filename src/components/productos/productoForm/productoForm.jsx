import React from "react";
import { Form, Input, Button, Checkbox, InputNumber } from "antd";
import SelectOpciones from "../../selectOpciones/selectOpciones";
import ProveedorContextProvider from "../../../contexts/proveedorContext";

const FormProducto = () => {

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
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        en_sistema_externo: false,
        en_web: false,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
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
        <Input />
      </Form.Item>

      <Form.Item
        label="Línea"
        name="linea"
        rules={[
          {
            required: true,
            message: "Por favor, seleccione un proveedor!",
          },
        ]}
      >
      <ProveedorContextProvider>
        <SelectOpciones tipo="lineas"/>
      </ProveedorContextProvider>
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
        <Input />
      </Form.Item>


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
        <InputNumber />
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
        <InputNumber />
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
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Límite Descuento 1"
        name="limite_descuento_1"
        rules={[
          {
            required: true,
            message: "Por favor, ingrese el limite de descuento 1!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Límite Descuento 2"
        name="limite_descuento_2"
        rules={[
          {
            required: true,
            message: "Por favor, ingrese el limite de descuento 2!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Límite Descuento 3"
        name="limite_descuento_3"
        rules={[
          {
            required: true,
            message: "Por favor, ingrese el limite de descuento 3!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Límite Descuento 4"
        name="limite_descuento_4"
        rules={[
          {
            required: true,
            message: "Por favor, ingrese el limite de descuento 4!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Límite Descuento 5"
        name="limite_descuento_5"
        rules={[
          {
            required: true,
            message: "Por favor, ingrese el limite de descuento 5!",
          },
        ]}
      >
        <InputNumber />
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
        <InputNumber />
      </Form.Item>

      <Form.Item {...tailLayout} name="en_sistema_externo" valuePropName="checked">
        <Checkbox>En Sistema Externo</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout} name="en_web" valuePropName="checked">
        <Checkbox>En Página Web</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          GUARDAR
        </Button>
      </Form.Item>
    </Form>
  );
};

const ProductoForm = () => {
  return <FormProducto />;
};

export default ProductoForm;
