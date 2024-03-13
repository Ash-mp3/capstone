const apiUrl = import.meta.env.VITE_SOME_KEY; 

export default function addClass(class_id) {
    fetch(`${apiUrl}/api/removeClass`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ class_id }),
    })      
    .then((res) => res.json())
    .then((data)=> {
      console.log(data.msg)
      return(data.msg)
    })
  }