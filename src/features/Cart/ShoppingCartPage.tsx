import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { AddCircleOutline, Delete, RemoveCircleOutline } from "@mui/icons-material";
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button } from '@mui/material';
import CartSummary from './Cartsummary.tsx';
import { currensyTRY } from '../../utils/formatCurrency.ts';
import { addItemToCart, deleteItemfromCart } from './cartSlice.ts';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { Link as RouterLink } from 'react-router-dom'; // Doğru Link import edildi


export default function SoppingCartPage()
{
        
      const { cart, status } = useAppSelector(state => state.cart);
      const dispatch = useAppDispatch();

      if( !cart || cart?.cartItems.length === 0) return <Alert severity="warning">Sepetinizde ürün yok</Alert>
      return (

        <>
        <h1>Shopping Cart</h1><TableContainer sx={{ minWidth: 650 }} aria-label="simple table">    
              <Table>
                  <TableHead>
                      <TableRow>
                          <TableCell>Resim</TableCell>
                          <TableCell>Ürün</TableCell>
                          <TableCell align="right">Fiyat</TableCell>
                          <TableCell align="right">Adet</TableCell>
                          <TableCell align="right">Toplam Fiyat</TableCell>
                          <TableCell align="right">İşlemler</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                  
                      {cart?.cartItems?.map((item) => (
                          <TableRow
                              key={item.productId}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                              <TableCell component="th" scope="row">
                                    <img src={`http://localhost:5168/img/${item.imageUrl}`} alt={item.name} style={{width: 50, height: 50}}/>
                              </TableCell>
                              <TableCell align="left">{item.name}</TableCell>
                              <TableCell align="right">{currensyTRY.format(item.price)} ₺</TableCell>
                              <TableCell align="right">
                                    <LoadingButton loading={status=== "pendingAddItem" + item.productId}
                                         onClick={() =>dispatch(addItemToCart({productId: item.productId}))}>
                                      <AddCircleOutline/>
                                    </LoadingButton>
                                    {item.quantity}
                                    <LoadingButton loading={status=== "pendingDeleteItem" + item.productId + "single"}
                                        onClick={() =>dispatch(deleteItemfromCart({productId: item.productId, quantity:1, key: "single"}))}>
                                    <RemoveCircleOutline/>
                                    </LoadingButton>     
                              </TableCell>
                              <TableCell align="right">{currensyTRY.format(item.price * item.quantity)} ₺</TableCell>
                              <TableCell align="right">
                               <LoadingButton color='error'
                                    loading={status=== "pendingDeleteItem" + item.productId + "all"}
                                    onClick={() =>dispatch(deleteItemfromCart({productId: item.productId, quantity: item.quantity, key:"all"}))}>
                                    <Delete/>
                                </LoadingButton>
                              </TableCell>

                          </TableRow>
                      ))}
                      <CartSummary/>
                  </TableBody>
              </Table>
          </TableContainer>
          <Box display="flex" justifyContent="flex-end" sx={{mt: 2}}>
            <Button component={RouterLink} to="/checkout" variant="contained" color="primary">
              CHECKOUT
            </Button>
          </Box>
         
           
          
       </>
    );

    

}

      
