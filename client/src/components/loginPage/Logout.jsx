import { useEffect, useState } from "react"

const apiUrl = import.meta.env.VITE_SOME_KEY; 

function Logout(){
    const [loggedOut, setLoggedOut] = useState(false)

    useEffect(() => {
        fetch(`${apiUrl}/api/logout`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
          })
        .then((res) => {
              if(res.status === 200){
                return(res.json())
              } else {
                setLoggedOut(true)
                localStorage.setItem("token", "")
                return
              }
            })
        .then((data) => {
            console.log(data.loggedOut)
            localStorage.setItem("token", "")
            setLoggedOut(data.loggedOut)
        });
    },[])
    if(loggedOut){
        window.location.href="/login"
    }

    return(
        <>
        {
            !loggedOut
            ?
                <h1>
                    Logging out
                </h1>
            :
                ""
        }
        </>
    )
}

export default Logout