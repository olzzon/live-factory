import React, { useState } from 'react'

interface IMpegTsProps {
facotoryId: number
}

const UdpOutputOptions: React.FC<IMpegTsProps> = (props) => {
	const [url, setUrl] = useState<string>('udp://localhost:1234?pkt_size=1316')

	const handleResolution = (event: React.ChangeEvent<HTMLInputElement>) => {
/*		setUrl(event.target.value)
		let next = { ...props.cmd }
		next.outputContainer.params[0] = event.target.value
		props.setCmd(next)*/
	}
	return (
		<div className='options'>
			<label className="">
				Codec :
				<input className="" type="text" value={url} onChange={(event) => handleResolution(event)} />
			</label>
		</div>
	)
}

export default UdpOutputOptions
