import React from 'react';
import {StyledPackPagesContainer} from "../PackPageContainer/PackPagesContainer";
import {HeaderSection} from "../HeaderSection/HeaderSection";
import Title from "../../../common/components/Title/Title";
import Button from "../../../common/components/Button/Button";
import {SettingsSection} from "../SettingsSection/SettingsSection";
import {Setting} from "../SettingsSection/Setting/Setting";
import {TableSection} from "../TableSection/TableSection";
import {Table} from "../../../common/components/Table/Table";
import {Th} from "../../../common/components/Table/Th";
import {Pagination} from "../../../common/components/Pagination/Pagination";
import styled from "styled-components";
import {BackArrowBlock} from "../../../common/components/BackArrowBlock/BackArrowBlock";
import {TableNotation} from "../../../common/components/TableNotation/TableNotation";
type PT = {
    name:string
}
export const Pack =
    ({
         name,
     }: PT) => {
        const data = {
            cards: [
                {
                    answer:"no answer",
                    question:"no question",
                    grade:3,
                    user_id:"1",
                    updated:"20.03.2002",
                    _id:"1"
                },
                 {
                    answer:"no answer",
                    question:"no question",
                    grade:3,
                    user_id:"1",
                    updated:"20.03.2002",
                    _id:"1"
                },
                 {
                    answer:"no answer",
                    question:"no question",
                    grade:3,
                    user_id:"1",
                    updated:"20.03.2002",
                    _id:"1"
                },
                 {
                    answer:"no answer",
                    question:"no question",
                    grade:3,
                    user_id:"1",
                    updated:"20.03.2002",
                    _id:"1"
                },
                 {
                    answer:"no answer",
                    question:"no question",
                    grade:3,
                    user_id:"1",
                    updated:"20.03.2002",
                    _id:"1"
                },
                 {
                    answer:"no answer",
                    question:"no question",
                    grade:3,
                    user_id:"1",
                    updated:"20.03.2002",
                    _id:"1"
                },
                 {
                    answer:"no answer",
                    question:"no question",
                    grade:3,
                    user_id:"1",
                    updated:"20.03.2002",
                    _id:"1"
                },
                 {
                    answer:"no answer",
                    question:"no question",
                    grade:3,
                    user_id:"1",
                    updated:"20.03.2002",
                    _id:"1"
                },
                 {
                    answer:"no answer",
                    question:"no question",
                    grade:3,
                    user_id:"1",
                    updated:"20.03.2002",
                    _id:"1"
                },
                 {
                    answer:"no answer",
                    question:"no question",
                    grade:3,
                    user_id:"1",
                    updated:"20.03.2002",
                    _id:"1"
                },
                 {
                    answer:"no answer",
                    question:"no question",
                    grade:3,
                    user_id:"1",
                    updated:"20.03.2002",
                    _id:"1"
                },
            ],
            cardsTotalCount: 2300,
            maxGrade: 4,
            minGrade: 0,
            page: 1,
            pageCount: 10,
            packUserId:"3453434"
        }
        return (

            <>
                <ExtendContainer>
                    <BackArrowBlock/>

                <HeaderSection>
                    <Title>{name}</Title>
                    <Button>Learn to Pack</Button>
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
                </SettingsSection>
                <TableSection>
                    <Table>
                        <thead>
                        <Th value={"Question"}/>
                        <Th value={"Answer"}/>
                        <Th value={"Last Updated"}/>
                        <Th value={"Grade"}/>
                        <th>Actions</th>
                        </thead>
                        <tbody>
                        {data.cards.map(c => <TableNotation
                            id={c._id}
                            question={c.question}
                            answer={c.question}
                            updated={c.updated}
                            grade={c.grade}
                            userId={c.user_id}/>)
                        }
                        </tbody>
                    </Table>
                </TableSection>
                <Pagination
                    itemsName={"Cards"}
                    currentPage={data.page}
                    totalItemsCount={data.cardsTotalCount}
                    pageSize={data.pageCount}
                    pageChanged={(awd) => {
                    }}/>
            </ExtendContainer></>
        )
    };
const ExtendContainer = styled(StyledPackPagesContainer)`
    grid-template-rows: 5px 1fr 1fr 5fr 1fr;
`
const StyledSearchInput = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.2)
`