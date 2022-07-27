import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import {
    Dimensions,
    StyleSheet,
    Linking,
    View,
    Button,
    Share,
    TouchableOpacity,
} from 'react-native';
import Poster from '../components/Poster';
import { makeImgPath } from '../utils';
import { LinearGradient } from 'expo-linear-gradient';
import { BLACK_COLOR } from '../color';
import { useQuery } from 'react-query';
import { moviesAPI, tvApi } from '../api';
import { Loader } from '../components/Loader';
import { Ionicons } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';
import * as WebBrowser from 'expo-web-browser';

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor};
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const VideoBtn = styled.TouchableOpacity`
    flex-direction: row;
`;
const BtnText = styled.Text`
    color: white;
    font-weight: 600;
    margin-bottom: 10px;
    line-height: 24px;
    margin-left: 24px;
`;

const Header = styled.View`
    height: ${SCREEN_HEIGHT / 4}px;
    justify-content: flex-end;
    padding: 0px 20px;
`;
const Background = styled.Image``;
const Column = styled.View`
    flex-direction: row;
    width: 80%;
`;
const Title = styled.Text`
    color: white;
    font-size: 36px;
    align-self: flex-end;
    margin-left: 15px;
    font-weight: 500;
`;
const Overview = styled.Text`
    color: ${(props) => props.theme.textColor};
    padding: 20px 0px;
`;
const Data = styled.View`
    padding: 0 20px;
    margin-bottom: 20px;
`;
const YouTubeContainer = styled.View`
    margin-top: 20px;
`;
const Detail = ({ navigation: { setOptions }, route: { params } }) => {
    const isMovie = 'original_title' in params;
    const shareMedia = async () => {
        await Share.share({
            url: isMovie
                ? `https://www.imdb.com/title/${data.imdb_id}/`
                : data.homepage,
            message: params.overview,
            title: isMovie ? params.original_title : params.original_name,
        });
    };

    const { isLoading, data } = useQuery(
        [isMovie ? 'movies' : 'tv', params.id],
        isMovie ? moviesAPI.detail : tvApi.detail
    );

    const ShareButton = () => (
        <TouchableOpacity onPress={shareMedia}>
            <Ionicons name='share-outline' color='white' size={24} />
        </TouchableOpacity>
    );

    const OpenYTLink = async (videoID) => {
        const baseURL = `https://m.youtube.com/watch?v=${videoID}`;
        const supported = await Linking.canOpenURL(baseURL);

        if (supported) {
            await WebBrowser.openBrowserAsync(baseURL);
        } else {
            alert('어떻게열ㅇ라고');
        }
    };

    useEffect(() => {
        setOptions({
            title: 'original_title' in params ? 'Movie' : 'TV Show',
        });
    }, []);
    useEffect(() => {
        setOptions({
            title: 'original_title' in params ? 'Movie' : 'TV Show',
            headerRight: () => <ShareButton />,
        });
    }, [data]);
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === 'ended') {
            setPlaying(false);
            Alert.alert('video has finished playing!');
        }
    }, []);

    return (
        <Container>
            <Header>
                <Background
                    style={StyleSheet.absoluteFill}
                    source={{ uri: makeImgPath(params.backdrop_path || '') }}
                />
                <LinearGradient
                    colors={['transparent', BLACK_COLOR]}
                    style={StyleSheet.absoluteFill}
                />
                <Column>
                    <Poster path={params.poster_path || ''} />
                    <Title>
                        {'original_title' in params
                            ? params.original_title
                            : params.original_name}
                    </Title>
                </Column>
            </Header>
            <YouTubeContainer>
                <YoutubePlayer
                    height={250}
                    play={playing}
                    videoId={data?.videos?.results[0]?.key}
                    onChangeState={onStateChange}
                />
            </YouTubeContainer>
            <Data>
                <Overview>{params.overview}</Overview>
                {isLoading ? <Loader /> : null}
                {data?.videos?.results?.map((video) => (
                    <VideoBtn
                        key={video.key}
                        onPress={() => OpenYTLink(video.key)}
                    >
                        <Ionicons color='white' size={24} name='logo-youtube' />
                        <BtnText>{video.name}</BtnText>
                    </VideoBtn>
                ))}
            </Data>
        </Container>
    );
};

export default Detail;
