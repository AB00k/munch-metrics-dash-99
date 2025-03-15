
import React from "react";

const ConnectedPlatforms: React.FC = () => {
  const platforms = [
    { name: "Smiley", color: "#FFD41D", imagePath: "/lovable-uploads/d64a6a64-5f70-46ec-b25a-33fe0ca9032e.png" },
    { name: "Talabat", color: "#FF5800", text: "talabat" },
    { name: "Careem", color: "#51B851", text: "" },
    { name: "Deliveroo", color: "#00CCBC", text: "" },
    { name: "Add", color: "transparent", isAdd: true }
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-2">Connected Platforms:</span>
      <div className="flex space-x-2">
        {platforms.map((platform, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 ${
              platform.isAdd ? 'border-2 border-dashed border-red-500' : ''
            }`}
            style={{ backgroundColor: platform.color }}
          >
            {platform.isAdd ? (
              <span className="text-red-500 text-xl">+</span>
            ) : platform.text ? (
              <span className="text-white text-xs font-bold">{platform.text}</span>
            ) : (
              <div className="w-full h-full rounded-full flex items-center justify-center">
                {index === 0 && (
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img 
                      src={platform.imagePath} 
                      alt={platform.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {index === 2 && (
                  <div className="text-white text-lg">
                    <span>😊</span>
                  </div>
                )}
                {index === 3 && (
                  <div className="text-white text-lg">
                    <span>✌️</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectedPlatforms;
