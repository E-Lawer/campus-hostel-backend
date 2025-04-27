
# Campus Hostel Management Platform

## Project Overview

The **Campus Hostel Management Platform** is a web-based application designed to help students and administrators manage hostel room bookings, student applications, and room assignments. The platform provides functionality for admin users to manage room data, approve or reject student applications, and ensure smooth hostel operation. Students can register, view available rooms, and submit applications for hostel accommodations.

## Features

- **Admin Dashboard**: Allows administrators to manage rooms, view applications, and approve/reject student applications.
- **Student Registration**: Students can create accounts and log in to apply for hostel rooms.
- **Room Management**: Admins can add, update, or delete available rooms.
- **Student Applications**: Students can submit their applications for available rooms, and admins can approve/reject them.
- **Persistence with JSON**: Room data, student information, and applications are stored in JSON files for persistence.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Data Storage**: JSON files (users.json, rooms.json, applications.json)
- **Authentication**: Simple session-based authentication for admins and students

## Installation

To get the project running locally:

1. **Clone the repository**:

```bash
git clone <repository-url>
cd campus-hostel-management-platform
```

2. **Install dependencies**:

```bash
npm install
```

3. **Run the server**:

```bash
npm start
```

This will start the application at `http://localhost:3000`.

## Admin Credentials

- **Username**: `admin`
- **Password**: `admin123` (Change it after logging in for security purposes)

### How to Login as Admin

1. Open `http://localhost:3000/admin-login`.
2. Enter the **admin username** and **password** as mentioned above.

### How to Login as Student

1. Open `http://localhost:3000/student-login`.
2. Create an account using the **registration form** or log in with existing credentials.

## Folder Structure

```
├── backend/
│   ├── server.js          # Main backend server file
│   ├── routes/            # Routes for handling requests
│   ├── data/              # JSON files for storing data (users.json, rooms.json, etc.)
├── frontend/
│   ├── index.html         # Homepage
│   ├── rooms.html         # Rooms view for students
│   ├── admin-dashboard.html  # Admin Dashboard
│   ├── admin-applications.html  # Admin view for applications
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files for frontend logic
└── README.md              # This file
```

## How to Use

### For Admins

1. Log in to the admin panel using the credentials.
2. View the list of applications submitted by students.
3. Approve or reject applications.
4. Manage available rooms (add, update, or delete rooms).

### For Students

1. Register on the platform by creating an account.
2. Log in to your account.
3. View available rooms and apply for a room.
4. Check the status of your application on the student dashboard.

## Contributing

Feel free to fork this project, create a branch, and submit pull requests with improvements or fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
