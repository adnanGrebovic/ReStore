import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import Agent from "../../app/api/agent";
import { useState } from "react";

export default function AboutPage(){
    const[validationErrors, setValidationErrors]= useState<string[]>([]);
    function getValidationErrors(){
        Agent.TestErrors.getValidationError()
        .then(()=>console.log("Should not see this"))
        .catch(error=>setValidationErrors(error));
        }
    
    return(
        <Container>
            <Typography gutterBottom variant="h2">Errors for testing purposes</Typography>
            <ButtonGroup fullWidth>
                <Button  onClick={()=>Agent.TestErrors.get400Error().catch(error=>console.log(error))} variant="contained">Test 400 Error</Button>
                <Button  onClick={()=>Agent.TestErrors.get401Error().catch(error=>console.log(error))} variant="contained">Test 401 Error</Button>
                <Button  onClick={()=>Agent.TestErrors.get404Error().catch(error=>console.log(error))} variant="contained">Test 404 Error</Button>;
                <Button  onClick={() => Agent.TestErrors.get500Error().catch(error => console.log(error))} variant="contained">Test 500 Error</Button>
                <Button  onClick={getValidationErrors} variant="contained">Test Validation Error</Button>
            </ButtonGroup>
            {validationErrors.length>0 &&
            <Alert severity='error'>
                <AlertTitle>Validation error</AlertTitle>
                <List>
                    {validationErrors.map(error=>(
                        <ListItem key={error}>
                            <ListItemText>{error}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Alert>
            }
        </Container>
    )


}



