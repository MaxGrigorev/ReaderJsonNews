import { Dispatch } from "redux";
import { fetchImageService, fetchNewsService } from "../services/user";

export const IMAGE_DATA_FETCHED = "IMAGE_DATA_FETCHED";
export const NEWS_DATA_FETCHED = "NEWS_DATA_FETCHED";
export const DATA_LOADING = "DATA_LOADING";
export const FETCH_MORE = "FETCH_MORE";

export function fetchImageData(page?: number, limit?: number) {
  return (dispatch: Dispatch) => {
    dispatch(loading(true));
    fetchImageService(page, limit)
      .then((res: any) => {
        dispatch(imageDataFetched(res));
        dispatch(loading(false));
      })
      .catch(err => {
        dispatch(loading(false));
      });
  };
}

export function fetchNewsData() {
  return (dispatch: Dispatch) => {
    dispatch(loading(true));
    fetchNewsService()
      .then((res: any) => {
        dispatch(newsDataFetched(res));
        dispatch(loading(false));
      })
      .catch(err => {
        dispatch(loading(false));
      });
  };
}

export function fetchMoreImageData(page?: number, limit?: number) {
  return (dispatch: Dispatch) => {
    dispatch(loading(true));
    fetchImageService(page, limit)
      .then((res: any) => {
        dispatch(fetchMore(res));
        dispatch(loading(false));
      })
      .catch(err => {
        dispatch(loading(false));
      });
  };
}

const imageDataFetched = (data: any[]) => ({
  type: IMAGE_DATA_FETCHED,
  payload: data
});

const newsDataFetched = (data: any[]) => ({
  type: NEWS_DATA_FETCHED,
  payload: data
});

const fetchMore = (data: any[]) => ({
  type: FETCH_MORE,
  payload: data
});

export const loading = (loader: boolean) => ({
  type: DATA_LOADING,
  payload: loader
});
