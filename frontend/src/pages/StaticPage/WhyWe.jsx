import React from "react";
import { Cloud, Lock, Users, Star, Shield } from "lucide-react";


// const testimonials = [
//     {
//         name: "Aarav S.",
//         feedback:
//             "PhotoShare makes managing my photography portfolio so much easier. Love the cloud storage!",
//     },
//     {
//         name: "Neha P.",
//         feedback:
//             "I can organize my family photos effortlessly and share them safely with relatives.",
//     },
//     {
//         name: "Rohan K.",
//         feedback:
//             "The app is fast and intuitive. I can create albums, mark favorites, and share in seconds!",
//     },
//     {
//         name: "Priya M.",
//         feedback:
//             "Privacy is important to me, and PhotoShare keeps my images safe and secure. Highly recommended!",
//     },
// ];


const testimonials = [
    {
        name: "Dr. Aarav S.",
        feedback:
            "This platform makes managing patient records and appointments incredibly easy. Everything is well organized and secure.",
    },
    {
        name: "Neha P.",
        feedback:
            "As a patient, I love how smoothly I can book appointments and access my medical reports anytime.",
    },
    {
        name: "Dr. Rohan K.",
        feedback:
            "The system is fast and intuitive. Viewing patient history and updating prescriptions takes just seconds!",
    },
    {
        name: "Priya M.",
        feedback:
            "Data privacy was my biggest concern, and this app handles medical information securely. Highly recommended!",
    },
];



export const WhyWe = () => {
    return (
        <section className="bg-gradient-to-br from-slate-700 via-slate-800 to-black text-white py-20 border-b-2 border-white" id="why-choose-us">
            <div className="max-w-7xl mx-auto px-6 text-center">

                <h3 className="text-3xl md:text-4xl font-bold mb-8 inline-block border-b-2 border-transparent hover:border-white duration-300">What Our Users Say</h3>
                <p className="text-gray-300 mb-20 text-[16px] md:text-lg">
                    Hear from some of our amazing users and how PhotoShare helps them manage their photos
                    effortlessly.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {testimonials.map((user, index) => (
                        <div
                            key={index}
                            className="bg-white/10 p-6 rounded-xl flex flex-col items-center hover:scale-110 transform transition duration-300"
                        >
                            <div className="bg-yellow-300 text-slate-900 w-12 h-12 flex items-center justify-center rounded-full mb-4 text-lg font-bold">
                                {user.name.charAt(0)}
                            </div>
                            <h4 className="font-semibold text-lg mb-2">{user.name}</h4>
                            <p className="text-gray-200 text-center">{user.feedback}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};