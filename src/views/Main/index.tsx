import React from 'react';
import { Row, Col, Skeleton } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store/hook';
import ViewPanel from 'components/ViewPanel/index';
import styles from './style.less';

const Main = observer(() => {
    const clientStore = useStore('clientStore');
    const { localStream, remoteStreams } = clientStore;

    if (!localStream) {
        return <Skeleton paragraph={{ rows: 6 }} active />;
    }

    return (
        <Row gutter={[16, 16]} wrap={true}>
            {localStream ? (
                <Col xs={12} lg={8} xl={6} className={styles.panel}>
                    <ViewPanel type="local" stream={localStream} />
                </Col>
            ) : null}
            {remoteStreams.map((item, index) => (
                <Col key={index} xs={12} lg={8} xl={6} className={styles.panel}>
                    <ViewPanel key={index} type="remote" stream={item} />
                </Col>
            ))}
        </Row>
    );
});

export default Main;
