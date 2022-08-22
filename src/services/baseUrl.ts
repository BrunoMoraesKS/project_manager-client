import axios from 'axios';

export default axios.create({
  baseURL: 'https://project-manager-node-api.herokuapp.com',
  // baseURL: 'http://localhost:3001',
});
