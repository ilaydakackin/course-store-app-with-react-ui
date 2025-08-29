/* eslint-disable @typescript-eslint/no-explicit-any */
import {LockOutlined } from "@mui/icons-material";
import{ FieldValues, useForm} from "react-hook-form";
import { Avatar, Box, Container, Paper, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { loginUser } from "./accountSlice";
import { useLocation, useNavigate } from "react-router";
import { useAppDispatch } from "../../store/store";
import { useState } from "react";
import { getCart } from "../Cart/cartSlice";


export default function LoginPage() {
    
    const [apiError, setApiError] = useState<string | null>(null);
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm({
        defaultValues: {
            username: "",
            password: ""
        }
    });
    async function  submitForm(data: FieldValues) {
        const result = await dispatch(loginUser(data));
        await dispatch(getCart());
 
        if (result.meta.requestStatus === "fulfilled") {
             navigate(location.state?.from || "/catalog");
        } else {
            setApiError("Kullanıcı adı veya şifre hatalı.");
        }
      
                      
    }

    return (
        <Container maxWidth="xs">

            <Paper sx={{marginTop: 8, padding:2}} elevation={3}>
                <Avatar sx={{ mx: "auto", color: 'secondary.main', textAlign: 'center', mb: 1 }}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5" component="h1" align="center" gutterBottom>
                    Login   
                </Typography>
                <Box component="form" onSubmit={handleSubmit(submitForm)}  noValidate sx={{ mt: 1 }}>
                    <TextField
                        {...register("username", {required: "username is required", minLength: {value: 8, message: "Min length is 6 characters"}})}
                        label="Enter username"  
                        fullWidth required autoFocus 
                        sx={{mb:2}} size="small"
                        error={!!errors.username}
                        helperText={errors.username?.message}></TextField>
                        <TextField 
                        {...register("password", {required: "password is required", minLength: {value: 6, message: "Min length is 6 characters"}})}
                        label="Enter password" 
                        type="password" 
                        fullWidth required 
                        sx={{mb:2}} size="small"
                        error={!!errors.password}
                        helperText={errors.password?.message}> </TextField>
                    
                    {apiError && (
                         <Typography color="error" align="center">{apiError}</Typography>
                    )}  
                    <LoadingButton
                     loading={isSubmitting}
                     type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                        Login
                    </LoadingButton>
                </Box>
            </Paper>
        </Container>
    );
}


