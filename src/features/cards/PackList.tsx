import React, {MouseEvent} from 'react';
import styled from "styled-components";
import Title from "../../common/components/Title/Title";
import {DoubleSlider} from "./DoubleSlider/DoubleSlider";
import Button from "../../common/components/Button/Button";
import {useForm} from "react-hook-form";
import {RestartAlt, Search} from "@styled-icons/material-outlined";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {secondColor} from "../../assets/stylesheets/colors";
import {PacksPath} from "../../common/components/Routes/AppRoutes";

export const PackList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const accessory = searchParams.get("accessory") || "all"
    console.log(accessory)
    const nav = useNavigate()
    // let {register} = useForm()
    const changeAccessory = (e:MouseEvent<HTMLButtonElement>) =>
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
                    min={10}
                    max={100}
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
            <div>

            </div>
        </TableSection>
        <Pagination>

        </Pagination>
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
  button{
    font-size: 20px;
  }
  .active {
    color:white;
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
  height: 100%;
  width: 100%;
  border: 1px red solid;
`
const Pagination = styled.section`

`
