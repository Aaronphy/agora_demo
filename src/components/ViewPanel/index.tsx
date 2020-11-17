import React, { useEffect, useState } from 'react';
import { FullscreenOutlined, FullscreenExitOutlined, AudioMutedOutlined, AudioOutlined } from '@ant-design/icons';
import RTC from 'agora-rtc-sdk';
import styles from './style.less';

interface IViewPanelProps {
    type: 'local' | 'remote';
    isSelected?: boolean;
    stream: RTC.Stream;
}

export default function ViewPanel(props: IViewPanelProps) {
    const { type, stream } = props;

    const [fullScreen, setFullScreen] = useState(false);
    const [mute, setMute] = useState(false);

    const id = type === 'local' ? 'local_stream' : `remote_stream_${stream.getId()}`;

    useEffect(() => {
        stream.play(id);
    }, []);

    const muteAudio = () => {
        stream.muteAudio();
        setMute(true);
    };

    const unMuteAudio = () => {
        stream.unmuteAudio();
        setMute(false);
    };

    return (
        <div
            className={styles.panel}
            style={{ position: fullScreen ? 'fixed' : 'absolute', zIndex: fullScreen ? 999 : 1 }}>
            {fullScreen ? (
                <FullscreenExitOutlined className={styles.full} onClick={() => setFullScreen(false)} />
            ) : (
                <FullscreenOutlined className={styles.full} onClick={() => setFullScreen(true)} />
            )}
            <div className={styles.actions}>
                {!mute ? (
                    <AudioOutlined className={styles.microphone} onClick={muteAudio} />
                ) : (
                    <AudioMutedOutlined className={styles.microphone} onClick={unMuteAudio} />
                )}
            </div>
            <div id={id} className={styles.panel}></div>
        </div>
    );
}
