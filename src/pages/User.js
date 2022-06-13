import React, { useEffect } from 'react';
import Profile from "../components/User/Profile";
import {useParams} from "react-router-dom";
import { useQuery } from '@apollo/client';
import {GET_PUBLICATION} from "../gql/publication";
import { size } from 'lodash';
import Publications from '../components/Publications';


export default function User() {  
  const {username} = useParams();
  const {data, loading, startPolling, stopPolling} = useQuery(GET_PUBLICATION,{
    variables:{ username},
  })

  useEffect(() => {
  startPolling(2000);
  return () => {
    startPolling();
  }
  }, [startPolling,stopPolling])
   
  if(loading) return null;
  const {getPublication} = data;

  return (
    <>
    <Profile username={username} totalpublications={size(getPublication)} />
    <Publications publications={getPublication} />
    </>  
  );
}
