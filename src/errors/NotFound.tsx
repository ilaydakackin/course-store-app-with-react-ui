import { Container, Divider, Typography } from "@mui/material";
import { useLocation } from "react-router";

export default function NotFound()
{
    const {state} = useLocation();
    return(
        <Container   >
            {
                state?.error ? (
                    <>
                        <Typography variant="h5" gutterBottom>{state.error.title} - {state.status}</Typography>
                        <Divider />
                        <Typography variant="body2">{state.error.detail || "unkown Error"} </Typography>
                    </>
                ) : 
                (
                    <Typography variant="h5">Not Found</Typography> 
                )
            }
        </Container>
        
    );
}