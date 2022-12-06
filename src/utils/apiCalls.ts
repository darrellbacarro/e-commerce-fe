import axios, { AxiosRequestConfig } from "axios";
import { getCookie, setCookie } from "./helpers";
import {
  APICustomResponse,
  Discount
} from "./types";

export const baseAPIUrl =  "http://localhost:3000";

/**
 * API Request wrapper which returns data directly from response (res.data)
 * @param {string} path
 * @param {object} config
 * @returns
 */

const apiRequest = async <T>(
  path: string,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  const token = getCookie("accessToken");
  const request = {
    url: `${baseAPIUrl}${path}`,
    ...config,
  };

  if (token) {
    if (!request.headers) request.headers = {};
    request.headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await axios(request);
  return res.data as T;
  

};


/**
 * Fetch all discounts in discounts collection
 * @returns {APICustomResponse<{}>}
 */
export const apiFetchAllDiscounts = async (): Promise<APICustomResponse<{}>> => {
  const res = await apiRequest<APICustomResponse<{}>>("/discounts");
  return res;
};

/**
 * Fetch dsicount by given id
 * @param {string} discountId
 * @returns {APICustomResponse<{}>}
 */
export const apiFetchDiscountById = async (
  discountId: string
): Promise<APICustomResponse<{}>> => {
  const res = await apiRequest<APICustomResponse<{}>>(`/discounts/${discountId}`);
  return res;
};

/**
 * Add movie post request
 * @param {Discount} data
 * @returns {APICustomResponse<{}>}
 */
export const apiPostDiscount = async (
  data: Discount
): Promise<APICustomResponse<{}>> => {
  const discountData: Discount = {
    discountName: data.discountName,
    discountCode: data.discountCode,
    discountValue: data.discountValue,
    expiryDate: data.expiryDate,   
  };
  const res = await apiRequest<APICustomResponse<{}>>(`/discounts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    data: discountData,
  });
  return res;
};

/**
 * Update discount by given movie id
 * @param {Discount} data
 * @returns {APICustomResponse<{}>}
 */
export const apiUpdateDiscountById = async (
  data: Discount
): Promise<APICustomResponse<{}>> => {
  const { id, ...updatedDiscount } = data;
  const res = await apiRequest<APICustomResponse<{}>>(`/discounts/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    data: updatedDiscount,
  });
  return res;
};

/**
 * Delete dsicount by given discount id
 * @param {string} discountId
 * @returns {APICustomResponse<{}>}
 */
export const apiDeleteDiscountById = async (
  discountId: string
): Promise<APICustomResponse<{}>> => {
  const res = await apiRequest<APICustomResponse<{}>>(`/discounts/${discountId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};


/**
 * Fetch all discounts based on searched  by discount name
 * @param {string} name
 * @returns {APICustomResponse<{}>}
 */
export const apiFetchSearchedDiscounts = async (
  name: string
): Promise<APICustomResponse<{}>> => {
  const res = await apiRequest<APICustomResponse<{}>>(`/search/discounts/${name}`);
  return res;
};
