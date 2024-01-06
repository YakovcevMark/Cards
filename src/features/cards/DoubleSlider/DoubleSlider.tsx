import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from "styled-components";

type PT = {
    min: number,
    max: number,
    onChange: ({min, max}: { min: number, max: number }) => void
}
export const DoubleSlider = ({min, max, onChange}: PT) => {
    const [minVal, setMinVal] = useState<string | number>(min);
    const [maxVal, setMaxVal] = useState<string | number>(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef<any>(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(+minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(+maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        onChange({min: +minVal, max: +maxVal});
    }, [minVal, maxVal, onChange]);

    return (
        <StyledSlider className="container">
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), +maxVal - 1);
                        setMinVal(value);
                    minValRef.current = value;
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
                    const value = Math.max(Number(event.target.value), +minVal + 1);
                    setMaxVal(value);
                    maxValRef.current = value;
                }}
                className="thumb thumb--right"
            />

            <div className="slider">
                <div className="slider__track"/>
                <div ref={range} className="slider__range"/>
                <div className="slider__left-value">
                    <input
                        value={minVal}
                        min={min}
                        max={max}
                        style={{width: "40px", height: "25px", marginLeft: "-10px"}}
                        onBlur={(e) => {
                            const val = e.currentTarget.value;
                            if(val < `${max}` && val >= `${min}`) {
                                setMinVal(e.currentTarget.value);
                            }
                        }}
                    />
                </div>
                <div className="slider__right-value">
                    <input
                        value={maxVal}
                        min={min - 1}
                        max={max}
                        style={{width: "40px", height: "25px", marginLeft: "-10px"}}
                        onChange={(e) => {
                            const val = e.currentTarget.value;
                            if(val < `${max}` || val >= `${min}`) {
                                setMaxVal(e.currentTarget.value);
                            }
                        }}
                    />
                </div>
            </div>
        </StyledSlider>
    );
};
const StyledSlider = styled.div`
  .container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slider {
    position: relative;
    width: 200px;
  }

  .slider__track,
  .slider__range,
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
    background-color: #0d48c0;
    z-index: 2;
  }

  .slider__left-value,
  .slider__right-value {
    color: #dee2e6;
    font-size: 12px;
    margin-top: 20px;
  }

  .slider__left-value {
    left: 6px;
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
    width: 200px;
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
    background-color: #e13838;
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