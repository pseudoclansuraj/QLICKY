import { Link } from 'react-router-dom';
import { QrCode } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] animate-fade-in dark:bg-gray-900">
      <QrCode className="h-24 w-24 text-gray-300 mb-6" />
      <h1 className="text-4xl font-bold text-gray-900 mb-4 dark:text-gray-300">404</h1>
      <p className="text-xl text-gray-600 mb-8 dark:text-gray-300">Page not found</p>
      <Link to="/" className="btn btn-primary">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;