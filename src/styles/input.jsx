import styled from "styled-components";

export const Input = styled.input`
    display: block;
    width: 100%;
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    appearance: none;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,
                box-shadow .15s ease-in-out;
    margin: 10px 0;

    &:focus {
        color: #212529;
        background-color: #fff;
        border-color: #86b7fe;
        outline: 0;
        box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
    }
`;