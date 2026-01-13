import React from "react";
import { ImageIcon, Cloud, Lock, Users, Star, Shield, Zap } from "lucide-react";

// const features = [
//     {
//         icon: <Cloud className="w-12 h-12 mb-4 text-yellow-300" />,
//         title: "Secure Cloud Storage",
//         description: "All your photos are stored safely in the cloud with encryption and easy access anytime."
//     },
//     {
//         icon: <Lock className="w-12 h-12 mb-4 text-yellow-300" />,
//         title: "Privacy First",
//         description: "Your images are private by default. Share only what you want with the people you trust."
//     },
//     {
//         icon: <Users className="w-12 h-12 mb-4 text-yellow-300" />,
//         title: "Easy Sharing",
//         description: "Share your photos and albums with friends and family effortlessly with a single click."
//     },
//     {
//         icon: <Star className="w-12 h-12 mb-4 text-yellow-300" />,
//         title: "Favorites & Albums",
//         description: "Organize your images into albums and mark your favorites for quick access anytime."
//     },
//     {
//         icon: <Shield className="w-12 h-12 mb-4 text-yellow-300" />,
//         title: "Advanced Security",
//         description: "Your data is protected with industry-standard security protocols for peace of mind."
//     },
//     {
//         icon: <Zap className="w-12 h-12 mb-4 text-yellow-300" />,
//         title: "Fast & Responsive",
//         description: "Upload, browse, and share your photos quickly with a smooth and responsive interface."
//     }
// ];


const features = [
    {
        icon: <Cloud className="w-12 h-12 mb-4 text-yellow-300" />,
        title: "Secure Medical Cloud Storage",
        description: "All patient reports, prescriptions, and medical records are securely stored in the cloud with encrypted access."
    },
    {
        icon: <Lock className="w-12 h-12 mb-4 text-yellow-300" />,
        title: "Patient Data Privacy",
        description: "Medical data is private by default and accessible only to authorized doctors and patients."
    },
    {
        icon: <Users className="w-12 h-12 mb-4 text-yellow-300" />,
        title: "Doctor–Patient Management",
        description: "Easily manage doctors, patients, appointments, and medical histories in one unified platform."
    },
    {
        icon: <Star className="w-12 h-12 mb-4 text-yellow-300" />,
        title: "Appointments & Records",
        description: "Create appointments, track visit history, and maintain organized patient records effortlessly."
    },
    {
        icon: <Shield className="w-12 h-12 mb-4 text-yellow-300" />,
        title: "HIPAA-Level Security",
        description: "Industry-grade security protocols ensure compliance and complete protection of sensitive health data."
    },
    {
        icon: <Zap className="w-12 h-12 mb-4 text-yellow-300" />,
        title: "Fast & Reliable System",
        description: "Quick access to patient information with a smooth, responsive, and high-performance interface."
    }
];



export const Features = () => {
    return (
        <section className="bg-gradient-to-br from-slate-700 via-slate-800 to-black text-white pt-20 pb-30 border-b-2 border-white" id="features">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 inline-block border-b-2 border-transparent hover:border-white duration-300">Features</h2>

                <p className="text-[16px] md:text-lg text-gray-200 mb-20">
                    {/* Hear from some of our amazing users and discover how PhotoShare transforms the way they
                    store, organize, and share their memories. From professional photographers to casual
                    users, our platform provides a secure, fast, and user-friendly experience for everyone.
                    Users love how easy it is to create albums, mark favorites, and share photos with friends
                    and family seamlessly. */}

                    Discover how our Doctor Web Application simplifies healthcare management.
                    From secure patient data storage to seamless appointment handling, our platform
                    empowers doctors, patients, and administrators with a fast, reliable, and secure
                    digital healthcare experience. Manage medical records, consultations, and patient
                    interactions—all in one place.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white/10 p-8 rounded-xl flex flex-col items-center text-center hover:scale-105 hover:bg-white/20 transition-transform duration-300"
                        >
                            {feature.icon}
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-200">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};