import { useState } from 'react'
import {clsx} from 'clsx'
import {languages} from './endgame-languages.js'
import getFarewellText from './utils-endgame.js'
import { getRandomWord } from './utils-endgame.js'
import Confetti from 'react-confetti'

export default function Page () {
    // State values
    const [currentWord, setCurrentWord] = useState (() => getRandomWord())
    const [guessedKeys, setGuessedKeys] = useState ([])
    const [langs, setLangs] = useState (languages)
    
    // Derived values
    const numGuessLeft = langs.length - 1
    const wrongGuessCount = guessedKeys.filter (letter => !currentWord.includes(letter)).length
    const lastGuessedLetter = guessedKeys [guessedKeys.length - 1]
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes (lastGuessedLetter)

    var isGameLost = wrongGuessCount >= numGuessLeft
    var isGameWon = currentWord.split ("").every (letter => guessedKeys.includes(letter))
    
    var isGameOver = isGameLost || isGameWon

    function keyboardInput (key) {
        setGuessedKeys (prev => prev.includes (key) ? prev : [...prev, key])
    }

    const currentElement = Array.from (currentWord).map ((wordAlphabet, index) => {
        const wordClass = clsx (
            isGameLost && !guessedKeys.includes (wordAlphabet) && "missed-letters"
        )
        return <span 
                    className={wordClass}
                    key={index}
                    style={{textTransform: 'uppercase'}}
                >{guessedKeys.includes(wordAlphabet) ? wordAlphabet : "" || isGameLost && wordAlphabet}
                </span>
    })

    const alphabets = "abcdefghijklmnopqrstuvwxyz"
    const alphabetElement = alphabets.split("").map ((alphabet) => {
        const isGuessed = guessedKeys.includes (alphabet)
        const isCorrect = isGuessed && currentWord.includes (alphabet)
        const isWrong = isGuessed && !currentWord.includes (alphabet)
        const className = clsx ({
            right: isCorrect,
            wrong: isWrong
        })
        return (
                <button 
                className={className}
                    onClick={() => keyboardInput(alphabet)} 
                    key={alphabet}
                    disabled={isGameOver}
                    aria-disabled={guessedKeys.includes(alphabet)}
                    aria-label={`Letter ${alphabet}`}                    
                >{alphabet.toUpperCase()}
                </button>
        )
    })
    
    let listOfLanguages = langs.map ((language, index) => {
        const isLanguageLost = index < wrongGuessCount
        return <span 
                    className={`language-btn ${isLanguageLost ? "language-btn-lost" : ""}`}
                    key={language.name} 
                    style={{backgroundColor: language.backgroundColor, color: language.color}}
                    >{language.name}
                </span>
    })

    const gameStatusClass = clsx ("status-result", {
        won: isGameWon,
        lost: isGameLost,
        farewell: !isGameOver && isLastGuessIncorrect
    })
    function resultSection () {
        if (!isGameOver && isLastGuessIncorrect) {
            return (
                <>
                    <p>{getFarewellText (langs[wrongGuessCount - 1].name)}</p>
                </> 
            )
        }
        if (isGameWon) {
            return (
                <>
                    <h2>Game win!</h2>
                    <p>Well Done!🎊</p>
                </> 
            )
        } 
        if (isGameLost) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly😊</p>
                </>
            )
        } 
        else {
            return null
        }
    }

    function Restart () {
        setCurrentWord (() => getRandomWord())
        setGuessedKeys ([])
    }

    return (
        <>
            {
                isGameWon && 
                    <Confetti 
                            recycle={false}
                            numberOfPieces={1000}
                    />}
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the work within 8 attempts to keep the programming world safe from Assembly.</p>
            </header>
            <section aria-live='polite' role='status' className={gameStatusClass}>
                {resultSection()}
            </section>
            <section className="languages-list">
                {listOfLanguages}
            </section>
            <section className="current-word">
                {currentElement}
            </section>

            {/* Combined visually-hidden aria-live region for status updates */}
            <section className='sr-only' aria-live='polite' role='status'>
                <p>
                    Current word: {currentWord.split ("").map(letter => 
                    guessedKeys.includes(letter) ? letter + "." : "blank").join(" ")}
                </p>
                <p>
                    {currentWord.includes (lastGuessedLetter) ? 
                        `Correct! The letter ${lastGuessedLetter} is in the word.` :
                        `Sorry! The letter ${lastGuessedLetter} is not in the word.`
                    }
                    You have {numGuessLeft} attempts left.
                </p>
            </section>
            <section className="keyboard">
                {alphabetElement}
            </section>
            {isGameOver && <footer>
                <button onClick={Restart} className='new-game-btn'>New Game</button>
            </footer>}
        </>
    )
}
