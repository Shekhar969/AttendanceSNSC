# AttendanceSNSC

A web-based attendance management system for managing student attendance, attendance records, and reports across BSc CSIT semesters and subjects.

## Features

* Firebase authentication
* Semester and subject-based attendance management
* Student-wise attendance marking
* Attendance review before submission
* Attendance history
* Attendance records stored in Cloud Firestore
* Excel report export
* Notices and support pages

## Tech Stack

* React 19
* Vite
* JavaScript
* React Router
* Firebase Authentication
* Cloud Firestore
* XLSX
* FileSaver.js

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Shekhar969/AttendanceSNSC.git
   cd AttendanceSNSC
   ```

2. Install dependencies:

   ```sh
   yarn
   ```

### Firebase Configuration

This project uses Firebase Authentication and Cloud Firestore.

Configure your Firebase project and update the Firebase configuration in:

```text
src/config/fireBase.jsx
```

For production use, Firebase credentials should be managed using environment variables rather than being committed directly to the repository.

### Running the Application

Start the development server:

```sh
yarn dev
```

To expose the development server on the local network:

```sh
yarn dev --host
```

## Build

Create a production build:

```sh
yarn build
```

Preview the production build locally:

```sh
yarn preview
```

## Project Structure

```text
src/
├── Components/
│   ├── auth/
│   ├── attendanceHistory/
│   ├── pages/
│   ├── subjects/
│   │   └── BSC_CSIT/
│   ├── attendanceHandler.jsx
│   ├── navBar.jsx
│   └── routing.jsx
├── config/
│   └── fireBase.jsx
├── App.jsx
└── main.jsx
```

## Application Flow

```text
Authentication
      ↓
Dashboard
      ↓
Semester & Subject
      ↓
Student Attendance
      ↓
Review
      ↓
Submit
      ↓
Cloud Firestore
      ↓
Attendance History / Export
```

## Future Improvements

* Role-based access for teachers, students, and administrators
* Centralized student management
* Attendance analytics
* Automated attendance notifications
* QR/NFC-based attendance
* Mobile application

## License

This project is intended to be open-source under the MIT License.

If distributing the project under MIT, include a `LICENSE` file containing the official MIT license text.

## Assets Disclaimer

Some images and other media included in this project were sourced from publicly available materials and are used for demonstration purposes. This repository does not claim ownership of third-party assets.

If you are the copyright holder of an included asset and believe it is being used improperly, please contact the repository owner for removal or appropriate attribution.

## Author

**Shekhar Singh Rawal**

GitHub: https://github.com/Shekhar969

## Repository

https://github.com/Shekhar969/AttendanceSNSC


## Future Enhancements

- Add email notifications.
- Improve attendance analytics.
- Add QR code-based attendance.
- Enhance mobile responsiveness.

