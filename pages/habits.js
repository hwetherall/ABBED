import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const HabitsPage = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Habits Tracking | ABBED</title>
        <meta name="description" content="Build and track healthy habits with ABBED" />
      </Head>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Habits Tracking</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col items-center justify-center text-center py-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Coming Soon!</h2>
            <p className="text-gray-600 max-w-md">
              We're working on this feature. Soon you'll be able to build and 
              track your daily habits to help achieve your health goals.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HabitsPage; 