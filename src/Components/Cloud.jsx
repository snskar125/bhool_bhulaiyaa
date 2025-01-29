import { Image, useImage } from "@shopify/react-native-skia";
import Constants, { windowSize } from "../Constants";

export default function Cloud() {
  const cloud = useImage(require("../Assets/Cloud.png"));
  return (
    <Image
      width={Constants.cloudWidth}
      height={Constants.cloudHeight}
      y={Constants.cloudY}
      x={(windowSize.ww - Constants.cloudWidth) / 2}
      image={cloud}
      fit={"cover"}
    />
  );
}
