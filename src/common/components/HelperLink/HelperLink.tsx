import React, {memo, ReactNode} from 'react';
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {secondColor} from "../../../assets/stylesheets/colors";

const Link = styled.span`

  align-items: center;

  a {
    color: ${secondColor};
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    text-decoration: none;
  }
`
export const HelperLink = memo(
    ({
         path,
         children
     }: { path: string, children: ReactNode }) => {
        return (
            <Link>
                <NavLink to={path}>
                    {children}
                </NavLink>
            </Link>
        );
    }
);
