import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { UserType } from "../types";

const API_URL = "http://localhost:5000";

const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}/api/users`);
    return response.data;
}

export const useUsers = () => {
    return useQuery({queryKey: ['users'], queryFn: getAllUsers});
}

const getUserById = async (userId: string) => {
    const response = await axios.get(`${API_URL}/api/users/${userId}`);
    return response.data;
}

export const useUserById = (userId: string) => {
    return useQuery({queryKey: ['user', userId], queryFn: () => getUserById(userId)});
}

export const addUser = async (user: UserType) => {
    const response = await axios.post(`${API_URL}/api/users`, user);
    return response.data;
}

export const useAddUser = () => {
    return useMutation({
        mutationKey: ['addUser'],
        mutationFn: addUser,
    });
}

export const updateUser = async (user: UserType) => {
    const response = await axios.put(`${API_URL}/api/users/${user._id}`, user);
    return response.data;
}

export const useUpdateUser = () => {
    return useMutation({
        mutationKey: ['updateUser'],
        mutationFn: updateUser,
    });
}

export const deleteUser = async (userId: string) => {
    const response = await axios.delete(`${API_URL}/api/users/${userId}`);
    return response.data;
}

export const useDeleteUser = () => {
    return useMutation({
        mutationKey: ['deleteUser'],
        mutationFn: deleteUser,
    });
}
