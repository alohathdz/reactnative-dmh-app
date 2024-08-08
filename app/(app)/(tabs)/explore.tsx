import AppHeader from "@/components/AppHeader";
import AppLogo from "@/components/AppLogo";
import { HelloWave } from "@/components/HelloWave";
import { StyleSheet, Text, View } from "react-native";

type User = {
  firstname: string;
  lastname: string;
  age?: number;
};

export default function TabTwoScreen() {
  const users: Array<User> = [];
  users.push({
    firstname: "Woradon",
    lastname: "Bunkhet",
    age: 32,
  });
  users.push({
    firstname: "Woradon2",
    lastname: "Bunkhet2",
  });
  const isShow: boolean = false;
  return (
    <View style={styles.container}>
      <Text style={styles.bigText}>
        <AppHeader title="test" isShow={true} />
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  bigText: {
    color: "blue",
    fontSize: 30,
  },
});
