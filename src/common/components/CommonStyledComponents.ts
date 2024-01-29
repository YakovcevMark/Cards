import styled from "styled-components";
export const SDopInputControl = styled.div`
    position: absolute;
    top: 15px;
    right: 30px;
    display: inline-block;
    width: 24px;
    height: 24px;
    &:hover {
        cursor: pointer;
    }
`

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

export const SPagesContainer = styled.div`
  align-self: center;
  justify-self: center;
  padding-top: 20px;
  border-radius: 10px;
  width: 500px;
  height: 65vh;
  background: white;
`
export const SForm = styled.form`
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