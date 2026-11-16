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


## Installation and Setup

### Requirements
- Node.js
- Visual Studio Code
- Expo Go

### How to Run ShutterMate

1. Clone the GitHub repository.
2. Open the project folder in VS Code.
3. Open the terminal.
4. Install dependencies using `npm install`.
5. Start the application using `npx expo start`.
6. Scan the QR code using Expo Go.

ShutterMate is an offline photography learning application built with React Native and Expo.


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

## Application Screens

ShutterMate includes nine screens:

1. Home Screen - Main dashboard and navigation.
2. Lessons Screen - Displays photography lessons.
3. Lesson Details Screen - Shows detailed lesson content.
4. Favorites Screen - Displays saved favorite lessons.
5. Progress Screen - Tracks completed photography lessons.
6. Camera Settings Guide - Explains camera settings.
7. Photography Tips Screen - Provides photography tips.
8. Quiz Screen - Tests photography knowledge.
9. Quiz History Screen - Displays previous quiz results.


## Offline Data Storage

ShutterMate is designed to teach photography without relying on an online database.
Photography lessons, camera guides, tips, and quiz questions are stored locally within the project.
AsyncStorage is used to save user-specific information such as favorites, completed lessons, and quiz history.


## Favorites Feature

Users can save photography lessons as favorites.
The Favorites screen provides quick access to saved lessons.
Favorite selections are stored locally using AsyncStorage, allowing users to retain their selections between app sessions.
  
  
## Learning Progress

ShutterMate allows users to mark photography lessons as completed.
The Progress screen helps users monitor their learning journey.
Completed lesson information is stored locally using AsyncStorage.
  

## Developer

Individual React Native coursework project.

## Repository

https://github.com/hansitha2001/ShutterMate
