import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { CommentType } from "../types";

const API_URL = "http://localhost:5000";


const addComment = async ({movieId, userId, username, text}: CommentType) => {
    const response = await axios.post(`${API_URL}/api/comments`, {movieId, userId, username, text});
    return response.data;
}

export const useAddComment = () => {
    return useMutation({
        mutationKey: ['addComment'], 
        mutationFn: addComment,
    });
}

const getCommentsByMovieId = async (movieId: string) => {
    const response = await axios.get(`${API_URL}/api/comments/${movieId}`);
    return response.data;
}

export const useCommentsByMovieId = (movieId: string) => {
    return useQuery({queryKey: ['comments', movieId], queryFn: () => getCommentsByMovieId(movieId)});
}

const deleteComment = async (commentId: string) => {
    const response = await axios.delete(`${API_URL}/api/comments/${commentId}`);
    return response.data;
}

export const useDeleteComment = () => {
    return useMutation({mutationKey: ['deleteComment'], mutationFn: deleteComment});
}
