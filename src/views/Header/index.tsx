import React from 'react';
import { Tooltip } from 'antd';
import { SettingFilled } from '@ant-design/icons';
import Login from 'components/Settings/index';
import Share from 'components/Share/index';
import { useStore } from 'store/hook';
import styles from './style.less';

export default function Header() {
    const clientStore = useStore('clientStore');

    return (
        <div className={styles.header}>
            <div className={styles.title}>Agora React Demo</div>
            <div className={styles.actions}>
                <Tooltip title="Settings">
                    <SettingFilled onClick={() => clientStore.show()} />
                </Tooltip>
                <Share></Share>
            </div>
            <Login />
        </div>
    );
}
