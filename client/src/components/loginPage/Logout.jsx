import { useEffect, useState } from "react";

function Logout() {
	const [loggedOut, setLoggedOut] = useState(false);

	useEffect(() => {
		fetch(`/api/logout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => {
				if (res.status === 200) {
					return res.json();
				} else {
					setLoggedOut(true);
					localStorage.setItem("token", "");
					return;
				}
			})
			.then((data) => {
				localStorage.setItem("token", "");
				setLoggedOut(data.loggedOut);
			});
	}, []);
	if (loggedOut) {
		window.location.href = "/Login";
	}

	return <>{!loggedOut ? <h1>Logging out</h1> : ""}</>;
}

export default Logout;
