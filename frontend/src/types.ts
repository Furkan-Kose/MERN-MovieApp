export type CategoryType = {
    _id: string;
    name: string;
}

export type CommentType = {
    _id: string;
    movieId: string;
    userId: string;
    username: string;
    text: string;
    createdAt: string;
}

export type MovieType = {
    _id: string;
    name: string;
    year: number;
    description: string;
    image: string;
    category: string[];
}

export type UserType = {
    _id: string;
    username: string;
    password: string;
    email: string;
    isAdmin: boolean;
    image?: string;
}