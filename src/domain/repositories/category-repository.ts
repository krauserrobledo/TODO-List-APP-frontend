import { CreateCategoryRequestDto } from "../../data/dtos/categories/create-category-request-dto";
import { UpdateCategoryRequestDto } from "../../data/dtos/categories/update-category-request-dto";
import { CategoryModel } from "../models/category/category-model";

export abstract class CategoryRepository {

    abstract createCategory(request: CreateCategoryRequestDto ): Promise<CategoryModel>;

    abstract updateCategory(id: string, request: UpdateCategoryRequestDto ): Promise<CategoryModel>;

    abstract deleteCategory(id: string) : void;

    abstract getUserCategories(): Promise<CategoryModel[]>;
}