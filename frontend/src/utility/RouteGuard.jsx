import { Navigate, useLocation, useMatches } from "react-router-dom";

export default function RouteGuard({ children }) {
    const location = useLocation();
    const matches = useMatches();

    // true if any matched route in the branch requires auth
    const requiresAuth = matches.some((m) => m.handle?.requiresAuth);

    if (requiresAuth) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    return children;
}
