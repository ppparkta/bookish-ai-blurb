import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
      <footer className="w-full text-center text-xs text-gray-300 flex flex-col items-center justify-center px-4 py-4 mt-8" style={{ fontFamily: 'Pretendard, sans-serif' }}>
        <div>© 2025 Sooyang. All rights reserved.</div>
        <div className="mt-1">
          by Sooyang | <a href="https://github.com/ppparkta/bookish-ai-blurb" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">GitHub</a>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
