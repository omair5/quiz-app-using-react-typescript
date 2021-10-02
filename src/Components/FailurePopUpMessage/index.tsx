import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    mainHeading: {
        fontSize: '30px',
        textAlign: 'center',
        color: 'red',
        padding: '10px',
        fontWeight: 'bolder',
        textTransform: 'capitalize'
    },
    subHeading: {
        textAlign: 'center',
        color: 'rgb(76, 84, 85)',
        padding: '10px',
        fontWeight: 'bolder'
    },
    mainContainer: {
        padding: '30px',
        borderRadius: '5px',
        "& p": {
            margin: '20px auto',
            color: 'gray'
        }
    }
});

interface myprops {
    heading: string,
    message: string,
    open: boolean,
    HandleClose: () => void
}

function FailurePopUpMessage({ heading, message, open, HandleClose }: myprops) {
    console.log(heading, message)
    const classes = useStyles();

    return (
        <React.Fragment>
            <div>
                <Dialog
                    open={open}
                    onClose={HandleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <div className={classes.mainContainer}>
                        <h1 id="alert-dialog-title" className={`${classes.mainHeading}`}>{heading}</h1>
                        <p> {message}</p>
                    </div>

                </Dialog>
            </div >
        </React.Fragment>
    );
}
export default React.memo(FailurePopUpMessage)