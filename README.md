# Animated Room Character

A mobile augmented reality (AR) application that displays an animated character in the corner of your room when you open your mobile camera.

## Features

- 📱 Real-time camera access
- 🎨 3D animated character with simple yet engaging design
- 👋 Wave animation and subtle floating motion
- 🎯 Character positioned in room corner
- 💡 Smooth rendering using Three.js
- 🚀 Built with Expo and React Native

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- A mobile device or emulator

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/prasenjit476/animated-room-character.git
   cd animated-room-character
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Running the Application

### Start the Expo development server:
```bash
npm start
# or
yarn start
```

### Run on iOS:
```bash
npm run ios
# or
yarn ios
```

### Run on Android:
```bash
npm run android
# or
yarn android
```

### Run on Web:
```bash
npm run web
# or
yarn web
```

## How to Use

1. Open the application on your mobile device
2. Grant camera permissions when prompted
3. The app will display your camera feed
4. An animated character will appear in the corner of your room
5. The character will wave and float gently

## Project Structure

```
animated-room-character/
├── App.tsx                          # Main app component
├── app.json                         # Expo configuration
├── package.json                     # Dependencies
├── src/
│   ├── components/
│   │   ├── CameraView.tsx          # Camera and GL rendering component
│   │   └── AnimatedCharacter.tsx   # 3D character creation
│   └── utils/
│       └── arHelper.ts             # AR utility functions
└── README.md
```

## Technologies Used

- **React Native** - Cross-platform mobile framework
- **Expo** - React Native development environment
- **Three.js** - 3D graphics library
- **Expo GL** - OpenGL ES context for React Native
- **Expo Camera** - Camera access for mobile devices

## Character Details

The animated character features:
- 🔴 Red body with darker shade
- 👤 Yellow skin tone
- 👀 Black eyes and smile
- 👐 Arms and legs
- 👋 Waving animation
- 🎈 Gentle floating motion

## Customization

You can customize the character by modifying `src/components/AnimatedCharacter.tsx`:

- Change colors by modifying the `MeshPhongMaterial` colors
- Adjust size using geometry parameters
- Add new animations in the mixer
- Modify position and floating height

## AR Features to Extend

Future enhancements could include:
- Multiple characters
- Touch interactions
- More complex animations
- Character customization
- Sound effects
- Gesture recognition
- Background blur/transparency

## Troubleshooting

### Camera Permission Denied
- Make sure you've granted camera permissions in your device settings
- iOS: Settings > [App Name] > Camera
- Android: Settings > Apps > [App Name] > Permissions > Camera

### Black Screen
- Ensure your device has sufficient performance
- Close other heavy applications
- Try restarting the app

### Character Not Visible
- Check that GLView is rendering properly
- Verify Three.js is installed correctly
- Check console for any errors

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues and feature requests, please open an issue on GitHub.

## Author

Created with ❤️ for mobile AR enthusiasts
