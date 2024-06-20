import React from 'react';
import '../styles/toolbar.scss'
import toolState from "../store/toolState";

const SettingBar = () => {
    return (
        <div className='setting-bar'>
            <label htmlFor="line-width">Толщина линии</label>
            <input
                onChange={(event) => toolState.setLineWidth(event.target.value)}
                id='line-width'
                style={{margin: 10}}
                defaultValue={1}
                type="number"
                min={1}
                max={100}/>
            <label htmlFor="stroke-color">Цвет Обводки</label>
            <input onChange={event => toolState.setStrokeColor(event.target.value)} id='stroke-color'
                   style={{margin: 10}} type="color"/>
        </div>
    );
};

export default SettingBar;