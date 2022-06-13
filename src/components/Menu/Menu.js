import React from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';
import "./Menu.scss";
import Logo from "../../assets/png/instaclone.png";
import {Link} from "react-router-dom"
import RightHeader from './RightHeader';
import Search from './Search';
export default function Menu() {
    return(
      <div className='menu'>
          <Container>
              <Grid>
                  <Grid.Column width={3} className='menu__logo'>
                      <Link to="/"> 
                      <Image src={Logo} alt="Insataclone"/>
                      </Link>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Search/>
                  </Grid.Column>
                  <Grid.Column width={3}>
                   <RightHeader/>
                  </Grid.Column>
                  </Grid>
                  </Container>
      </div>
    );
}
