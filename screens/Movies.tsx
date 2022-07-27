import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import Slide from '../components/Slide';
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';
import { moviesAPI } from '../api';
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
import { Loader } from '../components/Loader';
import HList from '../components/HList';

const TrendingScroll = styled.FlatList`
    margin-top: 20px;
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
        fullData={item}
    />
);

const VSeparator = styled.View`
    width: 20px;
`;
const HSeparator = styled.View`
    height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
    const [refreshing, setRefreshing] = useState(false);
    const queryClient = useQueryClient();
    const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
        ['movies', 'nowPlaying'],
        moviesAPI.getNowPlaying
    );
    const {
        isLoading: upcomingLoading,
        data: upcomingData,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery(['movies', 'Upcoming'], moviesAPI.getUpcoming, {
        getNextPageParam: (currentPage) => {
            const nextPage = currentPage.page + 1;
            return nextPage > currentPage.total_pages ? null : nextPage;
        },
    });
    const { isLoading: trendingLoading, data: trendingData } = useQuery(
        ['movies', 'Trending'],
        moviesAPI.getTrending
    );
    const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
    const onRefresh = async () => {
        setRefreshing(true);
        await queryClient.refetchQueries(['movies']);
        setRefreshing(false);
    };

    const loadMore = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    };

    return loading ? (
        <Loader />
    ) : (
        <FlatList
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
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
                                fullData={movie}
                            />
                        ))}
                    </Swiper>
                    {trendingData ? (
                        <HList data={trendingData} title='Trending Movies' />
                    ) : null}
                    <ListContainer>
                        <CommingSoonTitle>Comming Soon</CommingSoonTitle>
                    </ListContainer>
                </>
            }
            data={upcomingData?.pages.map((page) => page.results).flat()}
            keyExtractor={movieKeyExtractor}
            renderItem={renderHMedia}
            ItemSeparatorComponent={HSeparator}
        />
    );
};

export default Movies;
