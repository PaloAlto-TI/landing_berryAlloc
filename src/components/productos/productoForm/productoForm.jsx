import React, { useState } from "react";
import { Form, Input, Button, Checkbox, InputNumber, Radio } from "antd";
import SelectOpciones from "../../selectOpciones/selectOpciones";

const FormProducto = () => {
  const [selectedMarcaId, setSelectedMarcaId] = useState(undefined);
  const [selectedLineaId, setSelectedLineaId] = useState(undefined);
  const [tipoInventario, setTipoInventario] = useState(undefined);

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
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleFormValuesChange = (changedValues) => {
    const formFieldName = Object.keys(changedValues)[0];
    if (formFieldName === "fk_marca_id") {
      setSelectedMarcaId(changedValues[formFieldName]);
      form.setFieldsValue({ fk_linea_id: undefined });
      form.setFieldsValue({ fk_grupo_id: undefined }); //reset product selection
      //reset product selection
    }
    if (formFieldName === "fk_linea_id") {
      setSelectedLineaId(changedValues[formFieldName]);
      form.setFieldsValue({ fk_grupo_id: undefined }); //reset product selection
    }
  };

  const onChange = e => {
    setTipoInventario(e.target.value);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="customized_form_controls"
      initialValues={{
        en_sistema_externo: false,
        en_web: false,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onValuesChange={handleFormValuesChange}
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
        label="Procedencia"
        name="procedencia"
        rules={[
          {
            required: true,
            message: "Por favor, ingrese la procedencia!",
          },
        ]}
      >
        <SelectOpciones tipo="procedencia" />
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
        <SelectOpciones tipo="proveedor" />
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
        <SelectOpciones tipo="marca" />
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
        <SelectOpciones tipo="línea" filter={selectedMarcaId} />
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
        <SelectOpciones tipo="grupo" filter={selectedLineaId} />
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
        label="Tipo de Inventario"
        name="tipo_inventario"
        rules={[
          {
            required: true,
            message: "Por favor, seleccione el tipo de inventario!",
          },
        ]}
      >
        <Radio.Group onChange={onChange} value={tipoInventario}>
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
        <SelectOpciones tipo="unidad de medida" />
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
        <SelectOpciones tipo="unidad de venta" />
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
        name="limite_descuento1"
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
        name="limite_descuento2"
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
        name="limite_descuento3"
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
        name="limite_descuento4"
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
        name="limite_descuento5"
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

      <Form.Item
        {...tailLayout}
        name="en_sistema_externo"
        valuePropName="checked"
      >
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
