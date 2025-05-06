import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const user = localStorage.getItem("user");
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/auth'); // Redirect to login page if user is not logged in
        }
    }, [user, navigate]);

    if (!user) {
        return null; // Optionally return null or show a loading indicator while redirecting
    }

    return (
        <div>
            {children}  {/* Render the protected content (MainLayout in this case) */}
        </div>
    );
}
