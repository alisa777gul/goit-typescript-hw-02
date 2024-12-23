import axios from 'axios';

const API_KEY: string = 'bUuQU9vNw29_3pq-L4Ic_UVmR4XEa6p9U6xavPTZw3A';
axios.defaults.baseURL = 'https://api.unsplash.com/';
axios.defaults.headers.common['Authorization'] = `Client-ID ${API_KEY}`;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export type Props = {
  query: string;
  page: number;
  perPage: number;
};

const getPhotos = async <T>( { query, page, perPage }: Props): Promise<T> => {
  try {
    const { data } = await axios.get<T>('search/photos', {
      params: {
        query,
        page,
        orientation: 'landscape',
        per_page: perPage,
      },
    });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching photos:', error.message);
    } else {
      console.error('Unknown error fetching photos:', error);
    }
    throw error;
  }
};

export default getPhotos;