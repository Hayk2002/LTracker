import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./Home"));
const Dashboard = lazy(() => import("./Dashboard"));

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route index path='/' element={<Home />} />
            <Route path='/admin' element={<Dashboard />} />
        </Routes>
    </Router>
);

export default AppRoutes;
