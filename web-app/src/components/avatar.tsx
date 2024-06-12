import React, { FC } from "react";

type TAvatarProps = {
  initials: string;
  src?: string;
  alt?: string;
  size?: number;
};

const AppAvatar: FC<TAvatarProps> = ({ initials, src = null, alt = '', size = 48 }) => {
  return (
    <div className={`w-${size/4} h-${size/4} bg-gray-200 shadow-inner rounded-full flex items-center justify-center`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full rounded-full" />
      ) : (
        <span className="text-gray-500 text-sm font-bold">{initials}</span>
      )}
    </div>
  );
}
export default AppAvatar;