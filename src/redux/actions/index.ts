import { Dispatch } from "redux";
import { fetchNewsService } from "../services";
import { State, Action } from "../reducers"
import get from "lodash.get"

export const NEWS_DATA_FETCHED = "NEWS_DATA_FETCHED";
export const DATA_LOADING = "DATA_LOADING";
export const SET_SOURCE = "SET_SOURCE";
export const DELETE_SOURCE = "DELETE_SOURCE";

export function fetchNewsData(sourceUrl?: string): (dispatch: Dispatch<Action>, getState: any) => void {
  return (dispatch: Dispatch<Action>, getState: State) => {
    dispatch(loading(true));
    const state = getState()

    let sourceArray = state.sourceArray

    if (!!sourceUrl) {
      sourceArray = [sourceUrl]
    }

    const promiseArray = sourceArray.map((sourceUrl: string) => fetchNewsService(sourceUrl).catch(e => ({ error: e })))

    Promise.all(promiseArray).then(values => {

      let news: any = values.reduce((newsArray: any, newsSource: any, index) => {
        if (!newsSource.error) {
          return [...newsArray, ...get(newsSource, 'feed.article', [])]
        }
        return newsArray
      }, [])

      return news

    })
      .then(news => {

        news = news.sort(function (a: any, b: any) {
          return new Date(a.date) - new Date(b.date);
        })

        dispatch(newsDataFetched(news));
        dispatch(loading(false));

      })
  };
}

const newsDataFetched = (data: any[]) => ({
  type: NEWS_DATA_FETCHED,
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


