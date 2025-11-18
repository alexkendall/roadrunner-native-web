import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import WPUtilityManager from '../../Modules/WPUtilityManager'

export interface WordpressPost {
  id: string | number
  acf: Record<string, any>
  categories: Array<number>
}

export interface WordpressCategory {
  acf: Array<Record<string, any>>
  count: number
  description: string
  id: number
  link: string
  meta: Array<Record<string, any>>
  name: string
  parent: number
  slug: string
  taxonomy: string
}

export interface WordpressState {
  categories: Array<WordpressCategory>
  pages: Array<WordpressPost>
  cases: Array<WordpressPost>
  posts: Array<WordpressPost>
  solutions_data: Record<string, any>
  homepage_data: Record<string, any>
  cases_data: Array<WordpressPost>
}

const initialState: WordpressState = {
  categories: [],
  pages: [],
  cases: [],
  posts: [],
  solutions_data: [],
  homepage_data: { id: '', acf: {}, categories: [] },
  cases_data: [],
}

const wordpressSlice = createSlice({
  name: 'wordpressSlice',
  initialState,
  reducers: {
    loadCategories(state, action: PayloadAction<Array<WordpressCategory>>) {
      state.categories = action.payload
    },
    loadPosts(state, action: PayloadAction<Array<WordpressPost>>) {
      const posts = action.payload
      state.posts = posts
      const categories = [...state.categories]
      const solutions_raw: Array<WordpressPost> = WPUtilityManager.filterPostsByCategory(
        posts,
        categories,
        'SolutionsMain'
      )
      state.solutions_data = solutions_raw[0].acf ?? {}
      const homepage_posts = WPUtilityManager.filterPostsByCategory(posts, categories, 'Homepage')
      state.homepage_data = homepage_posts[0]?.acf ?? {}
      state.cases_data = WPUtilityManager.filterPostsByCategory(posts, categories, 'Case').sort(
        (post1, post2) => {
          const priority1 = post1.acf.priority
          const priority2 = post2.acf.priority
          return priority1 - priority2
        }
      )
    },
  },
})

export const { loadCategories, loadPosts } = wordpressSlice.actions
export default wordpressSlice.reducer
