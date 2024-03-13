import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {secondColor} from "assets/stylesheets/colors";

type PT = {
    min: number,
    max: number,
    onMouseUpMin: (value: string) => void
    onMouseUpMax: (value: string) => void
    disabled?: boolean
}
export const DoubleSlider = memo(
    ({
         min,
         max,
         onMouseUpMin,
         onMouseUpMax,
         disabled,
     }: PT) => {
        const [minVal, setMinVal] = useState(min);
        const [maxVal, setMaxVal] = useState(max);
        const range = useRef<HTMLDivElement>(null);


        const getPercent = useCallback(
            (value: number) => Math.round(((value - min) / (max - min)) * 100),
            [min, max]
        );
        useEffect(() => {
            setMaxVal(max)
            setMinVal(min)
        }, [max, min]);

        useEffect(() => {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(maxVal);
            if (range.current) {
                range.current.style.left = `${getPercent(minVal) + 1}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }, [minVal, maxVal, getPercent]);

        useEffect(() => {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(maxVal);
            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }, [maxVal, minVal, getPercent]);


        return (
            <SDoubleSlider>
                <SSliderLeftValue>
                    {minVal}
                </SSliderLeftValue>
                <SThumbLeft
                    type="range"
                    min={min}
                    max={max}
                    value={minVal}
                    onChange={(event) => {
                        const value = Math.min(Number(event.target.value), maxVal - 1);
                        setMinVal(value);
                    }}
                    onMouseUp={e => onMouseUpMin(e.currentTarget.value)}
                    style={{zIndex: 5}}
                    disabled={disabled}
                />
                <SThumbRight
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    onChange={(event) => {
                        const value = Math.max(Number(event.target.value), minVal + 1);
                        setMaxVal(value);
                    }}
                    onMouseUp={e => onMouseUpMax(e.currentTarget.value)}
                    disabled={disabled}
                />
                <SSliderRightValue>
                    <span>{maxVal}</span>
                </SSliderRightValue>
                <SSlider>
                    <SSliderTrack/>
                    <SSliderRange ref={range}/>
                </SSlider>
            </SDoubleSlider>
        )
    }
);
const SSliderLeftValue = styled.div`
    position: absolute;
    font-size: 24px;
    margin-top: -35px;
    left: 2px;
`
const SSliderRightValue = styled(SSliderLeftValue)`
    left: unset;
    right: -4px;
`
const SSlider = styled.div`
    position: relative;
    width: 96%;
`
const SSliderTrack = styled.div`
    background-color: #ced4da;
    width: 100%;
    z-index: 1;
    position: absolute;
    left: 0;
    border-radius: 3px;
    height: 5px;
`
const SSliderRange = styled(SSliderTrack)`
    width: 90%;
    background-color: ${secondColor};
    z-index: 2;
`
const SThumb = styled.input`
    pointer-events: none;
    position: absolute;
    height: 0;
    width: 100%;
    outline: none;

    background-color: black;

    &::-webkit-slider-thumb {

        background-color: black;

        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;

        //background-color: rgb(192, 191, 191);
        //border: none;
        border-radius: 50%;
        //background: red;
        box-shadow: 0 0 1px 1px #ced4da;
        cursor: pointer;
        height: 18px;
        width: 18px;
        margin-top: 4px;
        pointer-events: all;
        position: relative;
    }

    &::-moz-range-thumb {
        //background-color: #f1f5f7;

        background-color: black;

        border: none;
        border-radius: 50%;
        box-shadow: 0 0 1px 1px #ced4da;
        cursor: pointer;
        height: 18px;
        width: 18px;
        margin-top: 4px;
        pointer-events: all;
        position: relative;
    }
`
const SThumbLeft = styled(SThumb)`
    z-index: 3;
`
const SThumbRight = styled(SThumb)`
    z-index: 4;
`
const SDoubleSlider = styled.div`
    align-self: center;
    position: relative;
    bottom: -9px;
`