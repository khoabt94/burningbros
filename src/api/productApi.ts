
import axiosClient from "./axiosClient";
import { ProductItemObject } from "../pages/ProductListPage";

export type responseObject = {
  products: ProductItemObject[];
};

const productApi = {
  baseURL: "https://dummyjson.com/products",
  getProducts(
    limit: number,
    page: number,
    query: string
  ): Promise<responseObject> {
    return axiosClient.get(
      `${this.baseURL}/search?limit=${limit}&skip=${page}&q=${query}`
    );
  },
};

export default productApi;
