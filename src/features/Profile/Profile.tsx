import React, {useEffect, useState} from 'react';
import {Button} from "common/components/Button/Button";
import {PhotoCamera} from "@styled-icons/material-outlined/PhotoCamera"
import {DriveFileRenameOutline} from "@styled-icons/material-outlined"
import {SubmitHandler, useForm} from "react-hook-form";
import {Input} from "common/components/Inputs/Input";
import styled from "styled-components";
import {Logout} from "@styled-icons/material";
import {useInitializeMutation, useLogoutMutation, useUpdateProfileMutation} from "../authPages/authApi";
import userPNG from "../../assets/img/user.png"
import {yupResolver} from "@hookform/resolvers/yup";
import {NameSchema} from "utils/YupValidators/Validators";
import {useApiErrorsHandler} from "common/hooks/hooks";
import {BackArrowBlock} from "common/components/BackArrowBlock/BackArrowBlock";
import {
    SAvatarImg,
    SDopInputControl,
    SHelperText, SIconButton,
    SPagesContainer,
    STitle
} from "common/components/CommonStyledComponents";
import {ImageInput} from "common/components/Inputs/ImageInput/ImageInput";
import {useNavigate} from "react-router-dom";
import {PATH} from "common/components/Routes/AppRoutes";

type ProfileFormValues = {
    name?: string
    avatar?: string
}
export const Profile = () => {
    const nav = useNavigate()
    const [editMode, setEditMode] = useState<boolean>(false)

    const [, {data, isLoading: loadingInit}] = useInitializeMutation({
        fixedCacheKey: 'shared-postMe-post',
    })

    const [updateProfile, {
        isLoading: loadingUpdate
    }] = useUpdateProfileMutation()

    const [logOut, {
        isLoading: isLogOutLoading,
        isSuccess: isLogOutSuccess,
    }] = useLogoutMutation()

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<ProfileFormValues>({
        defaultValues: ({
            name: loadingInit ? "" : data?.name
        }),
        resolver: yupResolver(NameSchema)
    })

    const onUpdateProfile = useApiErrorsHandler(updateProfile, true)
    const onLogout = useApiErrorsHandler(logOut, true)
    const logoutHandler = async () => {
        await onLogout()
    }
    const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
        await onUpdateProfile({name: data.name})
        setEditMode(false)
    }

    useEffect(() => {
        isLogOutSuccess && nav(PATH.login)
    }, [isLogOutSuccess, nav]);

    let content = editMode
        ? (
            <>
                <Input
                    placeholder={"Name"}
                    disabled={loadingUpdate}
                    error={errors.name?.message}
                    register={register}
                >
                    <SDopInputControl>
                        <Button
                            type={"submit"}
                            disabled={loadingUpdate}>
                            save
                        </Button>
                    </SDopInputControl>
                </Input>
            </>
        ) : (
            <>
                <span>
                    {data!.name}
                    <SIconButton
                        icon
                        onClick={() => {
                            setEditMode(mode => !mode)
                        }}>
                    <DriveFileRenameOutline/>
                </SIconButton>
                </span>
            </>
        )


    return <>
        <BackArrowBlock/>
        <SForm onSubmit={handleSubmit(onSubmit)}>
            <SProfileContainer>
                <STitle>Personal Information</STitle>
                <SAvatar>
                    <SAvatarImg src={userPNG && data?.avatar} alt="avatar"/>
                    <ImageInput
                        isIcon
                        buttonBody={<PhotoCamera/>}
                        imageHandler={(file) => onUpdateProfile({avatar: file})}/>
                </SAvatar>
                <SNickName>
                    {content}
                </SNickName>
                <SHelperText>
                    {data!.email}
                </SHelperText>
                <Button
                    disabled={isLogOutLoading}
                    onClick={logoutHandler}
                    gray>
                        <span>
                            <SLogOutIcon
                                style={{width: "2.5vh"}}/>
                            Log out
                        </span>
                </Button>
            </SProfileContainer>
        </SForm>
    </>
};

const SLogOutIcon = styled(Logout)`
    width: 2vh;
`
const SForm = styled.form`
    display: grid
`
const SProfileContainer = styled(SPagesContainer)`
    display: grid;
    justify-items: center;
    grid-template-rows: 15% 30% 20% 15% 30%;
`

const SAvatar = styled.div`
    position: relative;
    overflow: hidden;
    width: 15vh;
    height: 15vh;

    button {
        border: white 1px solid;
        width: 5vh;
        height: 5vh;
        background-color: #b7b0b0;
        object-fit: cover;

        svg {
            color: white;
            width: 100%;
            height: 100%;
        }

        position: absolute;
        border-radius: 50%;
        left: 10vh;
        bottom: 0;
    }
`
const SNickName = styled.div`
    width: 100%;
    justify-items: center;
    display: grid;
    align-items: center;
    font-weight: bold;
`
