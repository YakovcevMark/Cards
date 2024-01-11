import React, {ReactNode} from 'react';
import styled from "styled-components";
// type PT = {
//     children:ReactNode
// }
// export const PackPagesContainer =
//     ({
//         children
//      }:PT) => {
//     return (
//         <StyledPackPagesContainer>
//             {children}
//         </StyledPackPagesContainer>
//     );
// };
export const StyledPackPagesContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 5fr 1fr;
  grid-gap: 2vh;
`

