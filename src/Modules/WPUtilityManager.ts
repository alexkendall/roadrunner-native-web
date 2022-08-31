import { WordpressPost, WordpressCategory } from "../Redux/Slices/WordpressSlice";

export default class WPUtilityManager {
  static filterPostsByCategory(
    posts: Array<WordpressPost>,
    categories: Array<WordpressCategory>,
    category_name: string
  ): Array<WordpressPost> {
    let result: Array<WordpressPost> = [];
    const category = categories.find((category) => {
      return category?.name === category_name;
    });
    if (category) {
      const id: number = category.id;
      result = posts.filter((post) => {
        const post_categories: Array<number> = post.categories;
        return (
          post_categories.findIndex((category_id) => {
            return category_id === id;
          }) >= 0
        );
      });
    } else {
      result = [];
    }
    return result;
  }

  static postDoesContainsCategory(
    post: WordpressPost,
    categories: Array<WordpressCategory>,
    category_name: string
  ) {
    const category = categories.find((category) => {
      return category.name === category_name;
    });
    if (category) {
      const id: number = category.id;
      const post_categories: Array<number> = post.categories;
      if (post_categories.indexOf(id, 0) >= 0) {
        return true;
      }
    }
    return false;
  }

  static stripTags(str: string): string {
    const regex = /(<([^>]+)>)/gi;
    const result = str.replace(regex, "").replace(/(\r\n|\n|\r)/gm, "");
    return result;
  }
}
