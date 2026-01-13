import React from "react";

export default function AnimatedWallpaper() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" data-wallpaper>
      <div className="absolute inset-0 bg-black" aria-hidden />
    </div>
  );
}
