import { useState, useEffect } from 'react';
import './SingleCard'
// styles
import './Game.css'
import SingleCard from './SingleCard';

const cardImages = [
    {"src": "/img/helmet-1.png", matched: false},
    {"src": "/img/potion-1.png", matched: false},
    {"src": "/img/ring-1.png", matched: false},
    {"src": "/img/scroll-1.png", matched: false},
    {"src": "/img/shield-1.png", matched: false},
    {"src": "/img/sword-1.png", matched: false},
  ]

export default function Game() {

    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)

    // shuffle cards and mark the start of a game
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
        .sort(()=> Math.random() - 0.5)
        .map((card)=>({...card, id: Math.random()}))

        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)
    }

    // compare 2 cards
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    // reset choiceOne, choiceTwo after 2 cards 
    const resetChoices =() => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => (prevTurns + 1))
        setDisabled(false)
    }

    // start new game automatically
    useEffect(()=>{
        shuffleCards()
    }, [])

    // compare 2 selected cards
    useEffect(()=>{
        if (choiceOne && choiceTwo) {
            setDisabled(true)
            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map((card)=>{
                        if (card.src === choiceOne.src) {
                            return {...card, matched: true}
                        } else {
                            return card
                        }
                    })
                })
                resetChoices()
            } else {
                setTimeout(resetChoices, 1000)
            }
        }
    }, [choiceOne, choiceTwo])

    return (
        <>
            <h1 style={{'textAlign':'center'}}>Magic Memory</h1>

            <p style={{'textAlign':'center'}}><button onClick={shuffleCards}>New Game</button></p>

            <div className='card-grid'>
                {cards.map(card => (
                <SingleCard 
                 key={card.id}
                 card={card} 
                 handleChoice={handleChoice}
                 flipped={card === choiceOne || card === choiceTwo || card.matched}
                 disabled={disabled}
                />))}
            </div>

            <p style={{'textAlign': 'center'}}>Turns:{turns}</p>
        </>
    )
}
