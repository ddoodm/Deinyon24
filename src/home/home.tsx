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
    const SiteLink: React.FC<React.PropsWithChildren<{ Icon: React.ComponentType<{ style?: React.CSSProperties }>, href: string }>> = ({ Icon, href, children }) => (
        <a href={href} target='_blank'>
            <Columns gap='0.5em' alignItems='center'>
                <Icon style={{ height: '1em', width: '1em' }} />
                <span>{children}</span>
            </Columns>
        </a>
    );

    return (
        <div className={styles.body}>
            <BigHero>
                <Rows spacing='50px' align='stretch'>
                    <ProfilePic />
                    <span className={styles.cursiveHeading}>
                        Deinyon Davies
                    </span>
                    <Sheet>
                        <Columns gap='48px'>
                            <Column flex={1} alignSelf='center'>
                                It's Deinyon's website! Pronounced like <i>Cayenne</i> but starting with "dein." I'm also known as <i>ddoodm</i> across the intertubes.
                            </Column>
                            <Divider style={{
                                background: 'var(--body-text-color)',
                                opacity: 0.333,
                            }}/>
                            <Column flex={0.25}>
                                <Rows>
                                    <SiteLink Icon={GitHubIcon} href='https://github.com/ddoodm/'>GitHub</SiteLink>
                                    <SiteLink Icon={YouTubeIcon} href='https://www.youtube.com/ddoodm'>YouTube</SiteLink>
                                    <SiteLink Icon={InstagramIcon} href='https://www.instagram.com/ddoodm/'>Instagram</SiteLink>
                                </Rows>
                            </Column>
                        </Columns>
                    </Sheet>
                </Rows>
            </BigHero>
        </div>
    );
};