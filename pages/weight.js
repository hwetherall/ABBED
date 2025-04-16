import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { getWeightEntries } from '../firebase/weightService';

// Components
import WeightEntryForm from '../components/WeightEntryForm';
import WeightHistory from '../components/WeightHistory';
import WeightChart from '../components/WeightChart';
import BMICalculator from '../components/BMICalculator';
import StreakDisplay from '../components/StreakDisplay';
import WeightProgress from '../components/WeightProgress';

const WeightPage = () => {
  const { currentUser, userProfile } = useAuth();
  const router = useRouter();
  
  const [weightEntries, setWeightEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentWeight, setCurrentWeight] = useState(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser && !loading) {
      router.push('/login');
    }
  }, [currentUser, loading, router]);

  // Fetch weight entries
  useEffect(() => {
    const fetchEntries = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        const entries = await getWeightEntries(currentUser.uid);
        setWeightEntries(entries);
        
        // Set current weight to latest entry if available
        if (entries.length > 0) {
          setCurrentWeight(entries[0].weight);
        }
      } catch (error) {
        console.error('Error fetching weight entries:', error);
        setError('Failed to load weight data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEntries();
  }, [currentUser]);

  // Handle weight entry added
  const handleWeightAdded = (newEntry) => {
    setWeightEntries((prev) => [newEntry, ...prev]);
    setCurrentWeight(newEntry.weight);
  };

  // Handle weight entry deleted
  const handleEntryDeleted = (entryId) => {
    setWeightEntries((prev) => prev.filter(entry => entry.id !== entryId));
    
    // Update current weight if needed
    if (weightEntries.length > 0) {
      const remainingEntries = weightEntries.filter(entry => entry.id !== entryId);
      if (remainingEntries.length > 0) {
        setCurrentWeight(remainingEntries[0].weight);
      } else {
        setCurrentWeight(null);
      }
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Weight Tracking | ABBED</title>
        <meta name="description" content="Track your weight and progress with ABBED" />
      </Head>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Weight Tracking</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            {/* Weight Entry Form */}
            <WeightEntryForm 
              userId={currentUser.uid}
              onWeightAdded={handleWeightAdded}
            />
            
            {/* BMI Calculator */}
            <BMICalculator 
              weight={currentWeight} 
              height={userProfile?.height}
            />
            
            {/* Streak Display */}
            <StreakDisplay entries={weightEntries} />
          </div>
          
          <div>
            {/* Weight Progress */}
            <WeightProgress 
              currentWeight={currentWeight}
              goalWeight={userProfile?.goalWeight}
              startWeight={userProfile?.startWeight}
            />
            
            {/* Weight Chart */}
            <WeightChart 
              entries={weightEntries}
              goalWeight={userProfile?.goalWeight}
            />
            
            {/* Weight History */}
            <WeightHistory 
              entries={weightEntries}
              userId={currentUser.uid}
              onEntryDeleted={handleEntryDeleted}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WeightPage; 