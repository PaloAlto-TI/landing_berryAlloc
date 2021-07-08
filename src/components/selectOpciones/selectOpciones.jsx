import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { LineaMarcaService } from "../../services/lineaMarcaService";
import { MedidaService } from "../../services/medidaService";
import { paises } from "../../utils/paises";
import { LineaService } from "../../services/lineaService";
import { GrupoMarcaService } from "../../services/grupoMarcaService";
import { ProveedorMarcaService } from "../../services/proveedorMarcaService";
import { ColorGrupoService } from "../../services/colorGrupoService";
import { resistenciasAbrasion } from "../../utils/resistenciasAbrasion";
import { sistemasClick } from "../../utils/sistemasClick";
import { clasesIndustrial } from "../../utils/clasesIndustrial";
import { clasesComercial } from "../../utils/clasesComercial";
import { clasesResidencial } from "../../utils/clasesResidencial";
import { core } from "../../utils/core";
import { terminado } from "../../utils/terminado";
import { tiposFilamento } from "../../utils/tipoFilamento";
import { garantias } from "../../utils/garantias";
import { materialesSubcapa } from "../../utils/materialesSubcapa";
import { coloresSubcapa } from "../../utils/coloresSubcapa";
import { formatos } from "../../utils/formatos";
import { tonos } from "../../utils/tonos";
import { capacidadesRodamientoCarga } from "../../utils/capacidadesRodamientoCarga";
import { coloresPegamentos } from "../../utils/coloresPegamentos";
import { oloresPegamentos } from "../../utils/oloresPegamentos";
import { adherenciasPegamentos } from "../../utils/adherenciasPegamentos";
import { resistenciasDeslizamiento } from "../../utils/resistenciasDeslizamiento";
import { resistenciasAbrasionPorcelanato } from "../../utils/resistenciasAbrasionPorcelanato";

const { Option } = Select;
const SelectOpciones = (props) => {
  // console.log(props)
  const { tipo, onChange, value, filter, filter2, readOnly, setShow } = props;
  const [opciones, setOpciones] = useState([]);
  console.log(props);
  useEffect(() => {
    let cancel = false;

    async function fetch() {
      console.log(filter);

      if (tipo === "línea") {
        const lineaService = new LineaService();
        lineaService.getAll().then((data) => {
          if (cancel) return;
          setOpciones(data);
        });
      } else if (tipo === "marca" && filter) {
        const lineaMarcaService = new LineaMarcaService();
        lineaMarcaService.getAll().then((data) => {
          if (cancel) return;
          setOpciones(data.filter((p) => p.linea_id === filter));
        });
      } else if (tipo === "grupo" && filter && filter2) {
        console.log("FILTER-MARCA", filter);
        console.log("FILTER-LINEA", filter2);

        const grupoService = new GrupoMarcaService();
        grupoService.getAll().then((data) => {
          if (cancel) return;
          setOpciones(
            data.filter((p) => p.marca_id === filter && p.linea_id === filter2)
          );
        });
      } else if (tipo === "color" && filter) {
        console.log("FILTER-COLOR:", filter);
        const colorService = new ColorGrupoService();
        await colorService.getAll().then((data) => {
          if (cancel) return;
          setOpciones(data.filter((p) => p.grupo_id === filter));
        });
        setShow(false);
      } else if (tipo === "proveedor" && filter) {
        console.log("ejecuta proveedor");
        const proveedorService = new ProveedorMarcaService();
        proveedorService.getAll().then((data) => {
          if (cancel) return;
          setOpciones(data.filter((p) => p.marca_id === filter));
        });
      } else if (tipo === "unidad de medida" || tipo === "unidad de venta") {
        const medidaService = new MedidaService();
        if (tipo === "unidad de medida") {
          medidaService.getAll().then((data) => {
            if (cancel) return;
            setOpciones(
              data.filter((p) => p.tipo_unidad.toUpperCase() === "MEDIDA")
            );
          });
        } else {
          medidaService.getAll().then((data) => {
            if (cancel) return;
            setOpciones(
              data.filter((p) => p.tipo_unidad.toUpperCase() === "VENTA")
            );
          });
          // setShow(false);
        }
      } else if (tipo === "procedencia") {
        setOpciones(paises);
      } else if (tipo === "resistencia a la abrasion") {
        setOpciones(resistenciasAbrasion);
      }else if (tipo === "sistema de click") {
        setOpciones(sistemasClick);
      } else if (tipo === "clase residencial") {
        setOpciones(clasesResidencial);
      } else if (tipo === "clase comercial") {
        setOpciones(clasesComercial);
      } else if (tipo === "clase industrial") {
        setOpciones(clasesIndustrial);
      }else if (tipo === "core") {
        setOpciones(core);
      }else if (tipo === "terminado") {
        setOpciones(terminado);
      }else if (tipo === "tipo de filamento") {
        setOpciones(tiposFilamento);
      }else if (tipo === "garantía") {
        setOpciones(garantias);
      }else if (tipo === "material") {
        setOpciones(materialesSubcapa);
      }else if (tipo === "color de subcapa") {
        setOpciones(coloresSubcapa);
      }else if (tipo === "formato") {
        setOpciones(formatos);
      }else if (tipo === "tono") {
        setOpciones(tonos);
      }else if (tipo === "capacidad de rodamiento de carga") {
        setOpciones(capacidadesRodamientoCarga);
      }else if (tipo === "color de pegamento") {
        setOpciones(coloresPegamentos);
      }else if (tipo === "olor") {
        setOpciones(oloresPegamentos);
      }else if (tipo === "adherencia") {
        setOpciones(adherenciasPegamentos);
      }else if (tipo === "resistencia al deslizamiento") {
        setOpciones(resistenciasDeslizamiento);
      }else if (tipo === "resistencia a la abrasión") {
        setOpciones(resistenciasAbrasionPorcelanato);
      } else {
        setOpciones([]);
      }
    }

    fetch();
    return () => {
      cancel = true;
    };
  }, [filter]);

  function handleChange(value) {
    onChange(value);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  var opcionesList = opciones.map(function (opcion) {
    if (opcion.codigo) {
      return (
        <Option key={opcion.id} value={opcion.id}>
          {opcion.nombre.toUpperCase()}
        </Option>
      );
    } else {
      return (
        <Option key={opcion.id} value={opcion.id}>
          {opcion.nombre.toUpperCase()}
        </Option>
      );
    }
  });

  return (
    <Select
      // labelInValue={tipo ==="color" ? true : false}
      showSearch
      disabled={readOnly}
      style={{ width: 200 }}
      placeholder={"Seleccione " + tipo}
      optionFilterProp="children"
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      value={opcionesList.length > 0 ? value : null}
      onSearch={onSearch}
      notFoundContent="No hay coincidencias"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {opcionesList}
    </Select>
  );
};

export default SelectOpciones;
