import { Hospital, ImageIcon, LogOut } from 'lucide-react';
import { allAuthContext } from '../context/AuthContext/AuthContext';
import { useEffect, useState } from 'react';
import { allDashboardContext } from '../context/Dashboard/DashboardContext';
import { logoutApi } from '../api/google/logoutApi';
import { handleSuccess } from '../message/success.message';
import { handleError } from '../message/error.message';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';



export function Navbar() {

    const user = {
        name: 'User',
        email: 'user@gmail.com',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s'
    };

    const navigate = useNavigate();

    const { fetchAllAlbum } = allDashboardContext();

    const { pic, userName, userEmail, fetchDetailsFromLocalStorage, removeDataFromLocalStorage } = allAuthContext();

    const [name, setName] = useState("");
    const [showUserMenu, setShowUserMenu] = useState(false);

    useEffect(() => {
        fetchDetailsFromLocalStorage();
    }, []);

    const handleLogout = async () => {
        try {
            const result = await logoutApi();
            const { success, message, error } = result;

            if (success) {
                setShowUserMenu(false);
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/");
                }, 2000);
                removeDataFromLocalStorage();
            } else if (!success) {
                setShowUserMenu(false);
                handleError(message);
            } else {
                setShowUserMenu(false);
                handleError(message);
            };
        } catch (error) {
            setShowUserMenu(false);
            handleError(error.message);
        };
    };

    const handleChange = async (e) => {
        const value = e.target.value;
        setName(value);

        try {
            await fetchAllAlbum(value);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Navbar Container */}
                <div className="flex flex-col md:flex-row items-center justify-between h-auto md:h-20 py-3 md:py-0">

                    {/* Logo & Brand */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-500 rounded-2xl opacity-50"></div>
                            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 via-teal-500 to-green-600 rounded-2xl flex items-center justify-center">
                                <Hospital className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-teal-500 to-green-600 bg-clip-text text-transparent">
                                MediLink
                            </h1>
                            <p className="text-gray-500 text-sm">Your Medical Reports</p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 w-full mt-8 my-0 md:my-0 md:mt-0 md:mx-8">
                        <div className="relative w-full">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
                            <input
                                type="search"
                                onChange={handleChange}
                                value={name}
                                placeholder="Search albums by name..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all text-sm"
                            />
                        </div>
                    </div>

                    {/* User Info / Avatar */}
                    <div className="relative mt-3 md:mt-0">
                        <div
                            className="flex items-center gap-3 p-2 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer"
                            onClick={() => setShowUserMenu(!showUserMenu)}
                        >
                            <img
                                src={pic || user.avatar}
                                className="h-10 w-10 rounded-xl ring-2 ring-gray-300"
                            />
                            <div className="hidden lg:flex flex-col">
                                <p className="text-gray-900 font-medium">{userName || user.name}</p>
                                <p className="text-gray-500 text-sm">{userEmail || user.email}</p>
                            </div>
                        </div>

                        {showUserMenu && (
                            <div className="absolute -right-26 md:-right-32 mt-4 md:mt-2 w-64 bg-white rounded-2xl shadow-xl border border-purple-100 py-2 z-20">
                                <div className="px-4 py-3 border-b border-gray-100 cursor-pointer" onClick={() => setShowUserMenu(false)}>
                                    <p className="text-gray-900">{userName || user.name}</p>
                                    <p className="text-gray-500">{userEmail || user.email}</p>
                                </div>
                                <div className="border-t border-gray-100 mt-2 pt-2">
                                    <button
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-left text-red-600 cursor-pointer"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
            {/* <ToastContainer /> */}
        </nav>
    );
}
