import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
const CountDownTimer: React.FC = () => {
    const dispatch = useDispatch()
    const [min, setmin] = useState<number>(9)
    const [sec, setsec] = useState<number>(59)

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (sec > 0) {
                setsec(prev => prev - 1)
            }
            else {
                if (min === 0) {
                    clearInterval(myInterval)
                    dispatch({ type: 'hide_quiz_card' })
                    dispatch({ type: 'show_result' })
                }
                else {
                    setmin(prev => prev - 1)
                    setsec(59)
                }

            }
        }, 1000)
        return () => {
            clearInterval(myInterval)

        }
    })

    // FOR LEADING ZEROS OF VALUES LESS THAN 10
    const LeadingZeros = (seconds: number) => {
        return seconds < 10 ? `0${seconds}` : seconds
    }

    return (
        <>
            {`${min}:${LeadingZeros(sec)}`}
        </>
    );
}

export default React.memo(CountDownTimer);