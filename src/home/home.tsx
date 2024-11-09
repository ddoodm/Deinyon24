import * as React from 'react';
import { BigHero } from '../big_hero/big_hero';
import { ProfilePic } from '../profile_pic/profile_pic';
import { Sheet } from '../sheet/sheet';
import { Rows } from '../layout/rows/rows';
import styles from './home.css';
import { Columns } from '../layout/columns/columns';
import { Column } from '../layout/columns/column';
import { Divider } from '../layout/columns/divider';
import GitHubIcon from '../icons/github-mark.svg';
import YouTubeIcon from '../icons/youtube.svg';
import InstagramIcon from '../icons/instagram.svg';

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
                        <Columns gap='48px'>
                            <Column flex={1}>
                                It's Deinyon's website! Pronounced like <i>Cayenne</i> but starting with "dein." I'm also known as <i>ddoodm</i> across the intertubes.
                            </Column>
                            <Divider style={{
                                background: 'var(--body-text-color)',
                                opacity: 0.333,
                            }}/>
                            <Column flex={0.25}>
                                <Rows>
                                    <Columns gap='0.5em' alignItems='center'>
                                        <GitHubIcon style={{ height: '1em', width: '1em' }} />
                                        <span>GitHub</span>
                                    </Columns>
                                    <Columns gap='0.5em' alignItems='center'>
                                        <YouTubeIcon style={{ height: '1em', width: '1em' }} />
                                        <span>YouTube</span>
                                    </Columns>
                                    <Columns gap='0.5em' alignItems='center'>
                                        <InstagramIcon style={{ height: '1em', width: '1em' }} />
                                        <span>Instagram</span>
                                    </Columns>
                                </Rows>
                            </Column>
                        </Columns>
                    </Sheet>
                </Rows>
            </BigHero>
        </div>
    );
};