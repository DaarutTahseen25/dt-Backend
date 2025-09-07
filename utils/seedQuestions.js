import Question from '../models/question.model.js';

const questionData = {
  beginner: [
    {
      question_text: "What is the capital of Nigeria?",
      options: [
        { text: "Lagos", is_correct: false },
        { text: "Abuja", is_correct: true },
        { text: "Kano", is_correct: false },
        { text: "Port Harcourt", is_correct: false }
      ],
      subject: "Geography",
      difficulty_score: 2
    },
    {
      question_text: "What is 2 + 2?",
      options: [
        { text: "3", is_correct: false },
        { text: "4", is_correct: true },
        { text: "5", is_correct: false },
        { text: "6", is_correct: false }
      ],
      subject: "Mathematics",
      difficulty_score: 1
    },
    {
      question_text: "Which of these is a primary color?",
      options: [
        { text: "Green", is_correct: false },
        { text: "Orange", is_correct: false },
        { text: "Red", is_correct: true },
        { text: "Purple", is_correct: false }
      ],
      subject: "Art",
      difficulty_score: 2
    },
    {
      question_text: "How many days are there in a week?",
      options: [
        { text: "6", is_correct: false },
        { text: "7", is_correct: true },
        { text: "8", is_correct: false },
        { text: "5", is_correct: false }
      ],
      subject: "General Knowledge",
      difficulty_score: 1
    },
    {
      question_text: "What is the largest planet in our solar system?",
      options: [
        { text: "Earth", is_correct: false },
        { text: "Mars", is_correct: false },
        { text: "Jupiter", is_correct: true },
        { text: "Saturn", is_correct: false }
      ],
      subject: "Science",
      difficulty_score: 3
    },
    {
      question_text: "Which animal is known as the king of the jungle?",
      options: [
        { text: "Tiger", is_correct: false },
        { text: "Elephant", is_correct: false },
        { text: "Lion", is_correct: true },
        { text: "Leopard", is_correct: false }
      ],
      subject: "Biology",
      difficulty_score: 2
    },
    {
      question_text: "What is 10 - 5?",
      options: [
        { text: "4", is_correct: false },
        { text: "5", is_correct: true },
        { text: "6", is_correct: false },
        { text: "7", is_correct: false }
      ],
      subject: "Mathematics",
      difficulty_score: 1
    },
    {
      question_text: "Which of these is a fruit?",
      options: [
        { text: "Carrot", is_correct: false },
        { text: "Potato", is_correct: false },
        { text: "Apple", is_correct: true },
        { text: "Onion", is_correct: false }
      ],
      subject: "Biology",
      difficulty_score: 1
    },
    {
      question_text: "What is the first letter of the alphabet?",
      options: [
        { text: "A", is_correct: true },
        { text: "B", is_correct: false },
        { text: "C", is_correct: false },
        { text: "D", is_correct: false }
      ],
      subject: "English",
      difficulty_score: 1
    },
    {
      question_text: "How many sides does a triangle have?",
      options: [
        { text: "2", is_correct: false },
        { text: "3", is_correct: true },
        { text: "4", is_correct: false },
        { text: "5", is_correct: false }
      ],
      subject: "Mathematics",
      difficulty_score: 1
    },
    {
      question_text: "Which of these is a mammal?",
      options: [
        { text: "Fish", is_correct: false },
        { text: "Bird", is_correct: false },
        { text: "Dog", is_correct: true },
        { text: "Snake", is_correct: false }
      ],
      subject: "Biology",
      difficulty_score: 2
    },
    {
      question_text: "What do we use to see?",
      options: [
        { text: "Ears", is_correct: false },
        { text: "Eyes", is_correct: true },
        { text: "Nose", is_correct: false },
        { text: "Mouth", is_correct: false }
      ],
      subject: "Biology",
      difficulty_score: 1
    },
    {
      question_text: "What is 3 × 3?",
      options: [
        { text: "6", is_correct: false },
        { text: "9", is_correct: true },
        { text: "12", is_correct: false },
        { text: "15", is_correct: false }
      ],
      subject: "Mathematics",
      difficulty_score: 2
    },
    {
      question_text: "Which season comes after winter?",
      options: [
        { text: "Summer", is_correct: false },
        { text: "Fall", is_correct: false },
        { text: "Spring", is_correct: true },
        { text: "Autumn", is_correct: false }
      ],
      subject: "General Knowledge",
      difficulty_score: 2
    },
    {
      question_text: "What is the color of the sun?",
      options: [
        { text: "Blue", is_correct: false },
        { text: "Green", is_correct: false },
        { text: "Yellow", is_correct: true },
        { text: "Red", is_correct: false }
      ],
      subject: "Science",
      difficulty_score: 1
    },
    {
      question_text: "How many fingers do you have on one hand?",
      options: [
        { text: "4", is_correct: false },
        { text: "5", is_correct: true },
        { text: "6", is_correct: false },
        { text: "3", is_correct: false }
      ],
      subject: "Biology",
      difficulty_score: 1
    },
    {
      question_text: "What is 15 + 10?",
      options: [
        { text: "20", is_correct: false },
        { text: "25", is_correct: true },
        { text: "30", is_correct: false },
        { text: "35", is_correct: false }
      ],
      subject: "Mathematics",
      difficulty_score: 2
    },
    {
      question_text: "Which of these is a vegetable?",
      options: [
        { text: "Orange", is_correct: false },
        { text: "Banana", is_correct: false },
        { text: "Carrot", is_correct: true },
        { text: "Apple", is_correct: false }
      ],
      subject: "Biology",
      difficulty_score: 1
    },
    {
      question_text: "What do bees make?",
      options: [
        { text: "Milk", is_correct: false },
        { text: "Honey", is_correct: true },
        { text: "Bread", is_correct: false },
        { text: "Cheese", is_correct: false }
      ],
      subject: "Biology",
      difficulty_score: 2
    },
    {
      question_text: "How many months are there in a year?",
      options: [
        { text: "10", is_correct: false },
        { text: "11", is_correct: false },
        { text: "12", is_correct: true },
        { text: "13", is_correct: false }
      ],
      subject: "General Knowledge",
      difficulty_score: 1
    },
    {
      question_text: "What is the opposite of hot?",
      options: [
        { text: "Warm", is_correct: false },
        { text: "Cool", is_correct: false },
        { text: "Cold", is_correct: true },
        { text: "Mild", is_correct: false }
      ],
      subject: "English",
      difficulty_score: 1
    },
    {
      question_text: "Which of these animals can fly?",
      options: [
        { text: "Dog", is_correct: false },
        { text: "Cat", is_correct: false },
        { text: "Bird", is_correct: true },
        { text: "Fish", is_correct: false }
      ],
      subject: "Biology",
      difficulty_score: 1
    },
    {
      question_text: "What is 20 ÷ 4?",
      options: [
        { text: "4", is_correct: false },
        { text: "5", is_correct: true },
        { text: "6", is_correct: false },
        { text: "8", is_correct: false }
      ],
      subject: "Mathematics",
      difficulty_score: 2
    },
    {
      question_text: "Which of these is used to write?",
      options: [
        { text: "Spoon", is_correct: false },
        { text: "Pen", is_correct: true },
        { text: "Plate", is_correct: false },
        { text: "Cup", is_correct: false }
      ],
      subject: "General Knowledge",
      difficulty_score: 1
    },
    {
      question_text: "What comes after Monday?",
      options: [
        { text: "Sunday", is_correct: false },
        { text: "Tuesday", is_correct: true },
        { text: "Wednesday", is_correct: false },
        { text: "Friday", is_correct: false }
      ],
      subject: "General Knowledge",
      difficulty_score: 1
    },
    {
      question_text: "How many wheels does a bicycle have?",
      options: [
        { text: "1", is_correct: false },
        { text: "2", is_correct: true },
        { text: "3", is_correct: false },
        { text: "4", is_correct: false }
      ],
      subject: "General Knowledge",
      difficulty_score: 1
    },
    {
      question_text: "What is the first month of the year?",
      options: [
        { text: "December", is_correct: false },
        { text: "January", is_correct: true },
        { text: "March", is_correct: false },
        { text: "April", is_correct: false }
      ],
      subject: "General Knowledge",
      difficulty_score: 1
    },
    {
      question_text: "Which of these is a musical instrument?",
      options: [
        { text: "Table", is_correct: false },
        { text: "Chair", is_correct: false },
        { text: "Piano", is_correct: true },
        { text: "Book", is_correct: false }
      ],
      subject: "Music",
      difficulty_score: 2
    },
    {
      question_text: "What is 100 - 50?",
      options: [
        { text: "40", is_correct: false },
        { text: "50", is_correct: true },
        { text: "60", is_correct: false },
        { text: "70", is_correct: false }
      ],
      subject: "Mathematics",
      difficulty_score: 2
    },
    {
      question_text: "Which of these is the smallest?",
      options: [
        { text: "Elephant", is_correct: false },
        { text: "Mouse", is_correct: true },
        { text: "Dog", is_correct: false },
        { text: "Cat", is_correct: false }
      ],
      subject: "Biology",
      difficulty_score: 2
    }
  ],
  intermediate: [
    {
      question_text: "What is the chemical symbol for water?",
      options: [
        { text: "H2O", is_correct: true },
        { text: "CO2", is_correct: false },
        { text: "NaCl", is_correct: false },
        { text: "O2", is_correct: false }
      ],
      subject: "Chemistry",
      difficulty_score: 4
    },
    {
      question_text: "Who wrote the novel 'Things Fall Apart'?",
      options: [
        { text: "Wole Soyinka", is_correct: false },
        { text: "Chinua Achebe", is_correct: true },
        { text: "Chimamanda Adichie", is_correct: false },
        { text: "Ben Okri", is_correct: false }
      ],
      subject: "Literature",
      difficulty_score: 5
    },
    {
      question_text: "What is the square root of 144?",
      options: [
        { text: "10", is_correct: false },
        { text: "11", is_correct: false },
        { text: "12", is_correct: true },
        { text: "13", is_correct: false }
      ],
      subject: "Mathematics",
      difficulty_score: 4
    },
    {
      question_text: "Which continent is known as the 'Dark Continent'?",
      options: [
        { text: "Asia", is_correct: false },
        { text: "Europe", is_correct: false },
        { text: "Africa", is_correct: true },
        { text: "South America", is_correct: false }
      ],
      subject: "Geography",
      difficulty_score: 4
    },
    {
      question_text: "What is the process by which plants make food called?",
      options: [
        { text: "Respiration", is_correct: false },
        { text: "Photosynthesis", is_correct: true },
        { text: "Digestion", is_correct: false },
        { text: "Absorption", is_correct: false }
      ],
      subject: "Biology",
      difficulty_score: 4
    },
    {
      question_text: "In which year did Nigeria gain independence?",
      options: [
        { text: "1958", is_correct: false },
        { text: "1960", is_correct: true },
        { text: "1962", is_correct: false },
        { text: "1963", is_correct: false }
      ],
      subject: "History",
      difficulty_score: 5
    },
    {
      question_text: "What is 25% of 200?",
      options: [
        { text: "40", is_correct: false },
        { text: "50", is_correct: true },
        { text: "60", is_correct: false },
        { text: "75", is_correct: false }
      ],
      subject: "Mathematics",
      difficulty_score: 4
    },
    {
      question_text: "Which gas makes up most of Earth's atmosphere?",
      options: [
        { text: "Oxygen", is_correct: false },
        { text: "Carbon Dioxide", is_correct: false },
        { text: "Nitrogen", is_correct: true },
        { text: "Helium", is_correct: false }
      ],
      subject: "Science",
      difficulty_score: 5
    },
    {
      question_text: "What is the past tense of 'go'?",
      options: [
        { text: "Goes", is_correct: false },
        { text: "Gone", is_correct: false },
        { text: "Went", is_correct: true },
        { text: "Going", is_correct: false }
      ],
      subject: "English",
      difficulty_score: 3
    },
    {
      question_text: "Which planet is closest to the Sun?",
      options: [
        { text: "Venus", is_correct: false },
        { text: "Earth", is_correct: false },
        { text: "Mercury", is_correct: true },
        { text: "Mars", is_correct: false }
      ],
      subject: "Astronomy",
      difficulty_score: 4
    },
    {
      question_text: "What is the capital of France?",
      options: [
        { text: "London", is_correct: false },
        { text: "Berlin", is_correct: false },
        { text: "Paris", is_correct: true },
        { text: "Madrid", is_correct: false }
      ],
      subject: "Geography",
      difficulty_score: 3
    },
    {
      question_text: "What is 7 × 8?",
      options: [
        { text: "54", is_correct: false },
        { text: "56", is_correct: true },
        { text: "58", is_correct: false },
        { text: "63", is_correct: false }
      ],
      subject: "Mathematics",
      difficulty_score: 3
    },
    {
      question_text: "Which organ pumps blood through the human body?",
      options: [
        { text: "Lungs", is_correct: false },
        { text: "Liver", is_correct: false },
        { text: "Heart", is_correct: true },
        { text: "Kidney", is_correct: false }
      ],
      subject: "Biology",
      difficulty_score: 3
    },
    {
      question_text: "What is the longest river in the world?",
      options: [
        { text: "Amazon River", is_correct: false },
        { text: "Nile River", is_correct: true },
        { text: "Mississippi River", is_correct: false },
        { text: "Yangtze River", is_correct: false }
      ],
      subject: "Geography",
      difficulty_score: 5
    },
    {
      question_text: "What is the formula for the area of a circle?",
      options: [
        { text: "2πr", is_correct: false },
        { text: "πr²", is_correct: true },
        { text: "πr", is_correct: false },
        { text: "2πr²", is_correct: false }
      ],
      subject: "Mathematics",
      difficulty_score: 5
    },
    {
      question_text: "Which element has the chemical symbol 'Au'?",
      options: [
        { text: "Silver", is_correct: false },
        { text: "Gold", is_correct: true },
        { text: "Aluminum", is_correct: false },
        { text: "Iron", is_correct: false }
      ],
      subject: "Chemistry",
      difficulty_score: 5
    },
    {
      question_text: "Who invented the telephone?",
      options: [
        { text: "Thomas Edison", is_correct: false },
        { text: "Alexander Graham Bell", is_correct: true },
        { text: "Nikola Tesla", is_correct: false },
        { text: "Benjamin Franklin", is_correct: false }
      ],
      subject: "History",
      difficulty_score: 4
    },
    {
      question_text: "What is 144 ÷ 12?",
      options: [
        { text: "10", is_correct: false },
        { text: "11", is_correct: false },
        { text: "12", is_correct: true },
        { text: "13", is_correct: false }
      ],
      subject: "Mathematics",
      difficulty_score: 3
    },
    {
      question_text: "Which is the largest ocean on Earth?",
      options: [
        { text: "Atlantic Ocean", is_correct: false },
        { text: "Indian Ocean", is_correct: false },
        { text: "Pacific Ocean", is_correct: true },
        { text: "Arctic Ocean", is_correct: false }
      ],
      subject: "Geography",
      difficulty_score: 4
    },
    {
      question_text: "What is the plural of 'child'?",
      options: [
        { text: "Childs", is_correct: false },
        { text: "Children", is_correct: true },
        { text: "Childes", is_correct: false },
        { text: "Child", is_correct: false }
      ],
      subject: "English",
      difficulty_score: 3
    },
    {
      question_text: "How many bones are there in an adult human body?",
      options: [
        { text: "204", is_correct: false },
        { text: "206", is_correct: true },
        { text: "208", is_correct: false },
        { text: "210", is_correct: false }
      ],
      subject: "Biology",
      difficulty_score: 5
    },
    {
      question_text: "What is the freezing point of water in Celsius?",
      options: [
        { text: "32°", is_correct: false },
        { text: "0°", is_correct: true },
        { text: "100°", is_correct: false },
        { text: "212°", is_correct: false }
      ],
      subject: "Science",
      difficulty_score: 3
    },
    {
      question_text: "Which country is known as the 'Land of the Rising Sun'?",
      options: [
        { text: "China", is_correct: false },
        { text: "Japan", is_correct: true },
        { text: "Korea", is_correct: false },
        { text: "Thailand", is_correct: false }
      ],
      subject: "Geography",
      difficulty_score: 4
    },
    {
      question_text: "What is 15² (15 squared)?",
      options: [
        { text: "215", is_correct: false },
        { text: "225", is_correct: true },
        { text: "235", is_correct: false },
        { text: "245", is_correct: false }
      ],
      subject: "Mathematics",
      difficulty_score: 4
    },
    {
      question_text: "Which vitamin is produced when skin is exposed to sunlight?",
      options: [
        { text: "Vitamin A", is_correct: false },
        { text: "Vitamin B", is_correct: false },
        { text: "Vitamin C", is_correct: false },
        { text: "Vitamin D", is_correct: true }
      ],
      subject: "Biology",
      difficulty_score: 4
    },
    {
      question_text: "What is the speed of light?",
      options: [
        { text: "299,792,458 m/s", is_correct: true },
        { text: "300,000,000 m/s", is_correct: false },
        { text: "186,000 m/s", is_correct: false },
        { text: "150,000,000 m/s", is_correct: false }
      ],
      subject: "Physics",
      difficulty_score: 6
    },
    {
      question_text: "Who painted the Mona Lisa?",
      options: [
        { text: "Vincent van Gogh", is_correct: false },
        { text: "Leonardo da Vinci", is_correct: true },
        { text: "Pablo Picasso", is_correct: false },
        { text: "Michelangelo", is_correct: false }
      ],
      subject: "Art",
      difficulty_score: 4
    },
    {
      question_text: "What is the smallest unit of matter?",
      options: [
        { text: "Molecule", is_correct: false },
        { text: "Atom", is_correct: true },
        { text: "Cell", is_correct: false },
        { text: "Electron", is_correct: false }
      ],
      subject: "Chemistry",
      difficulty_score: 4
    },
    {
      question_text: "In which continent is the Sahara Desert located?",
      options: [
        { text: "Asia", is_correct: false },
        { text: "Australia", is_correct: false },
        { text: "Africa", is_correct: true },
        { text: "North America", is_correct: false }
      ],
      subject: "Geography",
      difficulty_score: 3
    },
    {
      question_text: "What is 0.5 as a fraction?",
      options: [
        { text: "1/3", is_correct: false },
        { text: "1/2", is_correct: true },
        { text: "1/4", is_correct: false },
        { text: "2/3", is_correct: false }
      ],
      subject: "Mathematics",
      difficulty_score: 3
    }
  ],
  advanced: [
    {
      question_text: "What is the derivative of x³?",
      options: [
        { text: "x²", is_correct: false },
        { text: "3x²", is_correct: true },
        { text: "3x³", is_correct: false },
        { text: "x⁴/4", is_correct: false }
      ],
      subject: "Calculus",
      difficulty_score: 7
    },
    {
      question_text: "Which of the following is a greenhouse gas?",
      options: [
        { text: "Nitrogen", is_correct: false },
        { text: "Oxygen", is_correct: false },
        { text: "Carbon Dioxide", is_correct: true },
        { text: "Argon", is_correct: false }
      ],
      subject: "Environmental Science",
      difficulty_score: 6
    },
    {
      question_text: "What is the time complexity of binary search?",
      options: [
        { text: "O(n)", is_correct: false },
        { text: "O(log n)", is_correct: true },
        { text: "O(n²)", is_correct: false },
        { text: "O(1)", is_correct: false }
      ],
      subject: "Computer Science",
      difficulty_score: 8
    },
    {
      question_text: "Who developed the theory of relativity?",
      options: [
        { text: "Isaac Newton", is_correct: false },
        { text: "Albert Einstein", is_correct: true },
        { text: "Galileo Galilei", is_correct: false },
        { text: "Stephen Hawking", is_correct: false }
      ],
      subject: "Physics",
      difficulty_score: 6
    },
    {
      question_text: "What is the molecular formula of glucose?",
      options: [
        { text: "C6H12O6", is_correct: true },
        { text: "C6H6O6", is_correct: false },
        { text: "C12H22O11", is_correct: false },
        { text: "C2H6O", is_correct: false }
      ],
      subject: "Chemistry",
      difficulty_score: 7
    },
    {
      question_text: "Which economic principle states that as price increases, quantity demanded decreases?",
      options: [
        { text: "Law of Supply", is_correct: false },
        { text: "Law of Demand", is_correct: true },
        { text: "Law of Diminishing Returns", is_correct: false },
        { text: "Pareto Principle", is_correct: false }
      ],
      subject: "Economics",
      difficulty_score: 6
    },
    {
      question_text: "What is the integral of 1/x?",
      options: [
        { text: "x²/2", is_correct: false },
        { text: "ln|x| + C", is_correct: true },
        { text: "1/x²", is_correct: false },
        { text: "x + C", is_correct: false }
      ],
      subject: "Calculus",
      difficulty_score: 8
    },
    {
      question_text: "Which programming paradigm does Haskell primarily follow?",
      options: [
        { text: "Object-Oriented", is_correct: false },
        { text: "Procedural", is_correct: false },
        { text: "Functional", is_correct: true },
        { text: "Declarative", is_correct: false }
      ],
      subject: "Computer Science",
      difficulty_score: 7
    },
    {
      question_text: "What is the pH of pure water at 25°C?",
      options: [
        { text: "6", is_correct: false },
        { text: "7", is_correct: true },
        { text: "8", is_correct: false },
        { text: "14", is_correct: false }
      ],
      subject: "Chemistry",
      difficulty_score: 6
    },
    {
      question_text: "Which philosopher wrote 'Thus Spoke Zarathustra'?",
      options: [
        { text: "Immanuel Kant", is_correct: false },
        { text: "Friedrich Nietzsche", is_correct: true },
        { text: "Jean-Paul Sartre", is_correct: false },
        { text: "Søren Kierkegaard", is_correct: false }
      ],
      subject: "Philosophy",
      difficulty_score: 8
    },
    {
      question_text: "What is the solution to the equation x² - 5x + 6 = 0?",
      options: [
        { text: "x = 1, 6", is_correct: false },
        { text: "x = 2, 3", is_correct: true },
        { text: "x = -2, -3", is_correct: false },
        { text: "x = 5, 6", is_correct: false }
      ],
      subject: "Algebra",
      difficulty_score: 7
    },
    {
      question_text: "Which organelle is known as the 'powerhouse of the cell'?",
      options: [
        { text: "Nucleus", is_correct: false },
        { text: "Ribosome", is_correct: false },
        { text: "Mitochondria", is_correct: true },
        { text: "Endoplasmic Reticulum", is_correct: false }
      ],
      subject: "Cell Biology",
      difficulty_score: 6
    },
    {
      question_text: "What is the Big O notation for merge sort?",
      options: [
        { text: "O(n)", is_correct: false },
        { text: "O(n log n)", is_correct: true },
        { text: "O(n²)", is_correct: false },
        { text: "O(2ⁿ)", is_correct: false }
      ],
      subject: "Computer Science",
      difficulty_score: 8
    },
    {
      question_text: "Which hormone regulates blood sugar levels?",
      options: [
        { text: "Adrenaline", is_correct: false },
        { text: "Insulin", is_correct: true },
        { text: "Cortisol", is_correct: false },
        { text: "Thyroxine", is_correct: false }
      ],
      subject: "Endocrinology",
      difficulty_score: 7
    },
    {
      question_text: "What is the limit of (sin x)/x as x approaches 0?",
      options: [
        { text: "0", is_correct: false },
        { text: "1", is_correct: true },
        { text: "∞", is_correct: false },
        { text: "undefined", is_correct: false }
      ],
      subject: "Calculus",
      difficulty_score: 8
    },
    {
      question_text: "Which design pattern ensures a class has only one instance?",
      options: [
        { text: "Factory", is_correct: false },
        { text: "Observer", is_correct: false },
        { text: "Singleton", is_correct: true },
        { text: "Strategy", is_correct: false }
      ],
      subject: "Software Engineering",
      difficulty_score: 7
    },
    {
      question_text: "What is the electron configuration of Carbon?",
      options: [
        { text: "1s² 2s² 2p⁶", is_correct: false },
        { text: "1s² 2s² 2p²", is_correct: true },
        { text: "1s² 2s² 2p⁴", is_correct: false },
        { text: "1s² 2s⁴", is_correct: false }
      ],
      subject: "Chemistry",
      difficulty_score: 7
    },
    {
      question_text: "Which statistical measure is most affected by outliers?",
      options: [
        { text: "Median", is_correct: false },
        { text: "Mode", is_correct: false },
        { text: "Mean", is_correct: true },
        { text: "Range", is_correct: false }
      ],
      subject: "Statistics",
      difficulty_score: 6
    },
    {
      question_text: "What is the name of the process by which DNA is copied?",
      options: [
        { text: "Translation", is_correct: false },
        { text: "Transcription", is_correct: false },
        { text: "Replication", is_correct: true },
        { text: "Transformation", is_correct: false }
      ],
      subject: "Molecular Biology",
      difficulty_score: 7
    },
    {
      question_text: "Which sorting algorithm has the best average-case time complexity?",
      options: [
        { text: "Bubble Sort", is_correct: false },
        { text: "Quick Sort", is_correct: true },
        { text: "Selection Sort", is_correct: false },
        { text: "Insertion Sort", is_correct: false }
      ],
      subject: "Computer Science",
      difficulty_score: 8
    },
    {
      question_text: "What is the standard form of a quadratic equation?",
      options: [
        { text: "y = mx + b", is_correct: false },
        { text: "ax² + bx + c = 0", is_correct: true },
        { text: "y = ax² + b", is_correct: false },
        { text: "x² + y² = r²", is_correct: false }
      ],
      subject: "Algebra",
      difficulty_score: 6
    },
    {
      question_text: "Which principle states that energy cannot be created or destroyed?",
      options: [
        { text: "First Law of Thermodynamics", is_correct: true },
        { text: "Second Law of Thermodynamics", is_correct: false },
        { text: "Newton's First Law", is_correct: false },
        { text: "Law of Conservation of Momentum", is_correct: false }
      ],
      subject: "Physics",
      difficulty_score: 7
    },
    {
      question_text: "What is the space complexity of depth-first search?",
      options: [
        { text: "O(1)", is_correct: false },
        { text: "O(V)", is_correct: true },
        { text: "O(V + E)", is_correct: false },
        { text: "O(V²)", is_correct: false }
      ],
      subject: "Computer Science",
      difficulty_score: 8
    },
    {
      question_text: "Which neurotransmitter is associated with Parkinson's disease?",
      options: [
        { text: "Serotonin", is_correct: false },
        { text: "Dopamine", is_correct: true },
        { text: "Acetylcholine", is_correct: false },
        { text: "GABA", is_correct: false }
      ],
      subject: "Neuroscience",
      difficulty_score: 8
    },
    {
      question_text: "What is the determinant of a 2x2 matrix [[a,b],[c,d]]?",
      options: [
        { text: "a + d - b - c", is_correct: false },
        { text: "ad - bc", is_correct: true },
        { text: "ac - bd", is_correct: false },
        { text: "ab - cd", is_correct: false }
      ],
      subject: "Linear Algebra",
      difficulty_score: 7
    },
    {
      question_text: "Which database concept ensures that a transaction is treated as a single unit?",
      options: [
        { text: "Consistency", is_correct: false },
        { text: "Isolation", is_correct: false },
        { text: "Durability", is_correct: false },
        { text: "Atomicity", is_correct: true }
      ],
      subject: "Database Systems",
      difficulty_score: 7
    },
    {
      question_text: "What is the hybridization of carbon in methane (CH4)?",
      options: [
        { text: "sp", is_correct: false },
        { text: "sp²", is_correct: false },
        { text: "sp³", is_correct: true },
        { text: "sp³d", is_correct: false }
      ],
      subject: "Organic Chemistry",
      difficulty_score: 8
    },
    {
      question_text: "Which machine learning algorithm is used for clustering?",
      options: [
        { text: "Linear Regression", is_correct: false },
        { text: "Decision Trees", is_correct: false },
        { text: "K-Means", is_correct: true },
        { text: "Naive Bayes", is_correct: false }
      ],
      subject: "Machine Learning",
      difficulty_score: 7
    },
    {
      question_text: "What is the Heisenberg Uncertainty Principle related to?",
      options: [
        { text: "Position and momentum cannot be precisely measured simultaneously", is_correct: true },
        { text: "Energy conservation in quantum systems", is_correct: false },
        { text: "Wave-particle duality", is_correct: false },
        { text: "Quantum entanglement", is_correct: false }
      ],
      subject: "Quantum Physics",
      difficulty_score: 9
    }
  ]
};

export const seedQuestions = async () => {
  try {
    // Clear existing questions
    await Question.deleteMany({});
    console.log('Cleared existing questions');

    // Insert beginner questions
    const beginnerQuestions = questionData.beginner.map(q => ({ ...q, level: 'beginner' }));
    await Question.insertMany(beginnerQuestions);
    console.log(`Inserted ${beginnerQuestions.length} beginner questions`);

    // Insert intermediate questions
    const intermediateQuestions = questionData.intermediate.map(q => ({ ...q, level: 'intermediate' }));
    await Question.insertMany(intermediateQuestions);
    console.log(`Inserted ${intermediateQuestions.length} intermediate questions`);

    // Insert advanced questions
    const advancedQuestions = questionData.advanced.map(q => ({ ...q, level: 'advanced' }));
    await Question.insertMany(advancedQuestions);
    console.log(`Inserted ${advancedQuestions.length} advanced questions`);

    console.log('Successfully seeded all questions!');
    return { success: true, message: 'Questions seeded successfully' };
  } catch (error) {
    console.error('Error seeding questions:', error);
    throw error;
  }
};