import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import VMedia from './VMedia';

const ListContainer = styled.View`
    margin-bottom: 40px;
`;

const ListTitle = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin-left: 30px;
    margin-bottom: 20px;
`;

export const HListSeparator = styled.View`
    width: 20px;
`;

const HList = ({ title, data }) => (
    <ListContainer>
        <ListTitle>{title}</ListTitle>
        <FlatList
            keyExtractor={(item) => item.id + ''}
            ItemSeparatorComponent={HListSeparator}
            contentContainerStyle={{ paddingHorizontal: 30 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data.results}
            renderItem={({ item }) => (
                <VMedia
                    poster_path={item.poster_path}
                    original_title={item.original_title ?? item.original_name}
                    vote_average={item.vote_average}
                    fullData={item}
                />
            )}
        />
    </ListContainer>
);

export default HList;
