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
                        It's Deinyon's website! Pronounced like <i>Cayenne</i> but starting with "dein." I'm also known as <i>ddoodm</i> across the intertubes.
                    </Sheet>
                </Rows>
            </BigHero>
        </div>
    );
};