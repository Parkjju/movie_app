import AppLoading from 'expo-app-loading';
import React from 'react';
import * as Font from 'expo-font';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAssets } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import Root from './navigation/Root';
import { darkTheme, lightTheme } from './styled';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App() {
    const [assets] = useAssets([require('./icon.png')]);
    const [loaded] = Font.useFonts(Ionicons.font);
    const isDark = useColorScheme() === 'dark';

    if (!assets || !loaded) {
        return <AppLoading />;
    }
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                <NavigationContainer>
                    <Root />
                </NavigationContainer>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
