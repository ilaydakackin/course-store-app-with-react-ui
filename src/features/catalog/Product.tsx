/* eslint-disable @typescript-eslint/no-unused-vars */
import Card from "@mui/material/Card";
import {Button, CardActions, CardContent, CardMedia, Link, Typography } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { IProduct } from "../../model/IProduct";
import { useState } from "react";
import requests from "../../api/request";
import { LoadingButton } from "@mui/lab";
import { addItemToCart, setCart } from "../Cart/cartSlice.ts";
import { toast } from "react-toastify";
import { currensyTRY } from "../../utils/formatCurrency";
import { useAppDispatch, useAppSelector } from "../../store/store.ts";

interface Props{
    product: IProduct
}

export default function Product({product}: Props ){
  const { status } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  
    return(
    <> 
      <Card>
        <CardMedia sx={{height:160, backgroundSize:"contain"}} image={`http://localhost:5168/img/${product.imageUrl}`}/>
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2" color="text-secondary">
                {product.name} 
              </Typography>
              <Typography  variant="body2"  color="secondary">
                {currensyTRY.format(product.price)} ₺
              </Typography>
            </CardContent>
            <CardActions>
          
            <LoadingButton loading={ status === 'pendingAddItem' + product.id} 
              onClick={() => dispatch(addItemToCart({productId: product.id}))}
              variant="outlined"
              loadingPosition="start"
              size="small">
               
              <AddShoppingCart />
               Sepete Ekle</LoadingButton>
            <Button component={Link} href={`/catalog/${product.id}`} variant="outlined" size="small" color="primary">View</Button>
            </CardActions>
      </Card>
        
    </>
    );
}