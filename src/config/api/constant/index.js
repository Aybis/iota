import axios from 'axios';

import handlerErrors from './handlerErrors';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_HOST}`,
});

instance.interceptors.response.use((response) => response, handlerErrors);

export { default as setHeader } from './setHeader';

export default instance;
