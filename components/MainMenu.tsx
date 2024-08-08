import { AuthStoreContext } from "@/contexts/AuthContext";
import { logoutService } from "@/services/auth-service";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { Drawer } from "react-native-paper";

export default function MainMenu(props: any) {
  const [active, setActive] = useState("");
  const { profile } = useContext(AuthStoreContext);
  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground
          source={{ uri: "https://picsum.photos/seed/100/100" }}
          style={{
            height: 180,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
          contentFit="fill"
        >
          <Text style={{ color: "white" }}>กรมสุขภาพจิต</Text>
          <Text style={{ color: "white" }}>{profile.name}</Text>
          <Text style={{ color: "white" }}>{profile.id}</Text>
          <Text style={{ color: "white" }}>{profile.email}</Text>
        </ImageBackground>
        <Drawer.Section title="เมนูหลัก">
          <Drawer.Item
            icon="home"
            label="หน้าหลัก"
            active={active === "หน้าหลัก"}
            onPress={() => {
              setActive("หน้าหลัก");
              props.navigation.navigate("(tabs)");
            }}
          />
          <Drawer.Item
            icon="star"
            label="หลักสูตรอบรม"
            active={active === "หลักสูตรอบรม"}
            onPress={() => {
              setActive("หลักสูตรอบรม");
              props.navigation.navigate("(course)");
            }}
          />
          <Drawer.Item
            icon="star"
            label="รายงานโควิด"
            active={active === "รายงานโควิด"}
            onPress={() => {
              setActive("รายงานโควิด");
              props.navigation.navigate("(covid)");
            }}
          />
        </Drawer.Section>
        <Drawer.Section title="ระบบ">
          <Drawer.Item
            icon="logout"
            label="ออกจากระบบ"
            active={active === "ออกจากระบบ"}
            onPress={async () => {
              await logoutService();
              router.replace("/login");
            }}
          />
        </Drawer.Section>
      </ScrollView>
    </SafeAreaView>
  );
}
