import { Dimensions } from "react-native";

const { width: ww, height: wh } = Dimensions.get("window");

export const windowSize = { ww, wh };

const characterWidth = 60;
const characterHeight = characterWidth / (335 / 500); //Character Image Size is 335 X 500
const groundHeight = 50;
const dropWidth = 30;

const Constants = {
  characterWidth,
  characterHeight,
  groundHeight,
  characterY: wh - characterHeight - groundHeight,
  cloudWidth: ww - 10,
  cloudHeight: (ww - 10) / 2,
  cloudY: wh / 12,
  dropWidth,
  dropHeight: dropWidth * 1.5,
};

export default Constants;
