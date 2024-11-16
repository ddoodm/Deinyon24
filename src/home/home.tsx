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
import LinkedInIcon from '../icons/linkedin.svg';
import YouTubeIcon from '../icons/youtube.svg';
import InstagramIcon from '../icons/instagram.svg';
import { Bubbles } from '../bubbles/bubbles';
import { useLayout } from '../hooks/useLayout';

const SiteLink: React.FC<React.PropsWithChildren<{ Icon: React.ComponentType<{ style?: React.CSSProperties }>, href: string }>> = ({ Icon, href, children }) => (
    <a href={href} target='_blank'>
        <Columns gap='0.5em' alignItems='center'>
            <Icon style={{ height: '1em', width: '1em' }} />
            <span>{children}</span>
        </Columns>
    </a>
);

const Footer = () => {
    return (
        <div className={styles.footer}>
            &copy; Deinyon Davies 2024<br />
            Written in TS, React, CSS Modules, WebGL 2.0 - built with Webpack.<br />
            <a href='https://github.com/ddoodm/Deinyon24' target='_blank'>
                Source available on GitHub
            </a><br />
            Hosted on GitHub Pages
        </div>
    );
};

export const Home = () => {
    const layout = useLayout();

    return (
        <div className={styles.body}>
            <BigHero>
                <Rows spacing={layout === 'horizontal' ? '50px' : '24px'} align='stretch'>
                    <ProfilePic />
                    <div className={styles.backgroundCanvas}>
                        <Bubbles />
                    </div>
                    <div className={styles.cursiveHeading}>
                        Deinyon Davies
                    </div>
                    <Sheet>
                        <Columns gap='12px' className={styles.bodyColumns} alignItems='center'>
                            <Column flex={1}>
                                It's Deinyon's website! Pronounced like <i>Cayenne</i> but starting with "dein." I'm also known as <i>ddoodm</i> across the intertubes.
                            </Column>
                            <Divider style={{
                                alignSelf: 'stretch',
                                background: 'var(--body-text-color)',
                                opacity: 0.333,
                            }}/>
                            <Column flex={0.25}>
                                <Rows>
                                    <SiteLink Icon={GitHubIcon} href='https://github.com/ddoodm/'>GitHub</SiteLink>
                                    <SiteLink Icon={LinkedInIcon} href='https://linkedin.com/in/deinyon'>LinkedIn</SiteLink>
                                    <SiteLink Icon={YouTubeIcon} href='https://www.youtube.com/ddoodm'>YouTube</SiteLink>
                                    <SiteLink Icon={InstagramIcon} href='https://www.instagram.com/ddoodm/'>Instagram</SiteLink>
                                </Rows>
                            </Column>
                        </Columns>
                    </Sheet>
                </Rows>
            </BigHero>
            <Footer />
        </div>
    );
};