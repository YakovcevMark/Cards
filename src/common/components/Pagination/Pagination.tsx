import React, {memo, useState} from "react";
import {ChevronLeft, ChevronRight} from "@styled-icons/material";
import styled from "styled-components";
import {secondColor} from "../../../assets/stylesheets/colors";

type PT = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    pageChanged: (p: string) => void
    pageSizeChanged: (p: string) => void
    portionSize?: number
    itemsName?: string
}
export const Pagination = memo(
    ({
         itemsName,
         totalItemsCount,
         pageSizeChanged,
         pageSize,
         currentPage,
         pageChanged,
         portionSize = 5
     }: PT) => {
        const [portionNumber, setPortionNumber] = useState(1);

        const countOfPages = Math.ceil(totalItemsCount / pageSize);
        const pages = new Array(countOfPages);
        for (let i = 0; i <= countOfPages; i++) {
            pages[i] = i;
        }
        const portionCount = Math.ceil(countOfPages / portionSize);
        const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
        const rightPortionPageNumber = portionNumber * portionSize;

        return (
            <StyledPagination>

                <button
                    disabled={portionNumber <= 1}
                    onClick={() => setPortionNumber(portionNumber - 1)}>
                    <ChevronLeft/>
                </button>

                {
                    pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                        .map(p => {
                            return <button key={p}
                                           className={currentPage === p ? "selectedPage" : "paginationItem"}
                                           onClick={() => {
                                               pageChanged(p);
                                           }}>
                                {p}
                            </button>
                        })
                }

                <button
                    disabled={portionCount === portionNumber}
                    onClick={() => setPortionNumber(portionNumber + 1)}>
                    <ChevronRight/>
                </button>

                <span>
                    Show&nbsp;
                    <select
                        value={pageSize}
                        onChange={e => pageSizeChanged(e.currentTarget.value)}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </select>
                    &nbsp;{itemsName ? itemsName : "Items"} per Page
                </span>

            </StyledPagination>
        )
    }
);
const StyledPagination = styled.section`
  justify-self: start;
  align-self: end;
  display: flex;
  justify-content: center;
  padding: 5px;

  span {
    align-self: center;
  }
  
  button {
    //background-color: blueviolet;
    border: none;
    border-radius: 3px;
    padding: 10px 15px;
    margin: 0 10px;
    cursor: pointer;

    &:disabled {
      cursor: auto;
    }
  }

  svg {
    //background-color: burlywood;
    width: 20px;
  }

  .selectedPage {
    background-color: ${secondColor};
    font-weight: bold;
    //padding: 0 20px;
  }

  .paginationItem {
    //padding: 0 5px;
  }

`