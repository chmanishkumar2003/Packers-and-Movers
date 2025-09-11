📦 Packers and Movers Management System
1. Project Overview

The Packers and Movers Management System (PMMS) is a web-based application designed to streamline and digitalize the operations of packers and movers businesses. It helps administrators, employees, and customers manage bookings, vehicles, employees, payments, and service tracking efficiently.

🎯 Objectives

Automate customer registration, service booking, and feedback.

Manage employees, assign drivers, and track workloads.

Maintain vehicle details and allocation.

Provide a seamless booking and payment system with invoice generation.

Generate reports on revenue and performance for business insights.

🌍 Relevance

Traditionally, the packers and movers industry relies on manual processes, leading to inefficiency, delays, and poor customer experience. This project solves these issues by:

Enhancing operational efficiency.

Providing transparency in service tracking.

Reducing human errors with digital records.

Improving customer satisfaction and business growth.

2. Installation Instructions
🔧 Prerequisites

XAMPP (Apache + MySQL + PHP) installed.

PHP version ≥ 7.4.

MySQL version ≥ 8.0.

A modern browser (Chrome/Firefox/Edge).

⚙️ Setup Steps

Clone/Download Project

git clone https://github.com/yourusername/packers-movers-management.git


Or extract the ZIP file into the XAMPP htdocs folder:

C:\xampp\htdocs\php-mpms


Start XAMPP

Open XAMPP Control Panel.

Start Apache and MySQL modules.

Database Setup

Open http://localhost/phpmyadmin/.

Create a new database, e.g., packers_db.

Import the provided SQL file:

/database/packers_db.sql


Configure Database Connection

Open config.php in the project folder.

Update database credentials:

$host = "localhost";
$user = "root";
$password = "";
$database = "packers_db";


Run the Project

Open browser and visit:

http://localhost/php-mpms/

❗ Troubleshooting

MySQL shutdown unexpectedly:

Stop MySQL in XAMPP.

Delete ibdata1 file inside mysql/data folder (backup first).

Restart MySQL and re-import the database.

Ensure port 3306 (MySQL) and 80 (Apache) are not blocked by other software (e.g., Skype).

3. Usage Guidelines
👤 Roles and Features

Admin

Manage customers, employees, vehicles, bookings, and reports.

Employee

Assigned tasks and tracking workload.

Customer

Register, book services, make payments, and provide feedback.

🚀 Running the Application

Open http://localhost/php-mpms/.

Login/Register with the role (Admin/Customer).

Use the dashboard to:

Customers → Book/Track Services.

Admin → Manage Vehicles, Employees, Reports.

Employees → View assigned tasks.

4. Contributing

We welcome contributions to improve the project! 🎉

📝 Contribution Workflow

Fork the repository.

Create a new branch:

git checkout -b feature-branch


Make your changes and commit:

git commit -m "Added new feature"


Push to your fork:

git push origin feature-branch


Create a Pull Request (PR) to the main repository.

📌 Guidelines

Follow proper code indentation and naming conventions.

Submit clear commit messages.

Report issues via GitHub Issues tab with detailed descriptions.

Ensure your code does not break existing functionality
