import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { currentUser, userProfile, updateUserProfile } = useAuth();
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [startWeight, setStartWeight] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);

  // Populate form with existing data
  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || '');
      setHeight(userProfile.height || '');
      setGoalWeight(userProfile.goalWeight || '');
      setStartWeight(userProfile.startWeight || '');
    }
  }, [userProfile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSuccess(false);
    setError(null);
    
    try {
      await updateUserProfile({
        name,
        height: height ? parseFloat(height) : null,
        goalWeight: goalWeight ? parseFloat(goalWeight) : null,
        startWeight: startWeight ? parseFloat(startWeight) : null,
        updatedAt: new Date()
      });
      
      setSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentUser || !userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Profile | ABBED</title>
        <meta name="description" content="Manage your ABBED profile" />
      </Head>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Profile</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          {success && (
            <div className="mb-6 p-2 text-sm text-green-700 bg-green-100 rounded-md">
              Profile updated successfully!
            </div>
          )}
          
          {error && (
            <div className="mb-6 p-2 text-sm text-red-700 bg-red-100 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your name"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="height" className="block mb-2 text-sm font-medium text-gray-700">
                Height (cm)
              </label>
              <input
                type="number"
                id="height"
                min="0"
                step="0.1"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your height in centimeters"
              />
              <p className="mt-1 text-xs text-gray-500">Required for BMI calculation</p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="startWeight" className="block mb-2 text-sm font-medium text-gray-700">
                Start Weight (kg)
              </label>
              <input
                type="number"
                id="startWeight"
                min="0"
                step="0.1"
                value={startWeight}
                onChange={(e) => setStartWeight(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your starting weight in kilograms"
              />
              <p className="mt-1 text-xs text-gray-500">Used to track your total progress</p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="goalWeight" className="block mb-2 text-sm font-medium text-gray-700">
                Goal Weight (kg)
              </label>
              <input
                type="number"
                id="goalWeight"
                min="0"
                step="0.1"
                value={goalWeight}
                onChange={(e) => setGoalWeight(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your target weight in kilograms"
              />
              <p className="mt-1 text-xs text-gray-500">Setting a goal helps track your progress</p>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded-md text-white font-medium 
                ${isSubmitting 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                }`}
            >
              {isSubmitting ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="mb-2">
            <span className="font-medium">Email: </span>
            <span className="text-gray-600">{currentUser.email}</span>
          </div>
          <div className="mb-4">
            <span className="font-medium">Account created: </span>
            <span className="text-gray-600">
              {new Date(userProfile.createdAt?.seconds * 1000 || Date.now()).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage; 