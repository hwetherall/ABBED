import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeightChart = ({ entries, goalWeight }) => {
  const [chartData, setChartData] = useState(null);
  
  useEffect(() => {
    if (!entries || entries.length === 0) return;
    
    // Sort entries by date (oldest to newest)
    const sortedEntries = [...entries].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Extract last 30 entries at most
    const displayEntries = sortedEntries.slice(-30);
    
    // Format dates for display
    const labels = displayEntries.map(entry => 
      new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    );
    
    // Extract weights
    const weights = displayEntries.map(entry => entry.weight);
    
    // Calculate min and max for the y-axis
    const minWeight = Math.min(...weights);
    const maxWeight = Math.max(...weights);
    
    // Create goal weight line if provided
    const goalLine = goalWeight ? Array(labels.length).fill(goalWeight) : null;
    
    setChartData({
      labels,
      datasets: [
        {
          label: 'Weight (kg)',
          data: weights,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          tension: 0.3,
        },
        ...(goalLine ? [{
          label: 'Goal Weight',
          data: goalLine,
          borderColor: 'rgb(34, 197, 94)',
          borderDash: [5, 5],
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
        }] : [])
      ],
    });
  }, [entries, goalWeight]);
  
  if (!chartData || entries.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Weight Progress</h2>
        <p className="text-gray-500">Add more weight entries to see your progress chart.</p>
      </div>
    );
  }
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y} kg`;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return value + ' kg';
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Weight Progress</h2>
      <div className="h-64">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default WeightChart; 