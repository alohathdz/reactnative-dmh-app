import { Stack } from "expo-router";

export default function CovidLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "orange",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="covid" options={{ title: "รายงานโควิด" }} />
    </Stack>
  );
}
