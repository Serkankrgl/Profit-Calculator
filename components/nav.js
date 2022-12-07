import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/MainScreen";
import DetailScreen from "../screens/DetailScreen";
import PreProfitScreen from "../screens/PreProfitScreen";
import SufProfitScreen from "../screens/SufProfitScreen";

function DetailsScreen(props) {
  return <DetailScreen coin={props.route.params.coin} />;
}

function HomeScreen({ navigation }) {
  return <MainScreen />;
}

function SuffProfitScreen({ navigation }) {
  return <SufProfitScreen />;
}

function PreffProfitScreen({ navigation }) {
  return <PreProfitScreen />;
}
const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Coins" component={MainScreen} />
      <HomeStack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Hesapla" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}
const Tab = createBottomTabNavigator();

export default function MyNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShadowVisible: false,
          headerShown: false,
        })}
      >
        <Tab.Screen name="Coins" component={HomeStackScreen} />
        <Tab.Screen name="Geçmiş" component={PreffProfitScreen} />
        <Tab.Screen name="Gelecek" component={SuffProfitScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
