
# Expense Tracker

Welcome to the Expense Tracker project! This application allows users to manage their expenses and income by adding, viewing, and categorizing transactions. It features a secure authentication system, a user-friendly dashboard, and detailed budget tracking.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Installation

### Prerequisites
- Node.js (>=14.x)
- npm (>=6.x)
- MongoDB

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/HakYam/expense-tracker.git
   cd expense-tracker
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   NEXT_PUBLIC_JWT_SECRET=<Your JWT Secret>
   MONGODB_URI=<Your MongoDB Connection String>
   ```

4. Run the application:
   ```sh
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

Once the application is running, you can:
- Register a new account or log in with existing credentials.
- Add new transactions (income or expense).
- View and manage transactions in the dashboard.
- Track your budget based on the added transactions.

## Features

- **Authentication**: Secure login and registration using JWT.
- **Dashboard**: User-friendly interface to manage transactions.
- **Budget Tracking**: Visual representation of income, expenses, and remaining budget.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Project Structure

```
expense-tracker/
│
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   └── register/route.ts
│   │   ├── transaction/
│   │   │   ├── [id]/route.ts
│   │   │   └── route.ts
│   │   └── ...
│   │
│   ├── components/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── dashboard/
│   │   │   ├── AddTransactionForm.tsx
│   │   │   ├── Budget.tsx
│   │   │   └── TransactionTable.tsx
│   │   └── ...
│   │
│   ├── dashboard/
│   │   └── page.tsx
│   │
│   ├── libs/
│   │   ├── auth.ts
│   │   ├── authContext.tsx
│   │   ├── connectDB.ts
│   │   ├── createToken.ts
│   │   └── isAuthenticated.ts
│   │
│   ├── models/
│   │   ├── Transaction.ts
│   │   └── User.ts
│   │
│   ├── pages/
│   │   ├── _app.tsx
│   │   └── index.tsx
│   │
│   ├── public/
│   │   ├── assets/
│   │   └── ...
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── middleware.ts
│   ├── next.config.mjs
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── .eslintrc.json
├── README.md
└── ...
```

## API Endpoints

### Authentication
- **POST /api/auth/login**: User login.
- **POST /api/auth/register**: User registration.

### Transactions
- **GET /api/transaction**: Retrieve all transactions for the authenticated user.
- **POST /api/transaction**: Add a new transaction.
- **DELETE /api/transaction/[id]**: Delete a specific transaction.
- **PUT /api/transaction/[id]**: Update a specific transaction.

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

- Special thanks to the [Next.js](https://nextjs.org/) team for their framework.
- Thanks to [Tailwind CSS](https://tailwindcss.com/) for the styling framework.
