
import { Grid, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function PaymentFormPage() {
    const {register, formState: {errors}} = useFormContext();
    return (
        <>
           <Typography variant="h6" sx={{mb:1}} gutterBottom>Ödeme Bilgileri</Typography>
           <Grid container spacing={3}>
           
            <Grid size={{xs: 12, md: 6}}>
                
                <TextField
                    {...register("cardname", {required: "card name is required"})}
                    label="Enter card name"  
                    fullWidth   
                    sx={{mb:1}} size="small"
                    error={!!errors.cardname}></TextField>                
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
                <TextField
                    {...register("cardnumber", {required: "card number is required"})}
                    label="Enter card number"  
                    fullWidth   
                    sx={{mb:1}} size="small"
                    error={!!errors.cardnumber}></TextField>                
            </Grid>
            <Grid size={{xs: 6, md: 4}}>
                <TextField
                    {...register("cardexpiremonth", {required: "expiry month is required"})}
                    label="Enter expiry month"  
                    fullWidth   
                    sx={{mb:1}} size="small"
                    error={!!errors.cardexpiremonth}></TextField>                           
            </Grid>
             <Grid size={{xs: 6, md: 4}}>
                <TextField
                    {...register("cardexpireyear", {required: "expiry year is required"})}
                    label="Enter expiry year"  
                    fullWidth   
                    sx={{mb:1}} size="small"
                    error={!!errors.cardexpireyear}></TextField>                           
            </Grid>
            <Grid size={{xs: 12, md: 4}}>
                <TextField
                    {...register("cardcvc", {required: "Cvc is required"})}
                    label="Enter Cvc"  
                    fullWidth   
                    sx={{mb:1}} size="small"
                    error={!!errors.cardcvc}></TextField>                
            </Grid>
            
        </Grid>
        </>
    )
}