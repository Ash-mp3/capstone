export default function handleStatus(res){
  console.log('authorizeStatus')
    if(res.status === 200){
        return('authorized')
      } else {
        return('unauthorized')
      }
}