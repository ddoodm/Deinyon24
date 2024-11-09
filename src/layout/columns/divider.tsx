import * as React from 'react';
import styles from './divider.css';

export const Divider = ({ style }: { style?: React.CSSProperties }) => {
    return (
        <div className={styles.divider} style={style}></div>
    );
};
