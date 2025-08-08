import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow pt-24 pb-8 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;