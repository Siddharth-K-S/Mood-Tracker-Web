import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/firebaseConfig';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const moodToNumber = {
  'happy': 5,
  'love': 4,
  'calm': 3,
  'neutral': 2,
  'anxious': 1,
  'sad': 0,
  'angry': -1
};

function MoodChart() {
  const [chartData, setChartData] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMoodData = async () => {
      if (!user) return;

      const moodsRef = collection(db, 'moods');
      const q = query(
        moodsRef,
        where('userId', '==', user.uid),
        orderBy('timestamp', 'desc'),
        limit(7)
      );

      const querySnapshot = await getDocs(q);
      const moodData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));

      const data = {
        labels: moodData.map(entry => {
          if (entry.timestamp && entry.timestamp.toDate) {
            return new Date(entry.timestamp.toDate()).toLocaleDateString('en-GB'); // Format: DD-MM-YYYY
          }
          return '26-03-2025'; // Default if timestamp is missing
        }).reverse(),
        datasets: [{
          label: 'Mood Level',
          data: moodData.map(entry => moodToNumber[entry.mood] || 0).reverse(), // Avoid errors
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };

      setChartData(data);
    };

    fetchMoodData();
  }, [user]);

  if (!chartData) return <div>Loading chart...</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Line
        data={chartData}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 5,
              min: -1,
              ticks: {
                stepSize: 1,
                callback: function(value) {
                  return Object.keys(moodToNumber).find(
                    key => moodToNumber[key] === value
                  ) || '';
                }
              }
            }
          }
        }}
      />
    </div>
  );
}

export default MoodChart;
