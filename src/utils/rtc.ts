import React, { useState, useEffect } from 'react';
import RTC from 'agora-rtc-sdk';


export interface IDeviceInfo {
   [key: string]: string;
};


export const useRTCEnv = () => {
    const [isSupport, setSupport] = useState(RTC.checkSystemRequirements()); 
    return isSupport;
};


export const getDevices = async () => {

  return new Promise((resolve,reject)=>{
      RTC.getDevices((items)=>{
        items.filter((item) =>{
          return ["audioinput", "videoinput"].indexOf(item.kind) !== -1
        })
        .map((item)=>{
          return {
            name: item.label,
            value: item.deviceId,
            kind: item.kind,
          }
        });
        let videos:IDeviceInfo[] = [];
        let audios:IDeviceInfo[] = [];
        for (let i = 0; i < items.length; i++) {
          let item = items[i]
          if ("videoinput" == item.kind) {
            let name = item.label
            let value = item.deviceId
            if (!name) {
              name = "camera-" + videos.length
            }
            videos.push({
              name: name,
              value: value,
              kind: item.kind
            })
          }
          if ("audioinput" == item.kind) {
            let name = item.label
            let value = item.deviceId
            if (!name) {
              name = "microphone-" + audios.length
            }
            audios.push({
              name: name,
              value: value,
              kind: item.kind
            })
          }
        }
        resolve({videos,audios})
      });
  });  
};


export const createClient = () => {

}


