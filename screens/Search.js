import { useQuery } from 'react-query';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { moviesAPI, tvApi } from '../api';
import HList from '../components/HList';

const Container = styled.ScrollView``;
const SearchBar = styled.TextInput`
    background-color: white;
    padding: 15px 15px;
    border-radius: 15px;
    width: 90%;
    margin: 20px auto;
    margin-bottom: 40px;
`;

const Search = () => {
    const [query, setQuery] = useState('');
    const {
        isdLoading: moviesLoading,
        data: moviesData,
        refetch: searchMovies,
    } = useQuery(['searchMovies', query], moviesAPI.search, {
        enabled: false,
    });
    const {
        isdLoading: tvLoading,
        data: tvData,
        refetch: searchTv,
    } = useQuery(['searchTv', query], tvApi.search, {
        enabled: false,
    });
    const onChangeText = (text) => setQuery(text);
    const onSubmit = () => {
        if (query === '') {
            return;
        }

        searchMovies();
        searchTv();
    };

    return (
        <Container>
            <SearchBar
                placeholder='Search for Movie or TV Show'
                placeholderTextColor='grey'
                returnKeyType='search'
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
            />
            {moviesLoading || tvLoading ? <Loader /> : null}
            {moviesData ? (
                <HList title='Movie Results' data={moviesData} />
            ) : null}
            {tvData ? <HList title='TV Results' data={tvData} /> : null}
        </Container>
    );
};

export default Search;
