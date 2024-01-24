import styled from "styled-components";
export const SAvatarImg = styled.img`

    border-radius: 50%;
    height: 100%;
    width: 100%;
    object-fit: cover;

`
export const SHelperText = styled.h6`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0;
  text-align: left;
  opacity: 0.8;
`

export const STitle = styled.h1`
  font-size: 26px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0;
  text-align: left;
`
export const SHoverModule = styled.div`
    //background-color: blueviolet;
    display: none;
    border: 1px rgba(0, 0, 0, 0.47) solid;
    position: absolute;
    top: 7vh;
    right: 3vh;
    z-index: 99;

    button {
        width: 100%;
        display: grid;
        grid-template-columns: 1vh 1fr;
        grid-gap: 15px;
        align-items: center;
        padding: 1vh;
        border: none;
        //background-color: burlywood;
        background-color: white;

        svg {
            width: 2vh;
            padding-right: 1vh;

            &:enabled {
                fill: black;
            }
        }

        span {
            justify-self: start;
            padding-left: 1vh;
        }

        &:enabled:hover {
            background-color: #d2d2d2;
            cursor: pointer;
        }
    }
`
export const SPagesContainer = styled.div`
  align-self: center;
  justify-self: center;
  padding-top: 20px;
  border-radius: 10px;
  width: 50vh;
  height: 65vh;
  background: white;
`
export const SForm =styled.form`
    display: grid;
    width: 90%;
    height: 90%;
    margin: 0 auto;
`
export const SControlSection = styled.section`
  width: 100%;
  display: grid;
  justify-items: center;
  align-self: end;
`
export const  SInputsSection= styled.section`
  width: 100%;
  height: 50%;
  display: grid;
  justify-items: center;
`
export const SButtonControl = styled.div`
  width: 80%;

  button {
    width: 100%;
  }
`