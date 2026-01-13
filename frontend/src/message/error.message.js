import { toast, Flip } from "react-toastify"

export const handleError = (msg) => {
    toast.error(msg, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
    })
}