import * as React from 'react';
import { BigHero } from '../big_hero/big_hero';
import { ProfilePic } from '../profile_pic/profile_pic';
import { Sheet } from '../sheet/sheet';
import { Rows } from '../layout/rows/rows';
import styles from './home.css';

export const Home = () => {
    return (
        <div className={styles.body}>
            <BigHero>
                <Rows spacing='48px' align='stretch'>
                    <ProfilePic />
                    <span className={styles.cursiveHeading}>
                        Deinyon Davies
                    </span>
                    <Sheet>
                        It's Deinyon's website! Pronounced like <i>Cayenne</i> &#x1f336;&#xFE0F; but starting with "dein". Also known as <i>ddoodm</i> across the net.
                    </Sheet>
                </Rows>
            </BigHero>
        </div>
    );
};