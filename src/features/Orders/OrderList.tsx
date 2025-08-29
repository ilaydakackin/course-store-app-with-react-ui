import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Order } from "../../model/IOrder";
import requests from "../../api/request";
import { ArrowRight, Close as CloseIcon } from "@mui/icons-material";
import { currensyTRY } from "../../utils/formatCurrency";


const orderStatus = [
        "Pending",
        "Approved",
        "PaymentFailed",
        "Complated"
    ];
export default function OrderList() {
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null); 

    const [open, setOpen] = useState(false);

        
        const subTotal = selectedOrder?.orderItems.reduce((toplam, item) => toplam + (item.quantity * item.price), 0) ?? 0;
        const tax = subTotal * 0.2;
        const total = subTotal + tax;

    function handleDialogOpen(order: Order) {
        setOpen(true);
        setSelectedOrder(order);
    }
     function handleDialogClose() {
        setOpen(false);
        setSelectedOrder(null);
    }

    useEffect(() => {
        setLoading(true);
        requests.Orders.getOrders()
        .then(orders => setOrders(orders))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <CircularProgress/>
    return (
        <div>
            <h1>Order List</h1>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell>Order ID</TableCell>
                            <TableCell>Order Status</TableCell>
                            <TableCell>Order Date</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.map(order => (
                            <TableRow key={order.id}>
                                <TableCell component="th">{order.id}</TableCell>
                                <TableCell component="th">{orderStatus[order.orderStatus]}</TableCell>
                                <TableCell component="th">{new Date(order.orderDate).toLocaleString()}</TableCell>
                                <TableCell component="th">{currensyTRY.format(order.subTotal)} $</TableCell>
                                <TableCell component="th" sx={{ width: "100px" }}>
                                    <Button onClick={
                                        () => {
                                            handleDialogOpen(order);
                                            // Navigate to order details page or show details in a modal
                                        }
                                    } size="small" variant="contained" endIcon={<ArrowRight/>}>Deteils</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        
                    </TableBody>
                </Table>
            </TableContainer>
            { selectedOrder && (selectedOrder.id) }
            <Dialog onClose={handleDialogClose} open={open} fullWidth maxWidth="md">
                <DialogTitle>Sipariş No: #{selectedOrder?.id}</DialogTitle>
                <IconButton onClick={handleDialogClose} sx={{position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500]}}>
                    <CloseIcon/>
                </IconButton>
                <DialogContent>
                  <Paper>
                    <Typography gutterBottom sx={{p: 1}}>Teslimat Bilgileri</Typography>
                    <Typography gutterBottom sx={{p: 1}}>{selectedOrder?.firstName}</Typography>
                    <Typography gutterBottom sx={{p: 1}}>{selectedOrder?.lastName}</Typography>
                    <Typography gutterBottom sx={{p: 1}}>{selectedOrder?.adresLine} / {selectedOrder?.city}</Typography>
                    <Typography gutterBottom sx={{p: 1}}>{selectedOrder?.phone}</Typography>
                
                  </Paper>
                  <TableContainer>
                        <Table>
                            <TableHead aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell align="right">Fiyat</TableCell>
                                    <TableCell align="right">Adet</TableCell>
                                    <TableCell align="right">Toplam</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedOrder?.orderItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="right">  
                                            <img src={`http://localhost:5168/img/${item.productImageUrl}`} style={{width: 60, height: 60}}/>
                                        </TableCell>
                                        <TableCell align="right">{item.productName} </TableCell>
                                        <TableCell align="right">{currensyTRY.format(item.price)}</TableCell>
                                        <TableCell align="right">{item.quantity} </TableCell>
                                        <TableCell align="right">{currensyTRY.format(item.price * item.quantity)} $</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell align="right" colSpan={4}>Ara Toplam</TableCell>
                                    <TableCell align="right" colSpan={4}>{currensyTRY.format(subTotal)} $</TableCell>
                                </TableRow>
                                 <TableRow>
                                    <TableCell align="right" colSpan={4}>Vergi</TableCell>
                                    <TableCell align="right" colSpan={4}>{currensyTRY.format(tax)} $</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right" colSpan={4}>Toplam</TableCell>
                                    <TableCell align="right" colSpan={4}>{currensyTRY.format(total)} $</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                  </TableContainer>
                       
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleDialogClose} color="primary" variant="contained">
                        Kapat
                    </Button>
                  </DialogActions>

            </Dialog>
        </div>
    );
}