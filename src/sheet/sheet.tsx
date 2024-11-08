import * as React from 'react';
import styles from './sheet.css';

export function Sheet({ children }: React.PropsWithChildren) {
    return (
        <div className={styles.container}>
            <div className={styles.sheet}>
                {children}
            </div>
        </div>
    );
}
