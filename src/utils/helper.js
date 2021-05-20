import axios from 'axios';

export const getWord = () => {
    return axios
        .get('https://random-word-api.herokuapp.com/word?number=1')
        .then((res) => res.data[0]);
};
