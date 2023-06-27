import { BASE_URL } from "../contants/app";
export const getImgProduct = (image) => {
    return `${BASE_URL}assets/uploads/products/${image}`;
}