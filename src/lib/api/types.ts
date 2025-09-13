import { AxiosError } from "axios";

export interface ApiResponse<T=undefined> {
    data?: T;
    success?: boolean;
    error?: AxiosError;
}
export interface UseApi {
    loading: boolean;
    get<T=undefined>(url: string): Promise<ApiResponse<T>>;
    post<T=undefined>(url: string, data?: object): Promise<ApiResponse<T>>;
}
