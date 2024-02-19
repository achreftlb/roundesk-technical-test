import './App.css';
import {Route, Switch, Link, BrowserRouter} from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import {useDispatch, useSelector} from "react-redux";
import GuestRoute from "./components/GuestRoute";
import {logout, logoutAndInvalidate} from "./store/features/auth/authSlice";
import Footer from "./components/Footer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse, faPowerOff} from "@fortawesome/free-solid-svg-icons";

function App() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    return (
        <BrowserRouter>
            <div className="d-flex flex-column" id="app" style={{minHeight: "100vh"}}>
                {isAuthenticated && (<nav className="navbar navbar-expand-lg">
                    <ul className="navbar-nav ms-auto"> {/* This will push the logout to the far right */}
                        <li className="nav-item px-5">
                            <span onClick={() => {dispatch(logoutAndInvalidate())}}><FontAwesomeIcon icon={faPowerOff} /> Logout</span>
                        </li>
                    </ul>
                </nav>)}
                <Switch>
                    <ProtectedRoute path="/" exact component={ProfilePage}/>
                    <GuestRoute path="/login" exact component={LoginPage}/>
                    <GuestRoute path="/register" exact component={RegisterPage}/>
                    <Route component={NotFoundPage}/>
                </Switch>
                <Footer/>
            </div>

        </BrowserRouter>
    );
}

export default App;
