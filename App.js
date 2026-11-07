
import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  NavigationContainer
} from "@react-navigation/native";

import {
  createNativeStackNavigator
} from "@react-navigation/native-stack";

import { lessons } from "./src/data/lessons";

// Shared application data
const AppContext = createContext();

const useApp = () => useContext(AppContext);

const Stack = createNativeStackNavigator();

const categories = [
  "All",
  "Camera Basics",
  "Composition",
  "Photography Styles",
  "Lighting"
];

// Reusable button
function MenuButton({ title, onPress }) {
  return (
    <TouchableOpacity
      style={styles.menuButton}
      onPress={onPress}
    >
      <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
  );
}

// Reusable lesson card
function LessonCard({ item, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>

      <Text style={styles.category}>
        {item.category} • {item.level}
      </Text>

      <Text style={styles.description}>
        {item.summary}
      </Text>

      <Text style={styles.readMore}>
        View Lesson →
      </Text>
    </TouchableOpacity>
  );
}

// SCREEN 1 - HOME
function HomeScreen({ navigation }) {
  const { completed } = useApp();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>ShutterMate 📸</Text>

      <Text style={styles.subtitle}>
        Capture. Learn. Create.
      </Text>

      <View style={styles.hero}>
        <Text style={styles.heroTitle}>
          Learn Photography
        </Text>

        <Text style={styles.heroText}>
          Improve your photography skills
          step by step.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Your Learning Progress
      </Text>

      <Text style={styles.progressText}>
        Completed Lessons: {completed.length}
        / {lessons.length}
      </Text>

      <Text style={styles.sectionTitle}>
        Explore ShutterMate
      </Text>

      <MenuButton
        title="Learn Photography"
        onPress={() => navigation.navigate("Lessons")}
      />

      <MenuButton
        title="My Favorites"
        onPress={() => navigation.navigate("Favorites")}
      />

      <MenuButton
        title="My Progress"
        onPress={() => navigation.navigate("Progress")}
      />
    </ScrollView>
  );
}

// SCREEN 2 - LESSON LIST
function LessonsScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredLessons = lessons.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.summary.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search photography lessons..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filter}
      >
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.filterButton,
              category === cat && styles.activeFilter
            ]}
            onPress={() => setCategory(cat)}
          >
            <Text style={styles.filterText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredLessons}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <LessonCard
            item={item}
            onPress={() =>
              navigation.navigate("Details", {
                lessonId: item.id
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No lessons found.
          </Text>
        }
      />
    </View>
  );
}

// SCREEN 3 - LESSON DETAILS
function DetailsScreen({ route }) {
  const { favorites, toggleFavorite, completed, markCompleted } =
    useApp();

  const lesson = lessons.find(
    item => item.id === route.params.lessonId
  );

  if (!lesson) {
    return <Text>Lesson not found.</Text>;
  }

  const isFavorite = favorites.includes(lesson.id);
  const isCompleted = completed.includes(lesson.id);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>{lesson.title}</Text>

      <Text style={styles.category}>
        {lesson.category} • {lesson.level}
      </Text>

      <Text style={styles.sectionTitle}>
        About This Lesson
      </Text>

      <Text style={styles.description}>
        {lesson.description}
      </Text>

      <Text style={styles.sectionTitle}>
        Recommended Camera Settings
      </Text>

      {lesson.settings.map((setting, index) => (
        <Text key={index} style={styles.setting}>
          • {setting}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>
        Photography Tip 💡
      </Text>

      <Text style={styles.description}>
        {lesson.tip}
      </Text>

      <MenuButton
        title={isFavorite ? "Remove Favorite ★" : "Add to Favorites ☆"}
        onPress={() => toggleFavorite(lesson.id)}
      />

      <MenuButton
        title={isCompleted ? "Completed ✓" : "Mark as Completed"}
        onPress={() => markCompleted(lesson.id)}
      />
    </ScrollView>
  );
}

// SCREEN 4 - FAVORITES
function FavoritesScreen({ navigation }) {
  const { favorites } = useApp();

  const favoriteLessons = lessons.filter(item =>
    favorites.includes(item.id)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Favorites ★</Text>

      <FlatList
        data={favoriteLessons}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <LessonCard
            item={item}
            onPress={() =>
              navigation.navigate("Details", {
                lessonId: item.id
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            You haven't saved any lessons yet.
          </Text>
        }
      />
    </View>
  );
}

// SCREEN 5 - PROGRESS
function ProgressScreen() {
  const { completed } = useApp();

  const percentage = Math.round(
    (completed.length / lessons.length) * 100
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>My Progress 📊</Text>

      <View style={styles.hero}>
        <Text style={styles.heroTitle}>
          {percentage}% Completed
        </Text>

        <Text style={styles.heroText}>
          Keep learning and improving!
        </Text>
      </View>

      <Text style={styles.progressText}>
        Total Lessons: {lessons.length}
      </Text>

      <Text style={styles.progressText}>
        Completed: {completed.length}
      </Text>

      <Text style={styles.progressText}>
        Remaining: {lessons.length - completed.length}
      </Text>
    </ScrollView>
  );
}

// MAIN APPLICATION
export default function App() {
  const [favorites, setFavorites] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load locally saved data
  useEffect(() => {
    async function loadData() {
      try {
        const savedFavorites =
          await AsyncStorage.getItem("favorites");

        const savedCompleted =
          await AsyncStorage.getItem("completed");

        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }

        if (savedCompleted) {
          setCompleted(JSON.parse(savedCompleted));
        }
      } catch (error) {
        Alert.alert("Error", "Could not load saved data.");
      } finally {
        setLoaded(true);
      }
    }

    loadData();
  }, []);

  // Save data locally whenever it changes
  useEffect(() => {
    if (!loaded) return;

    AsyncStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );

    AsyncStorage.setItem(
      "completed",
      JSON.stringify(completed)
    );
  }, [favorites, completed, loaded]);

  const toggleFavorite = id => {
    setFavorites(current =>
      current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id]
    );
  };

  const markCompleted = id => {
    setCompleted(current =>
      current.includes(id)
        ? current
        : [...current, id]
    );
  };

  if (!loaded) {
    return (
      <View style={styles.container}>
        <Text>Loading ShutterMate...</Text>
      </View>
    );
  }

  return (
    <AppContext.Provider
      value={{
        favorites,
        completed,
        toggleFavorite,
        markCompleted
      }}
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#171717" },
            headerTintColor: "#FFFFFF",
            contentStyle: { backgroundColor: "#101010" }
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "ShutterMate" }}
          />

          <Stack.Screen
            name="Lessons"
            component={LessonsScreen}
            options={{ title: "Learn Photography" }}
          />

          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ title: "Lesson Details" }}
          />

          <Stack.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{ title: "My Favorites" }}
          />

          <Stack.Screen
            name="Progress"
            component={ProgressScreen}
            options={{ title: "My Progress" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

// APPLICATION STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
    padding: 16
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 8
  },

  subtitle: {
    color: "#D6A84B",
    fontSize: 17,
    marginBottom: 20
  },

  hero: {
    backgroundColor: "#242424",
    padding: 22,
    borderRadius: 14,
    marginVertical: 15
  },

  heroTitle: {
    color: "#D6A84B",
    fontSize: 23,
    fontWeight: "bold"
  },

  heroText: {
    color: "#FFFFFF",
    marginTop: 10,
    fontSize: 15
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 22,
    marginBottom: 12
  },

  progressText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginVertical: 8
  },

  menuButton: {
    backgroundColor: "#D6A84B",
    padding: 15,
    borderRadius: 10,
    marginVertical: 7
  },

  menuText: {
    color: "#171717",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15
  },

  card: {
    backgroundColor: "#242424",
    padding: 17,
    borderRadius: 12,
    marginVertical: 8
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold"
  },

  category: {
    color: "#D6A84B",
    marginVertical: 7
  },

  description: {
    color: "#CCCCCC",
    fontSize: 15,
    lineHeight: 23,
    marginVertical: 8
  },

  readMore: {
    color: "#D6A84B",
    marginTop: 10,
    fontWeight: "bold"
  },

  search: {
    backgroundColor: "#242424",
    color: "#FFFFFF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12
  },

  filter: {
    maxHeight: 48,
    marginBottom: 10
  },

  filterButton: {
    backgroundColor: "#333333",
    padding: 11,
    borderRadius: 20,
    marginRight: 8
  },

  activeFilter: {
    backgroundColor: "#D6A84B"
  },

  filterText: {
    color: "#FFFFFF",
    fontSize: 12
  },

  setting: {
    color: "#CCCCCC",
    fontSize: 15,
    marginVertical: 5
  },

  empty: {
    color: "#CCCCCC",
    textAlign: "center",
    marginTop: 30
  }
});
