/* eslint-disable @typescript-eslint/no-unused-vars */


import { KeyboardArrowDown, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, Container, IconButton, List, ListItem, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { Link, NavLink } from "react-router";

import { logout } from "../features/Account/accountSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { clearCart } from "../features/Cart/cartSlice";
import { useState } from "react";

const links = [
  {title: "Home", to:"/"},
  {title: "Catalog", to:"/catalog"},
  {title: "About", to:"/about"},
  {title: "Contact", to:"/contact"},
  {title: "Error", to:"/error"},
]

const authLinks = [
  {title: "Login", to:"/login"},
  {title: "Register", to:"/register"},
]

const navStyles ={
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "text-primary"
  }
}
export default function Header(){
  const { cart } = useAppSelector(state => state.cart);
  const { user } = useAppSelector(state => state.account);
  const dispatch = useAppDispatch();
  const itemCount = cart?.cartItems.reduce((total, item) => total + item.quantity, 0);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleMenuClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

    return (
      <AppBar position="static" sx={{mb:4}}>
        <Container maxWidth="xl">
           <Toolbar disableGutters sx={{display: "flex", justifyContent:"space-between"}}>
          <Box sx={{ display: "flex", alignItems: "center"}}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                E-Commerce
             </Typography>    
             <List sx={{ display: "flex", fontWeight: "400"}}>
            {links.map((link, index) =>
                  <ListItem key={index} component={NavLink} sx={navStyles} to={link.to}>{link.title}</ListItem>
            )}
          </List>
          </Box> 
          
          <Box sx={{ display: "flex", alignItems: "center"}}>
            <IconButton component={Link} to="/cart" size="large" edge="start" color="inherit">
              <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {
              user ? (
                <>
                  <Button id="user-button" onClick={handleMenuClick} endIcon={<KeyboardArrowDown />} sx={navStyles} >{user?.name}</Button>
                 

                  <Menu id="user-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem component={Link} to="/orders">Orders</MenuItem>
                    <MenuItem onClick={() => {
                    dispatch(logout())
                    dispatch(clearCart())
                  }}>LogOut</MenuItem>
                  </Menu>
                </>
              ):(
                 <>
                { authLinks.map(link => 
                  <Button key={link.to} component={NavLink} sx={navStyles} to={link.to}>{link.title}</Button>)
                }
                </>
              )
            }
           
          </Box>
        </Toolbar>
        </Container>
       
      </AppBar>    
    );
  }

  