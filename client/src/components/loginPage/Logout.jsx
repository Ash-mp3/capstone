import { useEffect, useState } from 'react';
import ResponsiveAppBar from '../ResponsiveAppBar';
import Footer from '../Footer';
import loadingIcon from '../assets/loadingIcon.svg';

function Logout() {
    const [loggedOut, setLoggedOut] = useState(false);

    useEffect(() => {
        fetch(`/api/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    setLoggedOut(true);
                    localStorage.setItem('token', '');
                    return;
                }
            })
            .then((data) => {
                localStorage.setItem('token', '');
                setLoggedOut(data.loggedOut);
            });
    }, []);
    if (loggedOut) {
		setTimeout(() => {
			window.location.href = "/Login";
		}, 1000)
    }

    return (
        <div className="bg-[#ECECEC] h-full flex flex-col">
            <ResponsiveAppBar />
            <div className=" grow flex flex-col justify-center items-center">
                <div >
                    <img src={loadingIcon} alt="loadingIcon" />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Logout;
