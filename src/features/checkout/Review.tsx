import { DeliveryDining, Payments } from "@mui/icons-material";
import { Divider, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function ReviewPage() {
    //başka sayfalardan-formlardan gelen verileri almak için useFormContext kullanıyoruz
     const {getValues} = useFormContext();
    return (
       <Stack spacing={2} sx={{mb: 3}}>
            <Stack direction="column" divider={<Divider/>} spacing={2} sx={{my: 2}}>
            <div>
                <Typography variant="subtitle2" gutterBottom sx={{display: "flex", alignItems: "center", mb:2, }}>
                    <DeliveryDining color="primary" sx={{mr:1}}/>Teslimat bilgileri
                </Typography>
                <Typography sx={{color: "text.secondary"}} variant="body1" gutterBottom>{getValues("firstname")} {getValues("lastname")}</Typography>
                <Typography sx={{color: "text.secondary"}} variant="body1" gutterBottom>{getValues("phone")} </Typography>
                <Typography sx={{color: "text.secondary"}} variant="body1" gutterBottom>{getValues("adresline")} / {getValues("city")}</Typography>
            </div>
                <div>
                <Typography variant="subtitle2" gutterBottom sx={{display: "flex", alignItems: "center", mb:2,}}>
                    <Payments color="primary" sx={{mr:1}}/>
                    Ödeme bilgileri
                </Typography>
                <Typography sx={{color: "text.secondary"}} variant="body1" gutterBottom>{getValues("cardname")}</Typography>
                <Typography sx={{color: "text.secondary"}} variant="body1" gutterBottom>{getValues("cardnumber")} </Typography>
               
            </div>
                
            </Stack>
       </Stack>
        
    )
}