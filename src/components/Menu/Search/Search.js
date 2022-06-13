import React, {useState, useEffect} from 'react'
import "./Search.scss";
import { Search as SearchSu, Image } from 'semantic-ui-react';
import {Link} from "react-router-dom"
import { useQuery } from '@apollo/client';
import {SEARCH} from "../../../gql/user";
import {size} from "lodash";
import ImageNoFound from '../../../assets/png/avatar.png';

export default function Search() {
    const [search, setSearch] = useState(null)
    const [result, setResult] = useState(null)
    const {data, loading} = useQuery(SEARCH, {
        variables: { search},
    })

    useEffect(() => {
      if(size(data?.search)>0){
          const users = [];

          data.search.forEach((user,index) => {
            users.push({
                key: index,
                title: user.name,
                username: user.username,
                avatar: user.avatar,
            });
          })
          setResult(users)
      }else{
          setResult([])
      }
    }, [data])
    
    
    const onChange = (e) =>{
        if(e.target.value) setSearch(e.target.value);
        else setSearch(null);
    }

    const handleResultSelect = () => {
        setSearch(null);
        setResult([]);
    }

  return (
    <SearchSu
        className='search-users'
        fluid
        input ={{ icon: 'search', iconPosition: 'left' }}
        onSearchChange={onChange}
        loading={loading}
        value={search || ""}
        results={result}
        onResultSelect={handleResultSelect}
        resultRenderer={(e) => <ResultSearch data={e}/>}
    />
  )
}


function ResultSearch(props){
    const {data} = props;
    return(
        <Link className='search-users__item' to={`/${data.username}`}>
            <Image avatar src={data.avatar || ImageNoFound}/>
            <div >
                <p>{data.title}</p>
                <p>{data.username}</p>
            </div>
        </Link>
    )
}