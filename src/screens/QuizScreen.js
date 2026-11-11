
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { quizQuestions } from "../data/quiz";

export default function QuizScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = quizQuestions[currentIndex];

  const saveResult = async (finalScore) => {
    try {
      const saved = await AsyncStorage.getItem("quizHistory");
      const history = saved ? JSON.parse(saved) : [];

      history.push({
        id: Date.now().toString(),
        score: finalScore,
        total: quizQuestions.length,
        date: new Date().toISOString()
      });

      await AsyncStorage.setItem(
        "quizHistory",
        JSON.stringify(history)
      );
    } catch (error) {
      Alert.alert("Error", "Unable to save quiz result.");
    }
  };

  const handleNext = async () => {
    if (selectedAnswer === null) {
      Alert.alert("Select an Answer", "Please select an answer.");
      return;
    }

    const correct = selectedAnswer === question.correctAnswer;
    const newScore = score + (correct ? 1 : 0);

    setScore(newScore);

    if (currentIndex === quizQuestions.length - 1) {
      await saveResult(newScore);
      setFinished(true);
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Quiz Completed! 🎉</Text>

        <Text style={styles.result}>
          {score} / {quizQuestions.length}
        </Text>

        <Text style={styles.description}>
          Your quiz result has been saved.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={restartQuiz}
        >
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Photography Quiz</Text>

      <Text style={styles.progress}>
        Question {currentIndex + 1} of {quizQuestions.length}
      </Text>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${
                ((currentIndex + 1) / quizQuestions.length) * 100
              }%`
            }
          ]}
        />
      </View>

      <Text style={styles.question}>
        {question.question}
      </Text>

      {question.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            selectedAnswer === index && styles.selected
          ]}
          onPress={() => setSelectedAnswer(index)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>
          {currentIndex === quizQuestions.length - 1
            ? "Finish Quiz"
            : "Next Question"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
    padding: 20
  },
  heading: {
    color: "#D4AF37",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20
  },
  progress: {
    color: "#CCCCCC",
    fontSize: 16,
    marginBottom: 12
  },
  progressBar: {
    height: 10,
    backgroundColor: "#333333",
    borderRadius: 10,
    marginBottom: 25,
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#D4AF37"
  },
  question: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 25
  },
  option: {
    backgroundColor: "#252525",
    padding: 17,
    borderRadius: 12,
    marginBottom: 12
  },
  selected: {
    backgroundColor: "#80691E",
    borderWidth: 2,
    borderColor: "#D4AF37"
  },
  optionText: {
    color: "#FFFFFF",
    fontSize: 16
  },
  button: {
    backgroundColor: "#D4AF37",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20
  },
  buttonText: {
    color: "#101010",
    fontSize: 17,
    fontWeight: "bold"
  },
  result: {
    color: "#FFFFFF",
    fontSize: 45,
    fontWeight: "bold",
    marginBottom: 15
  },
  description: {
    color: "#CCCCCC",
    fontSize: 16
  }
});
