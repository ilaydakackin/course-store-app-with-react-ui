import { Alert, AlertTitle, Button, List, ListItem, ListItemText } from "@mui/material"
import requests from "../api/request"
import { useState } from "react"

export default function ErrorPage(){
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    function getValidationErrors()  
    {
        requests.Errors.getValidationError()
        .then(() => console.log("no-validation"))
        .catch(response => {
            console.log(response);
            setValidationErrors(response);
           
        })
    }
   
    return(
        <>
            {
                validationErrors.length > 0 && (
                    <Alert severity="error">
                        <AlertTitle>Validation Errors</AlertTitle>
                      <List>
                        {
                            validationErrors.map((error, index) => (
                                <ListItem key={index}>
                                    <ListItemText>{error}</ListItemText>
                                </ListItem>
                            ))
                        }
                      </List>
                    </Alert>
                )
            }
         
            <Button sx={{mr: 2}} variant="contained" onClick={() => requests.Errors.get400Error().catch(error => console.log(error))}>400 Error</Button>
            <Button sx={{mr: 2}} variant="contained" onClick={() => requests.Errors.get401Error().catch(error => console.log(error))}>401 Error</Button>
            <Button sx={{mr: 2}} variant="contained" onClick={() => requests.Errors.get404Error().catch(error => console.log(error))}>404 Error</Button>
            <Button sx={{mr: 2}} variant="contained" onClick={() => requests.Errors.get500Error().catch(error => console.log(error))}>500 Error</Button>
            <Button sx={{mr: 2}} variant="contained" onClick={getValidationErrors}>Validation Error</Button>
     
        </>
    )
}
