import api from './api';

export async function getHotels(userId) {
  const response = await api.get('/hotels');
  console.log(response.data);
  return response.data;
}
