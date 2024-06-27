import loadingIcon from "./assets/loadingIcon.svg";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Footer from "./Footer";

export default function AuthDisplay(props) {
	const { authorizeStatus } = props;
	location.pathname === "/";
	if (authorizeStatus === "loading...") {
		return (
			<div className="relative h-screen flex flex-col justify-center items-center">
				<ResponsiveAppBar loading={true} />
				<img className="m-auto" src={loadingIcon} alt="Loading icon" />
				<Footer className="absolute bottom-0" />
			</div>
		);
	} else {
		{
			authorizeStatus;
		}
		<a href="/login">Go back to login</a>;
	}
}
