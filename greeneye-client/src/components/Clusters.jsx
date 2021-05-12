import { Divider, Grid, List, ListItem, Typography } from "@material-ui/core";
import React from "react";
import Cluster from "./Cluster";



function Clusters({ centroidsLabelsPoints }) {
    
  return (
    <div>
        <Typography variant="h1">
            Clusters
        </Typography>
      <List>
        {centroidsLabelsPoints?.map ( (cluster, index) => (
            <ListItem key={cluster?.centroidSrc}>
                <Grid container direction="column">
                    <Typography>
                        Cluster number {index + 1}
                    </Typography>
                    <Cluster cluster={cluster}/>
                    <Divider/>
                </Grid>
            </ListItem>
        ))}
        
      </List>
    </div>
  );
}

export default Clusters;
