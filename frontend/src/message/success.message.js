import { toast, Flip } from "react-toastify";

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
    });
};