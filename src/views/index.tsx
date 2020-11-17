import React from 'react';
import { Layout } from 'antd';
import { observer } from "mobx-react-lite";
import { useStore } from '../store/hook';
import H from './Header/index';
import C from './Main/index';
import styles from './style.less';

const { Header, Content } = Layout;

const App = () => {
    return (
        <Layout className={styles.app}>
            <Header className={styles.header}>
                <H/>
            </Header>
            <Content className={styles.content}>
                <C/>
            </Content>
        </Layout>
    )
};

export default App;
