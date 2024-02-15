import styled from "styled-components";

export const SPackPagesContainer = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr auto auto;
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
    border-bottom: 1px solid rgba(0, 0, 0, 0.58);


    table {
        width: 100%;
        border-spacing: 0;
        border-collapse: collapse;
        table-layout: fixed;

        thead {
            margin-top: 1vh;

            th {
                width: 13vw;
            }

            th:last-child {
                width: 5vw;
            }
        }


        tr:nth-child(2n) {
            background-color: #e1e1e1;
        }

        td {
            border-bottom: 1px solid rgba(0, 0, 0, 0.28);

        }

        thead, tbody, tr {
            display: table;
            width: 100%;
        }

        tbody {
            display: block;
            height: 500px;
            overflow: auto;

            td {
                width: 13.5vw;
            }

            td:last-child {
                width: 5vw;
            }
        }

    }

    ::-webkit-scrollbar {
        width: 6px;
    }

    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    ::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
`
export const SImg = styled.img`
    width:80%;
    justify-self: center;
`
export const SNotationName = styled.td`
    justify-self: start;

    div {
        display: flex;
        align-items: center;

    }

    button {
        margin-right: 1vw;
        align-self: center;
        padding-inline: 0;
        border: none;
        font-weight: bold;
        cursor: pointer;
        //background-color: inherit;

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
export const SCover = styled.img`
    height: 4vh;
`