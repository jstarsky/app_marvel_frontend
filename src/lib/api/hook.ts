import { useState } from "react";
import api from "./api";
import { ApiResponse, UseApi } from "./types";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { UserAction } from "@/store/types";
import { actionLogout } from "@/store/actions/users";

export function useApi(): UseApi {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch<UserAction>>();

  function handleError<T>(data: ApiResponse<T>) {
    if (data.error && data.error.response?.status === 401) {
      dispatch(actionLogout());
    }
    return data;
  }

  async function get<T>(url: string) {
    setLoading(true);
    try {
      const response = await api.get(url);
      setLoading(false);
      return handleError(response.data as ApiResponse<T>);
    } catch (error) {
      setLoading(false);
      return handleError<T>({
        success: false,
        error: error,
      } as ApiResponse<T>);
    }
  }

  async function post<T>(url: string, data?: object | undefined) {
    setLoading(true);
    try {
      const response = data ? await api.post(url, data) : await api.post(url);
      setLoading(false);
      return handleError(response.data as ApiResponse<T>);
    } catch (error) {
      setLoading(false);
      return handleError<T>({
        success: false,
        error: error,
      } as ApiResponse<T>);
    }
  }

  return { get, post, loading };
}
