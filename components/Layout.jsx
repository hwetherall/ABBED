import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const navItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Weight', href: '/weight' },
    { label: 'Meals', href: '/meals' },
    { label: 'Activity', href: '/activity' },
    { label: 'Habits', href: '/habits' },
    { label: 'Profile', href: '/profile' },
  ];

  const isActive = (path) => {
    return router.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              ABBED
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4">
              {currentUser && navItems.map(item => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`px-3 py-2 rounded hover:bg-blue-700 transition-colors ${isActive(item.href)}`}
                >
                  {item.label}
                </Link>
              ))}
              
              {currentUser ? (
                <button 
                  onClick={handleLogout}
                  className="px-3 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <Link 
                  href="/login"
                  className={`px-3 py-2 rounded hover:bg-blue-700 transition-colors ${isActive('/login')}`}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-3 pb-3">
              {currentUser && navItems.map(item => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`block px-3 py-2 rounded hover:bg-blue-700 transition-colors ${isActive(item.href)}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {currentUser ? (
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <Link 
                  href="/login"
                  className={`block px-3 py-2 rounded hover:bg-blue-700 transition-colors ${isActive('/login')}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          )}
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">ABBED</h3>
              <p className="text-gray-400">A Bit Better Every Day</p>
            </div>
            
            <div className="text-center md:text-right">
              <p>&copy; {new Date().getFullYear()} ABBED. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 