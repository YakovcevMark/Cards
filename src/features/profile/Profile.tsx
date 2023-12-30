import React, {useState} from 'react';
import PagesContainer from "../../common/components/PagesContainer/PagesContainer";
import Title from "../../common/components/Title/Title";
import HelperText from "../../common/components/HelperText/HelperText";
import Button from "../../common/components/Button/Button";
import {PhotoCamera} from "@styled-icons/material-outlined/PhotoCamera"
import {DriveFileRenameOutline} from "@styled-icons/material-outlined"
import {UserDataResponse} from "../../dal/api";
import {SubmitHandler, useForm} from "react-hook-form";
import Input from "../../common/components/Input/Input";
import styled from "styled-components";

type ProfileFormValues = {
    name: string
    avatar: string
}
const Profile = ({_id, email, avatar, publicCardPacksCount, name}: Partial<UserDataResponse>) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const {register, handleSubmit} = useForm<ProfileFormValues>()
    // const [,{isUninitialized, isError}] = useInitializeMutation()
    //
    // if (isUninitialized || isError) {
    //     return <Navigate to={`/${LoginPath}`}/>
    // }
    const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {

    }
    let content = !editMode
        ? (
            <>
                <span>
                    {name}
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
                    // disabled={isLoading}
                    // error={errors.email?.message}
                    register={register}
                >
                    <Button>
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
                        <img src={avatar} alt="avatar"/>
                        <Button
                            onClick={() => alert("heeeeeoooo")}
                            icon>
                            <PhotoCamera/>
                        </Button>
                    </Avatar>
                    <NickName>
                        {content}
                    </NickName>

                    <HelperText>
                        {email}
                    </HelperText>
                    <Button
                        gray>
                        LogOut
                    </Button>
                </ProfileContainer>
            </PagesContainer>
        </form>
    );
};
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
const NickNameSaveButton = styled.div`

`
export default Profile;