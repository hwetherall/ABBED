import { useEffect, useState } from 'react';

const WeightProgress = ({ currentWeight, goalWeight, startWeight }) => {
  const [progressPercent, setProgressPercent] = useState(0);
  const [remainingWeight, setRemainingWeight] = useState(0);
  const [totalLoss, setTotalLoss] = useState(0);

  useEffect(() => {
    if (currentWeight && goalWeight && startWeight) {
      // Calculate progress
      const totalToLose = startWeight - goalWeight;
      const lostSoFar = startWeight - currentWeight;
      
      // Calculate percentage (capped at 100%)
      const percent = Math.min(100, Math.max(0, (lostSoFar / totalToLose) * 100));
      setProgressPercent(Math.round(percent));
      
      // Calculate remaining weight
      setRemainingWeight(Math.max(0, currentWeight - goalWeight).toFixed(1));
      
      // Calculate total weight loss
      setTotalLoss(Math.max(0, startWeight - currentWeight).toFixed(1));
    }
  }, [currentWeight, goalWeight, startWeight]);

  // If any required data is missing
  if (!currentWeight || !goalWeight || !startWeight) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Weight Goal Progress</h2>
        <p className="text-gray-500">Set your goal weight in your profile to track progress.</p>
      </div>
    );
  }

  // If current weight is already below goal weight
  if (currentWeight <= goalWeight) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Weight Goal Progress</h2>
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-green-600 h-4 rounded-full" 
              style={{ width: '100%' }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>Start: {startWeight} kg</span>
            <span>Goal: {goalWeight} kg</span>
          </div>
        </div>
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4">
          <p className="font-bold">Congratulations!</p>
          <p>You've reached your goal weight! You've lost {totalLoss} kg since you started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Weight Goal Progress</h2>
      
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-blue-600 h-4 rounded-full" 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span>Start: {startWeight} kg</span>
          <span>Goal: {goalWeight} kg</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">Progress</p>
          <p className="text-xl font-bold text-blue-600">{progressPercent}%</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Lost so far</p>
          <p className="text-xl font-bold text-green-600">{totalLoss} kg</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">To go</p>
          <p className="text-xl font-bold text-purple-600">{remainingWeight} kg</p>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Keep up the good work! You're making progress toward your goal.</p>
      </div>
    </div>
  );
};

export default WeightProgress; 