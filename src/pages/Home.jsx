import { useAuth } from '../context/AuthContext';
import MoodInput from '../components/MoodInput';
import { Link } from 'react-router-dom';

function Home() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Mood Scribe</h1>
      
      {user ? (
        <div className="space-y-6">
          <MoodInput />
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Track Your Mood Journey</h2>
            <div className="space-y-4">
              <Link
                to="/history"
                className="block bg-indigo-50 p-4 rounded-lg hover:bg-indigo-100"
              >
                📊 View Your Mood History
              </Link>
              <Link
                to="/suggestions"
                className="block bg-indigo-50 p-4 rounded-lg hover:bg-indigo-100"
              >
                💡 Get Personalized Suggestions
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            Please log in to start tracking your mood and get personalized insights.
          </p>
          <Link
            to="/login"
            className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
          >
            Log In
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;