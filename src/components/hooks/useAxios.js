import axios from 'axios';
import { useEffect, useState } from 'react';

export const useAxios = (url) => {
    const [state, setState] = useState({ loading: true });

    useEffect(() => {
        axios
            .get(url)
            .then((res) => setState({ data: res.data, loading: false }));
    }, [url]);

    return state;
};
