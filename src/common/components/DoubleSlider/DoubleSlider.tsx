import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {secondColor} from "../../../assets/stylesheets/colors";

type PT = {
    min: number,
    max: number,
    onChange: ({min, max}: { min: number, max: number }) => void
}
export const DoubleSlider = memo(
    ({
         min,
         max,
         onChange
     }: PT) => {
        const [minVal, setMinVal] = useState(min);
        const [maxVal, setMaxVal] = useState(max);
        const range = useRef<HTMLDivElement>(null);

        // Convert to percentage
        const getPercent = useCallback(
            (value: number) => Math.round(((value - min) / (max - min)) * 100),
            [min, max]
        );

        // Set width of the range to decrease from the left side
        useEffect(() => {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(maxVal);
            if (range.current) {
                range.current.style.left = `${getPercent(minVal) + 1}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }, [minVal, maxVal, getPercent]);

        // Set width of the range to decrease from the right side
        useEffect(() => {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(maxVal);
            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }, [maxVal, minVal, getPercent]);

        // Get min and max values when their state changes
        useEffect(() => {
            onChange({min: +minVal, max: +maxVal});
        }, [minVal, maxVal, onChange]);

        return (
            <StyledSlider>
                <div className="slider__left-value">
                    {minVal}
                    {/*<input*/}
                    {/*    type="number"*/}
                    {/*    value={minVal}*/}
                    {/*    min={min}*/}
                    {/*    max={+maxVal - 1}*/}
                    {/*    style={{width: "40px", height: "25px", marginLeft: "-10px"}}*/}
                    {/*    onChange={(e) => {*/}
                    {/*        const val = +e.currentTarget.value*/}
                    {/*        if (!val || val > maxVal || val < min)*/}
                    {/*            setMinVal(min)*/}
                    {/*        else*/}
                    {/*            setMinVal(val)*/}
                    {/*    }}*/}
                    {/*/>*/}
                </div>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={minVal}
                    onChange={(event) => {
                        const value = Math.min(Number(event.target.value), maxVal - 1);
                        setMinVal(value);
                    }}
                    className="thumb thumb--left"
                    // style={{zIndex: minVal > max - 100 && "5"}}
                    style={{zIndex: 5}}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    onChange={(event) => {
                        const value = Math.max(Number(event.target.value), minVal + 1);
                        setMaxVal(value);
                    }}
                    className="thumb thumb--right"
                />
                <div className="slider__right-value">
                    <span>{maxVal}</span>

                    {/*<input*/}
                    {/*    type="number"*/}
                    {/*    value={maxVal}*/}
                    {/*    min={+minVal + 1}*/}
                    {/*    max={max}*/}
                    {/*    style={{width: "40px", height: "25px", marginLeft: "-10px"}}*/}
                    {/*    onChange={(e) => {*/}
                    {/*        const val = +e.currentTarget.value*/}
                    {/*        if (!val || val < minVal || val > max)*/}
                    {/*            setMaxVal(max)*/}
                    {/*        else*/}
                    {/*            setMaxVal(val)*/}
                    {/*    }}*/}
                    {/*/>*/}
                </div>
                <div className="slider">
                    <div className="slider__track"/>
                    <div ref={range} className="slider__range"/>


                </div>
            </StyledSlider>
        );
    }
);
const StyledSlider = styled.div`
  align-self: center;
  position: relative;
  bottom: -9px;

  .slider {
    position: relative;
    width: 96%;
  }

  .slider__track,
  .slider__range {
    position: absolute;
    left: 0;
  }

  .slider__left-value,
  .slider__right-value {
    position: absolute;
  }

  .slider__track,
  .slider__range {
    border-radius: 3px;
    height: 5px;
  }

  .slider__track {
    background-color: #ced4da;
    width: 100%;
    z-index: 1;
  }

  .slider__range {
    background-color: ${secondColor};
    z-index: 2;
  }

  .slider__left-value,
  .slider__right-value {
    //color: #dee2e6;
    font-size: 24px;
    margin-top: -35px;
  }

  .slider__left-value {
    left: 2px;
  }

  .slider__right-value {
    right: -4px;
  }

  /* Removing the default appearance */

  .thumb,
  .thumb::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }

  .thumb {
    pointer-events: none;
    position: absolute;
    height: 0;
    width: 100%;
    outline: none;
  }

  .thumb--left {
    z-index: 3;
  }

  .thumb--right {
    z-index: 4;
  }

  /* For Chrome browsers */

  .thumb::-webkit-slider-thumb {
    background-color: rgb(192, 191, 191);
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

  /* For Firefox browsers */

  .thumb::-moz-range-thumb {
    background-color: #f1f5f7;
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