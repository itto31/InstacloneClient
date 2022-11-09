import React from "react";
import "./Publications.scss";
import { Grid } from "semantic-ui-react";
import { map } from "lodash";
import PreviewPublication from "./PreviewPublication";

export default function Publications(props) {
  const { publications } = props;

  return (
    <div className="publications">
      <h1>Publicaciones</h1>
      <Grid columns={4}>
        {map(publications, (publications, index) => (
          <Grid.Column key={index}>
            <PreviewPublication publication={publications} />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
}
