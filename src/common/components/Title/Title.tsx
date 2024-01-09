import React from 'react';
import s from './Title.module.scss'
const Title:React.FC<{children?:string}> =
    ({children}) => {
    return (
        <h1 className={s.title}>
            {children}
        </h1>
    );
};

export default Title;