import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const ProtectedRoute = ({ children, requiredRoles }: { children: React.ReactNode, requiredRoles: string[] }) => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (requiredRoles && !requiredRoles.includes(user.userType as string)) {
        return <Navigate to="/dashboard/me" />; // Redirect to user's dashboard if unauthorized
    }

    return children;
};

export default ProtectedRoute;
