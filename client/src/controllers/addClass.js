export default function addClass(class_id){
    fetch("http://localhost:3001/api/addClass", {
      method: 'POST',
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