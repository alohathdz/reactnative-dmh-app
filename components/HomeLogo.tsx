import { Image } from "react-native";

export default function HomeLogo() {
  return (
    <Image source={require("../assets/images/MOPH.png")} style={{
        width: 40,
        height: 40
    }} />
  )
}
