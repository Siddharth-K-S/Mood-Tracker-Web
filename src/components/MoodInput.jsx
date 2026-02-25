import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import nlp from 'compromise';

const suggestions = {
  happy: [
    "Write down what made you happy today",
    "Share your joy with friends or family",
    "Try a new hobby while in this positive mood"
  ],
  sad: [
    "Take a relaxing walk in nature",
    "Listen to uplifting music",
    "Talk to a friend or family member"
  ],
  angry: [
    "Practice deep breathing exercises",
    "Do some physical exercise",
    "Take a break from the situation"
  ],
  anxious: [
    "Try mindfulness meditation",
    "Make a list of what's worrying you",
    "Practice grounding exercises"
  ],
  calm: [
    "Continue your meditation practice",
    "Read a book",
    "Enjoy some quiet time in nature"
  ],
  love: [
    "Express your feelings to loved ones",
    "Do something kind for someone",
    "Plan a special activity"
  ],
  neutral: [
    "Try something new today",
    "Set a small goal for yourself",
    "Connect with friends"
  ]
};

function MoodInput() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [moodHistory, setMoodHistory] = useState([]);
  const { user } = useAuth();

  const analyzeMood = (text) => {
    const doc = nlp(text);
    
    if (doc.match('(happy|excited|great|wonderful|fantastic)').found) return 'happy';
    if (doc.match('(calm|peaceful|relaxed|serene)').found) return 'calm';
    if (doc.match('(sad|depressed|unhappy|down|blue)').found) return 'sad';
    if (doc.match('(angry|mad|furious|upset)').found) return 'angry';
    if (doc.match('(anxious|worried|nervous|stressed)').found) return 'anxious';
    if (doc.match('(love|loving|affectionate|caring)').found) return 'love';
    
    return 'neutral';
  };

  useEffect(() => {
    const fetchMoodHistory = async () => {
      if (!user) return;

      const moodsRef = collection(db, 'moods');
      const q = query(
        moodsRef,
        where('userId', '==', user.uid),
        orderBy('timestamp', 'desc'),
        limit(5)
      );

      const querySnapshot = await getDocs(q);
      const moodData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setMoodHistory(moodData);
    };

    fetchMoodHistory();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    const mood = analyzeMood(text);

    try {
      const docRef = await addDoc(collection(db, 'moods'), {
        userId: user.uid,
        text: text,
        mood: mood,
        timestamp: serverTimestamp()
      });
      setText('');
      
      // Update mood history
      setMoodHistory(prev => [{
        id: docRef.id,
        text,
        mood,
        timestamp: new Date(),
        userId: user.uid
      }, ...prev.slice(0, 4)]);
    } catch (error) {
      console.error('Error saving mood:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLatestMood = () => {
    return moodHistory[0]?.mood || null;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="How are you feeling today?"
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows="4"
          />
          <button
            type="submit"
            disabled={loading || !text.trim()}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Mood'}
          </button>
        </form>
      </div>

      {moodHistory.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Mood History</h2>
          <div className="space-y-4">
            {moodHistory.map((entry) => (
              <div key={entry.id} className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium capitalize">{entry.mood}</span>
                  <span className="text-sm text-gray-500">
                    {entry.timestamp?.toDate().toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{entry.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {getLatestMood() && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Suggestions for your current mood</h2>
          <ul className="space-y-3">
            {suggestions[getLatestMood()].map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <span className="text-indigo-600 mr-2">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MoodInput;