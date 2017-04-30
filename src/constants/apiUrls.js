const BASE_URL = 'http://localhost:3131/'; // todo add production/dev check

export const feedUrl = (page = 1) => `${BASE_URL}feed?page=${page}`;