import React, { useState } from "react";
import { X, UserPlus, Hammer } from "lucide-react";
import { createAlbumApi } from "../../api/album/createAlbumApi";
import { allDashboardContext } from "../../context/Dashboard/DashboardContext";



export const CreateAlbum = ({ onClose }) => {

    const { fetchAllAlbum } = allDashboardContext();


    const [albumData, setAlbumData] = useState({
        name: "",
        description: "",
        sharedUsers: [],
        sharedUsersInput: "",
    });

    const [errors, setErrors] = useState({
        name: null,
        description: null,
        sharedUsersInput: null,
    });

    const validateData = (name, value) => {
        switch (name) {
            case "name":
                setErrors({
                    ...errors,
                    name: !value
                        ? "Album name is required"
                        : value.length < 5 || value.length > 30
                            ? "Name must be 5-30 characters long"
                            : "",
                });
                break;

            case "description":
                setErrors({
                    ...errors,
                    description:
                        value && (value.length < 10 || value.length > 100)
                            ? "Description must be 10-100 characters"
                            : "",
                });
                break;

            case "sharedUsersInput":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                setErrors({
                    ...errors,
                    sharedUsersInput:
                        value &&
                            (!emailRegex.test(value) || value.length < 11 || value.length > 40)
                            ? "Invalid email (11-40 chars)"
                            : "",
                });
                break;

            default:
                setErrors({
                    ...errors,
                    [name]: "",
                });
                break;
        };
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setAlbumData({
            ...albumData,
            [name]: value,
        });

        validateData(name, value);
    };

    const handleAddUser = () => {
        const email = albumData.sharedUsersInput.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (
            email &&
            !albumData.sharedUsers.includes(email) &&
            emailRegex.test(email) &&
            email.length >= 11 &&
            email.length <= 40
        ) {
            setAlbumData((prev) => ({
                ...prev,
                sharedUsers: [...prev.sharedUsers, email],
                sharedUsersInput: "",
            }));
            setErrors({ ...errors, sharedUsersInput: null });
        }
    };

    const handleRemoveUser = (email) => {
        setAlbumData((prev) => ({
            ...prev,
            sharedUsers: prev.sharedUsers.filter((u) => u !== email),
        }));
    };

    const handleToCancel = () => {
        onClose();
    };

    const handleToCreateAlbum = async (e) => {
        e.preventDefault();

        const payload = {
            name: albumData.name,
            description: albumData.description,
            sharedUsers: albumData.sharedUsers
        };

        if (!payload.name) {
            return handleError("Name is required")
        };

        try {
            const result = await createAlbumApi(payload);
            const { success, message, error } = result;

            if (success) {
                fetchAllAlbum();
            } else if (!success) {
                console.log(message);
            } else {
                console.log(error)
            };
        } catch (error) {
            console.log(error.message);
        } finally {
            onClose();
        };
    };

    const isFormValid =
        albumData.name.trim().length >= 5 &&
        albumData.name.trim().length <= 30 &&
        (albumData.description.length === 0 || (albumData.description.length >= 10 && albumData.description.length <= 100)) &&
        albumData.sharedUsers.every(email => email.length >= 11 && email.length <= 40) &&
        !errors.name &&
        !errors.description &&
        !errors.sharedUsersInput;


    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-6 rounded-t-3xl">
                    <div className="flex items-center justify-between">
                        <h2 className="text-white text-lg md:text-xl font-semibold">
                            Create New Reports
                        </h2>
                        <button
                            className="p-2 hover:bg-white/20 rounded-lg text-white transition-colors"
                            onClick={handleToCancel}
                        >
                            <Hammer className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-purple-100 mt-2">
                        Organize your photos into collections
                    </p>
                </div>

                <form className="p-8 space-y-6" onSubmit={handleToCreateAlbum}>
                    <div>
                        <label className="block text-gray-900 mb-2">
                            Album Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="name"
                            type="text"
                            placeholder="e.g., Summer Vacation 2024"
                            className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            onChange={handleChange}
                            value={albumData.name}
                        />
                        {errors.name && (
                            <p className="text-red-500 mt-1 text-sm">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-900 mb-2">Description</label>
                        <textarea
                            name="description"
                            placeholder="Tell us about this album..."
                            rows={3}
                            className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                            onChange={handleChange}
                            value={albumData.description}
                        />
                        {errors.description && (
                            <p className="text-red-500 mt-1 text-sm">{errors.description}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-900 mb-2">Share with Users</label>
                        <div className="flex gap-2 mb-3">
                            <input
                                name="sharedUsersInput"
                                type="email"
                                placeholder="Enter email address"
                                className="flex-1 px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                onChange={handleChange}
                                value={albumData.sharedUsersInput}
                            />
                            <button
                                type="button"
                                className="px-4 py-3 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-xl transition-colors"
                                onClick={handleAddUser}
                            >
                                <UserPlus className="w-5 h-5" />
                            </button>
                        </div>
                        {errors.sharedUsersInput && (
                            <p className="text-red-500 mt-1 text-sm">
                                {errors.sharedUsersInput}
                            </p>
                        )}

                        {albumData.sharedUsers.length > 0 && (
                            <div className="space-y-2">
                                {albumData.sharedUsers.map((user, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-purple-50 px-4 py-3 rounded-xl"
                                    >
                                        <span className="text-gray-700">{user}</span>
                                        <button
                                            type="button"
                                            className="text-red-600 hover:text-red-700 transition-colors"
                                            onClick={() => handleRemoveUser(user)}
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3 pt-4">
                        {/* Cancel / Hammer button */}
                        <button
                            type="button"
                            className="flex-1 md:px-6 md:py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center"
                            onClick={handleToCancel}
                        >
                            <Hammer size={22} />
                        </button>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className={`flex-1 px-6 py-3 shadow-lg hover:shadow-xl rounded-xl ${isFormValid
                                ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 transition-all"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            Create
                        </button>
                    </div>


                </form>
            </div >
        </div >
    );
};