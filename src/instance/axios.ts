import {Service} from "typedi";
import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

function createInstance() {
    return new AxiosConfig();
}

@Service({factory: createInstance})
export default class AxiosConfig {

    public instance: AxiosInstance;

    constructor() {
        const config: AxiosRequestConfig = {
            timeout: 50000,
            headers: {
                "Accept": "*/*",
            },
        };
        this.instance = axios.create(config)
    }
}