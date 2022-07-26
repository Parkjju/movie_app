import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    RefreshControl,
    Text,
} from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import Slide from '../components/Slide';
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';
import { moviesAPI } from '../api';
import { useQuery, useQueryClient } from 'react-query';

const API_KEY = '35962825f155cdfe3696115110be486a';

const Container = styled.FlatList``;

const View = styled.View`
    flex: 1;
`;

const TrendingScroll = styled.FlatList`
    margin-top: 20px;
`;

const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ListTitle = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin-left: 30px;
`;

const ListContainer = styled.View`
    margin-bottom: 40px;
`;

const CommingSoonTitle = styled(ListTitle)`
    margin-bottom: 10px;
`;
const movieKeyExtractor = (item) => item.id + '';

const renderVMedia = ({ item }) => (
    <VMedia
        poster_path={item.poster_path}
        original_title={item.original_title}
        vote_average={item.vote_average}
    />
);

const renderHMedia = ({ item }) => (
    <HMedia
        poster_path={item.poster_path}
        original_title={item.original_title}
        release_date={item.release_date}
        overview={item.overview}
    />
);

const VSeparator = styled.View`
    width: 20px;
`;
const HSeparator = styled.View`
    height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
    const queryClient = useQueryClient();
    const {
        isLoading: nowPlayingLoading,
        data: nowPlayingData,
        refetch: refetchNowPlaying,
        isRefetching: isRefetchingNowPlaying,
    } = useQuery(['movies', 'nowPlaying'], moviesAPI.getNowPlaying);
    const {
        isLoading: upcomingLoading,
        data: upcomingData,
        refetch: refetchUpcoming,
        isRefetching: isRefetchingUpcoming,
    } = useQuery(['movies', 'Upcoming'], moviesAPI.getUpcoming);
    const {
        isLoading: trendingLoading,
        data: trendingData,
        refetch: refetchTrending,
        isRefetching: isRefetchingTrending,
    } = useQuery(['movies', 'Trending'], moviesAPI.getTrending);
    const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
    const onRefresh = async () => {
        queryClient.refetchQueries(['movies']);
    };

    const refreshing =
        isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;
    return loading ? (
        <Loader>
            <ActivityIndicator />
        </Loader>
    ) : (
        <FlatList
            onRefresh={onRefresh}
            refreshing={refreshing}
            ListHeaderComponent={
                <>
                    <Swiper
                        horizontal
                        loop
                        autoplay
                        autoplayTimeout={3.5}
                        showsPagination={false}
                        showsButtons={false}
                        containerStyle={{
                            width: '100%',
                            marginBottom: 30,
                            height: SCREEN_HEIGHT / 4,
                        }}
                    >
                        {nowPlayingData?.results?.map((movie) => (
                            <Slide
                                key={movie.id}
                                backdrop_path={movie.backdrop_path}
                                poster_path={movie.poster_path}
                                original_title={movie.original_title}
                                vote_average={movie.vote_average}
                                overview={movie.overview}
                            />
                        ))}
                    </Swiper>
                    <ListContainer>
                        <ListTitle>Trending Movies </ListTitle>
                        <TrendingScroll
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={trendingData?.results}
                            keyExtractor={movieKeyExtractor}
                            renderItem={renderVMedia}
                            ItemSeparatorComponent={VSeparator}
                            contentContainerStyle={{ paddingHorizontal: 30 }}
                        />
                    </ListContainer>
                    <ListContainer>
                        <CommingSoonTitle>Comming Soon</CommingSoonTitle>
                    </ListContainer>
                </>
            }
            data={upcomingData?.results}
            keyExtractor={movieKeyExtractor}
            renderItem={renderHMedia}
            ItemSeparatorComponent={HSeparator}
        />
    );
};

export default Movies;
