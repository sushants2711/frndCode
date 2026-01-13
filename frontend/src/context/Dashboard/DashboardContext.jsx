

import React, { createContext, useContext, useState } from 'react'
import { allAlbumApi } from '../../api/album/allAlbumApi';

export const DashboardContext = createContext();

export const allDashboardContext = () => useContext(DashboardContext);

export const DashboardContextProvider = ({ children }) => {

    const [album, setAlbum] = useState([]);

    const fetchAllAlbum = async (code) => {
        try {
            const result = code ? await allAlbumApi(code) : await allAlbumApi();
            const { success, message, error, data } = result;

            if (success) {
                setAlbum(data);
            } else if (!success) {
                setAlbum([]);
                throw new Error(message);
            } else {
                setAlbum([]);
                throw new Error(error);
            };
        } catch (error) {
            setAlbum([]);
            throw new Error(error.message);
        };
    };


    return (
        <DashboardContext.Provider value={{ fetchAllAlbum, album }}>
            {children}
        </DashboardContext.Provider>
    )
}