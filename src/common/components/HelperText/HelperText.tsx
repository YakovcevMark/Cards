import React, {memo} from 'react';
import styled from "styled-components";

const Text = styled.h6`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0;
  text-align: left;
  opacity: 0.8;
`
const HelperText: React.FC<{ children: React.ReactNode, style?: React.CSSProperties }> = ({children, style}) => {
    return (
        <Text style={style}>
            {children}
        </Text>
    );
};

export default memo(HelperText);