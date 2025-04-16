import { useState, useEffect } from 'react';

const BMICalculator = ({ weight, height }) => {
  const [bmi, setBMI] = useState(null);
  const [bmiCategory, setBMICategory] = useState('');
  const [bmiColor, setBMIColor] = useState('');

  useEffect(() => {
    if (weight && height && height > 0) {
      // BMI = weight(kg) / (height(m))²
      const heightInMeters = height / 100; // Convert height from cm to meters
      const calculatedBMI = weight / (heightInMeters * heightInMeters);
      
      // Round to 1 decimal place
      const roundedBMI = Math.round(calculatedBMI * 10) / 10;
      setBMI(roundedBMI);
      
      // Determine BMI category and color
      if (roundedBMI < 18.5) {
        setBMICategory('Underweight');
        setBMIColor('text-blue-600');
      } else if (roundedBMI >= 18.5 && roundedBMI < 25) {
        setBMICategory('Normal weight');
        setBMIColor('text-green-600');
      } else if (roundedBMI >= 25 && roundedBMI < 30) {
        setBMICategory('Overweight');
        setBMIColor('text-yellow-600');
      } else {
        setBMICategory('Obese');
        setBMIColor('text-red-600');
      }
    } else {
      setBMI(null);
      setBMICategory('');
      setBMIColor('');
    }
  }, [weight, height]);

  if (!bmi) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">BMI Calculator</h2>
        <p className="text-gray-500">Please enter your height in your profile to calculate BMI.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">BMI Calculator</h2>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 mb-1">Your BMI</p>
          <p className={`text-3xl font-bold ${bmiColor}`}>{bmi}</p>
        </div>
        
        <div className="text-right">
          <p className="text-gray-600 mb-1">Category</p>
          <p className={`text-lg font-semibold ${bmiColor}`}>{bmiCategory}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="grid grid-cols-4">
            <div className="h-2 bg-blue-600"></div>
            <div className="h-2 bg-green-600"></div>
            <div className="h-2 bg-yellow-600"></div>
            <div className="h-2 bg-red-600"></div>
          </div>
        </div>
        <div className="grid grid-cols-4 text-xs text-gray-500 mt-1">
          <div>Underweight</div>
          <div className="text-center">Normal</div>
          <div className="text-center">Overweight</div>
          <div className="text-right">Obese</div>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        <p>BMI Categories:</p>
        <ul className="list-disc ml-5 mt-1">
          <li>Underweight: &lt; 18.5</li>
          <li>Normal weight: 18.5–24.9</li>
          <li>Overweight: 25–29.9</li>
          <li>Obesity: BMI of 30 or greater</li>
        </ul>
      </div>
    </div>
  );
};

export default BMICalculator; 