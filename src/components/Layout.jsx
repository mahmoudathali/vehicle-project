import { Link, useLocation } from 'react-router-dom';
import { Car, Phone, Mail, Menu, X, User } from 'lucide-react';
import { useState } from 'react';

export const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Accueil', path: '/' },
    { name: 'Véhicules', path: '/vehicles' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed w-full bg-white/90 backdrop-blur-sm shadow-sm z-40">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Car className="w-8 h-8 text-[#0a192f]" />
              <span className="text-xl font-bold text-[#0a192f]">Automobile Unterm Schloß</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-[#ffd700] ${
                    location.pathname === item.path ? 'text-[#ffd700]' : 'text-[#0a192f]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {sessionStorage.getItem('isAdminAuthenticated') === 'true' && (
                <Link
                  to="/admin/dashboard"
                  className="flex items-center space-x-2 text-sm font-medium text-[#0a192f] hover:text-[#ffd700] transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Administrateur</span>
                </Link>
              )}
            </div>

            {/* Contact Info */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="tel:+49123456789" className="flex items-center space-x-2 text-[#0a192f]">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+49 123 456 789</span>
              </a>
              <a href="mailto:contact@unterm-schloss.de" className="flex items-center space-x-2 text-[#0a192f]">
                <Mail className="w-4 h-4" />
                <span className="text-sm">contact@unterm-schloss.de</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-[#0a192f]" />
              ) : (
                <Menu className="w-6 h-6 text-[#0a192f]" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block py-2 text-sm font-medium transition-colors hover:text-[#ffd700] ${
                    location.pathname === item.path ? 'text-[#ffd700]' : 'text-[#0a192f]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {sessionStorage.getItem('isAdminAuthenticated') === 'true' && (
                <Link
                  to="/admin/dashboard"
                  className="flex items-center space-x-2 py-2 text-sm font-medium text-[#0a192f] hover:text-[#ffd700] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  <span>Administrateur</span>
                </Link>
              )}
              <div className="mt-4 space-y-2">
                <a href="tel:+49123456789" className="flex items-center space-x-2 text-[#0a192f]">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+49 123 456 789</span>
                </a>
                <a href="mailto:contact@unterm-schloss.de" className="flex items-center space-x-2 text-[#0a192f]">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">contact@unterm-schloss.de</span>
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="pt-20">
        {children}
      </main>

      <footer className="bg-[#0a192f] text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Automobile Unterm Schloß</h3>
            <p className="text-sm text-gray-300">
              Kaiser-Otto-Straße 33<br />
              06484 Quedlinburg<br />
              Allemagne
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-sm text-gray-300 hover:text-[#ffd700]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Tél: +49 123 456 789</li>
              <li>Email: contact@unterm-schloss.de</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Horaires</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Lundi - Vendredi: 9h - 19h</li>
              <li>Samedi: 9h - 17h</li>
              <li>Dimanche: Fermé</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} Automobile Unterm Schloß. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};