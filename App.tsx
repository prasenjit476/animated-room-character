import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Alert, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import CameraView from './src/components/CameraView';

export default function App() {
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
      setIsLoading(false);

      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Camera permission is required to use this app',
          [{ text: 'OK' }]
        );
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!cameraPermission) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <View style={styles.errorText}>
            Camera permission not granted
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
  },
});
