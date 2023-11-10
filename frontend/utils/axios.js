import axios from 'axios';

export default async (request) => {
  await axios[request.method](`${process.env.REACT_APP_API_URL}${request.url}`, request.data)
  .then((response) => {
    return response.data;
  }
  ).catch((error) => {
    return error.response.data;
  });
}