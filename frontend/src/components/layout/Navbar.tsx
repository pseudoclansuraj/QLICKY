import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { QrCode, BarChart3, Menu, X, Home } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { path: '/generator', label: 'QR Generator', icon: <QrCode className="h-5 w-5" /> },
    { path: '/analytics', label: 'Analytics', icon: <BarChart3 className="h-5 w-5" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[90%] lg:w-auto lg:max-w-screen-md"
      aria-label="Main navigation"
    >
      <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-full shadow-lg transition-colors duration-300 border border-gray-200/50 dark:border-gray-700/50">
        <div className="px-3 sm:px-4 lg:px-6 xl:px-8 h-16 flex justify-between items-center">
          {/* Logo - Mobile and Tablet */}
          <div className="lg:hidden flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <QrCode className="h-7 w-7 sm:h-8 sm:w-8 text-primary-500" />
              <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Qliky</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center items-center">
            <div className="flex items-center space-x-4 xl:space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 px-3 xl:px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Theme Toggle and Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>

            {/* Mobile and Tablet Menu Controls */}
            <div className="lg:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile and Tablet Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] mt-2">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in py-3">
            <div className="px-3 sm:px-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-xl text-sm sm:text-base font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;