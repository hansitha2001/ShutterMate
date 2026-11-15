# ShutterMate – Offline Photography Learning

## Project Overview

ShutterMate is a React Native mobile application developed using Expo. It helps beginners learn photography through offline lessons, camera settings guides, photography tips, and quizzes.

The application is designed to work without public APIs or online databases.

## Technologies Used

- React Native
- Expo
- JavaScript
- React Navigation
- AsyncStorage
- Git and GitHub

## Main Features

1. **Home Screen** – Access the application's learning features.
2. **Photography Lessons** – Browse photography lessons stored locally.
3. **Lesson Details** – Read explanations, recommended settings, and tips.
4. **Favorites** – Save preferred lessons.
5. **Learning Progress** – Track completed lessons.
6. **Camera Settings Guide** – Learn ISO, aperture, shutter speed, and other camera controls.
7. **Photography Tips** – Explore photography techniques by category.
8. **Photography Quiz** – Test photography knowledge.
9. **Quiz History** – Review previous quiz scores.

## Offline Data Storage

Photography lessons, camera guides, tips, and quiz questions are stored in local JavaScript files.

AsyncStorage is used to save favorites, completed lessons, and quiz results on the device.

## How to Run

1. Install Node.js and Git.
2. Clone the repository:

   `git clone https://github.com/hansitha2001/ShutterMate.git`

3. Open the project folder:

   `cd ShutterMate`

4. Install dependencies:

   `npm install`

5. Start Expo:

   `npx expo start`

6. Open the app using Expo Go on a compatible mobile device.

For browser testing:

`npx expo start --web`

## Project Structure

```text
ShutterMate/
├── App.js
├── package.json
├── src/
│   ├── data/
│   │   ├── lessons.js
│   │   ├── guides.js
│   │   └── quiz.js
│   └── screens/
│       ├── QuizScreen.js
│       └── QuizHistoryScreen.js
└── README.md
```

## Developer

Individual React Native coursework project.

## Repository

https://github.com/hansitha2001/ShutterMate
