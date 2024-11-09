import * as React from 'react';
import styles from './big_hero.css';

export const BigHero = ( { children }: React.PropsWithChildren ) => {
    return (
        <div className={styles.bigHero}>
            {/* <div className={styles.newStackingContext}> */}
                {children}
            {/* </div> */}
        </div>
    );
};