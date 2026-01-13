import React, { createContext, useContext, useState } from 'react'

export const AuthContext = createContext();

export const allAuthContext = () => useContext(AuthContext);


export const AuthContextProvider = ({ children }) => {

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [pic, setPic] = useState("");

    const setUserDetailsInLocalStorage = (name, email, img) => {
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("image", img);
    };

    const fetchDetailsFromLocalStorage = () => {
        const name = localStorage.getItem("name");
        const email = localStorage.getItem("email");
        const image = localStorage.getItem("image");

        setUserName(name || "");
        setUserEmail(email || "");
        setPic(image || "");
    };

    const removeDataFromLocalStorage = () => {
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("image");

        setUserName("");
        setUserEmail("");
        setPic("");
    };

    return (
        <AuthContext.Provider value={{
            userName,
            userEmail,
            pic,
            setUserDetailsInLocalStorage,
            fetchDetailsFromLocalStorage,
            removeDataFromLocalStorage,
        }}>
            {children}
        </AuthContext.Provider>
    )
}