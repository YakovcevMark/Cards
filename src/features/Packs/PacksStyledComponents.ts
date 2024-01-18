import styled from "styled-components";

export const SPackPagesContainer = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 5fr 1fr;
    grid-gap: 2vh;
    
`
export const SHeaderSection = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;

    h1 {
        justify-self: start;
    }

    button {
        justify-self: end;
    }
`
export const SSettingsSection = styled.section`
    display: grid;
    grid-template-columns: 7fr 3fr 4fr 1fr;
    grid-gap: 2vh;

    button {
        cursor: pointer;

        &:hover {
            border: 2px solid rgba(0, 0, 0, 0.52);
        }
    }
`
export const SSetting = styled.article`
    display: grid;
    grid-template-rows: 1fr 3fr;
    height: 10vh;

    button {
        border: 1px solid rgba(0, 0, 0, 0.2)
    }

    label {
        position: relative;
    }

    h1 {
        font-size: 20px;
    }

    svg {
        width: 3vh;
    }
`
export const STableSection = styled.section`
    height: auto;
    //border: 1px red solid;

    table {
        width: 100%;
        border-spacing: 0;
        border-collapse: collapse;
        tr:nth-child(2n) {
            background-color: #e1e1e1;
        }
        td {
            border-bottom: 1px solid rgba(0, 0, 0, 0.28);
        }
    }
`
export const SNotationName = styled.td`
    width: 40vh;
    justify-self: start;
    
    button {
        padding-inline: 0;
        border: none;
        font-weight: bold;
        cursor: pointer;
        background-color: inherit;

        &:disabled {
            font-weight: bold;
            cursor: auto;
        }
    }
`
export const SNotationActionButtons = styled.td`
    width: 16vh;
    button {
        margin: 0 5px;
    }
`
export const SNotation = styled.tr`
    height: 4vh;
    padding-bottom: 1vh;
    //background-color: burlywood;
    //border-bottom: 3px solid blue;
`
export const SNoSuchItemMessage = styled.span`
    justify-self: center;
    align-self: center;
    font-weight: lighter;
`