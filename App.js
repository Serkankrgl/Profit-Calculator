import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding from "react-native-onboarding-swiper";
import MyNavigation from "./components/nav.js";
import React from "react";
import { Image } from "react-native";
import { NativeBaseProvider, Fab } from "native-base";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      onBoarding: true,
    };
  }

  async onBoardingEnd() {
    try {
      await AsyncStorage.setItem("onBoarding", "false");
    } catch (error) {
      console.log("object :>> ", error);
    }
    this.setState({ onBoarding: false });
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem("onBoarding");
      if (value !== null) {
        this.setState({ onBoarding: false });
      } else {
        this.setState({ onBoarding: true });
      }
    } catch (e) {
      console.log(e);
      console.log("obt>>");
      // error reading value
    }
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    if (this.state.onBoarding == true) {
      return (
        <Onboarding
          onDone={() => this.onBoardingEnd()}
          pages={[
            {
              backgroundColor: "#222222",
              title: "Kayıt Gerektirmez",
              subtitle: "Üye olmadan hemen başlayın.",
              image: (
                <Image
                  source={require("./assets/bookmark.png")}
                  resizeMode="contain"
                />
              ),
            },
            {
              backgroundColor: "#222222",
              title: "Güncel Veriler",
              subtitle: "Coinlerin güncel değerlerine ulaşın.",
              image: (
                <Image
                  source={require("./assets/bookmark.png")}
                  resizeMode="contain"
                />
              ),
            },
            {
              backgroundColor: "#222222",
              title: "Geçmiş Kar Hesaplama",
              subtitle:
                "Geçmişte alım yapsaydınız ne kadar kar edebilirdiniz hesaplayın.",
              image: (
                <Image
                  source={require("./assets/bookmark.png")}
                  resizeMode="contain"
                />
              ),
            },
            {
              backgroundColor: "#222222",
              title: "Gelecek Kar Hesaplama",
              subtitle:
                "Coinlerin gelecekte ulaşabileceği değeri belirleyerek elde edeceğiniz karı hesaplayınız.",
              image: (
                <Image
                  source={require("./assets/bookmark.png")}
                  resizeMode="contain"
                />
              ),
            },
          ]}
        />
      );
    }
    return <NativeBaseProvider safeArea>{<MyNavigation />}</NativeBaseProvider>;
  }
}
