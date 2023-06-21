import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment/moment";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { decryptData } from "../encryptdecrypt";
import httpcommon from "../../httpcommon";

const Card = ({ image, title, receivedDate, expiringDate, amount }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.cardText}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.info, styles.dateText]}>
          {`Valid from - `}
          <Text style={styles.normalText}>{moment(receivedDate).format('MMM Do, YYYY')}</Text>
        </Text>
        <Text style={[styles.info, styles.dateText]}>
          {`Valid till - `}
          <Text style={styles.normalText}>{moment(expiringDate).format('MMM Do, YYYY')}</Text>
        </Text>
        <Text style={[styles.info, styles.dateText]}>
          {`Reedemable Amount - `}
          <Text style={styles.normalText}>₹ {amount}</Text>
        </Text>
      </View>
    </View>
  );
};

const NotRedeemed = ({ title }) => {
  const navigation = useNavigation();
  //const title=route.params.title;
  const lowercaseTitle = title.charAt(0).toLowerCase() + title.slice(1);
  const [data, setData] = useState([]);
  const [userToken, setUserToken] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  async function retrieveUserToken() {
    setIsLoading(true)
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token !== null) {
        //console.log('User token retrieved successfully:', token);
        setUserToken(token);
        async function fetchData() {
          let res = await httpcommon.get(
            `/beneficiary/multiple/${lowercaseTitle}/valid`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          let res2 = JSON.parse(JSON.parse(decryptData(res.data)))
          setData(res2.data)
          setIsLoading(false)
        }
        fetchData();
      }
    } catch (error) {
      console.log("Error retrieving user token:", error);
    }
  }
  useEffect(() => {
    retrieveUserToken();
    //console.log(userToken);
  }, []);



  return (<>
    {isLoading ? <View style={styles.loader}>
      <LottieView source={require('../assets/loader.json')} autoPlay loop />
    </View> : !data.length ? <View style={styles.noDataContainer}>
      <Image source={require('../assets/notfound.png')} style={styles.notfound} />
    </View> : <View style={styles.container}>
      {data.map((item, index) => (
        <TouchableOpacity
          onPress={async () => {
            let res = await httpcommon.get(
              `/beneficiary/single/${item._id}`,
              {
                headers: {
                  Authorization: `Bearer ${userToken}`
                }
              }
            )
            let res2 = JSON.parse(JSON.parse(decryptData(res.data)))
            navigation.navigate("Redeem", { paramKey: item._id, paramKey1: res2.data, paramKey2: userToken })

          }}
          style={styles.card}
          key={index}
        >
          <Card
            key={item._id}
            image={item.issuedByLogo}
            title={item.title}
            receivedDate={item.startsAt.toString().slice(0, 10)}
            expiringDate={item.endsAt.toString().slice(0, 10)}
            amount={item.useType === "single" ? item.amount : item.balanceAmount}
          />
        </TouchableOpacity>
      ))}
    </View>
    }
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
    width: screenWidth * 0.95,
    height: 100,
    borderRadius: 5,
    //marginBottom: 16,
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 20,
    marginRight: 30,
    borderRadius: 4,
  },
  cardText: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'black',
  },
  info: {
    fontSize: 12,
    margin: 3,
  },
  dateText: {
    color: '#333333',
    fontWeight: 'bold',
  },
  normalText: {
    fontWeight: 'normal',
    color: 'black',
  },
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
  },
  notfound: {
    resizeMode: 'contain',
    height: 200,
    width: 300,
  },
})

export default NotRedeemed;
