import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Input, Drawer, InputNumber, Select, Radio, Button } from 'antd';
import { useStore } from 'store/hook';

const { TextArea } = Input;

const Login = observer(() => {
    const clientStore = useStore('clientStore');
    const [collpase, setCollpase] = React.useState(false);
    const { videos, audios, cameraResolution, mode, codec } = clientStore;
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
    }, [videos, audios]);

    const join = () => {
        form.validateFields().then((values) => {
            clientStore.join(values);
        });
    };

    return (
        <Drawer
            title="Login"
            width={560}
            visible={clientStore.settingVisible}
            bodyStyle={{ paddingBottom: 80 }}
            onClose={() => clientStore.hide()}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}>
                    <Button type="primary" style={{ marginRight: 8 }} onClick={join}>
                        Join
                    </Button>
                    <Button type="primary" style={{ marginRight: 8 }} onClick={() => clientStore.leave()}>
                        Leave
                    </Button>
                    <Button type="primary" style={{ marginRight: 8 }} onClick={() => clientStore.publish()}>
                        Publish
                    </Button>
                    <Button type="primary" onClick={() => clientStore.unpublish()}>
                        Unpublish
                    </Button>
                </div>
            }>
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    ...clientStore.params,
                    cameraId: videos[0] ? videos[0].value : undefined,
                    microphoneId: audios[0] ? audios[0].value : undefined,
                }}>
                <Form.Item name="appId" label="App Id" rules={[{ required: true, message: 'Please input the app Id' }]}>
                    <Input placeholder="Please input the app Id" />
                </Form.Item>
                <Form.Item
                    name="channel"
                    label="Channel"
                    rules={[{ required: true, message: 'Please input the channel' }]}>
                    <Input placeholder="Please input the channel" />
                </Form.Item>
                <Form.Item name="token" label="Token" rules={[{ required: true, message: 'Please input the token' }]}>
                    <TextArea autoSize={{ minRows: 2, maxRows: 6 }} placeholder="Please input the token" />
                </Form.Item>
                <a onClick={() => setCollpase(!collpase)}>{collpase ? 'Collpase' : 'Advanced Setting'}</a>
                {collpase ? (
                    <>
                        <Form.Item name="uid" label="UID">
                            <InputNumber />
                        </Form.Item>
                        <Form.Item name="cameraId" label="CAMERA">
                            <Select>
                                {videos.map((item) => (
                                    <Select.Option key={item.value} value={item.value}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="microphoneId" label="MICROPHONE">
                            <Select>
                                {audios.map((item) => (
                                    <Select.Option key={item.value} value={item.value}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="cameraResolution" label="CAMERA RESOLUTION">
                            <Select>
                                {cameraResolution.map((item) => (
                                    <Select.Option key={item} value={item}>
                                        {item}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="mode" label="MODE">
                            <Radio.Group>
                                {mode.map((item) => (
                                    <Radio key={item} value={item}>
                                        {item}
                                    </Radio>
                                ))}
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="codec" label="CODEC">
                            <Radio.Group>
                                {codec.map((item) => (
                                    <Radio key={item} value={item}>
                                        {item}
                                    </Radio>
                                ))}
                            </Radio.Group>
                        </Form.Item>
                    </>
                ) : null}
            </Form>
        </Drawer>
    );
});

export default Login;
