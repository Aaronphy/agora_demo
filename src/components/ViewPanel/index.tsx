import React,{ useEffect } from 'react';
import RTC from 'agora-rtc-sdk';
import styles from './style.less';

interface IViewPanelProps {
    type:'local'|'remote',
    isSelected?:boolean,
    stream: RTC.Stream
}

export default function ViewPanel(props:IViewPanelProps) {
    
    const { type, stream } = props;
    
    const id = type === 'local'? 'local_stream':`remote_stream_${stream.getId()}`

    useEffect(()=>{
        stream.play(id);
    },[]);

    return (
        <div id={id} className={styles.panel}>
        
        </div>
    )
}
