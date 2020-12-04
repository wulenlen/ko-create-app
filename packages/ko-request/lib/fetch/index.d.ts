import 'whatwg-fetch';
interface FetchConfig extends RequestInit {
    baseURL?: string;
    responseType?: string;
}
interface IProps {
    initConfig?: Partial<FetchConfig>;
    reqIntercept?: (config: FetchConfig) => FetchConfig;
    resIntercept?: (response: Response) => Promise<Response>;
    resErrorCallback?: (err?: any) => void;
}
export declare class Fetch {
    initConfig: Partial<FetchConfig>;
    reqIntercept: (config: FetchConfig) => FetchConfig;
    resIntercept: (response: Response) => Promise<Response>;
    resErrorCallback: (err?: any) => void;
    constructor(props: IProps);
    request(url: string, options: FetchConfig): Promise<any>;
    get(url: string, params: any, config: FetchConfig): Promise<any>;
    post(url: string, data: any, config: FetchConfig): Promise<any>;
    delete(url: any, params: any, conifg: FetchConfig): Promise<any>;
    put(url: any, data: any, config: FetchConfig): Promise<any>;
    postForm(url: any, data: any, flag: boolean, config: FetchConfig): Promise<any>;
    queryString(url: any, params: any): any;
    buildFormData(params: any): FormData;
}
export {};
