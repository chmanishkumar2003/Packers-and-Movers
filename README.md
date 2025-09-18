📦 Packers and Movers Management System
🚀 Project Overview

The Packers and Movers Management System is a web-based application designed to streamline and digitize the moving service industry.
It helps customers book relocation services and track their requests, while admins can efficiently manage employees, vehicles, bookings, and payments.

🎯 Main Objectives:

Automate the customer booking process.

Enable real-time tracking of employees, vehicles, and services.

Simplify invoice generation and payment processing.

Provide reports for better business decision-making.

🔑 Relevance:

This system removes manual inefficiencies in the moving business, reduces errors, and ensures transparency between customers and service providers.

🛠️ Installation Instructions
1. Prerequisites

Ensure you have the following installed:

Node.js
 (v16 or above)

XAMPP
 (for MySQL & Apache server)

Git
 (optional, for version control)

2. Backend Setup (XAMPP + MySQL)

Start Apache and MySQL from the XAMPP Control Panel.

Open phpMyAdmin
.

Create a new database:

CREATE DATABASE packers_movers;


Import the provided .sql file (located in /database folder of the project).

3. Frontend Setup (React App)

Navigate to the project folder:

cd packers-movers-frontend


Install dependencies:

npm install


Start the development server:

npm start


The app will be available at:
👉 http://localhost:3000

4. Troubleshooting

MySQL Shutdown Unexpectedly → Delete ib_logfile0, ib_logfile1 from xampp/mysql/data/, then restart.

Port Conflict (3306) → Change MySQL port in my.ini and update backend config.

React App Not Loading → Ensure backend API is running and .env file has the correct API URL.

📖 Usage Guidelines
👤 For Customers:

Register/Login to the system.

Book a moving service by entering details.

Track status of your booking.

Provide feedback after service completion.

👨‍💼 For Admins:

Manage customers, employees, and vehicles.

Handle bookings and payments.

Generate reports for revenue and performance.

🔧 Commands:

Start frontend:

npm start


Build for production:

npm run build


Run tests:

npm test

🤝 Contributing

We welcome contributions to improve this project! 🎉

🔹 Steps to Contribute:

Fork this repository.

Create a new branch:

git checkout -b feature-branch


Make your changes and commit:

git commit -m "Added new feature"


Push changes:

git push origin feature-branch


Submit a Pull Request (PR).

📌 Guidelines:

Follow consistent coding style (React + ES6).

Write clear commit messages.

Report issues via GitHub Issues with detailed steps.

Ensure all tests pass before submitting a PR.
