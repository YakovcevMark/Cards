import React, {MouseEvent} from 'react';
import Title from "../../common/components/Title/Title";
import {DoubleSlider} from "../../common/components/DoubleSlider/DoubleSlider";
import Button from "../../common/components/Button/Button";
import {RestartAlt} from "@styled-icons/material-outlined";
import {useNavigate, useSearchParams} from "react-router-dom";
import {PacksPath} from "../../common/components/Routes/AppRoutes";
import {Table} from "../../common/components/Table/Table";
import {PackNotation} from "./PackNotation/PackNotation";
import {Th} from "../../common/components/Table/Th";
import {Pagination} from "../../common/components/Pagination/Pagination";
import styled from "styled-components";
import {Search} from "@styled-icons/material";
import {secondColor} from "../../assets/stylesheets/colors";

export const PackList = () => {
    const data = {
        cardPacks: [
            {id: "1", name: "awd", cardsCount: 1, updated: "18.02.2002", userId: "LolKek"},
            {id: "2", name: "awd", cardsCount: 2, updated: "18.02.2002", userId: "LolKek"},
            {id: "3", name: "awd", cardsCount: 3, updated: "18.02.2002", userId: "LolKek"},
            {id: "4", name: "awd", cardsCount: 4, updated: "18.02.2002", userId: "LolKek"},
            {id: "5", name: "awd", cardsCount: 5, updated: "18.02.2002", userId: "LolKek"},
            {id: "6", name: "awd", cardsCount: 6, updated: "18.02.2002", userId: "LolKek"},
            {id: "7", name: "awd", cardsCount: 7, updated: "18.02.2002", userId: "LolKek"},
            {id: "8", name: "awd", cardsCount: 8, updated: "18.02.2002", userId: "LolKek"},
            {id: "9", name: "awd", cardsCount: 9, updated: "18.02.2002", userId: "LolKek"},
            {id: "10", name: "awd", cardsCount: 10, updated: "18.02.2002", userId: "LolKek"},
        ],
        cardPacksTotalCount: 2300,
        maxCardsCount: 4,
        minCardsCount: 0,
        page: 1,
        pageCount: 10,
    }

    const [searchParams, setSearchParams] = useSearchParams();
    const accessory = searchParams.get("accessory") || "all"
    console.log(accessory)
    const nav = useNavigate()
    // let {register} = useForm()
    const changeAccessory = (e: MouseEvent<HTMLButtonElement>) =>
        nav(`${PacksPath}?accessory=${e.currentTarget.value}`)
    return <StyledPackList>
        <HeaderSection>
            <Title>Pack list</Title>
            <Button>Add new pack</Button>
        </HeaderSection>
        <SettingsSection>
            <Setting>
                <Title>Search</Title>
                {/*<label>*/}
                {/*    <StyledSearch/>*/}
                {/*    <SearchInput*/}
                {/*        name={"search"}*/}
                {/*        type={"text"}*/}
                {/*        placeholder={"Provide tour text"}*/}
                {/*    />*/}
                {/*</label>*/}
                <StyledSearchInput
                    type={"search"}
                    placeholder={"Provide tour text"}
                />
            </Setting>

            <Setting>
                <Title>Show packs cards</Title>
                <ButtonSection>
                    <button
                        className={accessory === "my" ? "active" : ""}
                        onClick={changeAccessory}
                        value={"my"}>
                        My
                    </button>
                    <button
                        className={accessory === "all" ? "active" : ""}
                        onClick={changeAccessory}
                        value={"all"}>
                        All
                    </button>
                </ButtonSection>
            </Setting>

            <Setting>
                <Title>Number of cards</Title>
                <DoubleSlider
                    min={data.minCardsCount}
                    max={data.maxCardsCount}
                    onChange={({min, max}) => console.log(`min: ${min} max: ${max}`)}
                />
            </Setting>

            <Setting>
                <Title>Clear</Title>
                <RestartButton>
                    <RestartAlt/>
                </RestartButton>
            </Setting>
        </SettingsSection>
        <TableSection>
            <Table>
                <thead>
                <Th>Name</Th>
                <Th>Cards</Th>
                <Th>Last Updated</Th>
                <Th>Created by</Th>
                <th>Actions</th>
                </thead>
                <tbody>
                {data.cardPacks.map(c => <PackNotation
                    id={c.id}
                    name={c.name}
                    updated={c.updated}
                    cardsCount={c.cardsCount}
                    userId={c.userId}/>)
                }
                </tbody>
            </Table>
        </TableSection>
        <Pagination
            itemsName={"Cards"}
            currentPage={data.page}
            totalItemsCount={data.cardPacksTotalCount}
            pageSize={data.pageCount}
            pageChanged={(awd) => {
            }}/>

    </StyledPackList>
};


const SearchInput = styled.input`
  width: 100%;
  height: 80%;
  //padding: 0 0 0 3vh;
`
const StyledSearch = styled(Search)`
  fill: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 2px;
`
const RestartButton = styled.button`

`
const ButtonSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  button {
    font-size: 20px;
  }

  .active {
    color: white;
    background-color: ${secondColor};
  }
`
const Setting = styled.article`
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
const StyledSearchInput = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.2)
`
const StyledPackList = styled.div`
  //height: 100vh;
  display: grid;
  grid-template-rows: 1fr 1fr 5fr 1fr;
  grid-gap: 2vh;
`
const HeaderSection = styled.section`
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
const SettingsSection = styled.section`
  display: grid;
  grid-template-columns: 7fr 3fr 4fr 1fr;
  grid-gap: 2vh;
`
const TableSection = styled.section`
  height: auto;
  border: 1px red solid;
`

