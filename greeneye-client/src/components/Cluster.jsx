import { Grid, List, ListItem, Typography } from '@material-ui/core'
import React from 'react'


const API_URL = "http://localhost:3500/";

function Cluster({ cluster }) {
    
    return (
        <div>
            <List>
                <Grid container direction="row" alignitems="center">
                    <Grid item xs={6}>
                        <Typography variant="h4">
                            Label: {cluster.label}, Centroid: 
                        </Typography>
                        <img src={API_URL + cluster.centroidSrc}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h4">
                             among others,   
                        </Typography>
                        <List>
                            {cluster?.pointsSrc?.map( (pointSrc, index) => (
                                <ListItem key={index}>
                                    <img src={API_URL + pointSrc}/>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </List>
        </div>
    )
}

export default Cluster
