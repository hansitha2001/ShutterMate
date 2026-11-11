
import React, { useState, useCallback } from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "@react-navigation/native";

export default function QuizHistoryScreen() {
  const [history, setHistory] = useState([]);

  const loadHistory = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem("quizHistory");
      const results = stored ? JSON.parse(stored) : [];

      setHistory([...results].reverse());
    } catch (error) {
      console.error("Failed to load quiz history:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory])
  );

  const deleteHistory = async () => {
    try {
      await AsyncStorage.removeItem("quizHistory");
      setHistory([]);
    } catch (error) {
      Alert.alert("Error", "Unable to delete quiz history.");
    }
  };

  const clearHistory = () => {
    if (Platform.OS === "web") {
      if (window.confirm("Delete all quiz history?")) {
        deleteHistory();
      }
    } else {
      Alert.alert(
        "Clear History",
        "Are you sure you want to delete all quiz results?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: deleteHistory
          }
        ]
      );
    }
  };

  const bestScore = history.length
    ? Math.max(
        ...history.map(item =>
          Math.round((item.score / item.total) * 100)
        )
      )
    : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Quiz History 🏆
      </Text>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total Attempts: {history.length}
        </Text>

        <Text style={styles.summaryText}>
          Best Score: {bestScore}%
        </Text>
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No quiz attempts yet. Complete a quiz first!
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.score}>
              Score: {item.score} / {item.total}
            </Text>

            <Text style={styles.date}>
              {new Date(item.date).toLocaleString()}
            </Text>
          </View>
        )}
      />

      {history.length > 0 && (
        <TouchableOpacity
          style={styles.button}
          onPress={clearHistory}
        >
          <Text style={styles.buttonText}>
            Clear Quiz History
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
    padding: 20
  },

  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#D4AF37",
    marginBottom: 20
  },

  summary: {
    backgroundColor: "#222222",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20
  },

  summaryText: {
    color: "#FFFFFF",
    fontSize: 17,
    marginBottom: 8
  },

  card: {
    backgroundColor: "#252525",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12
  },

  score: {
    color: "#D4AF37",
    fontSize: 19,
    fontWeight: "bold"
  },

  date: {
    color: "#CCCCCC",
    marginTop: 8
  },

  empty: {
    color: "#AAAAAA",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16
  },

  button: {
    backgroundColor: "#D4AF37",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15
  },

  buttonText: {
    color: "#101010",
    fontWeight: "bold"
  }
});
