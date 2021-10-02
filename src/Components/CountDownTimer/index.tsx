import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
const CountDownTimer: React.FC = () => {
    const dispatch = useDispatch()
    const min = useSelector((state: RootStateOrAny) => state.CountDownMins)
    const sec = useSelector((state: RootStateOrAny) => state.CountDownSecs)

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (sec > 0) {
                dispatch({ type: 'decrement_second' })
            }
            else {
                if (min === 0) {
                    clearInterval(myInterval)
                    dispatch({ type: 'hide_quiz_card' })
                    dispatch({ type: 'show_result' })
                }
                else {

                    dispatch({ type: 'decrement_minute' })
                    dispatch({ type: 'set_seconds' })
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
            Timer : {`${min}:${LeadingZeros(sec)}`}
        </>
    );
}

export default React.memo(CountDownTimer);