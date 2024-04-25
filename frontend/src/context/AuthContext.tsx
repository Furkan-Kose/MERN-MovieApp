import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<any>(null);

export const AuthContextProvider = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user") as string) || null
    );

    const updateUser = (data: any) => {
        setCurrentUser(data);
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}