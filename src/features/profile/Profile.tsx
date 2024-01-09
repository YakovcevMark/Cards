import React, {ChangeEvent, MouseEvent, useRef, useState} from 'react';
import PagesContainer from "../../common/components/PagesContainer/PagesContainer";
import Title from "../../common/components/Title/Title";
import HelperText from "../../common/components/HelperText/HelperText";
import Button from "../../common/components/Button/Button";
import {PhotoCamera} from "@styled-icons/material-outlined/PhotoCamera"
import {DriveFileRenameOutline, KeyboardBackspace} from "@styled-icons/material-outlined"
import {SubmitHandler, useForm} from "react-hook-form";
import Input from "../../common/components/Input/Input";
import styled from "styled-components";
import {Logout} from "@styled-icons/material";
import {useInitializeMutation, useLogoutMutation, useUpdateProfileMutation} from "../../dal/api/apiSlice";
import userPNG from "../../assets/img/user.png"
import {yupResolver} from "@hookform/resolvers/yup";
import {NameSchema} from "../../utils/YupValidators/Validators";
import {useApiErrorsHandler} from "../../common/hooks/hooks";
import {useNavigate} from "react-router-dom";
import {PacksPath} from "../../common/components/Routes/AppRoutes";

type ProfileFormValues = {
    name?: string
    avatar?: string
}
const Profile = () => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const nav = useNavigate()

    const [, {data, isLoading: loadingInit}] = useInitializeMutation({
        fixedCacheKey: 'shared-postMe-post',
    })
    const [updateProfile, {isLoading: loadingUpdate}] = useUpdateProfileMutation()
    const [logOut, {isLoading: isLogOutLoading}] = useLogoutMutation()
    const onUpdateProfile = useApiErrorsHandler(updateProfile)
    const onLogout = useApiErrorsHandler(logOut, true)
    const {register, handleSubmit, formState: {errors}} = useForm<ProfileFormValues>({
        defaultValues: ({
            name: loadingInit ? "" : data?.name
        }),
        resolver: yupResolver(NameSchema)
    })
    const logoutHandler = async () => {
        await onLogout()
    }
    const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
        await onUpdateProfile({name: data.name})
        setEditMode(false)
    }

    const changeAvatar = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        inputRef.current && inputRef.current.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const fileObj = event.target.files && event.target.files[0];
        const reader = new FileReader();
        if (!fileObj) {
            return;
        }
        reader.readAsDataURL(fileObj);
        reader.onload = async () => {
            if (reader.result) {
                await onUpdateProfile({avatar: reader.result});
            }
        };
        reader.onerror = (error) => {
            console.log('Error: ', error);
        };
    };
    const backButtonHandler = () => nav(PacksPath)
    let content = !editMode && !loadingInit
        ? (
            <>
                <span>
                    {data!.name}
                    <Button
                        icon
                        onClick={() => {
                            setEditMode(mode => !mode)
                        }}>
                    <DriveFileRenameOutline/>
                </Button>
                </span>
            </>
        )
        : (
            <>
                <Input
                    label={"Name"}
                    disabled={loadingUpdate}
                    error={errors.name?.message}
                    register={register}
                >
                    <Button
                        disabled={loadingUpdate}>
                        save
                    </Button>
                </Input>
            </>
        )

    return (

        <>
            <BackArrowBlock
                onClick={backButtonHandler}>
                <KeyboardBackspace/>
                Back to Packs List
            </BackArrowBlock>

            <PagesContainer>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <ProfileContainer>
                        <Title>Personal Information</Title>

                        <Avatar>
                            <img src={userPNG && data?.avatar} alt="avatar"/>
                            <input
                                type="file"
                                style={{display: "none"}}
                                ref={inputRef}
                                onChange={handleFileChange}
                            />
                            <button
                                onClick={changeAvatar}>
                                <PhotoCamera/>
                            </button>
                        </Avatar>
                        <NickName>
                            {content}
                        </NickName>

                        <HelperText>
                            {data!.email}
                        </HelperText>
                        <Button
                            disabled={isLogOutLoading}
                            onClick={logoutHandler}
                            gray>
                        <span>
                            <LogOutIcon
                                style={{width: "2.5vh"}}/>
                            Log out
                        </span>
                        </Button>
                    </ProfileContainer>
                </form>
            </PagesContainer></>
    );
};
const BackArrowBlock = styled.button`
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;

  border: none;
  width: 18vh;
  height: 5vh;
  
  display: grid;
  grid-template-columns: 2.5vh 1fr;
  align-items: center;
  cursor: pointer;
  position: absolute;
`
const LogOutIcon = styled(Logout)`
  width: 2vh;
`
const ProfileContainer = styled.div`
  display: grid;
  justify-items: center;
  grid-template-rows: 15% 30% 20% 15% 30%;
`
const Avatar = styled.div`
  position: relative;
  overflow: hidden;
  width: 15vh;
  height: 15vh;

  img {
    border-radius: 50%;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

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
const NickName = styled.div`
  width: 100%;
  justify-items: center;
  display: grid;
  align-items: center;
  font-weight: bold;
`

export default Profile;