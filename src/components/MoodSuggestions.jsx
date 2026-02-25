import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/firebaseConfig';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

const suggestions = {
  happy: [
    "Write down what made you happy today",
    "Share your joy with friends or family",
    "Try a new hobby while in this positive mood",
    "Exercise to maintain your energy",
    "Plan something exciting for tomorrow"
  ],
  sad: [
    "Take a relaxing walk in nature",
    "Listen to uplifting music",
    "Talk to a friend or family member",
    "Practice self-care activities",
    "Write down your feelings in a journal"
  ],
  angry: [
    "Practice deep breathing exercises",
    "Do some physical exercise",
    "Write down what's bothering you",
    "Take a break from the situation",
    "Try progressive muscle relaxation"
  ],
  anxious: [
    "Try mindfulness meditation",
    "Make a list of what's worrying you",
    "Do some gentle stretching",
    "Practice grounding exercises",
    "Listen to calming music"
  ],
  calm: [
    "Continue your meditation practice",
    "Read a book",
    "Work on a creative project",
    "Practice gratitude",
    "Enjoy some quiet time in nature"
  ],
  love: [
    "Express your feelings to loved ones",
    "Do something kind for someone",
    "Write a heartfelt letter",
    "Plan a special activity with loved ones",
    "Practice self-love activities"
  ],
  neutral: [
    "Try something new today",
    "Set a small goal for yourself",
    "Connect with friends",
    "Learn something new",
    "Take a short walk"
  ]
};

function MoodSuggestions() {
  const [currentMood, setCurrentMood] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLatestMood = async () => {
      if (!user) return;

      const moodsRef = collection(db, 'moods');
      const q = query(
        moodsRef,
        where('userId', '==', user.uid),
        orderBy('timestamp', 'desc'),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setCurrentMood(querySnapshot.docs[0].data().mood);
      }
    };

    fetchLatestMood();
  }, [user]);

  if (!currentMood) return <div>Loading suggestions...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Suggestions for your current mood</h2>
      <ul className="space-y-3">
        {suggestions[currentMood].map((suggestion, index) => (
          <li key={index} className="flex items-start">
            <span className="text-indigo-600 mr-2">•</span>
            <span>{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoodSuggestions;