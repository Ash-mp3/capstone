import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "./assets/Registration_App_Logo.png";
import SearchBar from "./SearchBarCom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import handleStatus from "../controllers/handleStatus";

function ResponsiveAppBar({ isLoggedIn, onSearch, loading }) {
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [authorizeStatus, setAuthorizeStatus] = useState("loading...");
	const [userName, setUserName] = useState();
    const [settings, setSettings] = useState(["Profile", "Courses", "Logout"]);
    
    const location = useLocation()

	const userListRef = useEffect(() => {
		if (localStorage.getItem("user_role") === "admin") {
			setSettings(["Admin", "Courses", "Logout"]);
		} else if (localStorage.getItem("user_role") === "student") {
			setSettings(["Profile", "Courses", "Logout"]);
		}
    }, []);
    
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	let title;
	switch (location.pathname) {
		case "/registration":
			title = "Registration";
			break;
		case "/Login" && "/":
			title = "Login";
			break;
		case "/login":
			title = "Login";
			break;
		case "/courses":
			title = "Courses";
			break;
		case "/profile":
			title = "Profile";
			break;
		case "/admin":
			title = "Administrator";
			break;
		default:
			title = "Capstone Project";
	}

	if (loading || (!isLoggedIn && (location.pathname === "/Login" || location.pathname === "/SignUp" || location.pathname === "/"))) {
		return (
			<>
				<AppBar position="fixed">
					<Container className="navBarContainer">
						<Toolbar disableGutters>
							<Avatar id="logoImage" src={Logo} sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
							<Typography
								variant="h6"
								noWrap
								component="a"
								href="#app-bar-with-responsive-menu"
								sx={{
									mr: 2,
									display: { xs: "none", md: "flex" },
									fontFamily: "monospace",
									fontWeight: 700,
									letterSpacing: ".3rem",
									color: "lightgray",
									textDecoration: "none",
								}}
							>
								{title}
							</Typography>
						</Toolbar>
					</Container>
				</AppBar>
			</>
		);
	}

	return (
		<>
			<AppBar position="fixed">
				<Container className="navBarContainer">
					<Toolbar disableGutters>
						<Avatar id="logoImage" src={Logo} sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
						<Typography
							variant="h6"
							noWrap
							component="a"
							href="#app-bar-with-responsive-menu"
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "lightgray",
								textDecoration: "none",
							}}
						>
							{title}
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
						{location.pathname !== "/profile" && location.pathname !== "/admin" && <SearchBar onSearch={onSearch}></SearchBar>}
						{location.pathname === "/admin" && <SearchBar onSearch={onSearch}></SearchBar>}
						<Box className="ml-14" sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt="User Profile Pic"></Avatar>
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map((setting) => (
									<Link to={`/${setting.toLowerCase()}`} key={setting}>
										<MenuItem onClick={handleCloseUserMenu}>
											<Typography textAlign="center">{setting}</Typography>
										</MenuItem>
									</Link>
								))}
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
			<Toolbar />
		</>
	);
}

export default ResponsiveAppBar;
