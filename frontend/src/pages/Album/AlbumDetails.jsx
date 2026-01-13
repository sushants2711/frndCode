import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { ArrowBigLeft, Hammer, Heart, ImageIcon, UploadCloud, Users, Mail, User, ArrowUpLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UploadImage } from './UploadImage';
import { useParams } from 'react-router-dom';
import { allImageInsideAlbumApi } from '../../api/album/allImageInsideAlbumApi';
import { handleSuccess } from '../../message/success.message';
import { handleError } from '../../message/error.message';
import { ToastContainer } from 'react-toastify';
import { deleteAlbumApi } from '../../api/album/deleteAlbumApi';

export const AlbumDetails = () => {
    const [display, setDisplay] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const [displayAlbum, setDisplayAlbum] = useState([]);

    const fetchAllImagesInsideTheAlbum = async () => {
        try {
            const result = await allImageInsideAlbumApi(id);
            const { success, message, data } = result;
            if (success) {
                // handleSuccess(message);
                setDisplayAlbum(data);
            } else {
                handleError(message);
                setDisplayAlbum([]);
            }
        } catch (error) {
            handleError(error.message);
            setDisplayAlbum([]);
        }
    };

    useEffect(() => {
        fetchAllImagesInsideTheAlbum();
    }, [id]);

    const handleDeleteAlbumAndImage = async () => {
        setIsDeleting(true);
        try {
            const result = await deleteAlbumApi(id);
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/dashboard");
                }, 2000);
            } else if (!success) {
                handleError(message);
            } else {
                handleError(error);
            }
        } catch (error) {
            handleError(error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    const images = displayAlbum.flatMap((curr) => curr.images || []);
    const totalImages = images.length;
    const favoriteImages = images.filter((img) => img.isFavorite).length;
    const sharedTotalUsers = displayAlbum?.[0]?.albumId?.sharedUsers?.length || 0;

    const handleBackToPreviousPage = () => navigate(-1);
    const handleNavigateToSingleImage = (imgId) => {
        navigate(`/image/${id}/${imgId}`);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);

    return (
        <>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 my-8">
                <button
                    className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4"
                    onClick={handleBackToPreviousPage}
                >
                    <ArrowBigLeft size={22} /> Back to Albums
                </button>

                <div className="bg-white rounded-3xl p-4 md:p-20 border border-purple-100 shadow-lg mb-24">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div className="flex-1">
                            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
                                {displayAlbum?.[0]?.albumId?.name || "Album Name"}
                            </h1>

                            <p className="text-gray-600 mb-12">
                                {displayAlbum?.[0]?.albumId?.description || "Album Description...."}
                            </p>

                            <div className="flex flex-wrap gap-6 text-gray-700 mb-4">
                                <div className="flex items-center gap-2">
                                    <ImageIcon size={22} className="text-purple-600" />
                                    <span>{totalImages}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Heart size={22} className="text-red-500 fill-red-500" />
                                    <span>{favoriteImages}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Users size={22} className="text-purple-600" />
                                    <span>{sharedTotalUsers}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                className="bg-purple-600 text-white px-4 md:px-8 py-3 rounded-xl shadow-md hover:bg-purple-700 flex items-center gap-2"
                                onClick={() => setDisplay(true)}
                            >
                                <UploadCloud size={22} />
                                <span>Upload</span>
                            </button>

                            <button
                                className={`border-2 border-red-400 text-red-600 px-4 md:px-6 py-3 rounded-xl hover:bg-red-50 flex items-center gap-2 ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                onClick={handleDeleteAlbumAndImage}
                                disabled={isDeleting}
                            >
                                <Hammer size={22} />
                                <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mb-20 flex flex-wrap gap-3">
                    {displayAlbum?.[0]?.albumId?.sharedUsers?.map((user, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 bg-white border border-purple-200 text-gray-700 px-4 py-2 rounded-xl"
                        >
                            <Mail size={16} className="text-purple-500" />
                            <span>{user}</span>
                        </div>
                    ))}

                    {(!displayAlbum?.[0]?.albumId?.sharedUsers ||
                        displayAlbum[0]?.albumId?.sharedUsers.length === 0) && (
                            <span className="text-gray-500">No shared users</span>
                        )}
                </div>

                {images.length === 0 ? (
                    <div className="bg-white rounded-3xl border-2 border-dashed border-purple-200 p-16 text-center">
                        <h3 className="text-gray-900 mb-2">No images found</h3>
                        <p className="text-gray-600 mb-6">
                            Upload your first images to this album
                        </p>
                        <button
                            className="bg-purple-600 text-white px-8 py-3 rounded-xl shadow-md hover:bg-purple-700 flex items-center gap-2 mx-auto"
                            onClick={() => setDisplay(true)}
                        >
                            <UploadCloud size={22} />
                            <span>Upload Images</span>
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {images.map((image, index) => (
                            <div key={index} className="bg-white rounded-2xl overflow-hidden border border-purple-100 shadow-sm">
                                <div className="relative aspect-square bg-gray-100">
                                    <img
                                        src={image.url}
                                        alt={image.name}
                                        className="w-full h-full object-cover"
                                        onClick={() => handleNavigateToSingleImage(image._id)}
                                    />
                                </div>

                                <div className="p-4">
                                    <h3 className="text-gray-900 truncate mb-4">{image.name}</h3>

                                    {/* <div className="flex flex-wrap gap-1 mt-2">
                                        {image.people?.map((person, i) => (
                                            <span key={i} className="px-2 py-1 mx-2 my-1 bg-blue-100 text-blue-700 inline-flex gap-2 rounded-lg">
                                                <User /> {person}
                                            </span>
                                        ))}
                                    </div> */}

                                    {/* <div className="flex flex-wrap gap-1 mt-4">
                                        {image.tags?.map((tag, i) => (
                                            <span key={i} className="px-2 py-1 mx-2 my-1 inline-flex bg-purple-100 text-purple-700 rounded-lg">
                                                <ArrowUpLeft /> {tag}
                                            </span>
                                        ))}
                                    </div> */}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {display && <UploadImage onClose={() => setDisplay(false)} />}
            </main>
            <ToastContainer />
        </>
    );
};