import type { LessonGuide } from './types';

/** Mobile lessons. */
export const MOBILE_GUIDES: Record<string, LessonGuide> = {
  'mobile-basics': {
    simple: "Mobile development is building apps for phones. You can build separately for iPhone and Android, or once for both with cross-platform tools.",
    uses: ["Pick the right way to build your app", "Understand what makes phone apps different from websites", "Design apps that feel natural on a phone"],
    example: {
      file: "Choosing an approach",
      code: `Native          Swift (iPhone) + Kotlin (Android)
                best performance, two codebases

Cross-platform  React Native or Flutter
                one codebase, both stores, near-native feel

Web app (PWA)   a website you can install
                easiest, limited phone features`,
      note: "Most startups pick cross-platform. If you know React, React Native is the shortest path.",
    },
    steps: [
      { t: "Native vs cross-platform", d: "Native apps use each platform’s own language. Cross-platform tools like React Native and Flutter share one codebase across iPhone and Android.", try: "Find out what 3 apps you use daily are built with." },
      { t: "The app lifecycle", d: "Apps can be opened, sent to the background, paused or killed by the phone at any time. Save important state before that happens.", try: "Open an app, switch away for 10 minutes, come back, and note whether it kept your place." },
      { t: "Screens, safe areas and gestures", d: "Phones have notches, rounded corners and home bars. Safe areas keep content visible. Users expect swipes, long-presses and pull-to-refresh.", try: "Screenshot an app on a phone with a notch and mark the safe area." },
      { t: "Permissions and privacy", d: "Camera, location and notifications need the user’s permission. Ask at the moment you need it and explain why.", try: "Note when and how 3 apps ask you for permissions." },
    ],
    project: "Sketch the screens of an app idea on paper, list which phone features it needs, and pick native or cross-platform with a reason.",
  },

  'react-native': {
    simple: "React Native lets you build real iPhone and Android apps using React and JavaScript, and Expo makes setting it up and testing on your phone easy.",
    uses: ["Build mobile apps with your React skills", "Ship to both app stores from one codebase", "Test instantly on your own phone"],
    example: {
      file: "App.tsx",
      code: `import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.screen}>
      <Text style={styles.big}>{count}</Text>
      <Pressable onPress={() => setCount(count + 1)}>
        <Text>Tap me</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", justifyContent: "center" },
  big: { fontSize: 48, fontWeight: "bold" },
});`,
      note: "Same React ideas (state, components), but View and Text replace div and p.",
    },
    steps: [
      { t: "Core components", d: "View is a box, Text shows text, Image shows images, ScrollView scrolls, and FlatList renders long lists efficiently.", try: "Build a profile screen with a photo, name and a scrollable list of posts." },
      { t: "Styling with Flexbox", d: "Styles are JavaScript objects. Layout uses Flexbox, but flexDirection defaults to column.", try: "Recreate a simple screen from an app you like." },
      { t: "Expo and Expo Go", d: "npx create-expo-app makes a project. Scan the QR code with the Expo Go app to run it on your phone instantly.", try: "Create an Expo app and open it on your phone." },
      { t: "Platform-specific code", d: "Platform.OS or .ios.tsx / .android.tsx files let you adjust for each platform when needed.", try: "Show a different greeting on iPhone and Android." },
    ],
    project: "Build a habit tracker app in Expo with a list of habits, a tap to mark done, and a daily streak counter.",
  },

  'mobile-navigation': {
    simple: "Navigation is how users move between screens in your app: stacks of screens, bottom tabs and side drawers.",
    uses: ["Build multi-screen apps", "Pass data between screens", "Open a specific screen from a link or notification"],
    example: {
      file: "app/_layout.tsx (Expo Router)",
      code: `app/
├── _layout.tsx        → tab bar
├── index.tsx          → Home tab       /
├── settings.tsx       → Settings tab   /settings
└── post/
    └── [id].tsx       → Post screen    /post/42`,
      note: "With Expo Router, each file is a screen and its path becomes a URL, just like web routing.",
    },
    steps: [
      { t: "Stacks, tabs and drawers", d: "A stack pushes screens on top of each other (with a back button). Tabs switch between main sections. Drawers slide in from the side.", try: "Build an app with 2 tabs, where one tab opens a detail screen on a stack." },
      { t: "Expo Router", d: "Files in the app/ folder become screens automatically. Layout files define tabs or stacks around them.", try: "Recreate your tab app with Expo Router files." },
      { t: "Passing params", d: "Pass small values like an id between screens through the route (/post/42), then load the data on the new screen.", try: "Tap a list item to open its detail screen with the right id." },
      { t: "Deep links", d: "Deep links open a specific screen from a URL, email or notification.", try: "Open your app directly on a detail screen using a deep link." },
    ],
    project: "Build a recipes app with tabs (Browse, Saved), a recipe detail screen, and deep links to recipes.",
  },

  'mobile-data': {
    simple: "Mobile apps fetch data from servers and also save data on the phone, so they stay fast and keep working without internet.",
    uses: ["Load and cache data from your API", "Store logins and settings securely", "Make apps that work offline"],
    example: {
      file: "storage.ts",
      code: `import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

// secrets (tokens) go in the encrypted store
await SecureStore.setItemAsync("token", authToken);

// non-sensitive settings go in normal storage
await AsyncStorage.setItem("theme", "dark");`,
      note: "Tokens go in encrypted storage. Simple settings go in normal key-value storage.",
    },
    steps: [
      { t: "Fetching with TanStack Query", d: "TanStack Query works in React Native too: it caches, retries and refreshes data, with loading and error states built in.", try: "Load a list from an API with useQuery and add pull-to-refresh." },
      { t: "Storing data on the phone", d: "AsyncStorage holds simple settings, SecureStore holds secrets like tokens, MMKV is a very fast alternative.", try: "Remember the user’s theme choice between app launches." },
      { t: "Local databases", d: "SQLite stores structured data on the phone, perfect for lots of records you need to search or sort.", try: "Save notes in SQLite and list them newest first." },
      { t: "Offline first", d: "Save changes locally first, show them immediately, then sync with the server when online. Handle conflicts carefully.", try: "Let users add items while in airplane mode and sync them when back online." },
    ],
    project: "Make your habit tracker work fully offline with SQLite, and sync to a backend when online.",
  },

  'native-features': {
    simple: "Device features are the things only phones can do: camera, location, notifications, vibration and fingerprint or face unlock.",
    uses: ["Take and upload photos", "Show maps and nearby places", "Send reminders with notifications"],
    example: {
      file: "pickPhoto.ts",
      code: `import * as ImagePicker from "expo-image-picker";

export async function pickPhoto() {
  const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!granted) return null;

  const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.7 });
  return result.canceled ? null : result.assets[0].uri;
}`,
      note: "Ask for permission first, then open the photo library and return the chosen image.",
    },
    steps: [
      { t: "Camera and photos", d: "Expo modules let you take photos, pick from the library and save media. Always handle the user saying no.", try: "Let users pick a profile photo and show it." },
      { t: "Location and maps", d: "Get the user’s location (with permission) and show it on a map with markers.", try: "Show the user’s location on a map with a marker." },
      { t: "Notifications", d: "Local notifications are scheduled by the app (reminders). Push notifications are sent from your server.", try: "Schedule a reminder notification 1 minute from now." },
      { t: "Haptics, biometrics and sensors", d: "Small vibrations make taps feel real. Face ID or fingerprint can protect sensitive screens.", try: "Add a light haptic when a habit is marked done." },
    ],
    project: "Add photos, a daily reminder notification and haptics to your habit tracker.",
  },

  'mobile-ui': {
    simple: "Great mobile UI follows each platform’s design rules and uses smooth animations and gestures that feel natural under your thumb.",
    uses: ["Make apps that feel polished and native", "Add swipe-to-delete and other gestures", "Keep long lists smooth"],
    example: {
      file: "FadeIn.tsx",
      code: `import Animated, { FadeInDown } from "react-native-reanimated";

export function Card({ title, index }) {
  return (
    <Animated.View entering={FadeInDown.delay(index * 80)}>
      <Text>{title}</Text>
    </Animated.View>
  );
}`,
      note: "Each card slides in a moment after the previous one. Reanimated runs animations smoothly on the UI thread.",
    },
    steps: [
      { t: "Platform design rules", d: "Apple’s Human Interface Guidelines and Google’s Material Design describe how buttons, navigation and spacing should feel on each platform.", try: "Compare the same app (e.g. Gmail) on iPhone and Android and list 3 differences." },
      { t: "Animation with Reanimated", d: "Reanimated runs animations on the UI thread, so they stay smooth even when JavaScript is busy.", try: "Animate a card scaling up when pressed." },
      { t: "Gestures", d: "Gesture Handler adds swipes, drags and pinches that feel native.", try: "Build swipe-to-delete on a list item." },
      { t: "Fast lists", d: "FlashList renders only what’s on screen, so lists with thousands of items stay smooth.", try: "Render 5,000 items with FlashList and scroll fast." },
    ],
    project: "Polish your app with entrance animations, swipe-to-delete, and a smooth 1,000-item list.",
  },

  'mobile-testing': {
    simple: "Testing and debugging mobile apps means checking screens work automatically and finding out why something is slow or broken.",
    uses: ["Ship updates without breaking features", "Find slow screens and fix them", "Test whole user flows automatically"],
    example: {
      file: "login.yaml (Maestro)",
      code: `appId: com.me.habits
---
- launchApp
- tapOn: "Email"
- inputText: "ana@example.com"
- tapOn: "Log in"
- assertVisible: "Today’s habits"`,
      note: "Maestro taps through your real app like a user and checks the right screen appears.",
    },
    steps: [
      { t: "Component tests", d: "Jest and React Native Testing Library render components and check them, just like on the web.", try: "Test that tapping a habit marks it as done." },
      { t: "End-to-end tests", d: "Maestro or Detox drive the real app on a simulator through full flows like sign-up and checkout.", try: "Write a Maestro flow that opens the app and adds a habit." },
      { t: "Profiling", d: "React DevTools and the performance monitor show slow renders and dropped frames.", try: "Profile a list screen and find the component that renders most often." },
    ],
    project: "Add component tests and two end-to-end flows to your app, and fix one performance issue you find by profiling.",
  },

  'app-store': {
    simple: "Publishing means building a release version of your app, signing it, and submitting it to the Apple App Store and Google Play for review.",
    uses: ["Get your app into real users’ hands", "Show a published app on your CV", "Ship updates to existing users"],
    example: {
      file: "Terminal",
      code: `npm install -g eas-cli
eas login
eas build --platform all
eas submit --platform ios`,
      output: `Build finished
Submitted to App Store Connect`,
      note: "EAS builds signed app files in the cloud and uploads them to the stores for you.",
    },
    steps: [
      { t: "Building and signing", d: "Store apps must be signed to prove they’re from you. EAS Build handles certificates and builds iPhone and Android files in the cloud.", try: "Run a preview build and install it on your phone." },
      { t: "The store consoles", d: "App Store Connect (Apple, $99/year) and Google Play Console ($25 once) are where you create the listing, upload builds and invite testers.", try: "Create a developer account and invite yourself as a tester." },
      { t: "Store listing", d: "You need an icon, screenshots, a description and privacy labels explaining what data you collect.", try: "Make 3 store screenshots and write a 2-sentence description." },
      { t: "Review and rejections", d: "Apple and Google review every app. Common rejections: crashes, missing privacy info, broken login for reviewers, or copying other apps.", try: "Read Apple’s App Review Guidelines summary and check your app against it." },
    ],
    project: "Publish your app to TestFlight and Google Play internal testing, and get 5 friends to try it.",
  },

  'native-intro': {
    simple: "Swift (for iPhone) and Kotlin (for Android) are the official languages for building fully native apps with each platform’s own tools.",
    uses: ["Build apps with the best performance and newest features", "Write native modules for React Native apps", "Apply for iOS or Android developer roles"],
    example: {
      file: "ContentView.swift",
      code: `import SwiftUI

struct ContentView: View {
    @State private var count = 0

    var body: some View {
        VStack(spacing: 16) {
            Text("\\(count)").font(.largeTitle)
            Button("Tap me") { count += 1 }
        }
    }
}`,
      note: "SwiftUI looks a lot like React: state, components and a view that updates when state changes.",
    },
    steps: [
      { t: "Swift and SwiftUI", d: "Swift is Apple’s modern language. SwiftUI builds screens declaratively, very similar to React components.", try: "Follow Apple’s first SwiftUI tutorial and build the landmarks screen." },
      { t: "Kotlin and Jetpack Compose", d: "Kotlin is Android’s modern language. Jetpack Compose is its declarative UI toolkit.", try: "Build a counter screen in Jetpack Compose." },
      { t: "Xcode and Android Studio", d: "Each platform has its own editor with simulators, debuggers and profilers. Xcode needs a Mac.", try: "Run a sample app on a simulator in either tool." },
    ],
    project: "Rebuild one screen of your React Native app natively in SwiftUI or Jetpack Compose and compare the experience.",
  },
};
