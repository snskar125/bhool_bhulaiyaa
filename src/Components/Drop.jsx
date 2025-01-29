import { Image, useImage } from "@shopify/react-native-skia";
import Constants, { windowSize } from "../Constants";
import {
  Easing,
  runOnJS,
  useFrameCallback,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { memo, useEffect } from "react";

const Drop = memo(({ id, x, characterX, duration, onFinish, onCollide }) => {
  const drop = useImage(require("../Assets/Drop.png"));
  const y = useSharedValue(
    Constants.cloudY + Constants.cloudHeight - Constants.dropHeight
  );

  useEffect(() => {
    y.value = withTiming(
      windowSize.wh,
      {
        duration,
        easing: Easing.linear,
      },
      (finished) => {
        if (finished) runOnJS(onFinish)(id);
      }
    );
  }, []);

  useFrameCallback(() => {
    const x1 = characterX.value;
    const y1 = Constants.characterY;
    const w1 = Constants.characterWidth;
    const h1 = Constants.characterHeight;
    const x2 = x;
    const y2 = y.value;
    const w2 = Constants.dropWidth;
    const h2 = Constants.dropHeight;
    if (!(x1 + w1 <= x2 || x2 + w2 <= x1 || y1 + h1 <= y2 || y2 + h2 <= y1)) {
      runOnJS(onCollide)();
    }
  });

  return (
    <Image
      width={Constants.dropWidth}
      height={Constants.dropHeight}
      y={y}
      x={x}
      image={drop}
      fit={"contain"}
    />
  );
});

export default Drop;
