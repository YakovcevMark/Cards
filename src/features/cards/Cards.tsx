import React from 'react';
import styled from "styled-components";
import Title from "../../common/components/Title/Title";
import {DoubleSlider} from "./DoubleSlider/DoubleSlider";

export const Cards = () => {
    return <>
        <Title>Cards</Title>
        <DoubleSlider
                min={10}
                max={100}
                onChange={({min,max}) => console.log(`min: ${min} max: ${max}`)}
        />
    </>
};

