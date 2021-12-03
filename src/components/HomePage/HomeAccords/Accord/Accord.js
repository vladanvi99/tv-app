import React from 'react';
import './css/accord.scss';

const Accord = ({accordInfo, onOpenAccord}) => {
    const {id, head, description, open} = accordInfo;
    return (
        <div className={`accord-wrap ${open ? 'open-accord' : ''}`}>
            <div className="accord-head" onClick={() => onOpenAccord(id)}>
                <h2>{head}</h2>
                <i className="fas fa-plus"></i>
            </div>
            <div className="accord-description">
                <p>
                    {description}
                </p>
            </div>
        </div>
    )
}

export default Accord;
