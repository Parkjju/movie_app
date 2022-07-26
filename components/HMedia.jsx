import styled from 'styled-components/native';
import Poster from './Poster';
import Title from './Title';

const HMovie = styled.View`
    padding: 0px 30px;
    flex-direction: row;
`;

const HColumn = styled.View`
    margin-left: 15px;
    width: 80%;
`;

const Release = styled.Text`
    color: white;
    font-size: 12px;
    margin-vertical: 10px;
`;
const Overview = styled.Text`
    color: white;
    width: 80%;
`;
function HMedia({ poster_path, original_title, release_date, overview }) {
    return (
        <HMovie>
            <Poster path={poster_path} />
            <HColumn>
                <Title>{original_title}</Title>
                <Release>
                    {new Date(release_date).toLocaleDateString('ko', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </Release>
                <Overview>
                    {overview !== '' && overview.length > 13
                        ? `${overview.slice(0, 140)}...`
                        : overview}
                </Overview>
            </HColumn>
        </HMovie>
    );
}

export default HMedia;
