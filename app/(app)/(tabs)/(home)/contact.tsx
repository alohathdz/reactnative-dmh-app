import { Link, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function ContactScreen() {
  const params = useLocalSearchParams();
  return (
    <>
      <Text>Contact</Text>
      <Text>
        {params.phone} {params.address}
      </Text>
      <Link
        href={{ pathname: ".." }}
        style={{ marginTop: 10, backgroundColor: "red" }}
      >
        Back
      </Link>
    </>
  );
}
