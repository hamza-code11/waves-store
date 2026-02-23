// import React, { useEffect, useRef } from "react";
// import wavesBg from "../assets/home/footer.jfif"; // smoke/waves background image
// import { FiMapPin, FiPhone, FiMail, FiSend, FiHeart } from "react-icons/fi";

// const Footer = () => {
//     const footerRef = useRef(null);

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         entry.target.classList.add('animate-fade-in-up');
//                     }
//                 });
//             },
//             { threshold: 0.1 }
//         );

//         if (footerRef.current) {
//             observer.observe(footerRef.current);
//         }

//         return () => observer.disconnect();
//     }, []);

//     return (
//         <footer className="relative overflow-hidden bg-[#0a0a0f] pt-20 pb-8">
//             {/* Smoke/Waves Background Image - Full Footer */}
//             <div className="absolute inset-0 z-0">
//                 <div className="absolute inset-0 bg-[#0a0a0f]/60"></div> {/* Dark overlay for depth */}
//                 <img 
//                     src={wavesBg} 
//                     alt="Smoke Effect" 
//                     className="w-full h-full object-cover opacity-30 md:opacity-40 mix-blend-screen"
//                     style={{ 
//                         filter: 'brightness(1.2) contrast(1.1)',
//                     }}
//                 />
//             </div>
            
//             {/* Gradient Overlay to blend smoke with background */}
//             <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0f]/80 via-[#0f0f17]/60 to-transparent z-0"></div>
            
//             {/* Colored overlays for smoke effect */}
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10 mix-blend-overlay z-0"></div>

//             {/* Gradient backgrounds - dark theme with blue tones */}
//             <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-to-bl from-blue-900/30 via-blue-800/10 to-transparent rounded-full blur-3xl z-0"></div>
//             <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-gradient-to-tr from-cyan-900/30 via-transparent to-transparent rounded-full blur-3xl z-0"></div>
            
//             {/* Dark overlay for depth - reduced opacity to show smoke */}
//             <div className="absolute inset-0 bg-[#0a0a0f]/70 z-0"></div>

//             <div ref={footerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 opacity-0">

//                 {/* Main Footer Content */}
//                 <div className="grid md:grid-cols-3 gap-10 lg:gap-12">

//                     {/* Brand */}
//                     <div className="space-y-4">
//                         <h3 className="text-3xl font-bold">
//                             <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//                                 Wapo
//                             </span>
//                         </h3>
//                         <p className="text-gray-300 leading-relaxed text-sm">
//                             Reinventing the way of creating websites, we aim to create
//                             the most masterpiece WordPress theme available on the market.
//                         </p>

//                         {/* Social/Trust indicator */}
//                         <div className="flex items-center gap-2 pt-2">
//                             <div className="w-8 h-8 bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-lg 
//                             flex items-center justify-center border border-blue-800/30 backdrop-blur-sm">
//                                 <FiHeart className="text-blue-400 text-sm" />
//                             </div>
//                             <span className="text-xs text-gray-400">Made with passion</span>
//                         </div>
//                     </div>

//                     {/* Contact */}
//                     <div className="space-y-4">
//                         <h4 className="text-lg font-semibold text-gray-200 relative inline-block">
//                             Contact Us
//                             <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"></span>
//                         </h4>

//                         <div className="space-y-3">
//                             <div className="flex items-start gap-3">
//                                 <div className="w-8 h-8 bg-[#14141f] rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-800 backdrop-blur-sm">
//                                     <FiMapPin className="text-blue-400 text-sm" />
//                                 </div>
//                                 <p className="text-gray-300 text-sm leading-relaxed">
//                                     202 Helga Springs Rd, <br /> Crawford, TN 38554
//                                 </p>
//                             </div>

//                             <div className="flex items-center gap-3">
//                                 <div className="w-8 h-8 bg-[#14141f] rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-800 backdrop-blur-sm">
//                                     <FiPhone className="text-blue-400 text-sm" />
//                                 </div>
//                                 <p className="text-gray-300 text-sm">
//                                     Call Us: <span className="font-semibold text-gray-200">800.275.8777</span>
//                                 </p>
//                             </div>

//                             <div className="flex items-center gap-3">
//                                 <div className="w-8 h-8 bg-[#14141f] rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-800 backdrop-blur-sm">
//                                     <FiMail className="text-blue-400 text-sm" />
//                                 </div>
//                                 <p className="text-gray-300 text-sm">alex@company.com</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Newsletter */}
//                     <div className="space-y-4">
//                         <h4 className="text-lg font-semibold text-gray-200 relative inline-block">
//                             Newsletter
//                             <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"></span>
//                         </h4>

//                         <p className="text-gray-400 text-sm">
//                             Sign up with your email address to receive news and updates.
//                         </p>

//                         <div className="flex flex-col sm:flex-row gap-2">
//                             <input
//                                 type="email"
//                                 placeholder="Your e-mail address"
//                                 className="w-full px-4 py-3 rounded-l-full border border-gray-800 bg-[#14141f]/80 text-gray-200 focus:outline-none focus:border-blue-500 text-sm backdrop-blur-sm"
//                             />
//                             <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-r-full hover:from-blue-500 hover:to-cyan-500 transition duration-300 whitespace-nowrap flex items-center justify-center gap-2 group">
//                                 <span>Subscribe</span>
//                                 <FiSend className="group-hover:translate-x-1 transition-transform duration-300" />
//                             </button>
//                         </div>

//                         {/* Trust badge */}
//                         <div className="flex items-center gap-2 pt-2">
//                             <span className="relative flex h-1.5 w-1.5">
//                                 <span className="animate-ping absolute inline-flex h-full w-full 
//                                rounded-full bg-blue-400 opacity-75"></span>
//                                 <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
//                             </span>
//                             <span className="text-xs text-gray-400">No spam, unsubscribe anytime</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Bottom Bar */}
//                 <div className="border-t border-gray-800/50 mt-16 pt-8">
//                     <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//                         <p className="text-gray-500 text-sm">
//                             Copyright ©2026 Wapo. All rights reserved.
//                         </p>

//                         {/* Footer Links */}
//                         <div className="flex items-center gap-6">
//                             <a href="#" className="text-sm text-gray-500 hover:text-blue-400 transition-colors duration-300">
//                                 Privacy Policy
//                             </a>
//                             <a href="#" className="text-sm text-gray-500 hover:text-blue-400 transition-colors duration-300">
//                                 Terms of Service
//                             </a>
//                             <a href="#" className="text-sm text-gray-500 hover:text-blue-400 transition-colors duration-300">
//                                 Cookie Policy
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <style jsx>{`
//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-fade-in-up {
//           animation: fade-in-up 0.6s ease-out forwards;
//         }
//       `}</style>
//         </footer>
//     );
// };

// export default Footer;





import React, { useEffect, useRef, useState } from "react";
import wavesBg from "../../assets/home/footer.jfif"; // smoke/waves background image
import { FiMapPin, FiPhone, FiMail, FiSend, FiHeart } from "react-icons/fi";

const Footer = () => {
    const footerRef = useRef(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Check for dark mode class on html element
    useEffect(() => {
        const checkDarkMode = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };

        // Initial check
        checkDarkMode();

        // Observe changes to html class
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <footer className={`relative overflow-hidden transition-colors duration-500 pt-20 pb-8 ${
            isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
            {/* Smoke/Waves Background Image - Full Footer */}
            <div className="absolute inset-0 z-0">
                <div className={`absolute inset-0 transition-colors duration-500 ${
                    isDarkMode ? 'bg-gray-900/60' : 'bg-white/60'
                }`}></div> {/* Overlay for depth */}
                <img 
                    src={wavesBg} 
                    alt="Smoke Effect" 
                    className={`w-full h-full object-cover transition-all duration-500 ${
                        isDarkMode 
                            ? 'opacity-30 md:opacity-40 mix-blend-screen' 
                            : 'opacity-20 md:opacity-30 mix-blend-multiply'
                    }`}
                    style={{ 
                        filter: isDarkMode ? 'brightness(1.2) contrast(1.1)' : 'brightness(1.1) contrast(1.05)',
                    }}
                />
            </div>
            
            {/* Gradient Overlay to blend smoke with background - dynamic */}
            <div className={`absolute inset-0 z-0 transition-colors duration-500 ${
                isDarkMode 
                    ? 'bg-gradient-to-tr from-gray-900/80 via-gray-800/60 to-transparent' 
                    : 'bg-gradient-to-tr from-white/80 via-gray-50/60 to-transparent'
            }`}></div>
            
            {/* Colored overlays for smoke effect - dynamic */}
            <div className={`absolute inset-0 mix-blend-overlay z-0 transition-colors duration-500 ${
                isDarkMode 
                    ? 'bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20' 
                    : 'bg-gradient-to-br from-blue-100/20 via-purple-100/20 to-cyan-100/20'
            }`}></div>

            {/* Gradient backgrounds - dynamic */}
            <div className={`absolute top-0 right-0 w-3/4 h-3/4 rounded-full blur-3xl z-0 transition-colors duration-500 ${
                isDarkMode 
                    ? 'bg-gradient-to-bl from-blue-900/30 via-blue-800/10 to-transparent' 
                    : 'bg-gradient-to-bl from-blue-100/30 via-blue-50/20 to-transparent'
            }`}></div>
            
            <div className={`absolute bottom-0 left-0 w-3/4 h-3/4 rounded-full blur-3xl z-0 transition-colors duration-500 ${
                isDarkMode 
                    ? 'bg-gradient-to-tr from-cyan-900/30 via-transparent to-transparent' 
                    : 'bg-gradient-to-tr from-cyan-100/30 via-transparent to-transparent'
            }`}></div>
            
            {/* Overlay for depth */}
            <div className={`absolute inset-0 z-0 transition-colors duration-500 ${
                isDarkMode ? 'bg-gray-900/50' : 'bg-white/50'
            }`}></div>

            <div ref={footerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 opacity-0">

                {/* Main Footer Content */}
                <div className="grid md:grid-cols-3 gap-10 lg:gap-12">

                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-3xl font-bold">
                            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                Wapo
                            </span>
                        </h3>
                        <p className={`leading-relaxed text-sm transition-colors duration-500 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                            Reinventing the way of creating websites, we aim to create
                            the most masterpiece WordPress theme available on the market.
                        </p>

                        {/* Social/Trust indicator */}
                        <div className="flex items-center gap-2 pt-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border backdrop-blur-sm transition-colors duration-500 ${
                                isDarkMode 
                                    ? 'bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-800/30' 
                                    : 'bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200'
                            }`}>
                                <FiHeart className={`text-sm ${
                                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                                }`} />
                            </div>
                            <span className={`text-xs transition-colors duration-500 ${
                                isDarkMode ? 'text-gray-500' : 'text-gray-500'
                            }`}>Made with passion</span>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className={`text-lg font-semibold relative inline-block transition-colors duration-500 ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-900'
                        }`}>
                            Contact Us
                            <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"></span>
                        </h4>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border backdrop-blur-sm transition-colors duration-500 ${
                                    isDarkMode 
                                        ? 'bg-gray-800 border-gray-700' 
                                        : 'bg-gray-100 border-gray-200'
                                }`}>
                                    <FiMapPin className={`text-sm ${
                                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                                    }`} />
                                </div>
                                <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                    202 Helga Springs Rd, <br /> Crawford, TN 38554
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border backdrop-blur-sm transition-colors duration-500 ${
                                    isDarkMode 
                                        ? 'bg-gray-800 border-gray-700' 
                                        : 'bg-gray-100 border-gray-200'
                                }`}>
                                    <FiPhone className={`text-sm ${
                                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                                    }`} />
                                </div>
                                <p className={`text-sm transition-colors duration-500 ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                    Call Us: <span className={`font-semibold transition-colors duration-500 ${
                                        isDarkMode ? 'text-gray-200' : 'text-gray-900'
                                    }`}>800.275.8777</span>
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border backdrop-blur-sm transition-colors duration-500 ${
                                    isDarkMode 
                                        ? 'bg-gray-800 border-gray-700' 
                                        : 'bg-gray-100 border-gray-200'
                                }`}>
                                    <FiMail className={`text-sm ${
                                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                                    }`} />
                                </div>
                                <p className={`text-sm transition-colors duration-500 ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>alex@company.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className={`text-lg font-semibold relative inline-block transition-colors duration-500 ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-900'
                        }`}>
                            Newsletter
                            <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"></span>
                        </h4>

                        <p className={`text-sm transition-colors duration-500 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                            Sign up with your email address to receive news and updates.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Your e-mail address"
                                className={`w-full px-4 py-3 rounded-l-full border text-sm transition-colors duration-500
                                         focus:outline-none focus:border-blue-500 ${
                                           isDarkMode 
                                             ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-500' 
                                             : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
                                         }`}
                            />
                            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-r-full hover:from-blue-700 hover:to-cyan-700 transition duration-300 whitespace-nowrap flex items-center justify-center gap-2 group">
                                <span>Subscribe</span>
                                <FiSend className="group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Trust badge */}
                        <div className="flex items-center gap-2 pt-2">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full 
                               rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                            </span>
                            <span className={`text-xs transition-colors duration-500 ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>No spam, unsubscribe anytime</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={`border-t mt-16 pt-8 transition-colors duration-500 ${
                    isDarkMode ? 'border-gray-800' : 'border-gray-200'
                }`}>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className={`text-sm transition-colors duration-500 ${
                            isDarkMode ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                            Copyright ©2026 Wapo. All rights reserved.
                        </p>

                        {/* Footer Links */}
                        <div className="flex items-center gap-6">
                            <a href="#" className={`text-sm transition-colors duration-300 ${
                                isDarkMode 
                                    ? 'text-gray-500 hover:text-blue-400' 
                                    : 'text-gray-500 hover:text-blue-600'
                            }`}>
                                Privacy Policy
                            </a>
                            <a href="#" className={`text-sm transition-colors duration-300 ${
                                isDarkMode 
                                    ? 'text-gray-500 hover:text-blue-400' 
                                    : 'text-gray-500 hover:text-blue-600'
                            }`}>
                                Terms of Service
                            </a>
                            <a href="#" className={`text-sm transition-colors duration-300 ${
                                isDarkMode 
                                    ? 'text-gray-500 hover:text-blue-400' 
                                    : 'text-gray-500 hover:text-blue-600'
                            }`}>
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
        </footer>
    );
};

export default Footer;