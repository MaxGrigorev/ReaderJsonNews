import {
  DATA_LOADING,
  NEWS_DATA_FETCHED,
  SET_SOURCE,
  DELETE_SOURCE,
} from "../actions";
export interface Action {
  type: string;
  payload: any;
}

export interface itemNews {
  title?: string;
  date?: string,
  shortDescription?: string,
  imageUrl?: string,
  description?: string,
}

export interface State {
  news: itemNews[];
  loading: boolean;
  sourceArray: string[];
}



const intialState = {
  loading: false,
  news: [],
  sourceArray: [],
};

export default (state: State = intialState, action: Action) => {
  switch (action.type) {
    case DATA_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case NEWS_DATA_FETCHED:
      return {
        ...state,
        news: action.payload
      };
    case SET_SOURCE:
      return {
        ...state,
        sourceArray: [...state.sourceArray, action.payload]
      };
    case DELETE_SOURCE:
      return {
        ...state,
        sourceArray: action.payload,
      };
    default:
      return state;
  }
};
