import React, { useState } from 'react'
import io from 'socket.io-client'
const socketClient = io()

const App = () => {
    
    const [ffmpegArgs, setFfmpegArgs] = useState<string>(
       ''
    )

    const handleInput = (
        event: React.ChangeEvent<HTMLInputElement>
        ) => {
            setFfmpegArgs(event.target.value)
        
    }

    const handleStartStream = () => {
        socketClient.emit('start_ffmpeg', ffmpegArgs)
    }

    return (
        <div>
            <label className="">
                Insert FFMPEG argument :
                <input
                    className=""
                    type="text"
                    value={ffmpegArgs}
                    onChange={(event) => handleInput(event)}
                />
            </label>
            <button
            onClick={()=> handleStartStream()}>

            </button>
        </div>
    )
}

export default App