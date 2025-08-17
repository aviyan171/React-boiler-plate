# Auth Module

This directory contains the authentication system with a beautiful, modern design built using React and Tailwind CSS.

## Folder Structure

```
src/
├── components/
│   └── auth/              # Reusable auth UI components
│       ├── AuthCard.tsx   # Main card wrapper for auth forms
│       ├── LoginForm.tsx  # Login form component
│       ├── RegisterForm.tsx # Registration form component
│       └── index.ts       # Component exports
└── routes/
    └── auth/              # Auth routes
        ├── _auth.tsx      # Auth layout wrapper
        ├── login.tsx      # Login route
        ├── register.tsx   # Registration route
        └── README.md      # This file
```

## Components

### AuthCard
A beautiful card wrapper that provides:
- Centered layout with gradient background
- Consistent styling and spacing
- Icon and title section
- Responsive design

### LoginForm
Complete login form with:
- Email and password fields
- Remember me checkbox
- Forgot password link
- Loading states
- Form validation
- Password visibility toggle

### RegisterForm
Complete registration form with:
- First and last name fields
- Email field
- Password and confirm password fields
- Terms and conditions checkbox
- Loading states
- Form validation
- Password visibility toggles

## Features

- **Modern Design**: Clean, professional appearance with gradients and shadows
- **Responsive**: Works on all screen sizes
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Interactive**: Hover effects, focus states, and smooth transitions
- **Form Validation**: Built-in validation and error handling
- **Loading States**: Visual feedback during form submission
- **Reusable**: Modular components that can be easily customized

## Usage

```tsx
import { AuthCard, LoginForm } from "../../components/auth";

function LoginPage() {
  return (
    <AuthCard 
      title="Welcome back" 
      subtitle="Sign in to your account"
    >
      <LoginForm />
    </AuthCard>
  );
}
```

## Styling

The components use Tailwind CSS classes for consistent styling:
- Color scheme: Blue to indigo gradients
- Spacing: Consistent 4px grid system
- Typography: Clear hierarchy with proper font weights
- Shadows: Subtle shadows for depth
- Transitions: Smooth animations for better UX

## Customization

All components are highly customizable through:
- Props for different variants
- CSS classes for styling overrides
- Component composition for layout changes

## Note

Components are located outside the routes directory to avoid conflicts with the TanStack Router file-based routing system. This ensures that component files are not treated as route files. 