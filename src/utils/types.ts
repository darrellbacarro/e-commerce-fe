export interface APICustomResponse<T> {
  status: string;
  data?: T | T[] | null;
  message?: string;
}

export interface Discount {
  id?: string,
  discountName: string,
  discountCode: string,
  discountValue: string,
  expiryDate?: string,

}

export interface DiscountState {
  discount: Discount | null,
  discounts: Discount[],
  loading: boolean,
  fetchDiscountStatus: string,
  addDiscountStatus: string,
  updateDiscountStatus: string,
  deleteDiscountStatus: string

}

export interface IDispatchResponse {
  error?: {
    message?: string;
  };
  meta: any;
  payload: any;
  type: string;
}