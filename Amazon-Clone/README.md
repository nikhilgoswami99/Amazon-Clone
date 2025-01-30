# Amazon Clone - E-Commerce Platform

## Hosted Link
Live Demo - (https://amazon-clone-nikhil-goswamis-projects.vercel.app/)

## Overview
This project is a fully functional Amazon Clone built using React (Vite), Firebase for authentication, and the Amazon Product Data API for product listings. Users can browse products, filter them based on various criteria, add items to their cart, and get a bill summary. The platform is responsive and optimized for a seamless user experience.

## Features
- **Authentication using Firebase** (Login, Sign-up, and Logout functionality)
- **Responsive Landing Page** (Inspired by Amazon UI)
- **Search Feature** (Search products by title and description)
- **Product Carousel** (Display featured products dynamically)
- **Filters** (Sort by price, rating, category, and more)
- **Add to Cart Feature** (With bill summary calculation)
- **Product Description in Audio Format** (Additional accessibility feature)

## Tech Stack
- **Frontend**: React (Vite), CSS (or Tailwind CSS/Styled Components)
- **Backend**: Firebase (for Authentication & Firestore for data storage)
- **API Integration**: Amazon Product Data API
- **State Management**: React Context API / Redux

## Installation & Setup

### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/amazon-clone.git
cd amazon-clone
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Setup Firebase
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Enable Authentication (Google/Auth Providers)
- Set up Firestore Database
- Get Firebase Config and create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run the Development Server
```sh
npm run dev
```

### 5. Build for Production
```sh
npm run build
```

### 6. Deploy (Optional)
You can deploy using **Vercel, Netlify, or Firebase Hosting**

#### Deploy to Vercel
```sh
npm install -g vercel
vercel
```

#### Deploy to Netlify
```sh
npm install -g netlify-cli
netlify deploy
```



