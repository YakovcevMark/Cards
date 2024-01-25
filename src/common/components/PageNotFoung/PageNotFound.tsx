import {SHelperText, STitle} from "common/components/CommonStyledComponents";
import {useNavigate} from "react-router-dom";
import {Button} from "common/components/Button/Button";
import pageNotFoungSVG from "../../../assets/img/pageNotFoundSVG.svg";
import styled from "styled-components";

export const PageNotFound = () => {
    const nav = useNavigate()
    return <SPageNotFound>
        <img src={pageNotFoungSVG} alt="pageNotFoundSVG"/>
        <div>
            <STitle>
                Oooooops!
            </STitle>
            <SHelperText>
                Sorry! Page not found!
            </SHelperText>
            <Button
                onClick={() => nav("")}>
                Back to home page
            </Button>
        </div>
    </SPageNotFound>
}
const SPageNotFound = styled.div`
    display: grid;
    align-items: center;
    justify-items: center;
    height: 100vh;
    width: 100vw;
`