import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { getWeightEntries } from '../firebase/weightService';

const HomePage = () => {
  const { currentUser, userProfile } = useAuth();
  const router = useRouter();
  
  const [latestWeight, setLatestWeight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestWeight = async () => {
      if (!currentUser) return;
      
      try {
        const entries = await getWeightEntries(currentUser.uid);
        if (entries.length > 0) {
          setLatestWeight(entries[0]);
        }
      } catch (error) {
        console.error('Error fetching latest weight:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLatestWeight();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <>
        <Head>
          <title>ABBED - A Bit Better Every Day</title>
          <meta name="description" content="Track your health and fitness progress with ABBED" />
        </Head>
        
        <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to ABBED</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
            A Bit Better Every Day - Track your health journey together with your loved ones
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/login" 
              className="py-3 px-6 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="py-3 px-6 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard | ABBED</title>
        <meta name="description" content="Your personal health dashboard" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Welcome, {userProfile?.name || 'Friend'}!</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Quick stats */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Weight</h2>
            {loading ? (
              <p>Loading...</p>
            ) : latestWeight ? (
              <div>
                <p className="text-3xl font-bold text-blue-600">{latestWeight.weight} kg</p>
                <p className="text-sm text-gray-500 mt-1">
                  Last updated: {new Date(latestWeight.date).toLocaleDateString()}
                </p>
                <Link href="/weight" className="text-blue-600 hover:underline text-sm inline-block mt-4">
                  View details →
                </Link>
              </div>
            ) : (
              <div>
                <p className="text-gray-500">No weight entries yet</p>
                <Link href="/weight" className="text-blue-600 hover:underline text-sm inline-block mt-4">
                  Log your weight →
                </Link>
              </div>
            )}
          </div>
          
          {/* Quick access cards */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Meals</h2>
            <p className="text-gray-500 mb-4">Track your nutrition and meals</p>
            <Link href="/meals" className="text-blue-600 hover:underline text-sm">
              Go to meals →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Activity</h2>
            <p className="text-gray-500 mb-4">Log your workouts and activities</p>
            <Link href="/activity" className="text-blue-600 hover:underline text-sm">
              Go to activity →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Habits</h2>
            <p className="text-gray-500 mb-4">Build and track healthy habits</p>
            <Link href="/habits" className="text-blue-600 hover:underline text-sm">
              Go to habits →
            </Link>
          </div>
        </div>
        
        {/* Goal Reminder */}
        {userProfile?.goalWeight ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Your Goal</h2>
            <p className="text-blue-700">
              You're aiming for {userProfile.goalWeight} kg. Keep up the good work!
            </p>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold text-yellow-800 mb-2">Set Your Goals</h2>
            <p className="text-yellow-700 mb-3">
              You haven't set your goal weight yet. Setting goals helps track your progress!
            </p>
            <Link 
              href="/profile" 
              className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded inline-block"
            >
              Update Profile
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage; 