import Footer from './Footer';
import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
const fullQuestionSet = [
  { question: "What's your ideal weekend vibe?", options: ["Chill at home", "Party all night", "Go hiking", "Try new food spots"] },
  { question: "Pick a color that matches your mood:", options: ["Blue", "Red", "Yellow", "Green"] },
  { question: "What music genre do you vibe with the most?", options: ["Pop", "Rock", "Jazz", "Hip-hop"] },
  { question: "Your go-to relaxation activity?", options: ["Reading", "Meditation", "Gaming", "Watching movies"] },
  { question: "Which season reflects your personality?", options: ["Spring", "Summer", "Fall", "Winter"] },
  { question: "How do you usually express yourself?", options: ["Art", "Words", "Dance", "Silence"] },
  { question: "Pick a drink that matches your energy:", options: ["Coffee", "Tea", "Smoothie", "Soda"] },
  { question: "Which animal do you vibe with?", options: ["Cat", "Dog", "Wolf", "Dolphin"] },
  { question: "Ideal vacation spot?", options: ["Beach", "Mountains", "City", "Countryside"] },
  { question: "Your favorite time of day?", options: ["Morning", "Afternoon", "Evening", "Night"] },
  { question: "Choose a superpower:", options: ["Invisibility", "Flight", "Telepathy", "Super strength"] },
  { question: "Your energy level today?", options: ["Calm", "Energetic", "Lazy", "Excited"] },
  { question: "Pick a dessert that suits your vibe:", options: ["Chocolate cake", "Ice cream", "Fruit tart", "Cookies"] },
  { question: "What’s your favorite way to spend a rainy day?", options: ["Reading a book", "Watching movies", "Sleeping", "Cooking"] },
  { question: "Pick a vibe for your fashion style:", options: ["Casual", "Bohemian", "Chic", "Sporty"] },
  { question: "How do you recharge your energy?", options: ["Alone time", "With friends", "Music", "Exercise"] },
  { question: "Choose a hobby that speaks to you:", options: ["Painting", "Writing", "Dancing", "Gardening"] },
  { question: "Your social vibe is more:", options: ["Introvert", "Extrovert", "Ambivert", "Depends on mood"] },
  { question: "Pick a type of movie you enjoy:", options: ["Comedy", "Thriller", "Romance", "Documentary"] },
  { question: "Your vibe on Mondays is:", options: ["Motivated", "Tired", "Anxious", "Neutral"] },
  { question: "Favorite type of weather?", options: ["Sunny", "Rainy", "Snowy", "Windy"] },
  { question: "Choose a type of workout you enjoy:", options: ["Yoga", "Running", "Weightlifting", "Dance"] },
  { question: "Pick a snack that matches your mood:", options: ["Chips", "Fruit", "Chocolate", "Nuts"] },
  { question: "How do you deal with stress?", options: ["Meditation", "Talking to friends", "Exercise", "Sleeping"] },
  { question: "Pick a city that fits your vibe:", options: ["New York", "Paris", "Tokyo", "Sydney"] },
  { question: "What's your communication style?", options: ["Direct", "Friendly", "Reserved", "Humorous"] },
  { question: "Which vibe fits your workspace?", options: ["Organized", "Creative mess", "Minimalist", "Cozy"] },
  { question: "Choose a fruit that vibes with you:", options: ["Apple", "Banana", "Mango", "Berry"] },
  { question: "Your go-to mood booster?", options: ["Music", "Exercise", "Food", "Friends"] },
  { question: "Pick a season to travel:", options: ["Spring", "Summer", "Autumn", "Winter"] },
  { question: "How do you celebrate success?", options: ["Party", "Quiet reflection", "Treat yourself", "Share with friends"] },
  { question: "Pick a social media platform you vibe with:", options: ["Instagram", "Twitter", "TikTok", "LinkedIn"] },
  { question: "Your ideal pet?", options: ["Dog", "Cat", "Bird", "Fish"] },
  { question: "What’s your go-to comfort food?", options: ["Pizza", "Ice cream", "Pasta", "Soup"] },
  { question: "Choose a book genre you enjoy:", options: ["Fiction", "Non-fiction", "Fantasy", "Biography"] },
  { question: "Pick a scent that you like:", options: ["Lavender", "Vanilla", "Citrus", "Ocean breeze"] },
  { question: "Your vibe in a group project:", options: ["Leader", "Supporter", "Idea person", "Organizer"] },
  { question: "How do you prefer to travel?", options: ["Car", "Plane", "Train", "Bike"] },
  { question: "Pick a language you’d love to speak:", options: ["Spanish", "French", "Japanese", "Italian"] },
  { question: "What’s your energy source?", options: ["Coffee", "Tea", "Water", "Juice"] },
  { question: "Choose your favorite flower:", options: ["Rose", "Sunflower", "Lily", "Tulip"] },
  { question: "Your vibe when meeting new people?", options: ["Excited", "Nervous", "Curious", "Reserved"] },
  { question: "Pick a genre of TV show:", options: ["Drama", "Comedy", "Reality", "Documentary"] },
  { question: "What motivates you?", options: ["Goals", "People", "Passion", "Curiosity"] },
  { question: "Your favorite way to celebrate:", options: ["Big party", "Small gathering", "Solo trip", "Family time"] },
  { question: "Choose a way to unwind:", options: ["Bath", "Walk", "Meditation", "Reading"] },
  { question: "Your vibe in the morning?", options: ["Energetic", "Slow starter", "Coffee lover", "Silent thinker"] },
  { question: "Pick a place to hang out:", options: ["Cafe", "Park", "Club", "Library"] },
  { question: "What’s your dream job vibe?", options: ["Creative", "Helping others", "Leadership", "Research"] },
  { question: "Choose a type of art you like:", options: ["Painting", "Sculpture", "Photography", "Dance"] },
];

const vibeMap = {
  Chill: ["Chill at home", "Tea", "Reading", "Rainy", "Meditation", "Sleeping", "Silence", "Garden", "Bath", "Walk"],
  "Party Animal": ["Party all night", "Soda", "Club", "Big party", "Hip-hop", "Excited", "TikTok"],
  "Nature Lover": ["Go hiking", "Mountains", "Spring", "Gardening", "Sunflower", "Camping", "Bird", "Bike"],
  "Creative Soul": ["Art", "Painting", "Writing", "Photography", "Dance", "Jazz", "Bohemian"],
  "Deep Thinker": ["Words", "Fiction", "Documentary", "Books", "Silence", "Meditation", "Library"],
  "High Energy": ["Workout", "Running", "Energetic", "Goals", "Exercise", "Dance", "Coffee"]
};

const categorySounds = {
  Click: "/sounds/click.mp3",
  Wow: "/sounds/wow.mp3"
};

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function getRandomQuestions(fullSet, prevQuestions = []) {
  const overlapCount = Math.floor(Math.random() * 2) + 1;
  const overlap = prevQuestions.length ? shuffleArray(prevQuestions).slice(0, overlapCount) : [];
  const filtered = fullSet.filter((q) => !overlap.some((oq) => oq.question === q.question));
  const remaining = shuffleArray(filtered).slice(0, 10 - overlap.length);
  return shuffleArray([...overlap, ...remaining]);
}

function getVibeCategory(answers) {
  const vibeCounts = {};
  Object.keys(vibeMap).forEach((vibe) => (vibeCounts[vibe] = 0));

  answers.forEach((ans) => {
    Object.entries(vibeMap).forEach(([vibe, keywords]) => {
      if (keywords.includes(ans)) {
        vibeCounts[vibe]++;
      }
    });
  });

  const sorted = Object.entries(vibeCounts).sort((a, b) => b[1] - a[1]);
  const top = sorted[0];
  return top[1] > 0 ? top[0] : "Uncategorized";
}

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [previousQuestions, setPreviousQuestions] = useState([]);
  const [userName, setUserName] = useState("");
  const [width, height] = useWindowSize();

  // 👉 New refs for audio elements
 const clickAudioRef = useRef(null);
 const wowAudioRef = useRef(null); // new wow sound ref
 const vibeAudioRef = useRef(null);
  useEffect(() => {
    const initialQuestions = getRandomQuestions(fullQuestionSet);
    setQuestions(initialQuestions);
    setLoading(false);
  }, []);

  const startQuiz = () => {
    const newQuestions = getRandomQuestions(fullQuestionSet, previousQuestions);
    setQuestions(newQuestions);
    setPreviousQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuizFinished(false);
    setQuizStarted(true);
  };

  const selectOption = (option) => {
    // Play click sound on option click
    if (clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play();
    }

      // Play wow sound just after click sound
    if (wowAudioRef.current) {
      setTimeout(() => {
        wowAudioRef.current.currentTime = 0;
        wowAudioRef.current.play();
      }, 150); // delay slightly so click and wow sounds don't clash badly
    }


    setAnswers((prev) => [...prev, option]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  // Play vibe celebration sound when quiz finishes
useEffect(() => {
  if (quizFinished) {
    if (wowAudioRef.current) {
      wowAudioRef.current.currentTime = 0;
      wowAudioRef.current.play();
    }
  }
}, [quizFinished]);

  if (!quizStarted) {
    return (
      <div className="flex items-center justify-center h-screen text-center text-white">
        <div>
          <h1 className="text-5xl font-bold mb-4">✨ Vibe Check ✨</h1>
          <p className="mb-4">Enter your name to begin the quiz!</p>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your Name"
            className="mb-6 px-4 py-2 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <br />
          <button
            onClick={startQuiz}
            className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition disabled:opacity-50"
            disabled={!userName.trim()}
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (quizFinished) {
    const vibeCategory = getVibeCategory(answers);
    return (
      <div className="flex h-screen text-white relative">
        <Confetti width={width} height={height} />
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-r from-yellow-400 to-red-500">
          <h2 className="text-4xl font-bold mb-4">
            🎉 Well done, {userName}! Your vibe: {vibeCategory} 🎉
          </h2>
          <button
            onClick={startQuiz}
            className="mt-6 bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Restart Quiz
          </button>
        </div>
        <div className="w-80 bg-black bg-opacity-70 p-6 overflow-y-auto">
          <h3 className="text-2xl font-semibold mb-4 border-b border-gray-400 pb-2">
            {userName}'s Answers
          </h3>
          {questions.map((q, idx) => (
            <div key={idx} className="mb-4">
              <p className="font-semibold">{q.question}</p>
              <p className="ml-4">{answers[idx] || "No answer selected"}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center text-white p-4 bg-gradient-to-r from-yellow-400 to-red-500">
      {/* Audio elements (hidden) */}
      <audio ref={clickAudioRef} src={categorySounds.Click} preload="auto" />
      <audio ref={wowAudioRef} src={categorySounds.Wow} preload="auto" />

      <h2 className="text-3xl font-semibold mb-6">{currentQuestion.question}</h2>
      <div className="flex flex-col space-y-4 mb-8">
        {shuffleArray(currentQuestion.options).map((option, idx) => (
          <button
            key={idx}
            className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
            onClick={() => selectOption(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <p>
        Question {currentQuestionIndex + 1} of {questions.length}
      </p>
      <Footer/>
    </div>
  );
}

export default App;