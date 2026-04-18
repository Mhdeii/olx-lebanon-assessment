import axios from 'axios';

const client = axios.create({
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
