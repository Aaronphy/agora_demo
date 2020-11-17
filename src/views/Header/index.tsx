import React from 'react';
import { Tooltip } from 'antd';
import { headerActions } from './actions';
import Login from 'components/Settings/index';
import { useStore }  from 'store/hook';
import styles from './style.less';


export default function Header() {
    
    const clientStore = useStore("clientStore");

    return (
        <div className={styles.header}>
            <div className={styles.title}>Agora React Demo</div>  
            <div className={styles.actions}>
                {
                    headerActions.map(item => {
                        const { Comp } = item;
                        return(
                            <Tooltip title={item.name} key={item.code}>
                                <Comp onClick={()=>clientStore.show()}/> 
                            </Tooltip>
                        )
                    })
                }
                
            </div>
            <Login/>   
        </div>
    )
}
