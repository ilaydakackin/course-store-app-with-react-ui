# E-Commerce React Application

A modern, full-featured e-commerce web application built with React, TypeScript, and Material-UI, featuring a complete shopping cart system, user authentication, and order management.

## 🚀 Features

### Core Features
- **Product Catalog**: Browse and view detailed product information
- **Shopping Cart**: Add, remove, and manage items in your cart
- **User Authentication**: Secure login and registration system
- **Order Management**: Complete checkout process and view order history
- **Responsive Design**: Optimized for desktop and mobile devices

### User Experience
- **Multi-step Checkout**: Streamlined checkout with delivery and payment information
- **Real-time Cart Updates**: Instant cart updates with loading states
- **Order Tracking**: View order status and details
- **Error Handling**: Comprehensive error pages and validation

### Technical Features
- **State Management**: Redux Toolkit with RTK Query for efficient state management
- **Route Protection**: Protected routes for authenticated users
- **Form Validation**: React Hook Form with comprehensive validation
- **API Integration**: Axios-based API client with interceptors
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **UI Library**: Material-UI (MUI) v5
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Styling**: Material-UI theme system
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── api/                    # API configuration and requests
│   └── request.ts         # Axios setup and API endpoints
├── features/              # Feature-based modules
│   ├── Account/           # Authentication (login/register)
│   ├── Cart/              # Shopping cart functionality
│   ├── catalog/           # Product catalog and details
│   ├── checkout/          # Checkout process
│   ├── counter/           # Demo counter feature
│   └── Orders/            # Order management
├── layout/                # Layout components
│   ├── App.tsx           # Main app component
│   └── Header.tsx        # Navigation header
├── model/                 # TypeScript interfaces
│   ├── IProduct.ts       # Product interface
│   ├── ICart.tsx         # Cart interfaces
│   ├── IUser.tsx         # User interface
│   └── IOrder.tsx        # Order interfaces
├── router/                # Routing configuration
│   ├── Routes.tsx        # Route definitions
│   └── AuthGuard.tsx     # Protected route component
├── store/                 # Redux store configuration
│   └── store.ts          # Store setup and typed hooks
└── utils/                 # Utility functions
    └── formatCurrency.ts  # Currency formatting
```

## 🏗️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-react-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   - The application is configured to connect to `http://localhost:5168/api/`
   - Ensure your backend API is running on this port
   - Update the base URL in `src/api/request.ts` if needed

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### API Configuration
The application uses Axios for API communication with the following setup:
- Base URL: `http://localhost:5168/api/`
- Credentials included for cross-origin requests
- Automatic token injection for authenticated requests
- Comprehensive error handling with toast notifications

### State Management
Redux Toolkit is configured with the following slices:
- `counterSlice`: Demo counter functionality
- `cartSlice`: Shopping cart state management
- `catalogSlice`: Product catalog with entity adapter
- `accountSlice`: User authentication and profile

## 📱 Pages & Features

### Public Pages
- **Home** (`/`): Landing page
- **Catalog** (`/catalog`): Product listing
- **Product Details** (`/catalog/:id`): Individual product information
- **About** (`/about`): About page with counter demo
- **Contact** (`/contact`): Contact information
- **Login** (`/login`): User authentication
- **Register** (`/register`): User registration

### Protected Pages (Authentication Required)
- **Checkout** (`/checkout`): Multi-step checkout process
- **Orders** (`/orders`): Order history and details
- **Shopping Cart** (`/cart`): Cart management

### Error Pages
- **404 Not Found** (`/not-found`): Page not found
- **500 Server Error** (`/server-error`): Server error handling
- **General Error** (`/error`): Error testing page

## 🛒 Key Components

### Shopping Cart
- Add/remove items with quantity management
- Real-time price calculations with tax
- Persistent cart state across sessions
- Loading states for all cart operations

### Checkout Process
1. **Delivery Information**: Name, phone, address details
2. **Payment Information**: Credit card details (UI only)
3. **Order Review**: Final order confirmation
4. **Order Completion**: Success page with order ID

### Product Catalog
- Grid-based product display
- Individual product detail pages
- Add to cart functionality with stock information
- Responsive product cards

### Authentication
- JWT-based authentication
- Protected routes with redirect
- Persistent login state
- User profile management

## 🎨 UI/UX Features

- **Material-UI Components**: Consistent design system
- **Responsive Grid Layout**: Mobile-first responsive design
- **Loading States**: Skeleton loading and spinners
- **Toast Notifications**: User feedback for actions
- **Form Validation**: Real-time form validation with error messages
- **Turkish Localization**: Currency formatting in Turkish Lira (₺)

## 🔒 Security Features

- **Protected Routes**: Authentication required for sensitive pages
- **Token Management**: Automatic token injection and refresh
- **Form Validation**: Client-side validation with server-side error handling
- **Error Boundaries**: Graceful error handling and recovery

## 🌍 Internationalization

The application includes Turkish localization for:
- Currency formatting (Turkish Lira - ₺)
- Form labels and validation messages
- Order status and checkout flow

## 📦 API Integration

The application expects a REST API with the following endpoints:

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart` - Remove item from cart

### Authentication
- `POST /api/account/login` - User login
- `POST /api/account/register` - User registration
- `GET /api/account/getuser` - Get current user

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details

## 🚀 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- TypeScript for type safety
- ESLint configuration for code quality
- Consistent component structure
- Error boundary implementation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Known Issues

- Backend API URL is hardcoded and needs to be running on `localhost:5168`
- Payment processing is UI-only (no actual payment integration)
- Image uploads are handled by the backend service

## 🔮 Future Enhancements

- [ ] Payment gateway integration
- [ ] Product search and filtering
- [ ] User reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Admin panel for product management
- [ ] Multi-language support
- [ ] PWA capabilities