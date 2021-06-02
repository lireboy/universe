import './css/profile.css';
import profilepic from './img/profilepicture.png';

const profile = () => {
    return(
        <div>
        <div id ="profile">
            <p id="userName">Willem</p>             
            <p id="info">Info:</p>
            <p id="infoText">Hier könnte ihr Text stehen.</p> 
            <img id="userPicture" src={profilepic} alt="Profile Picture"/>        
        </div>
        <div id ="recentlyPlayed">
        <p id="recent">Recently Played:</p>
        </div>
        </div>
    )
    
}

export default profile;