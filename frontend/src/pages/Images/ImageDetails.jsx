import React, { useEffect, useState } from 'react';
import { X, Heart, Trash2, HardDrive, Tag as TagIcon, User as UserIcon, Edit, ScanEye } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSingleImageApi } from '../../api/image/singleImageApi';
import { deleteImageApi } from '../../api/image/deleteImageApi';
import { handleError } from '../../message/error.message';
import { toggleToFavImage } from '../../api/image/toggleToFav';

export const ImageDetails = () => {
    const navigate = useNavigate();
    const { idAlb, idImg } = useParams();
    const [imageData, setImageData] = useState({});
    const [previewOpen, setPreviewOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch single image
    const fetchImage = async () => {
        try {
            const result = await fetchSingleImageApi(idAlb, idImg);
            console.log(result);
            if (result.success) setImageData(result.data);
            else setImageData({});
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchImage();
    }, [idAlb, idImg]);

    const handleToBack = () => navigate(-1);

    const handleDeleteImage = async () => {
        const sure = window.confirm("Are you sure you want to delete this image?");
        if (!sure) return;

        try {
            setLoading(true);
            const result = await deleteImageApi(idAlb, idImg);
            const { success, message, error } = result;

            if (success) navigate(-1);
            else if (!success) handleError(message);
            else handleError(error);
        } catch (error) {
            handleError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const imageFavToggle = async () => {
        try {
            const result = await toggleToFavImage(idAlb, idImg)
            const { success, message, error } = result;

            if (success) {
                fetchImage();
            } else if (!success) {
                handleError(message);
            } else {
                handleError(error);
            };
        } catch (error) {
            handleError(error.message);
        };
    };

    if (!imageData) return <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 text-white">Loading image...</div>;

    return (
        <>
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                {/* Mobile View */}
                <div className="lg:hidden w-full h-full flex flex-col">
                    <div className="flex justify-end mb-2">
                        <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 transition-colors" onClick={handleToBack}>
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center mb-2 min-h-0">
                        <img src={imageData.url} alt={imageData.name} className="w-full h-full object-contain rounded-2xl shadow-2xl" />
                    </div>
                    <div className="bg-white rounded-t-3xl p-5 overflow-y-auto max-h-[35vh]">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Image Details</h2>
                        <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-1">Name</p>
                            <p className="text-gray-900 font-medium">{imageData.name}</p>
                        </div>

                        {/* People */}
                        {Array.isArray(imageData.people) && imageData.people.length > 0 && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                                    <UserIcon className="w-4 h-4" /> Person
                                </p>
                                <p className="text-gray-900 font-medium">{imageData.people.join(", ")}</p>
                            </div>
                        )}

                        {/* Tags */}
                        {Array.isArray(imageData.tags) && imageData.tags.length > 0 && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                                    <TagIcon className="w-4 h-4" /> Tags
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {imageData.tags.map((tag, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="space-y-2 pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <span className="flex items-center gap-2"><HardDrive className="w-4 h-4" /> Size</span>
                                <span>{(imageData.size / (1024 * 1024)).toFixed(2)} MB</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <span className="flex items-center gap-2"><Heart className="w-4 h-4" /> Favourite</span>
                                <span>{imageData.isFavorite ? 'Yes' : 'No'}</span>
                            </div>
                        </div>

                        <div className="space-y-2 pt-4 border-t border-gray-200 pb-4">
                            <button
                                onClick={imageFavToggle}
                                className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium
        ${imageData.isFavorite ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                <Heart className="w-4 h-4" fill={imageData.isFavorite ? 'red' : 'none'} /> Favourite
                            </button>

                            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors text-sm font-medium"><Edit className="w-4 h-4" /> Edit Details</button>
                            <button onClick={() => setPreviewOpen(true)} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors text-sm font-medium"><ScanEye className="w-4 h-4" /> Preview</button>
                            <button
                                onClick={handleDeleteImage}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="animate-spin w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full"></span>
                                ) : (
                                    <Trash2 className="w-4 h-4" />
                                )}
                                {loading ? "Deleting..." : "Delete Image"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Desktop View */}
                <div className="hidden lg:flex max-w-full w-full flex-row gap-6">
                    <div className="flex-1 flex items-center justify-center">
                        <img src={imageData.url} alt={imageData.name} className="w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl" />
                    </div>
                    <div className="w-full lg:w-96 bg-white rounded-2xl p-6 overflow-y-auto max-h-[80vh]">
                        <div className="flex items-start justify-between mb-6">
                            <h2 className="text-gray-900 flex-1 pr-4">Image Details</h2>
                            <button onClick={handleToBack} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"><X className="w-5 h-5" /></button>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-600 mb-1">Name</p>
                            <p className="text-gray-900">{imageData.name}</p>
                        </div>

                        {/* People */}
                        {Array.isArray(imageData.people) && imageData.people.length > 0 && (
                            <div className="mb-4">
                                <p className="text-gray-600 mb-1 flex items-center gap-2"><UserIcon className="w-4 h-4" /> Person</p>
                                <p className="text-gray-900">{imageData.people.join(", ")}</p>
                            </div>
                        )}

                        {/* Tags */}
                        {Array.isArray(imageData.tags) && imageData.tags.length > 0 && (
                            <div className="mb-4">
                                <p className="text-gray-600 mb-1 flex items-center gap-2"><TagIcon className="w-4 h-4" /> Tags</p>
                                <div className="flex flex-wrap gap-2">
                                    {imageData.tags.map((tag, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="space-y-3 pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between text-gray-600">
                                <span className="flex items-center gap-2"><HardDrive className="w-4 h-4" /> Size</span>
                                <span>{(imageData.size / (1024 * 1024)).toFixed(2)} MB</span>
                            </div>
                            <div className="flex items-center justify-between text-gray-600">
                                <span className="flex items-center gap-2"><Heart className="w-4 h-4" /> Favourite</span>
                                <span>{imageData.isFavorite ? 'Yes' : 'No'}</span>
                            </div>
                        </div>

                        <div className="space-y-3 pt-6 border-t border-gray-200">
                            <button
                                onClick={imageFavToggle}
                                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-colors
        ${imageData.isFavorite ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                <Heart className="w-4 h-4" fill={imageData.isFavorite ? 'red' : 'none'} /> Favourite
                            </button>

                            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-xl transition-colors"><Edit className="w-4 h-4" /> Edit Details</button>
                            <button onClick={() => setPreviewOpen(true)} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl transition-colors"><ScanEye className="w-4 h-4" /> Preview</button>
                            <button
                                onClick={handleDeleteImage}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="animate-spin w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full"></span>
                                ) : (
                                    <Trash2 className="w-4 h-4" />
                                )}
                                {loading ? "Deleting..." : "Delete Image"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Modal */}
            {previewOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
                    <button onClick={() => setPreviewOpen(false)} className="absolute top-4 right-4 text-white p-2 hover:bg-gray-800 rounded-full"><X className="w-6 h-6" /></button>
                    <img src={imageData.url} alt={imageData.name} className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl" />
                </div>
            )}
        </>
    );
};
