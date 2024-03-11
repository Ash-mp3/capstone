export default function AuthDisplay(props){
    const {authorizeStatus}= props
    return(    
    <div>
    <h1>{authorizeStatus}</h1>
    {/* if user is unauthorized, give them an option to return to the login page */}
    {authorizeStatus === 'unauthorized' ? <a href='/login'>Go back to login</a> : ''}
    </div>
    )
}