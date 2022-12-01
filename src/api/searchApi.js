import axios from 'axios';

export async function searchImage(query, currentPage) {
  const API_KEY = '29269243-d9d53679d5364662a1466d514';
  const BASE_URL = 'https://pixabay.com/api/';

  const response = await axios.get(`${BASE_URL}`, {
    params: {
      key: `${API_KEY}`,
      q: `${query}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: `${currentPage}`,
      per_page: 12,
    },
  });

  return response.data;
}
