import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Navbar } from '../../components/Navbar';
import { allAuthContext } from '../../context/AuthContext/AuthContext';
import { getAllDashboardApi } from '../../api/dashboard/dashboardApi';
import { handleSuccess } from '../../message/success.message';
import { handleError } from '../../message/error.message';
import { ToastContainer } from 'react-toastify';
import { allDashboardContext } from '../../context/Dashboard/DashboardContext';
import { CreateAlbum } from '../Album/CreateAlbum';
import { allImageInsideAlbumApi } from '../../api/album/allImageInsideAlbumApi';
import { ChatDrawer } from './ChatDrawer';


export const Dashboard = () => {

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)

    const { userName, fetchDetailsFromLocalStorage } = allAuthContext();

    const [isChatOpen, setIsChatOpen] = useState(false);


    const { fetchAllAlbum, album } = allDashboardContext();

    const [data, setData] = useState({
        albumsCount: null,
        allFavImagesCount: null,
        imagesCount: null,
        totalSizeOfImage: null
    });

    const fetchDashboardData = async () => {
        try {
            const result = await getAllDashboardApi();
            // console.log(result)
            const { success, message, error, albumsCount, allFavImagesCount, imagesCount, totalSizeOfImage } = result;

            if (success) {
                handleSuccess(message);
                setData({
                    ...data,
                    albumsCount,
                    allFavImagesCount,
                    imagesCount,
                    totalSizeOfImage
                });
            } else if (!success) {
                handleError(message);
                setData({
                    albumsCount: null,
                    allFavImagesCount: null,
                    imagesCount: null,
                    totalSizeOfImage: null
                });
            } else {
                handleError(error);
                setData({
                    albumsCount: null,
                    allFavImagesCount: null,
                    imagesCount: null,
                    totalSizeOfImage: null
                });
            };
        } catch (error) {
            handleError(error.message);
        };
    };

    const [albumsWithCover, setAlbumsWithCover] = useState([]);

    const fetchCoverImagesForAlbums = async () => {
        if (!album || album.length === 0) return;

        try {
            const promises = album.map(async (alb) => {
                try {
                    const res = await allImageInsideAlbumApi(alb._id);
                    if (res.success && res.data.length > 0 && res.data[0].images.length > 0) {
                        return { ...alb, coverImage: res.data[0].images[0].url };
                    }
                } catch (error) {
                    // 
                }
                // fallback cover image
                return {
                    ...alb,
                    coverImage: "https://images.unsplash.com/photo-1591154669695-5f2a8d20c089?q=80&w=987&auto=format&fit=crop"
                };
            });

            const results = await Promise.allSettled(promises);
            const updatedAlbums = results.map(r => r.status === 'fulfilled' ? r.value : null).filter(Boolean);
            setAlbumsWithCover(updatedAlbums);
        } catch (err) {
            handleError(err.message);
        }
    };



    useEffect(() => {
        fetchCoverImagesForAlbums();
    }, [album]);


    useEffect(() => {
        fetchDetailsFromLocalStorage();
        fetchDashboardData();
        fetchAllAlbum();
    }, []);



    // useEffect(() => {
    //     window.scroll({
    //         top: 0, // adjust this to your navbar height
    //         left: 0,
    //         behavior: "smooth"
    //     });
    // }, []);


    const handleClick = () => {
        // navigate("/create-album");
        setIsOpen(!isOpen);
    };

    const handleToNavigate = (id) => {
        if (id) {
            navigate(`/album/${id}/upload-image`);
        };
    };

    // console.log(albumsWithCover)

    return (
        <>
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Section */}\
                <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 rounded-3xl px-8 py-12 md:p-20 mb-8 shadow-2xl md:my-10 md:mb-20">
                    <div className="relative z-10">
                        <h1 className="text-white text-xl md:text-3xl mb-4">Welcome back, {userName || "user"}! 👋</h1>
                        <p className="text-purple-100 text-sm md:text-base mb-8 max-w-2xl">
                            {/* Organize your memories in beautiful albums. Create, share, and cherish your favorite moments. */}

                            Access your medical reports, prescriptions, and appointment history anytime, anywhere.

                        </p>
                        <button className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-xl hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl cursor-pointer"
                            onClick={handleClick}
                        >
                            <Plus /> Create New Reports
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-900/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-600">Total Albums</p>
                            <div className="p-2 bg-violet-100 rounded-lg">📁</div>
                        </div>
                        <p className="text-gray-900">{data.albumsCount}</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-600">Total Images</p>
                            <div className="p-2 bg-purple-100 rounded-lg">⬆️</div>
                        </div>
                        <p className="text-gray-900">{data.imagesCount}</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-600">Favorites</p>
                            <div className="p-2 bg-pink-100 rounded-lg">❤️</div>
                        </div>
                        <p className="text-gray-900">{data.allFavImagesCount}</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-600">Storage Used</p>
                            <div className="p-2 bg-indigo-100 rounded-lg">💾</div>
                        </div>
                        <p className="text-gray-900">{data.totalSizeOfImage}{" "} MB</p>
                    </div>
                </div>

                {/* Albums Section */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                        <div>
                            <h2 className="text-gray-900 font-semibold text-2xl mb-2">Your Reports</h2>
                            <p className="text-gray-600 mt-1 mb-8">Organize and manage your Reports collections</p>
                        </div>
                        <button className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-5 py-3 rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl cursor-pointer"
                            onClick={handleClick}
                        >
                            <Plus /> New Reports
                        </button>
                    </div>

                    {albumsWithCover && albumsWithCover.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {albumsWithCover.map((item) => (
                                <div key={item._id} className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleToNavigate(item._id)}>
                                    <div className="h-40 bg-gray-200 rounded-lg mb-3">
                                        {item.coverImage ? (
                                            <img
                                                src={item.coverImage}
                                                alt={item.name}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <p className="text-center text-gray-400 mt-16">No cover</p>
                                        )}
                                    </div>
                                    <p className="text-gray-900 font-medium">{item.name}</p>
                                    <p className="text-gray-500 text-sm">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No Album Available</p>
                    )}


                </div>


                {isOpen && <CreateAlbum onClose={() => setIsOpen(false)} />}


                {/* AI Chat Button */}
                <button
                    onClick={() => setIsChatOpen(true)}
                    className="fixed bottom-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 z-40"
                >
                    💬 AI Chat
                </button>

                {isChatOpen && (
                    <ChatDrawer onClose={() => setIsChatOpen(false)} />
                )}


            </main>
            <ToastContainer />
        </>
    );
}