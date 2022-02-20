import React, { useState } from 'react'
import io from 'socket.io-client'
const socketClient = io()

const App = () => {
    
    const [globalArgs, setGlobalArgs] = useState<string>(
       ''
    )
    const [inputArgs, setInputArgs] = useState<string>(
       ''
    )
    const [filterArgs, setFilterArgs] = useState<string>(
       ''
    )
    const [outputArgs, setOutputArgs] = useState<string>(
       ''
    )

    const handleGlobal = (
        event: React.ChangeEvent<HTMLInputElement>
        ) => {
            setGlobalArgs(event.target.value)
        
    }
    const handleInput = (
        event: React.ChangeEvent<HTMLInputElement>
        ) => {
            setInputArgs(event.target.value)
        
    }

    const handleFilter = (
        event: React.ChangeEvent<HTMLInputElement>
        ) => {
            setFilterArgs(event.target.value)
        
    }

    const handleOutput = (
        event: React.ChangeEvent<HTMLInputElement>
        ) => {
            setOutputArgs(event.target.value)
        
    }

    const handlePlayStream = () => {
        socketClient.emit('start_ffplay', globalArgs, inputArgs)
    }
    const handleStartStream = () => {
        socketClient.emit('start_ffmpeg', globalArgs, inputArgs, filterArgs, outputArgs)
    }

    return (
        <div>
            <label className="">
                FFMPEG global :
                <input
                    className=""
                    type="text"
                    value={globalArgs}
                    onChange={(event) => handleGlobal(event)}
                />
            </label>
            <label className="">
                FFMPEG input :
                <input
                    className=""
                    type="text"
                    value={inputArgs}
                    onChange={(event) => handleInput(event)}
                />
            </label>
            <label className="">
                FFMPEG filter :
                <input
                    className=""
                    type="text"
                    value={filterArgs}
                    onChange={(event) => handleFilter(event)}
                />
            </label>
            <label className="">
                FFMPEG output :
                <input
                    className=""
                    type="text"
                    value={outputArgs}
                    onChange={(event) => handleOutput(event)}
                />
            </label>
            <button
            onClick={()=> handlePlayStream()}>
                START PLAY
            </button>
            <button
            onClick={()=> handleStartStream()}>
                START STREAM
            </button>
        </div>
    )
}

export default App