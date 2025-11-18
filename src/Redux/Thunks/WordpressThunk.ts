import { loadCategories, loadPosts } from '../Slices/WordpressSlice'
import API from '../../Config/Api'
import { Dispatch } from 'react'
import { Action } from 'redux'

export const fetchPosts = () => {
  return function (dispatch: Dispatch<Action>) {
    return fetch(API.API_URL + API.CATEGORIES_PATH)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        dispatch(loadCategories(json))
        return fetch(API.API_URL + API.POSTS_PATH)
      })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        dispatch(loadPosts(json))
      })
      .catch((error) => {
        console.error(error)
        dispatch(loadCategories([]))
      })
  }
}
