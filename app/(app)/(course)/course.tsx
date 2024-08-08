import { getCourseService } from "@/services/course-service";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useEffect } from "react";
import { View } from "react-native";
import {
  Text,
  ActivityIndicator,
  Card,
  MD3Colors,
  Chip,
} from "react-native-paper";

export default function CourseScreen() {
  const navigation = useNavigation();
  const { data, isPending, error, refetch, isRefetching } = useQuery<
    any,
    AxiosError<any, any>
  >({
    queryKey: ["courseData"],
    queryFn: async () => {
      const res = await getCourseService();
      return res.data.data;
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

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  if (isPending) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if (isRefetching) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Card>
          <Card.Content>
            <Text style={{ color: MD3Colors.error70 }}>{error.message}</Text>
            {error && <Text>ไม่สามารถดึงข้อมูลได้</Text>}
            <Text>
              Error จาก Server: {JSON.stringify(error.response?.data)}
            </Text>
            <Text>Error จาก Server: {error.response?.data?.message}</Text>
          </Card.Content>
        </Card>
      </View>
    );
  }

  return (
    <>
      <FlashList
        data={data}
        estimatedItemSize={50}
        renderItem={({ item }: any) => {
          return (
            <Card style={{ margin: 10 }}>
              <Card.Content>
                <Card.Cover source={{ uri: item.picture }} />
                <Text variant="titleLarge">{item.title}</Text>
                <Text variant="bodyMedium">{item.detail}</Text>
              </Card.Content>
              <Card.Actions>
                <Chip icon="calendar">{item.date}</Chip>
                <Chip icon="eye">{item.view}</Chip>
                <Chip icon="star">{item.id}</Chip>
              </Card.Actions>
            </Card>
          );
        }}
      />
    </>
  );
}
