
import { defaultProducts } from "./defaultProducts";

export const products = defaultProducts.map((product) => ({
  ...product,
  image: `/${product.image.replace(/^\/+/, "")}`
}));
