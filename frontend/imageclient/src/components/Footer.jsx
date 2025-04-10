import React from "react";

import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const DeepGenFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 ">
      <div className=" container mx-auto px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Deep Gen</h3>
            <p className="text-sm">
              Deep Gen is your platform for AI-powered image, music, and video
              generation. Unlock your creative potential with our advanced
              tools.
            </p>
          </div>
          <div className="z-50">
            <h3 className="text-lg font-semibold mb-4">Quick links</h3>
            <ul>
              <li>
                <a href="/images" className="hover:text-gray-100">
                  Image Generation
                </a>
              </li>
              <li>
                <a href="/music" className="hover:text-gray-100">
                  Music Generation
                </a>
              </li>
              <li>
                <a href="/videos" className="hover:text-gray-100">
                  Video Generation
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-gray-100">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-100">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 text-xl">
              <a className="hover:text-blue-600  z-50">
                <FaTwitter />
              </a>
              <a className="hover:text-blue-600  z-50">
                <FaFacebookF />
              </a>
              <a className="hover:text-blue-600  z-50">
                <FaInstagram />
              </a>
              <a className="hover:text-blue-600  z-50">
                <FaYoutube />
              </a>
            </div>
            <p className="text-xs mt-4">
              &copy; {new Date().getFullYear()} Deep Gen & DIlzo.Dev. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DeepGenFooter;
