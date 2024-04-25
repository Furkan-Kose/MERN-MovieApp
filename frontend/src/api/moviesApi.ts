import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MovieType } from "../types";

const API_URL = "http://localhost:5000";

const getAllMovies = async (category?: string, search?: string) => {
    const response = await axios.get(`${API_URL}/api/movies`, { params: { category, search } });
    return response.data;
}

const getMovieById = async (movieId: string) => {
    const response = await axios.get(`${API_URL}/api/movies/${movieId}`);
    return response.data;
}

export const useMovies = (category?: string, search?: string) => {
    return useQuery({ queryKey: ['movies', category, search], queryFn: () => getAllMovies(category, search) });
}

export const useMovieById = (movieId: string) => {
    return useQuery({queryKey: ['movie', movieId], queryFn: () => getMovieById(movieId)});
}

export const addMovie = async (movie: MovieType) => {
    const response = await axios.post(`${API_URL}/api/movies`, movie);
    return response.data;
}

export const useAddMovie = () => {
    return useMutation({
        mutationKey: ['addMovie'],
        mutationFn: addMovie,
    });
}

export const updateMovie = async ( movie: MovieType) => {
    const response = await axios.put(`${API_URL}/api/movies/${movie?._id}`, movie);
    return response.data;
}

export const useUpdateMovie = () => {
    return useMutation({
        mutationKey: ['updateMovie'],
        mutationFn: updateMovie,
    });
}

export const deleteMovie = async (movieId: string) => {
    const response = await axios.delete(`${API_URL}/api/movies/${movieId}`);
    return response.data;
}

export const useDeleteMovie = () => {
    return useMutation({
        mutationKey: ['deleteMovie'],
        mutationFn: deleteMovie,
    });
}


