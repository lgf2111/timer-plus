import React from 'react'

export default function Timer({ hours, minutes, seconds }) {
    const [hours_, minutes_, seconds_] = [hours, minutes, seconds].map(el => {
        return el.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
    })

    return (
        <>
            <div className="overlay"></div>
            <select>
                <option>{hours_}</option>
            </select>:
            <select>
                <option>{minutes_}</option>
            </select>:
            <select>
                <option>{seconds_}</option>
            </select>
        </>
    )
}
