import React from 'react';
import { Layout, Result } from 'antd';
import { useStore } from '../store/hook';
import H from './Header/index';
import C from './Main/index';
import styles from './style.less';

const { Header, Content } = Layout;

const App = () => {
    const clientStore = useStore('clientStore');

    if (!clientStore.isSupport) {
        return (
            <Result status="warning" title="Browser not supported, please use Google Chrome for better experience." />
        );
    }

    return (
        <Layout className={styles.app}>
            <Header className={styles.header}>
                <H />
            </Header>
            <Content className={styles.content}>
                <C />
            </Content>
        </Layout>
    );
};

export default App;
