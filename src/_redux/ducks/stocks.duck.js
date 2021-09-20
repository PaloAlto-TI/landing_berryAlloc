export const GET_SUBGRUPOS = "GET_SUBGRUPOS";
export const SET_SUBGRUPOS = "SET_SUBGRUPOS";
export const GET_GRUPOS_LINEA_BY_SUBGRUPO = "GET_GRUPOS_LINEA_BY_SUBGRUPO";
export const SET_GRUPOS_LINEA_BY_SUBGRUPO = "SET_GRUPOS_LINEA_BY_SUBGRUPO";

export const getSubgrupos = () => ({
    type: GET_SUBGRUPOS,
    loading: true
});


export const setSubgrupos = (subgrupos) => ({
    type: SET_SUBGRUPOS,
    subgrupos,
    loading: false
});


export const getGruposLineaBySubgrupo = (id) => ({
    type: GET_GRUPOS_LINEA_BY_SUBGRUPO,
    loading: true,
    id
});


export const setGruposLineaBySubgrupo = (grupos) => ({
    type: SET_GRUPOS_LINEA_BY_SUBGRUPO,
    grupos,
    loading: false
});

const initialState = []

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { subgrupos, grupos } = action;
  switch (action.type) {
    case SET_SUBGRUPOS:
      return { ...state, subgrupos:subgrupos.data, loading: false };
    case SET_GRUPOS_LINEA_BY_SUBGRUPO:
      return { ...state, grupos:grupos.data, loading: false };
    default:
      return {...state, loading: true };
  }
};