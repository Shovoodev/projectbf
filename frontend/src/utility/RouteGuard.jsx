import { Navigate, useLocation, useMatches } from "react-router-dom";
import { useUserFront } from "./use-userFront";

export default function RouteGuard({ children }) {
    const { user } = useUserFront();
    const location = useLocation();
    const matches = useMatches();

    // true if any matched route in the branch requires auth
    const requiresAuth = matches.some((m) => m.handle?.requiresAuth);

    if (requiresAuth && !user?._id) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    return children;
}
