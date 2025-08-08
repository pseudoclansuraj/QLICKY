import { QrCode, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 lg:py-8 dark:bg-gray-900 dark:border-gray-600 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 gap-4">
          <div className="flex items-center space-x-2">
            <QrCode className="h-5 w-5 text-primary-500" />
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-300">Qliky</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center sm:justify-end space-x-4 sm:space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <a href="https://pseudoclan.com/" className="hover:text-primary-500 transition-colors">Privacy Policy</a>
            <a href="https://pseudoclan.com/" className="hover:text-primary-500 transition-colors">Terms of Service</a>
            <a href="https://x.com/pseudo_clan" className="hover:text-primary-500 transition-colors">Contact</a>
          </div>
      
          <div className="flex items-center space-x-4">
            <a href="https://github.com/Shivansh-Pseudoclan" className="text-gray-600 hover:text-primary-500 transition-colors">
              <Github className="h-5 w-5 dark:text-gray-300" />
            </a>
            <a href="https://x.com/pseudo_clan" className="text-gray-600 hover:text-primary-500 transition-colors">
              <Twitter className="h-5 w-5 dark:text-gray-300" />
            </a>
          </div>
        </div>
        
        <div className="mt-4 sm:mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Qliky. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;