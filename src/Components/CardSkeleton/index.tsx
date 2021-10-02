import React from 'react';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Styles from './index.module.css'


const CardSkeleton: React.FC = () => {
    return (
        <Paper className={Styles.paper}>
            <CircularProgress style={{ width: '80px', height: '80px',color:'#fcb812' }} />
        </Paper>
    );
}
export default React.memo(CardSkeleton);