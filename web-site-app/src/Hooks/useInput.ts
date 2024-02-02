import { useState, ChangeEvent } from 'react'
export const useInput = <T>(initialState: T) => {
	const [data, setData] = useState<T>(initialState)
	const changeText = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setData(prevData => ({
			...prevData,
			[name]: value,
		}))
	}

	return {data, changeText}
}
