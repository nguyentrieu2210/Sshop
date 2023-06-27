import Http from "./Http";

export const getProducts = (config) => {
    return Http.get("products", config);
}
export const getCategories = (config) => {
    return Http.get("categories", config);
}
export const getCategory = (config, id) => {
    return Http.get(`categories/${id}`, config);
}
export const getProductsCategory = (config, id) => {
    return Http.get(`categories/${id}/products`, config);
}
export const getProductDetails = (config, id) => {
    return Http.get(`products/${id}`, config);
}
export const getComments = (config, id) => {
    return Http.get(`products/${id}/comments`, config);
}
export const createCommentProduct = (id, data, config) => {
    return Http.post(`products/${id}/comments`, data, config);
}
export const order = (data, config) => {
    return Http.post("order", data, config);
}