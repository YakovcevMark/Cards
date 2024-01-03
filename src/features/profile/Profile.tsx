import React, {ChangeEvent, MouseEvent, useRef, useState} from 'react';
import PagesContainer from "../../common/components/PagesContainer/PagesContainer";
import Title from "../../common/components/Title/Title";
import HelperText from "../../common/components/HelperText/HelperText";
import Button from "../../common/components/Button/Button";
import {PhotoCamera} from "@styled-icons/material-outlined/PhotoCamera"
import {DriveFileRenameOutline} from "@styled-icons/material-outlined"
import {SubmitHandler, useForm} from "react-hook-form";
import Input from "../../common/components/Input/Input";
import styled from "styled-components";
import {Logout} from "@styled-icons/material";
import {useInitializeMutation, useLogoutMutation, useUpdateProfileMutation} from "../../dal/api/apiSlice";
import {Navigate} from "react-router-dom";
import {LoginPath} from "../../common/components/Routes/AppRoutes";
import userPNG from "../../assets/img/user.png"

type ProfileFormValues = {
    name: string
    avatar: string
}
const Profile = () => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)


    const [refetchMe, {data, isSuccess: isLoggedIn, isLoading: loadingInit}] = useInitializeMutation({
        fixedCacheKey: 'shared-postMe-post',
    })
    const [updateProfile, {isLoading: loadingUpdate}] = useUpdateProfileMutation()
    const [logOut, {isLoading: isLogOutLoading}] = useLogoutMutation()


    const {register, handleSubmit} = useForm<ProfileFormValues>({
        defaultValues:({
            name: loadingInit ? "" : data?.name
        })
    })

    const logoutHandler = async () => {
        await logOut()
        await refetchMe()
    }
    const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
        await updateProfile({name: data.name})
        await refetchMe()
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
                await updateProfile({avatar: reader.result});
                await refetchMe()
            }
        };
        reader.onerror = (error) => {
            console.log('Error: ', error);
        };

    };
    if (!isLoggedIn) {
        return <Navigate to={`/${LoginPath}`}/>
    }
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
                    // error={errors.email?.message}
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <PagesContainer>
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
            </PagesContainer>
        </form>
    );
};
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
  justify-self: center;
  display: grid;
  align-items: center;
  font-weight: bold;
`

export default Profile;