import React, {ReactNode} from 'react';
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
const HelperLink: React.FC<{ path: string, children: ReactNode }> = ({path, children}) => {
    return (
        <Link>
            <NavLink to={`/${path}`}>
                {children}
            </NavLink>
        </Link>
    );
};

export default HelperLink;