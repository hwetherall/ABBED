import { useState } from 'react';
import { deleteWeightEntry } from '../firebase/weightService';

const WeightHistory = ({ entries, userId, onEntryDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  if (!entries || entries.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Weight History</h2>
        <p className="text-gray-500">No weight entries yet. Start logging your weight above!</p>
      </div>
    );
  }

  const handleDelete = async (entryId) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setIsDeleting(true);
      setError(null);
      
      try {
        await deleteWeightEntry(userId, entryId);
        if (onEntryDeleted) {
          onEntryDeleted(entryId);
        }
      } catch (error) {
        console.error('Error deleting entry:', error);
        setError('Failed to delete entry. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Weight History</h2>
      
      {error && (
        <div className="mb-4 p-2 text-sm text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weight (kg)
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(entry.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {entry.weight} kg
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDelete(entry.id)}
                    disabled={isDeleting}
                    className="text-red-600 hover:text-red-900 focus:outline-none"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeightHistory; 