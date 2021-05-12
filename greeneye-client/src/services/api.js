import axios from 'axios';

const API_URL = "http://localhost:3500";

class API {
    getClusters = (k, iterations, imagesToProcess) => {
        return axios.post(API_URL + "/clusters", { 
            k: k,
            iterations: iterations,
            imagesToProcess: imagesToProcess
        });
    }
}

export default new API();
