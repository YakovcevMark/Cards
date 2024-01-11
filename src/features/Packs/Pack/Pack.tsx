import React from 'react';
import {Button} from "../../../common/components/Button/Button";
import {Th} from "../../../common/components/Th/Th";
import {Pagination} from "../../../common/components/Pagination/Pagination";
import styled from "styled-components";
import {BackArrowBlock} from "../../../common/components/BackArrowBlock/BackArrowBlock";
import {TableNotation} from "../../../common/components/TableNotation/TableNotation";
import {SHeaderSection, SPackPagesContainer, SSetting, SSettingsSection, STableSection} from "../PacksStyledComponents";
import {STitle} from "../../../common/components/CommonStyledComponents";

type PT = {
    name: string
}
export const Pack =
    ({
         name,
     }: PT) => {
        const data = {
            cards: [
                {
                    answer: "no answer",
                    question: "no question",
                    grade: 3,
                    user_id: "1",
                    updated: "20.03.2002",
                    _id: "1"
                },
                {
                    answer: "no answer",
                    question: "no question",
                    grade: 3,
                    user_id: "1",
                    updated: "20.03.2002",
                    _id: "1"
                },
                {
                    answer: "no answer",
                    question: "no question",
                    grade: 3,
                    user_id: "1",
                    updated: "20.03.2002",
                    _id: "1"
                },
                {
                    answer: "no answer",
                    question: "no question",
                    grade: 3,
                    user_id: "1",
                    updated: "20.03.2002",
                    _id: "1"
                },
                {
                    answer: "no answer",
                    question: "no question",
                    grade: 3,
                    user_id: "1",
                    updated: "20.03.2002",
                    _id: "1"
                },
                {
                    answer: "no answer",
                    question: "no question",
                    grade: 3,
                    user_id: "1",
                    updated: "20.03.2002",
                    _id: "1"
                },
                {
                    answer: "no answer",
                    question: "no question",
                    grade: 3,
                    user_id: "1",
                    updated: "20.03.2002",
                    _id: "1"
                },
                {
                    answer: "no answer",
                    question: "no question",
                    grade: 3,
                    user_id: "1",
                    updated: "20.03.2002",
                    _id: "1"
                },
                {
                    answer: "no answer",
                    question: "no question",
                    grade: 3,
                    user_id: "1",
                    updated: "20.03.2002",
                    _id: "1"
                },
                {
                    answer: "no answer",
                    question: "no question",
                    grade: 3,
                    user_id: "1",
                    updated: "20.03.2002",
                    _id: "1"
                },
                {
                    answer: "no answer",
                    question: "no question",
                    grade: 3,
                    user_id: "1",
                    updated: "20.03.2002",
                    _id: "1"
                },
            ],
            cardsTotalCount: 2300,
            maxGrade: 4,
            minGrade: 0,
            page: 1,
            pageCount: 10,
            packUserId: "3453434"
        }
        return (
            <ExtendContainer>
                <BackArrowBlock/>

                <SHeaderSection>
                    <STitle>{name}</STitle>
                    <Button>Learn to Pack</Button>
                </SHeaderSection>
                <SSettingsSection>
                    <SSetting>
                        <STitle>Search</STitle>
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
                    </SSetting>
                </SSettingsSection>
                <STableSection>
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
                </STableSection>
                <Pagination
                    itemsName={"Cards"}
                    currentPage={data.page}
                    totalItemsCount={data.cardsTotalCount}
                    pageSize={data.pageCount}
                    pageChanged={() => {
                    }}/>
            </ExtendContainer>
        )
    };
const ExtendContainer = styled(SPackPagesContainer)`
  grid-template-rows: 5px 1fr 1fr 5fr 1fr;
`
const StyledSearchInput = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.2)
`