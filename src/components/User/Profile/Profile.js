import React, { useState } from 'react';
import "./Profile.scss";
import { useQuery} from "@apollo/client";
import {GET_USER} from "../../../gql/user";
import {Grid, Image} from "semantic-ui-react"
import ImageNoFound from "../../../assets/png/avatar.png";
import UserNotFound from '../../UserNotFound';
import ModalBasic from '../../Modal/ModalBasic';
import AvatarForm from '../AvatarForm';
import userAuth from "../../../hooks/useAuth";

export default function Profile(props) {
    const {username} = props;
    const {data,loading,error} = useQuery(GET_USER, {variables:{username}});
    const [showModal, setShowModal] = useState(false);
    const [childrenModal, setChildrenModal] = useState(null)
    const [titleModal, setTitleModal] = useState("")
    const {auth} = userAuth();
   

    if(loading)return null;
    if(error)return <UserNotFound/>
    const {getUser} = data;
    const handlerModal = (type) => {
        switch (type) {
            case "avatar":
                setTitleModal("Cambiar Foto de Perfil")
                setChildrenModal(<AvatarForm user={getUser} setShowModal={setShowModal} auth={auth}/>)
                setShowModal(true)
                break;
                default:
                    break;
        }
    }

  return (
  <>
    <Grid className='profile'>
        <Grid.Column width={5} className='profile__left'>
           <Image src={getUser.avatar ? getUser.avatar :ImageNoFound} avatar onClick={() => username === auth.username && handlerModal("avatar")}/>
        </Grid.Column>
        <Grid.Column width={11} className='profile__right'>
       <div>HeaderProfile</div>
       <div>Followers</div>
         <div className='other'>
             <p className='name'>{getUser.name}</p>
             {getUser.siteWeb &&(
                 <a href={getUser.siteWeb}target="_blank" className="siteWeb" rel="noreferrer" >
                     {getUser.siteWeb}
                 </a>
             )}
              {getUser.description &&(
                 <p href={getUser.description} className="description">
                     {getUser.description}
                 </p>
             )}
         </div>
        </Grid.Column>
    </Grid>
    <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
       {childrenModal}
    </ModalBasic>
  </>
  )
}