import { Dispatch } from "redux";
import { fetchImageService, fetchNewsService } from "../services/user";
import get from "lodash.get"

export const IMAGE_DATA_FETCHED = "IMAGE_DATA_FETCHED";
export const NEWS_DATA_FETCHED = "NEWS_DATA_FETCHED";
export const DATA_LOADING = "DATA_LOADING";
export const FETCH_MORE = "FETCH_MORE";
export const SET_SOURCE = "SET_SOURCE";
export const DELETE_SOURCE = "DELETE_SOURCE";

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

export function fetchNewsData(sourceUrl?: string) {
  return (dispatch: Dispatch, getState: any) => {
    dispatch(loading(true));
    console.log('fetchNewsData', sourceUrl)
    const state = getState()

    let sourceArray = state.sourceArray

    if (!!sourceUrl) {
      console.log('fetchNewsData sourceUrl', sourceUrl)
      sourceArray = [sourceUrl]
    }

    const promiseArray = sourceArray.map((sourceUrl: string) => fetchNewsService(sourceUrl).catch(e => ({ error: e })))

    Promise.all(promiseArray).then(values => {
      console.log('fetchNewsData', values);

      let news: any = values.reduce((newsArray: any, newsSource: any, index) => {
        if (!newsSource.error) {
          return [...newsArray, ...get(newsSource, 'feed.article', [])]
        }
        return newsArray
      }, [])

      news = news.sort(function (a: any, b: any) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.date) - new Date(b.date);
      })

      dispatch(newsDataFetched(news));
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

export const setSource = (sourceUrl: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_SOURCE,
      payload: sourceUrl
    });
    dispatch(fetchNewsData());
  }
}

// export const deleteSource = (index: number) => {
//   return (dispatch: Dispatch, getState: any) => {
//     console.log('getState', getState)
//     const state = getState()
//     let sourceArray = state.sourceArray
//     dispatch({
//       type: DELETE_SOURCE,
//       payload: sourceArray.splice(index, 1),
//     });
//     dispatch(fetchNewsData());
//   }
// }

export const deleteSource = (index: number) => (dispatch: Dispatch, getState: any) => {
  const state = getState()
  let sourceArray = state.sourceArray
  sourceArray.splice(index, 1),

    dispatch({
      type: DELETE_SOURCE,
      payload: sourceArray,
    });
  dispatch(fetchNewsData());
}

export const loading = (loader: boolean) => ({
  type: DATA_LOADING,
  payload: loader
});


