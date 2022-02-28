import React from 'react'
import { IInputParams } from '../../../interface/GenericInterfaces'

// srt://0.0.0.0:9998?pkt_size=1316&mode=listener

const SRT_OPTIONS = {
    PKT_SIZE: 'pkt_size',
    MODE: 'listener'
}


const SrtInputOptions: React.FC<IInputParams> = (props) => {
    console.log('SRT Input')
    return (
		<div className='options'>
            InputAddress:
        {props.otherParams}
        </div>
    )
}

export default SrtInputOptions