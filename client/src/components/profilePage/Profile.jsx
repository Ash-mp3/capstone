import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../ResponsiveAppBar";
import Footer from "../Footer";
import UserInfo from "./userInformation";
import handleStatus from "../../controllers/handleStatus";
import AuthDisplay from "../AuthDisplay";
import loadingIcon from "../assets/loadingIcon.svg";

function Profile() {
	const [loading, setLoading] = useState(true);
	const [authorizeStatus, setAuthorizeStatus] = useState("loading...");
	const [info, setInfo] = useState({
		courses: [],
		username: "",
		email: "",
		first_name: "",
		last_name: "",
		phone_number: "",
		address: "",
		city: "",
		country: "",
	});



	useEffect(() => {
		try {
			fetch(`/api/profileInfo`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
				.then((res) => {
					setAuthorizeStatus(handleStatus(res));
					setLoading(false);
					return res.json();
				})
				.then((data) => {
					setInfo(data);
				});
		} catch (err) {
			console.error(err);
		}
	}, []);

	return (
		<div className="Profile bg-[#ECECEC] h-screen">
			{authorizeStatus === "authorized" ? (
			<div className="h-full">
				<ResponsiveAppBar />
				<div className=" mx-8 my-6 min-h-screen">
				{loading === false ? 
					( 
						<UserInfo
							courses={info.courses}
							username={info.username}
							email={info.email}
							firstName={info.first_name}
							lastName={info.last_name}
							phoneNum={info.phone_number}
							address={info.address}
							city={info.city}
							country={info.country}
						/> 
					) 
					: 
					(	
						<div>
							<img src={loadingIcon} alt="loadingIcon" />
						</div> 
					)
				}
				</div>
				<Footer></Footer>
			</div>
			) : (
				//if the user is not authorized, display the authorize status
				<AuthDisplay authorizeStatus={authorizeStatus} />
			)}
		</div>
	);
}

export default Profile;