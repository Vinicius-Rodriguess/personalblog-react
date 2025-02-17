/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://personalblog-0l2g.onrender.com',
});

export const cadastrarUsuario = async (
  url: string,
  dados: object,
  setDados: Function,
) => {
  const resposta = await api.post(url, dados);
  console.log(resposta);
  setDados(resposta.data);
};

export const login = async (url: string, dados: object, setDados: Function) => {
  const resposta = await api.post(url, dados);
  console.log(resposta);
  setDados(resposta.data);
};
