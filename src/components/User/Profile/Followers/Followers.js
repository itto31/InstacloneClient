import React , {useState,useEffect}from 'react'
import "./Followers.scss"
import {size} from "lodash"
import {useQuery} from "@apollo/client"
import {GET_FOLLOWERS, GET_FOLLOWING} from "../../../../gql/follow";
import ListUsers from '../../ListUsers/ListUsers';
import ModalBasic from "../../../../components/Modal/ModalBasic";

export default function Followers(props) {
    const {username,totalpublications} = props;
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState("")
    const [childrenModal, setChildrenModal] = useState(null)

  const {data: dataFolloweds, loading: loadigFolloweds, startPolling: startPollingFolloweds ,stopPolling: stopPollingFolloweds}=useQuery(GET_FOLLOWING, {
    variables:{ username}
  })



    const {data: dataFollowers, loading: loadingFollowers,startPolling:startPollingFollowers,stopPolling:stopPollingFollowers} = useQuery(GET_FOLLOWERS, {
        variables: {username}
    })  

    useEffect(() => {
      startPollingFollowers(1000);
      return() =>{
        stopPollingFollowers();
      }
    },[startPollingFollowers,stopPollingFollowers])

    useEffect(() => {
      startPollingFolloweds(1000);
      return() =>{
        stopPollingFolloweds();
      }
    },[startPollingFolloweds,stopPollingFolloweds])

    if (loadingFollowers|| loadigFolloweds) {
      return null
    }
    const {getFollowers} = dataFollowers;
    const{getFolloweds} = dataFolloweds;


    
    const openFollowers = () => {
      setTitleModal("Seguidores")
      setChildrenModal(<ListUsers users={getFollowers} setShowModal={setShowModal}/>)
      setShowModal(true)
    }
    const openFolloweds = () => {
      setTitleModal("Usuarios Seguidos")
      setChildrenModal(<ListUsers users={getFolloweds} setShowModal={setShowModal}/>)
      setShowModal(true)
    }
    return (
      <>
    <div className='followers'>
        <p><span>{totalpublications} </span>Publicaciones</p>
        <p className='link' onClick={openFollowers}><span>{size(getFollowers)}</span> seguidores</p>
        <p className='link' onClick={openFolloweds}><span>{size(getFolloweds)} </span> seguidos</p>
        </div>
        <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
        </ModalBasic>
        </>
  )
}
