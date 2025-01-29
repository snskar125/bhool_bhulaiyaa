import { Image, useImage } from "@shopify/react-native-skia";
import Constants, { windowSize } from "../Constants";

export default function Base() {
  const ground = useImage(require("../Assets/Ground.png"));
  return (
    <Image
      width={windowSize.ww}
      height={Constants.groundHeight}
      y={windowSize.wh - Constants.groundHeight}
      x={0}
      image={ground}
      fit={"fill"}
    />
  );
}
