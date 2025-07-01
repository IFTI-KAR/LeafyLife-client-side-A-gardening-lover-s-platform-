import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import logo from "../assets/images/logo.png";

const Footer = () => {
    return (
        <footer className="bg-[#1d2b1f] text-[#f0f2e9]">
            <div className="max-w-7xl mx-auto px-6 py-12">
                
                {/* Branding Section */}
                <div className="mb-12 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                        
                        <div>
                            <h2 className="text-3xl font-bold mb-2">LEAFYLIFE</h2>
                            <p className="text-sm max-w-xl">
                                Join us on a journey through the lush landscape of imagination and discovery,
                                where the mysteries of the plant kingdom await exploration and awe.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Footer Links */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mb-12 text-sm">
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Shop</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">All Collections</a></li>
                            <li><a href="#" className="hover:underline">All Products</a></li>
                            <li><a href="#" className="hover:underline">My Cart</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-3">About Us</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Contact Us</a></li>
                            <li><a href="#" className="hover:underline">Facts</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Information</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                            <li><a href="#" className="hover:underline">Shipping & Return</a></li>
                            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Useful Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Search</a></li>
                        </ul>
                    </div>
                </div>

                {/* Contact Info with Icons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 text-sm">
                    <div className="flex items-start gap-3">
                        <FaPhoneAlt className="text-green-400 mt-1" />
                        <div>
                            <h4 className="font-bold mb-1">PHONE</h4>
                            <p>+1-202-555-0158</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <FaEnvelope className="text-green-400 mt-1" />
                        <div>
                            <h4 className="font-bold mb-1">EMAIL</h4>
                            <p>contact@leafylife.com</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="text-green-400 mt-1" />
                        <div>
                            <h4 className="font-bold mb-1">ADDRESS</h4>
                            <p>Saint-Hose, 127U82, 55</p>
                        </div>
                    </div>
                </div>

                {/* Social Media Icons */}
                <div className="flex justify-center md:justify-start gap-4 text-lg text-green-300 mb-6">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white">
                        <FaFacebookF />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white">
                        <FaInstagram />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white">
                        <FaTwitter />
                    </a>
                </div>

                {/* Bottom line */}
                <div className="pt-6 border-t border-[#3a563a] text-xs text-center text-emerald-200">
                    © {new Date().getFullYear()} LeafyLife. Powered by IFTI
                </div>
            </div>
        </footer>
    );
};

export default Footer;
