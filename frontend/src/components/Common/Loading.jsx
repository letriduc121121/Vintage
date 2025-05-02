import React, { useEffect, useState } from 'react';
import { PiShoppingCartLight } from "react-icons/pi";

const Loading = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000); // 2s
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-80 z-50">
      <div className="relative flex flex-col items-center">
        <div className="text-blue-600 animate-pulse mb-2">
          <PiShoppingCartLight size={64} strokeWidth={2} />
        </div>
        <div className="flex space-x-2 mt-2">
          <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce" />
        </div>
        <p className="text-blue-600 font-medium mt-3">Đang tải dữ liệu...</p>
      </div>
    </div>
  );
};

export default Loading;