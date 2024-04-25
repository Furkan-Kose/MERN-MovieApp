import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

const API_URL = "http://localhost:5000";

const getAllCategories = async () => {
    const response = await axios.get(`${API_URL}/api/categories`);
    return response.data;
}

const getCategoryById = async (categoryId: string) => {
    const response = await axios.get(`${API_URL}/api/categories/${categoryId}`);
    return response.data;
}

export const useCategories = () => {
    return useQuery({ queryKey: ['categories'], queryFn: getAllCategories });
}

export const useCategoryById = (categoryId: string) => {
    return useQuery({ queryKey: ['category', categoryId], queryFn: () => getCategoryById(categoryId) });
}

export const addCategory = async (category: any) => {
    const response = await axios.post(`${API_URL}/api/categories`, category);
    return response.data;
}

export const useAddCategory = () => {
    return useMutation({
        mutationKey: ['addCategory'],
        mutationFn: addCategory,
    });
}

export const updateCategory = async (category: any) => {
    const response = await axios.put(`${API_URL}/api/categories/${category._id}`, category);
    return response.data;
}

export const useUpdateCategory = () => {
    return useMutation({
        mutationKey: ['updateCategory'],
        mutationFn: updateCategory,
    });
}

export const deleteCategory = async (categoryId: string) => {
    const response = await axios.delete(`${API_URL}/api/categories/${categoryId}`);
    return response.data;
}

export const useDeleteCategory = () => {
    return useMutation({
        mutationKey: ['deleteCategory'],
        mutationFn: deleteCategory,
    });
}

