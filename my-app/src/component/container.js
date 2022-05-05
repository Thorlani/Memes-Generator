import React, {useEffect, useState} from "react"
import "./container.css"

function Container() {
    const [formText, setFormText] = useState({
        firstInput: "",
        secondInput: "",
        memeImage: "https://i.imgflip.com/261o3j.jpg",
    })

    function handleChange(event) {
        setFormText(prevFormText => {
            return {
                ...prevFormText,
                [event.target.name]: event.target.value
            }
        })
    }

    const [image, setImage] = useState([])

    useEffect (function () {
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(data => setImage(data.data.memes))
    }, [])

    console.log(image)
    function randomize() {

        const meme = Math.floor(Math.random() * image.length)
        const url = image[meme].url
        setFormText(prevFormText => {
            return {
                ...prevFormText,
                memeImage: url
            }
        })

        console.log(url)
    }

    return (
        <div className="container">
            <div className="form">
                <input 
                    className="first-input form-input" 
                    type="text" 
                    placeholder="Top Text"
                    value={formText.firstInput}
                    onChange={handleChange}
                    name="firstInput"
                 />
                <input 
                    className="second-input form-input" 
                    type="text" 
                    placeholder="Bottom Text" 
                    value={formText.secondInput}
                    onChange={handleChange}
                    name="secondInput"
                />
            </div>
            <button onClick={randomize}>Click to Generate Your Meme-Image</button>
            <div className="meme-image">
                <img src={formText.memeImage} alt="meme" />
                <h2 className="top-text">{formText.firstInput}</h2>
                <h2 className="bottom-text">{formText.secondInput}</h2>
            </div>
        </div>
    )
}

export default Container