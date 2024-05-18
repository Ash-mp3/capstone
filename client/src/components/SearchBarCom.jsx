import { useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { SearchContext } from "./SearchContext";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useLocation } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "black",
	width: "100%",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

export default function SearchAppBar() {
	const { setSearchTerm } = useContext(SearchContext);

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

	const location = useLocation();

	return (
		<div>
			{location.pathname === "/admin" ? (
				<Search>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<AnchorLink href="#registeredUsers">
						<StyledInputBase
							placeholder={location.pathname === "/courses" ? "Courses..." : "Students..."}
							inputProps={{ "aria-label": "search" }}
							onChange={(event) => handleSearch(event)}
						/>
					</AnchorLink>
				</Search>
			) : (
				<Search>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
                        <StyledInputBase
                            placeholder={location.pathname === "/courses" ? "Courses..." : "Students..."}
                            inputProps={{ "aria-label": "search" }}
                            onChange={(event) => handleSearch(event)}
                        />
				</Search>
			)}
		</div>
	);
}
