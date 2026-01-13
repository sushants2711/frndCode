import React from "react";
import { Github, Linkedin, Twitter, ImageIcon, Hospital } from "lucide-react";
import { NavLink } from "react-router-dom";
import AnchorLink from 'react-anchor-link-smooth-scroll'

export const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-slate-700 via-slate-800 to-black text-gray-200 pt-20 pb-30">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 md:gap-20">
                <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <Hospital className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-semibold text-white ">MediLink</span>
                    </div>
                    <p className="mt-2 text-gray-300">
                        Store, organize, and share your memories safely with friends and family.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <AnchorLink smooth="true" href="#home" className="transition border-b-2 border-transparent hover:border-white duration-300">
                                Home
                            </AnchorLink>
                        </li>
                        <li>
                            <AnchorLink smooth="true" href="#features" className="transition border-b-2 border-transparent hover:border-white duration-300">
                                Features
                            </AnchorLink>
                        </li>
                        <li>
                            <AnchorLink smooth="true" href="#why-choose-us" className="transition border-b-2 border-transparent hover:border-white duration-300">
                                Why Choose Us
                            </AnchorLink>
                        </li>
                        {/* <li>
                            <AnchorLink smooth="true" href="" className="transition border-b-2 border-transparent hover:border-white duration-300">
                                Contact
                            </AnchorLink>
                        </li> */}
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
                    <p className="text-gray-300">📍 &nbsp; SVIET, India</p>
                    <p className="text-gray-300">📞 &nbsp; +91 90900 - 90900</p>
                    <p className="text-gray-300">✉️ &nbsp; nehasharma@gmail.com</p>
                    {/* <p className="text-gray-300">✉️ &nbsp; sushants2711@gmail.com</p> */}

                    <div className="flex gap-4 mt-4 text-xl">
                        <a href="https://github.com/neha-bytedev" className="hover:text-blue-400 transition">
                            <Github size={22} />
                        </a>
                        <a href="https://www.linkedin.com/in/neha-sharma-722630297/" className="hover:text-blue-400 transition">
                            <Linkedin size={22} />
                        </a>
                        <a href="/" className="hover:text-blue-400 transition">
                            <Twitter size={22} />
                        </a>
                    </div>
                </div>
            </div>

            <hr className="border-slate-700 my-8" />

            <div className="flex flex-col items-center gap-2 pt-16">
                <div className="flex items-center gap-2">
                    <div className="bg-white/20 p-2 rounded-lg">
                        <Hospital className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white font-semibold text-lg  border-b-2 border-transparent hover:border-white">MediLink</span>
                </div>
                <p className="text-center text-gray-400 text-sm">
                    &copy; 2026 MediLink — All rights reserved.
                </p>
            </div>
        </footer>
    );
};