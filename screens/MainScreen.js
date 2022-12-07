import React, { Component } from "react";
import {
  NativeBaseProvider,
  Box,
  Image,
  VStack,
  HStack,
  FlatList,
  Text,
  Pressable,
  Thumbnail,
  Icon,
} from "native-base";
import currencyFormat from "../utils/commen";
export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
    };
  }

  async componentDidMount() {
    await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=try&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((response) => response.json())
      .then((response) => this.setState({ coins: response }));
  }
  render() {
    return (
      <FlatList
        data={this.state.coins}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            width="100%"
            borderColor="black"
            rounded="xl"
            m="0.5"
          >
            <Box>
              <Pressable
                onPress={() => {
                  this.props.navigation.navigate("Details", {
                    coin: item,
                    name: item.name,
                  });
                }}
                rounded="8"
                overflow="hidden"
                borderWidth="1"
                borderColor="coolGray.300"
                maxW="96"
                shadow="3"
                bg="coolGray.100"
                p="5"
              >
                <HStack
                  padding="1"
                  space={[3, 2]}
                  justifyContent="space-between"
                >
                  <HStack>
                    <Image
                      size="12"
                      source={{ uri: item.image }}
                      alt={item.name}
                    />

                    <VStack pl="3">
                      <Text>{item.name}</Text>
                      <Text>{currencyFormat(item.current_price)}₺ </Text>
                    </VStack>
                  </HStack>
                  <HStack
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color:
                          item.price_change_percentage_24h >= 0
                            ? "green"
                            : "red",

                        paddingEnd: 12,
                      }}
                    >
                      {item.price_change_percentage_24h}%
                    </Text>
                    <Image
                      source={require("../assets/info.png")}
                      style={{ width: 16, height: 16, marginLeft: 5 }}
                      alt="info"
                    />
                  </HStack>
                </HStack>
              </Pressable>
            </Box>
          </Box>
        )}
      />
    );
  }
}
