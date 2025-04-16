# ABBED - A Bit Better Every Day

ABBED is a health and fitness tracking application designed to help you and your loved ones track your health goals and habits together.

## Features

- **Weight Tracking**: Log and visualize your weight progress over time
- **Goal Setting**: Set weight goals and track your progress
- **BMI Calculation**: Calculate and monitor your BMI
- **Streak Tracking**: Stay motivated with streak tracking
- **Coming Soon**:
  - Meal tracking
  - Activity tracking
  - Habits tracking

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn
- Firebase account

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/abbed.git
cd abbed
```

2. Install dependencies
```
npm install
```

3. Set up your Firebase configuration
Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Run the development server
```
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Firebase Configuration

The application uses Firebase for:
- Authentication
- Firestore database for storing user data and weight entries

### Firestore Structure

- `users/{userId}` - User profiles
  - `name`: string
  - `email`: string
  - `createdAt`: timestamp
  - `goalWeight`: number
  - `startWeight`: number
  - `height`: number

- `users/{userId}/weightEntries/{entryId}` - Weight entries
  - `weight`: number
  - `date`: timestamp
  - `createdAt`: timestamp

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [Firebase](https://firebase.google.com/) - Backend and authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Chart.js](https://www.chartjs.org/) - Data visualization

## License

This project is licensed under the ISC License
