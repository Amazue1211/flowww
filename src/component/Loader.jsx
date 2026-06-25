import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        <div className="text-white text-sm">Loading...</div>
      </div>
    </div>
  );
};

export default Loader;
