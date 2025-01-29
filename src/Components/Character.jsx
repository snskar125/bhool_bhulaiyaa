import { Image, useImage } from "@shopify/react-native-skia";
import Constants from "../Constants";

export default function Character({ x }) {
  const character = useImage(require("../Assets/Character.png"));
  return (
    <Image
      width={Constants.characterWidth}
      height={Constants.characterHeight}
      y={Constants.characterY}
      x={x}
      image={character}
    />
  );
}
