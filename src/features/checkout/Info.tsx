import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { useAppSelector } from "../../store/store";
import { currensyTRY } from "../../utils/formatCurrency";

export default function InfoPage() {
    const {cart} = useAppSelector(state => state.cart);
    //Cart üzerindeki ürünlerin toplam fiyatını hesapla
      const subTotal = cart?.cartItems.reduce((toplam, item) => toplam + (item.quantity * item.price), 0) ?? 0;
    return (
        <>
            <Typography variant="h6" sx={{color:"text.secondary"}} gutterBottom></Typography>
            <Typography variant="h6" sx={{color:"text.secondary"}} gutterBottom>{currensyTRY.format(subTotal)}</Typography>
            <List>
                {cart?.cartItems.map(item => (
                    <ListItem key={item.productId}>
                        <ListItemAvatar>
                            <Avatar src={`http://localhost:5168/img/${item.imageUrl}`} />

                        </ListItemAvatar>
                        <ListItemText primary={item.name.substring(0,15)+ "..."} secondary={`x ${item.quantity}`} />
                        <Typography variant="body1" sx={{marginLeft: 2}}>{currensyTRY.format(item.price)}</Typography>
                        
                        
                    </ListItem>
                ))}
            </List>
        </>
       
    )
}