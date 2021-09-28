export const GET_SUBGRUPOS = "GET_SUBGRUPOS";
export const SET_SUBGRUPOS = "SET_SUBGRUPOS";
export const GET_MARCAS_BY_LINEA = "GET_MARCAS_BY_LINEA";
export const SET_MARCAS_BY_LINEA = "SET_MARCAS_BY_LINEA";
export const GET_GRUPOS_BY_LINEAMARCA = "GET_GRUPOS_BY_LINEAMARCA";
export const SET_GRUPOS_BY_LINEAMARCA = "SET_GRUPOS_BY_LINEAMARCA";
export const GET_LINEAS = "GET_LINEAS";
export const SET_LINEAS = "SET_LINEAS";
export const GET_GRUPOS = "GET_GRUPOS";
export const SET_GRUPOS = "SET_GRUPOS";
export const GET_MARCAS = "GET_MARCAS";
export const SET_MARCAS = "SET_MARCAS";

export const getSubgrupos = () => ({
  type: GET_SUBGRUPOS,
  loading: true
});

export const getLineas = () => ({
  type: GET_LINEAS,
  loading: true
});


export const setSubgrupos = (subgrupos) => ({
  type: SET_SUBGRUPOS,
  subgrupos,
  loading: false
});

export const setLineas = (lineas) => ({
  type: SET_LINEAS,
  lineas,
  loading: false
});


export const getMarcasByLinea = (id) => ({
  type: GET_MARCAS_BY_LINEA,
  loading: true,
  id
});

export const setMarcasByLinea = (marcas) => ({
  type: SET_MARCAS_BY_LINEA,
  marcas,
  loading: false
});

export const getGruposByLineaMarca = (id) => ({
  type: GET_GRUPOS_BY_LINEAMARCA,
  loading: true,
  id,
});

export const setGruposByLineaMarca = (grupos) => ({
  type: SET_GRUPOS_BY_LINEAMARCA,
  grupos,
  loading: false
});

const initialState = []

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { subgrupos, grupos, marcas, lineas } = action;
  switch (action.type) {
    case SET_SUBGRUPOS:
      return { ...state, subgrupos: subgrupos.data, loading: false };
    case SET_LINEAS:
      return { ...state, lineas: lineas.data, loading: false };
    /*case SET_GRUPOS_LINEA_BY_SUBGRUPO:
      return { ...state, grupos:grupos.data, loading: false };*/
    case SET_MARCAS_BY_LINEA:
      return { ...state, marcas: marcas.data, loading: false };
    case SET_GRUPOS_BY_LINEAMARCA:
      return { ...state, grupos: grupos.data, loading: false };
    default:
      return { ...state, loading: true };
  }
};