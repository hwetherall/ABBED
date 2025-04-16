import { useState } from 'react';
import { addWeightEntry } from '../firebase/weightService';

const WeightEntryForm = ({ userId, onWeightAdded }) => {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!weight || !date) {
      setError('Please enter both weight and date');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Convert date string to Date object at noon to avoid timezone issues
      const dateObj = new Date(`${date}T12:00:00`);
      
      const newEntry = await addWeightEntry(userId, {
        weight,
        date: dateObj
      });
      
      // Reset form
      setWeight('');
      setDate(new Date().toISOString().split('T')[0]);
      
      // Notify parent component
      if (onWeightAdded) {
        onWeightAdded(newEntry);
      }
    } catch (error) {
      console.error('Error adding weight entry:', error);
      setError('Failed to add weight entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Log Your Weight</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-700">
            Weight (kg)
          </label>
          <input
            type="number"
            id="weight"
            step="0.1"
            min="0"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your weight"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        {error && (
          <div className="mb-4 p-2 text-sm text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md text-white font-medium 
            ${isSubmitting 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
        >
          {isSubmitting ? 'Saving...' : 'Log Weight'}
        </button>
      </form>
    </div>
  );
};

export default WeightEntryForm; 