import { useEffect, useState } from "react";
import { Alert, Button, Text } from "react-native";

type AppHeaderProps = {
  title: string;
  isShow?: boolean;
};

export default function AppHeader({ title, isShow }: AppHeaderProps) {
  const [myText, setMyText] = useState("Hello world.");

  const handleClickMe = () => {
    setMyText("Hello DMH.");
  };

  useEffect(() => {
    console.log("use effects");
  }, []);

  return (
    <>
      {isShow && (
        <>
          <Text>{myText}</Text>
          <Button title="Click me !" onPress={handleClickMe} />
        </>
      )}
    </>
  );
}
