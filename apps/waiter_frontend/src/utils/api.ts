import axios from 'axios';
import { API_BASEURL } from '../configs/configs';

const api = axios.create({
  baseURL: API_BASEURL
});

export { api };
