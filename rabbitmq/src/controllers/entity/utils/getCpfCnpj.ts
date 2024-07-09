import axios from 'axios';

export const getCpfCnpj = async (cpfCnpj: string) => {
  const response = await axios.get(`https://api.cnpjs.dev/v1/${cpfCnpj}`);
  return response.data;
};