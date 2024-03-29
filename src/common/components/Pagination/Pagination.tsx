import React, {memo, useEffect, useState} from "react";
import {ChevronLeft, ChevronRight} from "@styled-icons/material";
import styled from "styled-components";
import {secondColor} from "assets/stylesheets/colors";

export type PaginationPT = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    pageChanged: (p: string) => void
    pageSizeChanged: (p: string) => void
    portionSize?: number
    itemsName?: string
    disabled?:boolean
}
export const Pagination = memo(
    ({
         itemsName,
         totalItemsCount,
         pageSizeChanged,
         pageSize,
         currentPage,
         pageChanged,
        disabled,
         portionSize = 5
     }: PaginationPT) => {
        const [portionNumber, setPortionNumber] = useState(1);
        const countOfPages = Math.ceil(totalItemsCount / pageSize);
        const pages = new Array(countOfPages);
        for (let i = 0; i <= countOfPages; i++) {
            pages[i] = i;
        }
        const portionCount = Math.ceil(countOfPages / portionSize);
        const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
        const rightPortionPageNumber = portionNumber * portionSize;
        useEffect(() => {
            setPortionNumber(Math.ceil(currentPage / portionSize))
        }, [currentPage, portionSize]);
        return (
            <StyledPagination>

                <button
                    disabled={portionNumber <= 1 || disabled}
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
                                           }}
                                           disabled={disabled}>
                                {p}
                            </button>
                        })
                }

                <button
                    disabled={portionCount === portionNumber || disabled}
                    onClick={() => setPortionNumber(portionNumber + 1)}>
                    <ChevronRight/>
                </button>

                <span>
                    Show&nbsp;
                    <select
                        value={pageSize}
                        onChange={e => pageSizeChanged(e.currentTarget.value)}
                        disabled={disabled}>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    &nbsp;{itemsName ? itemsName : "Items"} per Page
                </span>

            </StyledPagination>
        )
    }
);
const StyledPagination = styled.section`
    justify-self: start;
    align-self: center;
    display: flex;
    justify-content: center;

    span {
        align-self: center;
    }

    button {
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
        width: 20px;
    }

    .selectedPage {
        background-color: ${secondColor};
        font-weight: bold;
        //padding: 0 20px;
    }
    

`