import { getCovidService } from "@/services/covid-service";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Card, Chip, Text, ActivityIndicator } from "react-native-paper";

export default function CovidScreen() {
  const navigation = useNavigation();
  const { data, isPending, error, refetch, isRefetching } = useQuery<
    any[],
    AxiosError<any, any>
  >({
    queryKey: ["covidData"],
    queryFn: async () => {
      const res = await getCovidService();
      return res.data;
    },
  });

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Ionicons.Button
          name="menu"
          size={30}
          color="white"
          backgroundColor="orange"
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
        />
      ),
    });
  }, [navigation]);

  if (isPending || isRefetching) {
    return <ActivityIndicator animating={true} style={{ marginTop: 50 }} />;
  }

  if (error) {
    return (
      <Text style={{ marginTop: 50, color: "red" }}>
        Failed to load data: {error.message}
      </Text>
    );
  }

  return (
    <FlashList
      data={data}
      estimatedItemSize={50}
      renderItem={({ item }) => (
        <Card style={{ margin: 10 }}>
          <Card.Content>
            <Text variant="headlineMedium">{`Week ${item.weeknum} of ${item.year}`}</Text>
            <Text variant="bodyLarge">{`New Cases: ${item.new_case}`}</Text>
            <Text variant="bodyLarge">{`New Deaths: ${item.new_death}`}</Text>
            <Text variant="bodyLarge">{`Total Cases: ${item.total_case}`}</Text>
            <Text variant="bodyLarge">{`Total Deaths: ${item.total_death}`}</Text>
          </Card.Content>
          <Card.Actions>
            <Chip icon="calendar">{`Year: ${item.year}`}</Chip>
            <Chip icon="information">{`Week: ${item.weeknum}`}</Chip>
          </Card.Actions>
        </Card>
      )}
    />
  );
}
