import React from "react";
import { SettingFilled, SwapOutlined } from '@ant-design/icons';

export interface IHeaderAction {
    code:string,
    Comp:React.ReactNode,
    name:string
};

export const headerActions:IHeaderAction[] = [
    {
     code:'setting',
     Comp: SettingFilled,
     name:'Setting'   
    },
];

