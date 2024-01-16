// import React from 'react';
// import {Button} from "../../../common/components/Button/Button";
// import {Th} from "../../../common/components/Th/Th";
// import {Pagination} from "../../../common/components/Pagination/Pagination";
// import styled from "styled-components";
// import {BackArrowBlock} from "../../../common/components/BackArrowBlock/BackArrowBlock";
// import {TableNotation} from "../../../common/components/TableNotation/TableNotation";
// import {SHeaderSection, SPackPagesContainer, SSetting, SSettingsSection, STableSection} from "../PacksStyledComponents";
// import {SHoverModule, STitle} from "../../../common/components/CommonStyledComponents";
// import {DeleteOutline, DriveFileRenameOutline, School, Tune} from "@styled-icons/material-outlined";
// import {useInitializeMutation} from "../../authPages/authApi";
export const Pack = []
// type PT = {
//     name: string
// }
// export const Pack =
//     ({
//          name,
//      }: PT) => {
//         const data = {
//             cards: [
//                 {
//                     answer: "no answer",
//                     question: "no question",
//                     grade: 3,
//                     user_id: "1",
//                     updated: "20.03.2002",
//                     _id: "1"
//                 },
//                 {
//                     answer: "no answer",
//                     question: "no question",
//                     grade: 3,
//                     user_id: "1",
//                     updated: "20.03.2002",
//                     _id: "1"
//                 },
//                 {
//                     answer: "no answer",
//                     question: "no question",
//                     grade: 3,
//                     user_id: "1",
//                     updated: "20.03.2002",
//                     _id: "1"
//                 },
//                 {
//                     answer: "no answer",
//                     question: "no question",
//                     grade: 3,
//                     user_id: "1",
//                     updated: "20.03.2002",
//                     _id: "1"
//                 },
//                 {
//                     answer: "no answer",
//                     question: "no question",
//                     grade: 3,
//                     user_id: "1",
//                     updated: "20.03.2002",
//                     _id: "1"
//                 },
//                 {
//                     answer: "no answer",
//                     question: "no question",
//                     grade: 3,
//                     user_id: "1",
//                     updated: "20.03.2002",
//                     _id: "1"
//                 },
//                 {
//                     answer: "no answer",
//                     question: "no question",
//                     grade: 3,
//                     user_id: "1",
//                     updated: "20.03.2002",
//                     _id: "1"
//                 },
//                 {
//                     answer: "no answer",
//                     question: "no question",
//                     grade: 3,
//                     user_id: "1",
//                     updated: "20.03.2002",
//                     _id: "1"
//                 },
//                 {
//                     answer: "no answer",
//                     question: "no question",
//                     grade: 3,
//                     user_id: "1",
//                     updated: "20.03.2002",
//                     _id: "1"
//                 },
//                 {
//                     answer: "no answer",
//                     question: "no question",
//                     grade: 3,
//                     user_id: "1",
//                     updated: "20.03.2002",
//                     _id: "1"
//                 },
//                 {
//                     answer: "no answer",
//                     question: "no question",
//                     grade: 3,
//                     user_id: "1",
//                     updated: "20.03.2002",
//                     _id: "1"
//                 },
//             ],
//             cardsTotalCount: 2300,
//             maxGrade: 4,
//             minGrade: 0,
//             page: 1,
//             pageCount: 10,
//             packUserId: "3453434"
//         }
//         const [, {data: userData}] = useInitializeMutation({
//             fixedCacheKey: 'shared-postMe-post',
//         })
//
//         return (
//             <ExtendContainer>
//                 <BackArrowBlock/>
//                 <SHeaderSection>
//                     <SSTitle>
//                         {name}
//                         <span>
//                             <Tune/>
//                               <SSHoverModule>
//                                 <button
//                                     // onClick={profileButtonHandler}
//                                 >
//                                     <DriveFileRenameOutline/>
//                                     <span>Edit</span>
//                                 </button>
//                                 <button
//                                     // onClick={logOutButtonHandler}
//                                     // disabled={isLogOutLoading}
//                                 >
//                                     <DeleteOutline/>
//                                     <span>Delete</span>
//                                 </button>
//                                   <button
//                                     // onClick={logOutButtonHandler}
//                                     // disabled={isLogOutLoading}
//                                 >
//                                     <School/>
//                                     <span>Learn</span>
//                                 </button>
//                             </SSHoverModule>
//                         </span>
//                     </SSTitle>
//                     <Button>Learn to Pack</Button>
//                 </SHeaderSection>
//                 <SSettingsSection>
//                     <SSetting>
//                         <STitle>Search</STitle>
//                         {/*<label>*/}
//                         {/*    <StyledSearch/>*/}
//                         {/*    <SearchInput*/}
//                         {/*        name={"search"}*/}
//                         {/*        type={"text"}*/}
//                         {/*        placeholder={"Provide tour text"}*/}
//                         {/*    />*/}
//                         {/*</label>*/}
//                         <StyledSearchInput
//                             type={"search"}
//                             placeholder={"Provide tour text"}
//                         />
//                     </SSetting>
//                 </SSettingsSection>
//                 <STableSection>
//                     <table>
//                         <thead>
//                         <Th value={"Question"}/>
//                         <Th value={"Answer"}/>
//                         <Th value={"Last Updated"}/>
//                         <Th value={"Grade"}/>
//                         <th>Actions</th>
//                         </thead>
//                         <tbody>
//                         {data.cards.map(c => <TableNotation
//                             question={c.question}
//                             answer={c.question}
//                             updated={c.updated}
//                             grade={c.grade}
//                             isOwner={userData!._id === c.user_id}/>)
//                         }
//                         </tbody>
//                     </table>
//                 </STableSection>
//                 <Pagination
//                     itemsName={"Cards"}
//                     currentPage={data.page}
//                     totalItemsCount={data.cardsTotalCount}
//                     pageSize={data.pageCount}
//                     pageChanged={() => {
//                     }}/>
//             </ExtendContainer>
//         )
//     };
// const ExtendContainer = styled(SPackPagesContainer)`
//   grid-template-rows: 5px 1fr 1fr 5fr 1fr;
// `
// const StyledSearchInput = styled.input`
//   border: 1px solid rgba(0, 0, 0, 0.2)
// `
// const SSTitle = styled(STitle)`
//   position: relative;
//   height: 5vh;
//   &:hover {
//     div {
//       display: grid;
//     }
//   }
//   svg {
//     padding-left: 10px;
//     width: 3vh;
//   }
// `
// const SSHoverModule = styled(SHoverModule)`
//   top: 3vh;
//   left:3vh;
//
// `