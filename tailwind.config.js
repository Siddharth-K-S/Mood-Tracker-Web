/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Happy
        'happy-yellow': '#FFD700',
        'happy-orange': '#FFA500',
        'happy-pink': '#FF69B4',
        'happy-blue': '#87CEEB',
        'happy-green': '#90EE90',
        
        // Calm
        'calm-green': '#9CAF88',
        'calm-blue': '#B0E0E6',
        'calm-taupe': '#483C32',
        'calm-lavender': '#E6E6FA',
        
        // Sad
        'sad-navy': '#000080',
        'sad-blue': '#4682B4',
        'sad-gray': '#708090',
        'sad-lilac': '#C8A2C8',
        
        // Angry
        'angry-red': '#FF0000',
        'angry-crimson': '#DC143C',
        'angry-maroon': '#800000',
        'angry-orange': '#FF4500',
        
        // Anxious
        'anxious-blue': '#4A6670',
        'anxious-gray': '#808080',
        'anxious-purple': '#6A5ACD',
        'anxious-teal': '#008080',
        
        // Love
        'love-red': '#FF1493',
        'love-pink': '#FFB6C1',
        'love-lavender': '#E6E6FA',
        'love-peach': '#FFDAB9',
        'love-cream': '#FFFDD0',
        
        // Neutral
        'neutral-gray': '#D3D3D3',
        'neutral-sand': '#F5DEB3',
        'neutral-black': '#2F4F4F',
        'neutral-olive': '#808000',
        'neutral-cream': '#FAFAD2',
      },
    },
  },
  plugins: [],
}