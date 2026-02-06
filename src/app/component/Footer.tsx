import React from 'react';
import { Mail, Phone, Smartphone, MessageSquare, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#020035] text-white py-8 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Branding and Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

          {/* Brand/Logo Area */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              {/* Replace the div below with your <img> tag when ready */}
              <div className="w-48 h-auto">

                <div className="border-2 border-cyan-400 p-2 inline-block">
                  <img
                    src="/logo.png"   // put your logo path here
                    alt="Bright ELV Technology Logo"
                    className="h-12 w-auto"
                  />
                </div>

              </div>
            </div>
            <p className="text-[13px] leading-relaxed text-gray-300 pr-4">
              BrightElv Leads In Providing Innovative, Durable CCTV Brackets And Poles In Dubai And Middle East, Designed For Harsh Climates. We Assure Enhanced Security And Peace Of Mind.
            </p>
          </div>

          {/* Primary Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-wider">PRIMARY</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#" className="hover:text-cyan-400 transition">HOME</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">ABOUT</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">CONTACT</a></li>
            </ul>
          </div>

          {/* Products Column 1 */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-wider">PRODUCTS</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#" className="hover:text-cyan-400 transition">CCTV BRACKETS</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">CCTV POLES</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">CCTV RACKS/CABINET</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">CCTV ACCESSORIES</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">POPUP BOX/ CABLE CUBBY</a></li>
            </ul>
          </div>

          {/* Products Column 2 */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-wider">PRODUCTS</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#" className="hover:text-cyan-400 transition uppercase">AV Cables & Connector</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition uppercase">Network Cables & Accessories</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition uppercase">AV Racks & Accessories</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition uppercase">Network Cabinet</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition uppercase">Octagon Boxes</a></li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-wider">SOLUTIONS</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#" className="hover:text-cyan-400 transition">CUSTOMIZED SOLUTION</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">ELV SOLUTION</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Contact and Socials */}
        <div className="border-t border-blue-800 pt-8 mt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">

            <div className="space-y-3">
              <p className="font-bold text-sm tracking-wide">BRIGHT ELV TECHNOLOGY L.L.C</p>
              <p className="text-sm text-gray-300">PB NO: 381108, Dubai UAE</p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-[13px]">
                <span className="flex items-center gap-2 hover:text-cyan-400 cursor-pointer">
                  <Mail size={16} className="text-white" /> sales@brightelv.com
                </span>
                <span className="flex items-center gap-2">
                  <Phone size={16} /> +971 466 52 233
                </span>
                <span className="flex items-center gap-2">
                  <Smartphone size={16} /> +971 56 5022960
                </span>
                <span className="flex items-center gap-2">
                  <MessageSquare size={16} /> +971 50 8813601
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4 w-full lg:w-auto">
              <div className="flex gap-5">
                <Facebook size={20} className="hover:text-cyan-400 cursor-pointer transition" />
                <Instagram size={20} className="hover:text-cyan-400 cursor-pointer transition" />
                <Linkedin size={20} className="hover:text-cyan-400 cursor-pointer transition" />
              </div>
              <p className="text-[10px] text-gray-400 tracking-[0.2em] font-bold uppercase">
                All Copyright Reserved © 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;