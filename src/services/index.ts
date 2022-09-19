import axios from 'axios';

export const getUsersData = () => {
  return axios.get('https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json');
};
