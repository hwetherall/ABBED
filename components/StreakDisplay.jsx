import { useEffect, useState } from 'react';
import { calculateStreak } from '../../firebase/weightService';

const StreakDisplay = ({ entries }) => {
  const [streak, setStreak] = useState(0);
  
  useEffect(() => {
    if (entries && entries.length > 0) {
      const currentStreak = calculateStreak(entries);
      setStreak(currentStreak);
    } else {
      setStreak(0);
    }
  }, [entries]);

  const getStreakMessage = () => {
    if (streak === 0) {
      return "Start tracking today to build your streak!";
    } else if (streak === 1) {
      return "You've tracked for 1 day. Great start!";
    } else if (streak < 5) {
      return `You've tracked for ${streak} days in a row. Keep it up!`;
    } else if (streak < 10) {
      return `Amazing! ${streak} day streak. You're building a habit!`;
    } else {
      return `Incredible ${streak} day streak! You're a consistency champion!`;
    }
  };

  const getEmoji = () => {
    if (streak === 0) return '🏁';
    if (streak < 3) return '🔥';
    if (streak < 7) return '🔥🔥';
    if (streak < 14) return '🔥🔥🔥';
    return '🏆';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Your Tracking Streak</h2>
      
      <div className="flex items-center">
        <div className="mr-4 text-4xl">{getEmoji()}</div>
        <div>
          <div className="text-3xl font-bold text-blue-600">{streak} {streak === 1 ? 'day' : 'days'}</div>
          <p className="text-gray-600">{getStreakMessage()}</p>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Log your weight daily to maintain and build your streak!</p>
      </div>
    </div>
  );
};

export default StreakDisplay; 