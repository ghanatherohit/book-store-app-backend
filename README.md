# Book Store Application Backend

This is the backend for a **Book Store Application**, where users can buy books and admins can manage books. The application provides a seamless and user-friendly experience with a well-designed UI/UX.

## Features
- **User:**
  - Browse books
  - Purchase books
  - Track orders
- **Admin:**
  - Add, edit, and delete books
  - Manage orders
  - View sales statistics
  - Access trending book insights

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JSON Web Token (JWT)
- **Security:** CORS, Environment Variables, Bcrypt for password hashing

## Installation & Setup
### Prerequisites:
- Install [Node.js](https://nodejs.org/)
- Install [MongoDB](https://www.mongodb.com/)

### Steps to run the project locally:
```bash
# Clone the repository
git clone https://github.com/your-repo/book-store-backend.git
cd book-store-backend

# Install dependencies
npm install

# Create a .env file and add the following:
PORT=5000
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key

# Run the server
npm start
```

## API Endpoints

### Books
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/books/create` | Add a new book (Admin Only) |
| GET | `/api/books/` | Get all books |
| GET | `/api/books/:id` | Get a single book by ID |
| PUT | `/api/books/edit/:id` | Update a book (Admin Only) |
| DELETE | `/api/books/:id` | Delete a book (Admin Only) |

### Orders
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/orders/create` | Create a new order |
| GET | `/api/orders/user/:email` | Get all orders by user email |
| GET | `/api/orders/:id` | Get a single order by ID |

### Admin
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/admin/stats` | View sales statistics (Admin Only) |
| GET | `/api/admin/trending` | View trending books (Admin Only) |

### Authentication
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/admin-login` | Admin login |

## Middleware
- **verifyAdminToken**: Ensures that only admin users can perform certain actions.
- **verifyUserToken**: Ensures that only authenticated users can place orders.
