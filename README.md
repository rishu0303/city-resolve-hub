
# Smart Complaint Management System

A full-stack municipal services complaint management system built with React, TypeScript, and Tailwind CSS. This system allows citizens to submit complaints about municipal issues and enables administrators to manage and track complaint resolution.

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based authentication system
- Role-based access control (User/Admin)
- Protected routes and components
- Demo accounts for testing

### 📋 Complaint Management
- Submit complaints with detailed information
- Upload photo evidence
- Location selection with interactive map
- Category-based organization
- Status tracking (Pending → In Progress → Resolved)
- Real-time updates and notifications

### 🗺️ Location Services
- Interactive location picker
- Address search functionality
- GPS-based current location detection
- Common locations quick selection
- Map visualization for complaint locations

### 👥 User Dashboard
- Personal complaint tracking
- Status-based filtering
- Progress statistics
- Complaint history
- Responsive design for mobile and desktop

### 🛠️ Admin Panel
- Comprehensive complaint management
- Assignment to municipal teams
- Status updates and workflow management
- Category and status-based filtering
- Analytics and statistics

### 🎨 Modern UI/UX
- Clean, professional design
- Responsive layout for all devices
- Interactive components with hover states
- Status badges and progress indicators
- Toast notifications for user feedback

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Shadcn/UI** - High-quality component library
- **React Router** - Client-side routing
- **React Context** - State management
- **Lucide React** - Modern icon library
- **Sonner** - Toast notifications

### Backend Integration Ready
- RESTful API structure
- JWT authentication flow
- File upload capabilities
- Geolocation services
- Real-time updates

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-complaint-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Demo Accounts

For testing purposes, use these demo accounts:

**Regular User:**
- Email: `user@example.com`
- Password: `password`

**Administrator:**
- Email: `admin@example.com`
- Password: `password`

## 🗂️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── complaints/     # Complaint-related components
│   ├── dashboard/      # Dashboard components
│   ├── layout/         # Layout components
│   └── ui/            # Base UI components (shadcn/ui)
├── contexts/           # React Context providers
│   ├── AuthContext.tsx
│   └── ComplaintContext.tsx
├── pages/              # Page components
├── lib/                # Utility functions
└── types/              # TypeScript type definitions
```

## 🔧 Backend API Structure

The frontend is designed to integrate with a RESTful API with the following endpoints:

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user

### Complaints
- `GET /complaints` - Get all complaints (Admin only)
- `GET /complaints/user` - Get user's complaints
- `POST /complaints` - Create new complaint
- `PUT /complaints/:id` - Update complaint
- `DELETE /complaints/:id` - Delete complaint
- `PUT /complaints/:id/assign` - Assign complaint (Admin only)
- `PUT /complaints/:id/status` - Update status (Admin only)

### File Upload
- `POST /upload` - Upload image files

## 🎯 Key Features Explained

### Complaint Submission Flow
1. **Authentication** - Users must be logged in
2. **Form Completion** - Title, description, category selection
3. **Image Upload** - Optional photo evidence
4. **Location Selection** - Map-based or address search
5. **Submission** - Real-time validation and feedback

### Admin Workflow
1. **Dashboard Overview** - Statistics and filtering
2. **Complaint Review** - Detailed complaint information
3. **Assignment** - Assign to appropriate municipal teams
4. **Status Management** - Update complaint status
5. **Resolution Tracking** - Monitor completion

### Responsive Design
- **Mobile-First** - Optimized for mobile devices
- **Progressive Enhancement** - Enhanced features on larger screens
- **Touch-Friendly** - Appropriate touch targets and gestures
- **Cross-Browser** - Compatible with modern browsers

## 🔒 Security Features

- **Input Validation** - Client and server-side validation
- **File Type Checking** - Secure image upload validation
- **Route Protection** - Authentication-based access control
- **Role-Based Access** - Admin vs. User permissions
- **XSS Protection** - Sanitized user inputs

## 📱 Mobile Features

- **Responsive Design** - Works on all screen sizes
- **GPS Integration** - Use device location for complaints
- **Touch Optimization** - Mobile-friendly interactions
- **Offline Indication** - Network status awareness
- **Fast Loading** - Optimized for mobile networks

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder to your hosting service
```

### Environment Variables
```env
VITE_API_URL=your_backend_api_url
VITE_CLOUDINARY_URL=your_cloudinary_url
VITE_MAPBOX_TOKEN=your_mapbox_token
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the demo implementation

## 🎉 Acknowledgments

- **Shadcn/UI** for the excellent component library
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon set
- **React Team** for the amazing framework

---

Built with ❤️ for better municipal services and community engagement.
