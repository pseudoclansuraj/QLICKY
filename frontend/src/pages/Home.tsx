import { useNavigate } from 'react-router-dom';
import { QrCode, BarChart3, Download, Palette, Image, Settings } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Create <span className="text-primary-500">Beautiful</span> QR Codes with Powerful Analytics
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Design custom QR codes with your brand colors, logos, and unique patterns.
              Then track their performance with detailed analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button 
                onClick={() => navigate('/generator')} 
                className="btn btn-primary text-base flex items-center justify-center gap-2 min-w-fit"
              >
                <QrCode className="h-5 w-5" />
                Create QR Code
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 sm:py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-900 dark:text-white">
              Key Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <FeatureCard 
                icon={<Palette className="h-6 w-6 sm:h-8 sm:w-8 text-primary-500" />}
                title="Custom Colors & Patterns"
                description="Personalize your QR codes with custom colors and unique patterns to match your brand identity."
              />
              <FeatureCard 
                icon={<Image className="h-6 w-6 sm:h-8 sm:w-8 text-secondary-500" />}
                title="Logo Integration"
                description="Add your logo to the center of your QR code to increase brand recognition while maintaining scannability."
              />
              <FeatureCard 
                icon={<Download className="h-6 w-6 sm:h-8 sm:w-8 text-accent-500" />}
                title="Multiple Download Formats"
                description="Download your QR codes in SVG, PNG, or PDF formats for use across all your marketing materials."
              />
              <FeatureCard 
                icon={<BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-success-500" />}
                title="Scan Analytics"
                description="Track the number of scans your QR code receives over time to measure campaign effectiveness."
              />
              <FeatureCard 
                icon={<Settings className="h-6 w-6 sm:h-8 sm:w-8 text-warning-500" />}
                title="Device Breakdown"
                description="Understand which devices your audience uses to scan your QR codes to optimize your landing pages."
              />
              <FeatureCard 
                icon={<QrCode className="h-6 w-6 sm:h-8 sm:w-8 text-error-500" />}
                title="Location Tracking"
                description="See where your QR codes are being scanned from around the world to target your marketing efforts."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="flex-1 space-y-4 text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Ready to elevate your QR code experience?
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                  Start creating beautiful, customized QR codes that not only look great but also provide valuable insights into your audience.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => navigate('/generator')} 
                    className="btn btn-primary text-base"
                  >
                    Get Started Now
                  </button>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg transition-colors duration-300 max-w-sm">
                  <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-accent-500 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full">
                    PRO
                  </div>
                  <div className="w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
                    <QrCode className="w-32 h-32 sm:w-48 sm:h-48 text-primary-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="card flex flex-col items-center text-center p-4 sm:p-6 animate-fade-in bg-white dark:bg-gray-900 rounded-lg shadow-md transition-colors duration-300">
    <div className="mb-3 sm:mb-4 flex-shrink-0">{icon}</div>
    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
  </div>
);

export default Home;
