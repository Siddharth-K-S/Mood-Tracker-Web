import { useAuth } from '../context/AuthContext';
import MoodChart from '../components/MoodChart';

function History() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mood History</h1>
      
      {user ? (
        <div className="space-y-6">
          <MoodChart />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">Please log in to view your mood history.</p>
        </div>
      )}
    </div>
  );
}

export default History;