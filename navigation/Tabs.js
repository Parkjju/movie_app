import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import Search from '../screens/Search';
import TV from '../screens/TV';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, YELLOW_COLOR } from '../color';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const isDark = useColorScheme() === 'dark';
    return (
        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: isDark ? BLACK_COLOR : 'white',
            }}
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: isDark ? BLACK_COLOR : 'white',
                },
                tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
                tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
                headerStyle: {
                    backgroundColor: isDark ? BLACK_COLOR : 'white',
                },
                headerTitleStyle: {
                    color: isDark ? 'white' : BLACK_COLOR,
                },
            }}
        >
            <Tab.Screen
                name='Movies'
                component={Movies}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <Ionicons name='film' color={color} size={size} />
                        );
                    },
                }}
            />
            <Tab.Screen
                name='TV'
                component={TV}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name='tv' color={color} size={size} />;
                    },
                }}
            />
            <Tab.Screen
                name='Search'
                component={Search}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <Ionicons name='search' color={color} size={size} />
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
};
export default Tabs;
