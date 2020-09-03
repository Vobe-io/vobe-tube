const prod = {
    API_URL: 'https://api.tube.vobe.io'
}

const dev = {
    API_URL: 'http://127.0.0.1:8080'
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;

/*export enum APIResult {
    SUCCESS = "success",
    FAILURE = 'failure',
}; */

export const Endpoints = {
    health_check: config.API_URL + '/health_check',
};