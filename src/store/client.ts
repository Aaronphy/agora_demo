import React from 'react';
import { action, observable } from "mobx";
import { message, notification } from 'antd';
import RTC from 'agora-rtc-sdk';
import { getDevices } from 'utils/rtc';
import to from 'utils/a2js';



export interface IParams {
    appId:string|null,
    channel:string|null,
    token:string|null,
    uid:string|null|number,
    cameraId:string|null,
    microphoneId:string|null,
    cameraResolution:'default'|'480p'|'720p'|'1080p',
    mode:'live'|'rtc',
    codec:'h264'|'vp8'

}

export interface IDeviceInfo {
   [key: string]: string;
};

export interface IDeviceInfos {
    videos:IDeviceInfo[]
    audios:IDeviceInfo[]
}


const DEFAULT = {
    appId:'09159282a952477a8b5edac5c8b463a2',
    channel:'test',
    token:'00609159282a952477a8b5edac5c8b463a2IABkWQrtPAQUDMLoDcrQ7GTzZ1i2vYs8A8UyZz+GfyOv6Ax+f9gAAAAAEADGU1aHxuKzXwEAAQDF4rNf'
};

const msgKey = 'updatable';


export default class ClietStore {
    @observable
    isSupport:boolean = RTC.checkSystemRequirements();

    @observable
    joined:boolean = false;

    @observable
    published:boolean = false;

    @observable
    localStream:RTC.Stream|null = null;

    @observable
    remoteStreams:RTC.Stream[] = [];

    client:RTC.Client|null = null;

    @observable.ref
    params:IParams = {
        ...DEFAULT,
        uid:null,
        cameraId:null,
        microphoneId:null,
        cameraResolution:'default',
        mode:'live',
        codec:'h264'
    }

    @observable.ref
    audios:IDeviceInfo[] = [];

    @observable.ref
    videos:IDeviceInfo[] = [];

    @observable.ref
    cameraResolution:string[]= [
        'default','480p','720p','1080p'
    ]

    @observable.ref
    mode:string[] = ['live','rtc']

    @observable.ref
    codec:string[] = ['h264','vp8']



    @observable
    settingVisible:boolean = true;

    @action
    show() {
        this.settingVisible= true;
    }

    @action
    hide() {
        this.settingVisible = false;
    }


    @action
    setDevice(infos:IDeviceInfos){
        this.audios = infos.audios;
        this.videos = infos.videos;
    }

    @action
    async join() {
        let err:any,res:any
        
        if(this.joined) return message.error('Your already joined');

        message.loading({ content: 'Loading...,Please wait...', msgKey });
        
        this.hide();
        
        await this.createClient();
        
        [err,res] = await to(this.initClient());
        if(err)return console.error('init client error',err);

        [err,res] = await to(this.initJoin());
        if(err)return console.error('init join error',err);

        [err,res] = await to(this.initLocalStream());
        if(err)return console.error('init localStream error',err);

        message.success({ content: 'Loaded!', msgKey, duration: 2 });
    }

    @action
    leave() {
        
    }

    @action
    publish() {
        if(!this.client) return message.error('Please Join Room First');
        if(this.published) return message.error('Your already published');
        let oldState = this.published;
        let Stream = <RTC.Stream>this.localStream
        this.client.publish(Stream,(err)=>{
            this.published = oldState;
            this.notice('publish failed','error');
        });
        this.published = true;
        this.notice('publish');
    }

    @action
    unpublish(){

    }

    @action
    removeView(id:string){

    }

    @action
    addView(id:string){

    }

    @action
    setLocalStream(stream:RTC.Stream) {
        this.localStream = stream
    }


    constructor(){
        this.initDevices();
    }


    async initDevices (){
        try{
            const infos = <IDeviceInfos> await getDevices();
            this.setDevice(infos);
        }catch(e){
            console.log(e);
        }
    }

    async createClient(){
        const { mode,codec } = this.params;
        this.client = RTC.createClient({mode,codec});
        this.bindEvents();
        return Promise.resolve();
    }

    async initClient() {
        const appId = <string>this.params.appId;
        return new Promise((resolve,reject)=>{
            this.client?.init(appId,()=>{
                resolve();
            },err=>{
                reject(err);
            });
        });
    }

    async initJoin() {
        const token = <string>this.params.token;
        const channel = <string>this.params.channel;
        const uid = <string>this.params.uid;
        return new Promise((resolve,reject) =>{ 
            this.client?.join(token,channel,uid,(userId)=>{
                this.params.uid = userId;
                this.joined = true;
                this.notice(`join channel ${channel} success, uid ${userId}`);
                resolve();
            },err=>{
                reject(err);
            });
        })
    }

    async initLocalStream() {
        let localStream = RTC.createStream({
            streamID: <string|number>this.params.uid,
            audio: true,
            video: true,
            screen: false,
            microphoneId: <string>this.params.microphoneId,
            cameraId: <string>this.params.cameraId
        });
        return new Promise((resolve,reject)=>{
            localStream?.init(()=>{
                this.setLocalStream(localStream);
                this.publish();
                resolve();
            },err=>{
                reject(err);
            });
        })
    }

    bindEvents(){

        this.client?.on('error',(err)=>{
            console.log('clientError',err);
        });

        this.client?.on('peer-leave',(evt)=>{
            let id = evt.uid;
            let { remoteStreams } = this;
            let streams = remoteStreams.filter(e => id !== e.getId());
            let peerStream = remoteStreams.find(e => id === e.getId());
            if(peerStream && peerStream.isPlaying()) {
                peerStream.stop()
            }
            this.remoteStreams = streams;
            if (id != this.params.uid) {
                this.removeView(id);
            };
            this.notice('peer leave')
        });

        this.client?.on("stream-published",  (evt)=> {
            this.notice("stream published success",'success')
        });

        this.client?.on("stream-added", (evt)=> {  
            let remoteStream = evt.stream;
            let id = remoteStream.getId();
            this.notice(`stream-added uid:${id}`,'success');
            if (id !== this.params.uid) {
                this.client?.subscribe(remoteStream, {}, (err:any) => {
                    console.log("stream subscribe failed", err)
                });
            };
        });

        this.client?.on("stream-subscribed", (evt)=> {
            let remoteStream = evt.stream
            let id = remoteStream.getId()
            this.remoteStreams.push(remoteStream)
            //this.addView(id)
            //remoteStream.play("remote_video_" + id)
            this.notice("stream-subscribed remote-uid: " + id)
        });

        this.client?.on("stream-removed", (evt) => {
            let remoteStream = evt.stream
            let id = remoteStream.getId()
            this.notice("stream-removed uid: " + id)
            if(remoteStream.isPlaying()) {
            remoteStream.stop()
            }
            this.remoteStreams = this.remoteStreams.filter((stream)=> {
                return stream.getId() !== id
            })
            //removeView(id)
        });

        this.client?.on("onTokenPrivilegeWillExpire", ()=>{
            this.notice("onTokenPrivilegeWillExpire",'warning')
        });

        this.client?.on("onTokenPrivilegeDidExpire", ()=>{
            this.notice("onTokenPrivilegeDidExpire",'error')
        });


    }

    notice(message:string,type:string = 'info'){
        notification[type]({message});
    }
}