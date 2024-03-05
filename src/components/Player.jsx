import { useState } from "react";

function Player({name, symbol}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayeName] = useState(name);

    let playerTag = <span className="player-name">{playerName}</span>;
    let buttonText = 'Edit'

    const handleEditButton = () => {
        setIsEditing((editing) => !editing);
    };

    const handleChange =  (event) => {
        setPlayeName(event.target.value);
    }

    const handleKeyUp = (event) => {
        if(event.key === 'Enter') {
            handleEditButton();
        }
    }

    if(isEditing){
        playerTag = <input type="text" required value={playerName} onChange={handleChange} onKeyUp={handleKeyUp}/>;
        buttonText = 'Save'
    }

    return (
        <>
            <li>
                <span className="player">
                    {playerTag}
                    <span className="player-symbol">{symbol}</span>
                </span>
                <button onClick={handleEditButton}>{buttonText}</button>
            </li>
        </>
    );
}

export default Player;