import styled from 'styled-components/native';
import Poster from './Poster';
import Votes from './Votes';

const Movie = styled.View`
    align-items: center;
`;

const Title = styled.Text`
    color: white;
    font-weight: 600;
    margin-top: 7px;
    margin-bottom: 5px;
`;

function VMedia({ poster_path, original_title, vote_average }) {
    return (
        <Movie>
            <Poster path={poster_path} />
            <Title>
                {original_title.slice(0, 13)}
                {original_title.length > 13 ? '...' : null}
            </Title>

            <Votes vote={vote_average} />
        </Movie>
    );
}

export default VMedia;
