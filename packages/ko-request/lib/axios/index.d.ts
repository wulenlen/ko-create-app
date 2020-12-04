import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
interface IProps {
    initConfig?: AxiosRequestConfig;
    beforeRequset?: (url?: string) => void;
    reqIntercept?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    resIntercept?: (response?: AxiosResponse) => void;
    resErrorCallback?: (err: AxiosError) => void;
}
export declare class Axios {
    private initConfig;
    private beforeRequset;
    private reqIntercept;
    private resIntercept;
    private instance;
    private resErrorCallback;
    constructor(props: IProps);
    private setInterceptors;
    request(url: string, options: AxiosRequestConfig & {
        setInterceptors?: boolean;
    }): import("axios").AxiosPromise<any>;
    get(url: string, params?: {}, config?: AxiosRequestConfig): import("axios").AxiosPromise<any>;
    post(url: string, data?: {}, config?: AxiosRequestConfig): import("axios").AxiosPromise<any>;
    delete(url: string, params?: {}, config?: AxiosRequestConfig): import("axios").AxiosPromise<any>;
    put(url: string, data?: {}, config?: AxiosRequestConfig): import("axios").AxiosPromise<any>;
}
export {};
