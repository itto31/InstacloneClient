import React, { useState } from 'react'
import "./Actions.scss"
import { Icon } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/client';
import {ADD_LIKE,IS_LIKE, DISLIKE,COUNT_LIKES} from "../../../../gql/like.js";


export default function Actions(props) {
    const {publication} = props;
    const [loadingAction, setLoadingAction] = useState(false)
    const [addLike] = useMutation(ADD_LIKE);
    const [deleteLike] = useMutation(DISLIKE);
    const {data, loading, refetch} = useQuery(IS_LIKE,{
        variables: {
            idPublication: publication.id
        }
    })
    const {data:dataCount, loading: loadingCount, refetch: refetchCount} = useQuery(COUNT_LIKES,{
        variables: {idPublication: publication.id}
    }
    )
    if(loading || loadingCount) return null;
    const{isLike} = data;
    const {countLike} = dataCount;
    
    const onAction = () =>{
        if(!loadingAction){
            if(isLike){
                onDeleteLike();
            }else{
                onClickLike();
            }
        }
    }

    const onClickLike = async () => {
        setLoadingAction(true);
        try {
                await addLike({
                    variables: {
                        idPublication: publication.id
                    }
                })
                refetch();
                refetchCount();
        } catch (error) {
            console.log(error);
            
        }
        setLoadingAction(false);
    }

    const onDeleteLike = async () => {
        setLoadingAction(true);
       try {
           await deleteLike({
                variables: {
                    idPublication: publication.id
                }
           });
              refetch();
              refetchCount();
       } catch (error) {
           
       }
       setLoadingAction(false);
    }
  return (
    <div className='actions'>
        <Icon
        className={isLike ? "like active" : "like"}
        name={isLike ? "heart" : "heart outline"}
        onClick={onAction}
        />
        {countLike}  {countLike === 1 ? "Like" : "Likes"}
    </div>
  )
}
