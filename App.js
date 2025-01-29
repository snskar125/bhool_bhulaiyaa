import { Canvas } from "@shopify/react-native-skia";
import { Alert, Platform, StyleSheet, View } from "react-native";
import {
  Extrapolation,
  interpolate,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import Constants, { windowSize } from "./src/Constants";
import Character from "./src/Components/Character";
import { useCallback, useEffect, useRef, useState } from "react";
import { Accelerometer } from "expo-sensors";
import Base from "./src/Components/Base";
import Cloud from "./src/Components/Cloud";
import Drop from "./src/Components/Drop";
import { getRandomInt } from "./src/Utils";
import KalmanFilter from "kalmanjs";

Accelerometer.setUpdateInterval(16);
const kf = new KalmanFilter({ R: 0.01, Q: 3 });

export default function App() {
  const acceleroX = useSharedValue(0);
  const [drops, setDrops] = useState([]);
  const [over, setOver] = useState(false);
  const interval = useRef(null);
  const subscription = useRef(null);

  const Start = () => {
    setOver(false);
    subscription.current = Accelerometer.addListener(({ x }) => {
      acceleroX.value = kf.filter(x.toFixed(3));
    });
    interval.current = setInterval(() => {
      const id = Math.random().toString();
      const x = getRandomInt(10, windowSize.ww - Constants.dropWidth - 10);
      setDrops((d) => [
        ...d,
        {
          id,
          x,
          duration: getRandomInt(2500, 5000),
        },
      ]);
    }, 1000);
  };

  useEffect(() => {
    Start();
    return () => {
      subscription.current.remove();
      clearInterval(interval.current);
    };
  }, []);

  const onFinish = useCallback((id) => {
    setDrops((d) => d.filter((dr) => dr.id !== id));
  }, []);

  const onCollide = useCallback(() => {
    setOver(true);
  }, []);

  const x = useDerivedValue(() =>
    interpolate(
      acceleroX.value,
      Platform.OS === "android" ? [0.5, 0, -0.5] : [-0.5, 0, 0.5],
      [
        0,
        windowSize.ww / 2 - Constants.characterWidth / 2,
        windowSize.ww - Constants.characterWidth,
      ],
      Extrapolation.CLAMP
    )
  );

  useEffect(() => {
    if (over) {
      clearInterval(interval.current);
      setDrops([]);
      subscription.current.remove();
      Alert.alert("Game Over", "Do you want to Restart ?", [
        { text: "Yes", onPress: Start },
      ]);
    }
  }, [over]);

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        <Character x={x} />
        {drops.map((d) => (
          <Drop
            key={d.id}
            id={d.id}
            x={d.x}
            characterX={x}
            duration={d.duration}
            onFinish={onFinish}
            onCollide={onCollide}
          />
        ))}
        <Cloud />
        <Base />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    flex: 1,
    backgroundColor: "#c4eeff",
  },
});
