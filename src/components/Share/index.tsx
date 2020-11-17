import React from 'react';
import { Tooltip, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ShareAltOutlined } from '@ant-design/icons';
import { useStore } from 'store/hook';

const Share = observer(() => {
    const clientStore = useStore('clientStore');

    if (!clientStore.joined) return null;

    const { appId, channel, token } = clientStore.params;

    const shareUrl = `${location.href}?appId=${appId}&channel=${channel}&token=${token}`;

    return (
        <CopyToClipboard text={shareUrl} onCopy={() => message.success('copied!!!')}>
            <Tooltip title="Share">
                <ShareAltOutlined />
            </Tooltip>
        </CopyToClipboard>
    );
});

export default Share;
