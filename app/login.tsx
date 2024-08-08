import { AuthStoreContext } from "@/contexts/AuthContext";
import { getProfileService, loginService } from "@/services/auth-service";
import { router, useNavigation } from "expo-router";
import { useContext } from "react";
import { Alert, View, Text } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup.object().shape({
  email: yup
    .string()
    .required("อีเมล์ห้ามว่าง")
    .email("รูปแบบอีเมล์ไม่ถูกต้อง"),
  password: yup
    .string()
    .required("รหัสผ่านห้ามว่าง")
    .min(3, "รหัสผ่านต้อง 3 ตัวอักษรขึ้นไป"),
});

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const { updateProfile } = useContext(AuthStoreContext);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmit = async (data: any) => {
    try {
      await loginService(data.email, data.password);
      const res = await getProfileService();
      if (res?.data.data.user) {
        //console.log(JSON.stringify(res?.data.data.user));
        await updateProfile(res?.data.data.user);
        router.replace("/(tabs)");
      }
    } catch (error: any) {
      if (error.response.data.message) {
        Alert.alert(error.response.data.message);
        console.log(error)
      } else {
        Alert.alert(JSON.stringify(error));
        console.log(error)
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              keyboardType="email-address"
              mode="outlined"
              label="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={error ? true : false}
            />
            {error && (
              <HelperText type="error" visible={error ? true : false}>
                {error?.message}
              </HelperText>
            )}
          </>
        )}
        name="email"
      />

      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              style={{ margin: 0 }}
              keyboardType="number-pad"
              secureTextEntry={true}
              mode="outlined"
              label="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={error ? true : false}
            />
            {error && (
              <HelperText type="error" visible={error ? true : false}>
                {error?.message}
              </HelperText>
            )}
          </>
        )}
        name="password"
      />

      <Button
        icon="login"
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={{ marginTop: 20, backgroundColor: "green" }}
        disabled={isSubmitting}
      >
        Log In
      </Button>
    </View>
  );
}
