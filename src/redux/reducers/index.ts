import {
  IMAGE_DATA_FETCHED,
  DATA_LOADING,
  FETCH_MORE,
  NEWS_DATA_FETCHED,
  SET_SOURCE,
} from "../actions/fetch";
interface Action {
  type: string;
  payload: any;
}

export interface itemNews {
  title?: string;
  date?: Date,
  shortDescription?: string,
  imageUrl?: string,
  description?: string,
}

interface State {
  data: any[];
  news: itemNews[];
  loading: boolean;
  sourceArray: string[];
}



const intialState = {
  data: [],
  loading: false,
  news: [],
  sourceArray: [],
};

export default (state: State = intialState, action: Action) => {
  switch (action.type) {
    case IMAGE_DATA_FETCHED:
      return {
        ...state,
        data: action.payload
      };
    case FETCH_MORE:
      return {
        ...state,
        data: [...state.data, ...action.payload]
      };
    case DATA_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case NEWS_DATA_FETCHED:
      return {
        ...state,
        news: action.payload.feed.article
        // .sort(function (a: any, b: any) {
        //   // Turn your strings into dates, and then subtract them
        //   // to get a value that is either negative, positive, or zero.
        //   return new Date(b.date) - new Date(a.date);
        // })//TODO get lodash
      };
    case SET_SOURCE:
      return {
        ...state,
        sourceArray: [...state.sourceArray, action.payload]
      };
    default:
      return state;
  }
};
