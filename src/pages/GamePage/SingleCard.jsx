// styles
import './SingleCard.css' 

export default function SingleCard({ card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        } else {
            console.log(" you can't click now! ");
        }
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
              <img className="front" src={card.src} alt="card front"/>
              <img className="back" src="/img/cover.png" alt="card back" onClick={handleClick}/>
            </div>
        </div>
    )
}