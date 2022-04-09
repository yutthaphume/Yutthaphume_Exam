import React from 'react';

import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

const HamburgerIcon = (props) => {

  const toggleDrawer = () => {

    props.navigationProps.toggleDrawer();

  }
  return (

    <View style={{ flexDirection: 'row' }}>

      <TouchableOpacity onPress={toggleDrawer} >

        <Image
          source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png' }}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />

      </TouchableOpacity>

    </View>

  );
}

const CustomSidebar = (props) => {
  const { state, descriptors, navigation } = props;
  let lastGroupName = '';
  let newGroup = true;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {state.routes.map((route) => {
          const {
            drawerLabel,
            activeTintColor,
            groupName
          } = descriptors[route.key].options;
          if (lastGroupName !== groupName) {
            newGroup = true;
            lastGroupName = groupName;
          } else newGroup = false;
          return (
            <>
              {newGroup ? (
                <View style={styles.sectionView}>
                  <Text key={groupName} style={{ marginLeft: 10 }}>
                    {groupName}
                  </Text>
                  <View style={styles.separatorLine} />
                </View>
              ) : null}
              <DrawerItem
                key={route.key}
                label={
                  ({ color }) =>
                    <Text style={{ color }}>
                      {drawerLabel}
                    </Text>
                }
                focused={
                  state.routes.findIndex(
                    (e) => e.name === route.name
                  ) === state.index
                }
                activeTintColor={activeTintColor}
                onPress={() => navigation.navigate(route.name)}
              />
            </>
          );
        })}
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const HomeScreen = () => {
  return (
    <SafeAreaView flex={1}>

      <View style={styles.MainContainer}>

        <Text style={{ fontSize: 25, color: 'black' }}> Home Screen </Text>

      </View>

    </SafeAreaView>
  );
};


const SecondScreen = () => {
  return (
    <SafeAreaView flex={1}>

      <View style={styles.MainContainer}>

        <Text style={{ fontSize: 25, color: 'black' }}> Second Screen </Text>

      </View>

    </SafeAreaView>
  );
};

const ThirdScreen = () => {
  return (
    <SafeAreaView flex={1}>

      <View style={styles.MainContainer}>

        <Text style={{ fontSize: 25, color: 'black' }}> Third Screen </Text>

      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  sectionView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  separatorLine: {
    flex: 1,
    backgroundColor: 'black',
    height: 1.2,
    marginLeft: 12,
    marginRight: 24,
  },

});


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home Screen',
          headerLeft: () => (<HamburgerIcon navigationProps={navigation} />),
          headerStyle: {
            backgroundColor: '#FF9800',
          },
          headerTintColor: '#fff',
        }}
      />
      
    </Stack.Navigator>
  );
}

function SecondStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <HamburgerIcon navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#FF9800',
        },
        headerTintColor: '#fff',
      }}>

      <Stack.Screen
        name="SecondScreen"
        component={SecondScreen}
        options={{
          title: 'Second Screen',
        }}
      />

    </Stack.Navigator>
  );
}

function ThirdStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <HamburgerIcon navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#FF9800',
        },
        headerTintColor: '#fff',
      }}>

      <Stack.Screen
        name="ThirdScreen"
        component={ThirdScreen}
        options={{
          title: 'Third Screen',
        }}
      />

    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomSidebar {...props} />}>
        <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: 'Open Home Screen',
            groupName: 'Category 1',
            activeTintColor: '#FF6F00',
          }}
          component={HomeStack}
        />

        <Drawer.Screen
          name="Second"
          options={{
            drawerLabel: 'Open Second Screen',
            groupName: 'Category 1',
            activeTintColor: '#FF6F00',
          }}
          component={SecondStack}
        />

        <Drawer.Screen
          name="Third"
          options={{
            drawerLabel: 'Open Third Screen',
            groupName: 'Category 2',
            activeTintColor: '#FF6F00',
          }}
          component={ThirdStack}
        />


      </Drawer.Navigator>
    </NavigationContainer>
  );
}