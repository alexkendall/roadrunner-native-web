const DEFAULT_WORDPRESS_API_URL = 'https://roadrunnercreative.com/wp-json/wp/v2';

const wordpressApiUrl = (process.env.EXPO_PUBLIC_WORDPRESS_API_URL || DEFAULT_WORDPRESS_API_URL).replace(
  /\/$/,
  ''
);

export default {
  // Override in local/dev with:
  // EXPO_PUBLIC_WORDPRESS_API_URL=https://your-domain/wp-json/wp/v2
  API_URL: wordpressApiUrl,
  POSTS_PATH: '/posts?posts_per_page=20',
  CATEGORIES_PATH: '/categories',
};
