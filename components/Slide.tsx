import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import React from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    useColorScheme,
    View,
} from 'react-native';
import styled from 'styled-components/native';
import Movies from '../screens/Movies';
import { makeImgPath } from '../utils';
import Poster from './Poster';
const BgImg = styled.Image``;

const Title = styled.Text<{ isDark: boolean }>`
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => (props.isDark ? 'white' : props.theme.textColor)};
`;

const Wrapper = styled.View`
    flex-direction: row;
    height: 100%;
    justify-content: center;
    align-items: center;
`;
const Column = styled.View`
    width: 50%;
    margin-left: 10px;
`;
const Overview = styled.Text<{ isDark: boolean }>`
    margin-top: 10px;
    color: ${(props) =>
        props.isDark ? 'rgba(255, 255, 255, 0.8)' : props.theme.textColor};
`;

const Votes = styled(Overview)`
    margin-top: 5px;
`;
const Slide = ({
    backdrop_path,
    poster_path,
    original_title,
    vote_average,
    overview,
    fullData,
}) => {
    const navigation = useNavigation();
    const goToDetail = () => {
        navigation.navigate('Stack', {
            screen: 'Detail',
            params: { fullData },
        });
    };
    const isDark = useColorScheme() === 'isDark';
    return (
        <TouchableWithoutFeedback onPress={goToDetail}>
            <View style={{ flex: 1 }}>
                <BgImg
                    style={StyleSheet.absoluteFill}
                    source={{ uri: makeImgPath(backdrop_path) }}
                />
                <BlurView intensity={80} style={StyleSheet.absoluteFill}>
                    <Wrapper>
                        <Poster path={poster_path} />
                        <Column>
                            <Title isDark={isDark}>{original_title}</Title>
                            <Overview isDark={isDark}>
                                {overview.slice(0, 80)}...
                            </Overview>
                            {vote_average > 0 ? (
                                <Votes>⭐️{vote_average}/10</Votes>
                            ) : null}
                        </Column>
                    </Wrapper>
                </BlurView>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Slide;
