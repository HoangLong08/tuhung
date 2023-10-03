import requests from '@/api/axios';
import { QueryParams } from '@/type/articles';
import {
  Category,
  CategoryEdit,
  CategoryProduct,
  Product,
  ProductAdd,
  ProductForm,
  ResponseProduct,
} from '@/redux/product/type';
import { removeEmptyProperties } from '@/utils/removeEmptyProperties';
import { TypeProduct } from '@/type/product';

class ProductService {
  static prefix = 'products/categories';

  static getAllCategories(): Promise<Category[]> {
    return requests.get(`${this.prefix}`);
  }

  static getProductByCategoryId(id: string): Promise<CategoryProduct> {
    return requests.get(`${this.prefix}/${id}`);
  }
  static getProductByCategorySlug(slug: string): Promise<CategoryProduct> {
    return requests.get(`${this.prefix}/slug/${slug}`);
  }

  static addCategory(category: Category): Promise<void> {
    return requests.post(`${this.prefix}`, category);
  }

  static updateCategory(id: string, category: CategoryEdit): Promise<void> {
    return requests.put(`${this.prefix}/${id}`, category);
  }

  static deleteCategoryById(id: string): Promise<void> {
    return requests.del(`${this.prefix}/${id}`);
  }

  static addProduct(product: ProductAdd): Promise<void> {
    return requests.post(`products`, product);
  }

  static updateProduct(id: string, product: ProductForm): Promise<void> {
    return requests.put(`products/${id}`, product);
  }

  static deleteProduct(id: string): Promise<void> {
    return requests.del(`products/${id}`);
  }

  static getAllProducts(params?: QueryParams): Promise<ResponseProduct> {
    return requests.get(`products?${removeEmptyProperties(params)}`);
  }

  static getProductById(id: string): Promise<Product> {
    return requests.get(`products/${id}`);
  }

  static getProductBySlug(slug: string): Promise<TypeProduct> {
    return requests.get(`products/slug/${slug}`);
  }

  static checkOutstandingProduct(
    id: string,
    isSpotlight: boolean
  ): Promise<TypeProduct> {
    return requests.patch(`products/` + id, {
      isSpotlight: !isSpotlight,
    });
  }
}
export default ProductService;
