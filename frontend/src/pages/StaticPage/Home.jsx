import { Hospital, ImageIcon } from 'lucide-react';
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuthLogin } from '../../api/google/googleAuthAPI';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { allAuthContext } from '../../context/AuthContext/AuthContext';
import { handleSuccess } from '../../message/success.message';
import { handleError } from '../../message/error.message';
import { ToastContainer } from 'react-toastify';


export const Home = () => {

    const navigate = useNavigate();

    const { setUserDetailsInLocalStorage } = allAuthContext();


    const responseGoogle = async (authResult) => {
        try {
            // console.log(authResult["code"])
            if (authResult["code"]) {
                const result = await googleAuthLogin(authResult["code"]);
                // console.log(result);
                const { success, message, name, email, picture, error } = result;

                if (success) {
                    handleSuccess(message);
                    setUserDetailsInLocalStorage(name, email, picture);
                    setTimeout(() => {
                        navigate("/dashboard");
                    }, 2000);
                } else if (!success) {
                    handleError(message);
                } else {
                    handleError(error);
                };
            };
        } catch (error) {
            handleError(error.message);
        };
    };


    const handleToAuthenticate = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code'
    })

    useEffect(() => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, []);

    return (
        <>
            <div className="min-h-screen bg-white flex border-b-2 border-white" id='home'>

                {/* Left Side - Branding */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-700 via-slate-800 to-black p-12 flex-col justify-between">
                    <div className="flex items-center gap-3 text-white">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <Hospital className="w-6 h-6" />
                        </div>
                        <span className="text-xl border-b-2 border-transparent hover:border-white duration-300">MediLink</span>
                    </div>

                    <div className="text-white space-y-6">
                        <h1 className="text-4xl">Medical Reports and History</h1>
                        <p className="text-lg text-blue-100">
                            Securely upload, store, and manage all your medical reports, prescriptions,
                            lab results, and health documents in one centralized place. </p>
                        <p className="text-lg text-blue-100">
                            Access your complete
                            medical history anytime, track past diagnoses and treatments, and share reports.
                        </p>
                    </div>


                    <div className="grid grid-cols-3 gap-4">
                        <img
                            // src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
                            src='d1.jpeg'
                            alt=""
                            className="rounded-lg w-full h-60 object-cover" //h-24
                        />
                        <img
                            // src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop"
                            src='d2.jpeg'
                            alt=""
                            className="rounded-lg w-full h-60 object-cover"
                        />
                        <img
                            // src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&h=200&fit=crop"
                            src='d3.jpeg'
                            alt=""
                            className="rounded-lg w-full h-60 object-cover"
                        />
                    </div>
                </div>

                {/* Right Side - Login */}
                <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-slate-700 via-slate-800 to-black">
                    <div className="w-full max-w-md space-y-8">

                        <div className="text-center lg:text-left">
                            <div className="flex lg:hidden items-center justify-center gap-2 mb-8 ">
                                <div className="bg-blue-600 p-2 rounded-lg">
                                    <Hospital className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl text-white">Medi-Link</span>
                            </div>
                            <h2 className="text-3xl text-white mb-2 border-b-2 border-transparent hover:border-white duration-300 inline-block">Welcome back</h2>
                            <p className="text-gray-200">Sign in to access your </p>
                        </div>

                        <div className="space-y-4">

                            {/* Google Login Button */}
                            <button
                                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-all"
                                onClick={handleToAuthenticate}
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="text-blue-900 font-semibold">Continue with Google</span>
                            </button>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>

        </>
    );
}