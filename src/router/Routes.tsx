
import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App"
import HomePage from "../features/HomePage";
import AboutPage from "../features/AboutPage";
import ContactPage from "../features/ContactPage";
import CatalogPage from "../features/catalog/CatalogPage";
import ProductDetailsPage from "../features/catalog/ProductDetails";
import ErrorPage from "../features/ErrorPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import ShoppingCartPage from "../features/Cart/ShoppingCartPage";
import LoginPage from "../features/Account/LoginPage";
import RegisterPage from "../features/Account/RegisterPage";

import AuthGuard from "./AuthGuard";
import CheckOutPage from "../features/checkout/CheckoutPage";
import OrderList from "../features/Orders/OrderList";

export const router = createBrowserRouter([
    {
        path: "/",
        element :<App />,
        children : [
            {element: <AuthGuard />, children: [
                 {path: "checkout", element: <CheckOutPage />},
                 {path: "orders", element: <OrderList />},
            ]},
            {path: "", element: <HomePage />},
            {path: "about", element: <AboutPage />},
            {path: "contact", element: <ContactPage />},
            {path: "catalog", element: <CatalogPage />},
            {path: "cart", element: <ShoppingCartPage />},
            {path: "error", element: <ErrorPage />},
            {path: "server-error", element: <ServerError />},
            {path: "not-found", element: <NotFound />},
            {path: "catalog/:id", element: <ProductDetailsPage />},
            {path: "login", element: <LoginPage />},
            {path: "register", element: <RegisterPage />},
            {path: "*", element: <Navigate to="/not-found" />},
        ]
    
    }
])
