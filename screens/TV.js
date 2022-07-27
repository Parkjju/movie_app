import { useQuery } from 'react-query';
import React, { useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { tvApi } from '../api';
import { Loader } from '../components/Loader';
import HList from '../components/HList';
import { useQueryClient } from 'react-query';

const TV = () => {
    const queryClient = useQueryClient();
    const [refreshing, setRefreshing] = useState(false);
    const { isLoading: todayLoading, data: airingData } = useQuery(
        ['tv', 'today'],
        tvApi.getAiringToday
    );
    const { isLoading: topLoading, data: topData } = useQuery(
        ['tv', 'top'],
        tvApi.getTopRated
    );
    const { isLoading: trendingLoading, data: trendingData } = useQuery(
        ['tv', 'trending'],
        tvApi.getTrending
    );
    const loading = todayLoading || topLoading || trendingLoading;

    const onRefresh = () => {
        setRefreshing(true);
        queryClient.refetchQueries(['tv']);
        setRefreshing(false);
    };
    if (loading) {
        return <Loader />;
    }
    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{ paddingVertical: 30 }}
        >
            <HList title='Trending TV' data={trendingData} />
            <HList title='Airing Today' data={airingData} />
            <HList title='Top Rated TV' data={topData} />
        </ScrollView>
    );
};

export default TV;
