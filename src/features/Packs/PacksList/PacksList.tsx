import React, {MouseEvent} from 'react';
import Title from "../../../common/components/Title/Title";
import {DoubleSlider} from "../../../common/components/DoubleSlider/DoubleSlider";
import Button from "../../../common/components/Button/Button";
import {RestartAlt} from "@styled-icons/material-outlined";
import {useNavigate, useSearchParams} from "react-router-dom";
import {PacksPath} from "../../../common/components/Routes/AppRoutes";
import {Table} from "../../../common/components/Table/Table";
import {TableNotation} from "../../../common/components/TableNotation/TableNotation";
import {Th} from "../../../common/components/Table/Th";
import {Pagination} from "../../../common/components/Pagination/Pagination";
import styled from "styled-components";
import {Search} from "@styled-icons/material";
import {secondColor} from "../../../assets/stylesheets/colors";
import {StyledPackPagesContainer} from "../PackPageContainer/PackPagesContainer";
import {HeaderSection} from "../HeaderSection/HeaderSection";
import {SettingsSection} from "../SettingsSection/SettingsSection";
import {Setting} from "../SettingsSection/Setting/Setting";
import {TableSection} from "../TableSection/TableSection";
import {PacksDataResponse} from "../cardsApi";

type PT = PacksDataResponse & {}
export const PacksList = () => {
    const data = {
        cardPacks: [
            {_id: "1", name: "awd", cardsCount: 1, updated: "18.02.2002", user_id: "LolKek"},
            {_id: "2", name: "awd", cardsCount: 2, updated: "18.02.2002", user_id: "LolKek"},
            {_id: "3", name: "awd", cardsCount: 3, updated: "18.02.2002", user_id: "LolKek"},
            {_id: "4", name: "awd", cardsCount: 4, updated: "18.02.2002", user_id: "LolKek"},
            {_id: "5", name: "awd", cardsCount: 5, updated: "18.02.2002", user_id: "LolKek"},
            {_id: "6", name: "awd", cardsCount: 6, updated: "18.02.2002", user_id: "LolKek"},
            {_id: "7", name: "awd", cardsCount: 7, updated: "18.02.2002", user_id: "LolKek"},
            {_id: "8", name: "awd", cardsCount: 8, updated: "18.02.2002", user_id: "LolKek"},
            {_id: "9", name: "awd", cardsCount: 9, updated: "18.02.2002", user_id: "LolKek"},
            {_id: "10", name: "awd", cardsCount: 10, updated: "18.02.2002", user_id: "LolKek"},
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
    return <StyledPackPagesContainer>
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
                <button>
                    <RestartAlt/>
                </button>
            </Setting>
        </SettingsSection>
        <TableSection>
            <Table>
                <thead>
                <Th value={"Name"}/>
                <Th value={"Cards"}/>
                <Th value={"Last Updated"}/>
                <Th value={"Created by"}/>
                <th>Actions</th>
                </thead>
                <tbody>
                {data.cardPacks.map(c => <TableNotation
                    id={c._id}
                    name={c.name}
                    updated={c.updated}
                    cardsCount={c.cardsCount}
                    userId={c.user_id}/>)
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
    </StyledPackPagesContainer>
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
const StyledSearchInput = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.2)
`

