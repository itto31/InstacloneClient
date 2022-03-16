import React from 'react';
import "./RightHeader.scss"
import { Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import useAuth from "../../../hooks/useAuth";
import ImageNoFound from "../../../assets/png/avatar.png";
import {GET_USER} from "../../../gql/user";
import {useQuery} from "@apollo/client";
  
export default function RightHeader() {
    const {auth} = useAuth();
    const {data,loading,error} = useQuery(GET_USER,{
            variables:{username:auth.username}
    });

    if(loading || error)return null;
    const {getUser}= data;

return (
   <div className='right-menu'>
       <Link to="/">
           <Icon name="home"/>
       </Link>
       <Icon name="plus" />
       <Link to={`/${auth.username}`}>
        <Image src={getUser.avatar? getUser.avatar : ImageNoFound} avatar />
       </Link>
   </div>
  );
}
