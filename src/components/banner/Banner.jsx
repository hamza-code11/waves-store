import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import wavesBg from "../../assets/home/waves-bg.jfif";

const Banner = ({ 
  title = "Shop", 
  breadcrumbItems = [{ name: "WAPO", link: "/" }, { name: "SHOP" }],
  showStats = false,
  showButton = false,
  stats = { products: 0, support: "24/7", shipping: "Free" },
  buttonText = "Shop Now",
  onButtonClick = () => {}
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600 py-14 md:py-14">
      {/* Waves Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={wavesBg} 
          alt="Waves Background" 
          className="w-full h-full object-cover opacity-20 md:opacity-30 mix-blend-overlay"
          style={{ 
            maskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black, transparent)'
          }}
        />
      </div>

      {/* Gradient Overlay with Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-blue-500/80 to-cyan-600/80"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Animated Rings */}
        <div className="absolute top-10 left-1/4 w-32 h-32 border-2 border-white/30 rounded-full animate-ping-slow"></div>
        <div className="absolute bottom-10 right-1/4 w-40 h-40 border-2 border-white/20 rounded-full animate-ping-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border-2 border-white/20 rounded-full animate-ping-slow" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white/40 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-cyan-300/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-blue-300/40 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Breadcrumb */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <p className="text-white/90 text-sm">
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="mx-2">•</span>}
                {item.link ? (
                  <a href={item.link} className="hover:text-white cursor-pointer transition-colors">
                    {item.name}
                  </a>
                ) : (
                  <span className="text-white font-medium">{item.name}</span>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>
        
        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 leading-tight">
          {title}
        </h1>
        
        {/* Decorative Line */}
        <div className="w-24 h-1 bg-gradient-to-r from-blue-300 via-white to-cyan-300 mx-auto rounded-full mb-6"></div>
        
        {/* Stats (Optional) */}
        {showStats && (
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{stats.products}+</p>
              <p className="text-xs text-white/70">Products</p>
            </div>
            <div className="w-px h-8 bg-white/30"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{stats.support}</p>
              <p className="text-xs text-white/70">Support</p>
            </div>
            <div className="w-px h-8 bg-white/30"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{stats.shipping}</p>
              <p className="text-xs text-white/70">Shipping</p>
            </div>
          </div>
        )}

        {/* Shop Now Button (Optional) */}
        {showButton && (
          <button 
            onClick={onButtonClick}
            className="mt-8 px-8 py-3 bg-white text-blue-600 font-semibold rounded-full 
                     hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 
                     hover:text-white transition-all duration-300 transform hover:scale-105
                     shadow-lg shadow-blue-600/30 flex items-center gap-2 mx-auto"
          >
            <FiShoppingBag className="text-lg" />
            <span>{buttonText}</span>
          </button>
        )}
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes ping-slow {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(10px) translateX(-10px);
          }
          75% {
            transform: translateY(20px) translateX(5px);
          }
        }
        
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Banner;