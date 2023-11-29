# Carx - Affordability at your Fingertips (Server-side)

![Carx Logo](https://i.ibb.co/vzyR75v/logo.png)

Carx is a full-stack application that brings affordability to your fingertips. This repository contains the server-side code. For the client-side code, visit [Carx Client](https://github.com/developer-suhag/carx-client).

- [Visit Carx Website](https://carx-b99bf.web.app/)
- [API Documentation](https://documenter.getpostman.com/view/22433617/2s9YeEdCs5)

## Features

### Authentication

- Users can log in with Google or email/password.
- Users can create an account.

### Car Management

- Admins can add, delete, and update cars in the database.
- Users can retrieve all cars or a single car from the database.

### Order Processing

- Users can place orders.
- Users can retrieve their order history.
- Admins can view all orders and update order statuses.

### Payment Handling

- Users can make payments for orders.
- Users can view their payment history.
- Admins can access all payment records.

### Review System

- Users can add reviews.
- Users can view their reviews.
- Admins can view all reviews and delete them.

### Messaging System

- Users can send messages.
- Admins can access all messages in their inbox.

## Technology Stack

- **Language:** TypeScript
- **Server Framework:** Node.js with Express.js
- **Database:** MongoDB
- **Authentication:** Firebase
- **Payment Processing:** Stripe
- **Email Handling:** Node Mailer
- **Validation:** Zod

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running
- Firebase and Stripe accounts for authentication and payment features

### Installation

1. Clone the repository:

```bash
git clone https://github.com/developer-suhag/carx-server.git
```

2. Navigate to the project directory:

```bash
cd carx-server
```

3. Install dependencies:

```bash
yarn install
```

4. Configure environment variables (refer to .env.example)

5. Run the server:

```bash
yarn dev
```

## Author

[Suhag Al Amin](https://suhag.me)
