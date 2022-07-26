import styled from 'styled-components/native';

const Box = styled.Text`
    color: rgba(255, 255, 255, 0.8);
    font-size: 10px;
`;
function Votes({ vote }) {
    return <Box>{vote > 0 ? `⭐️${vote}/10` : `Comming soon`}</Box>;
}
export default Votes;
