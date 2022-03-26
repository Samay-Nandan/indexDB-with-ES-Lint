import styled from "styled-components";

export const Flex = styled.div`
    display: flex;
    justify-content: ${props => props.justifyContent || "center" };
    align-items: center;
    margin: 0;

    input { 
        margin: 0;
        width: 49%;
    }
`;