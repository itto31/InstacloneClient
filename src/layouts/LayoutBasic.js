import React from 'react';
import { Container } from 'semantic-ui-react';
import Menu from "../components/Menu";
export default function LayoutBasic(props) {
   const { children } = props;
    return (
        <>
        <Menu />
         <Container className='layout-basic'>
         {children}
         </Container>
       
        </>
   
    
    )

}
