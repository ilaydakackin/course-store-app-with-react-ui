
import { LockOutlined } from "@mui/icons-material";
import { FieldValues, useForm } from "react-hook-form";
import { Avatar, Box, Container, Paper, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router";
import requests from "../../api/request";
import { toast } from "react-toastify";
import { useState } from "react";

export default function RegisterPage() {
    const [apiErrors, setApiErrors] = useState<{ code: string, description: string }[]>([]);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            username: "",
            password: "",
            name: "",
            email: ""
        }
    });
    async function submitForm(data: FieldValues) {
        requests.Account.register(data)
            .then(() => {
                toast.success("user created")
                navigate("/login");
            }).catch(result => {
                setApiErrors(result);
            });

    }
    console.log(errors);
    return (
        <Container maxWidth="xs">

            <Paper sx={{ marginTop: 8, padding: 2 }} elevation={3}>
                <Avatar sx={{ mx: "auto", color: 'secondary.main', textAlign: 'center', mb: 1 }}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5" component="h1" align="center" gutterBottom>
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        {...register("username", { required: "username is required", minLength: { value: 8, message: "Min length is 6 characters" } })}
                        label="Enter username"
                        fullWidth autoFocus
                        sx={{ mb: 2 }} size="small"
                        error={!!errors.username}
                        helperText={errors.username?.message}></TextField>
                    <TextField
                        {...register("name", { required: "name is required", minLength: { value: 8, message: "Min length is 6 characters" } })}
                        label="Enter name"
                        fullWidth
                        sx={{ mb: 2 }} size="small"
                        error={!!errors.name}
                        helperText={errors.name?.message}></TextField>
                    <TextField
                        {...register("email", { required: "email is required", minLength: { value: 8, message: "Min length is 6 characters" } })}
                        label="Enter email"
                        fullWidth
                        sx={{ mb: 2 }} size="small"
                        error={!!errors.email}
                        helperText={errors.email?.message}></TextField>

                    <TextField
                        {...register("password", { required: "password is required", minLength: { value: 6, message: "Min length is 6 characters" } })}
                        label="Enter password"
                        type="password"
                        fullWidth
                        sx={{ mb: 2 }} size="small"
                        error={!!errors.password}
                        helperText={errors.password?.message}> </TextField>

                    {apiErrors.length > 0 && apiErrors.map((error) => (
                        <Typography key={error.code} color="error" variant="body2" align="center">
                            {error.description}
                        </Typography>
                    ))}

                    <LoadingButton
                        loading={isSubmitting}

                        type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                        Register
                    </LoadingButton>
                </Box>
            </Paper>
        </Container>
    );
}


