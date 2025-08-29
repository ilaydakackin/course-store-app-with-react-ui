/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, Button, Grid, Paper, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import AdressForm from "./AdressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import Info from "./Info";
import { useState } from "react";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import { FieldValues, FormProvider, set, useForm } from "react-hook-form";
import requests from "../../api/request";
import { useAppDispatch } from "../../store/store";
import { clearCart } from "../Cart/cartSlice";
import { LoadingButton } from "@mui/lab";

const steps = ["Teslimat bilgileri", "Ödeme Sayfaları", "Sipariş Özeti"];

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <AdressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review />;
        default:
            throw new Error("Bilinmeyen bir step");
    }
}

export default function CheckOutPage() {
    const [activeStep, setActiveStep] = useState(0);
    const methods = useForm();
    const [orderId, setOrderId] = useState<string | number | null>(null);

    const [loading, setLoading] = useState(false); 
    const dispatch  = useAppDispatch();

    async function handlenext(data: FieldValues){
        if(activeStep === 2){
            setLoading(true);
            try{
               
                setOrderId((await requests.Orders.createOrder(data) as {id: number}).id);
                setActiveStep(activeStep + 1);
                dispatch(clearCart())
                setLoading(false);
                
            }catch(error: any){
                console.log(error);
                setLoading(false);
            }
           
        }else{
            setActiveStep(activeStep +1)
        }    
    }

     function handleprevious(){
        setActiveStep(activeStep -1) 
    }
    return (
        <FormProvider {...methods}>
          <Paper>
            <Grid container spacing={4}>
                {activeStep !== steps.length && (
                    <Grid size={4} sx={{borderRight: "1px solid", borderColor:"divider", p:3}}><Info/></Grid>
                )}
                
                 <Grid size={ activeStep !== steps.length ? 8: 12} sx={{p:3}}>
                    <Box>
                        <Typography variant="h4" gutterBottom>
                            Checkout
                        </Typography>
                        <Stepper activeStep={activeStep}  sx={{height: 40, mb: 4 }} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                    <Box>
                        {activeStep === steps.length ? (
                            <Stack spacing={2} sx={{mb: 3}}>
                                <Typography variant="h6" gutterBottom>
                                    Siparişiniz alındı
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Siparişiniz başarıyla alındı. Siparişiniz en kısa sürede hazırlanacaktır.
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Sipariş numaranız: <strong>#{orderId}</strong>
                                    Siparişiniz onaylandığında e-pasta gönderilecektir
                                    <Button 
                                        sx={{alignSelf: "start", width:{xs: "100%", sm: "auto"}}}
                                        variant="contained">Siparişleri Listele</Button>
                                </Typography>
                               
                            </Stack>
                        ):(
                            <form onSubmit={methods.handleSubmit(handlenext)}>
                                {getStepContent(activeStep)}
                                 <Box>
                                    <Box sx={
                                        [
                                            {display: "flex"}, 
                                            activeStep !== 0 
                                            ? {justifyContent: "space-between"} 
                                            : {justifyContent: "flex-end"}
                                        ]
                                    }>
                                        {
                                            activeStep !== 0 && 
                                                <Button onClick={handleprevious} startIcon={<ChevronLeftRounded/>} variant="contained">Geri</Button>
                                        }
                                       
                                        <LoadingButton 
                                            type="submit"
                                            loading = {loading}
                                            startIcon={<ChevronRightRounded/>} 
                                            variant="contained">
                                            {activeStep === 2 ? "Siparişi Tamamla" : "Devam Et"}
                                            </LoadingButton>
                                    </Box>
                                </Box>
                            </form>
                        )}
                    </Box>                   
                 </Grid>              
            </Grid>
          </Paper>
        </FormProvider>
    )
}