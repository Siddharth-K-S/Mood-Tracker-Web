import { useAuth } from '../context/AuthContext';
import MoodSuggestions from '../components/MoodSuggestions';

function Suggestions() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Suggestions</h1>
      
      {user ? (
        <MoodSuggestions />
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">Please log in to view personalized suggestions.</p>
        </div>
      )}
    </div>
  );
}

export default Suggestions;