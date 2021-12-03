import React, { useState } from 'react';
import Accord from './Accord/Accord';
import './css/homeAccords.scss';

const HomeAccords = () => {
    const [accords, setAccords] = useState([
        {
            id: 0,
            head: 'Lorem Ipsum1',
            description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',
            open: false,
        },
        {
            id: 1,
            head: 'Lorem Ipsum2',
            description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',
            open: false,
        },
        {
            id: 2,
            head: 'Lorem Ipsum3',
            description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',
            open: false,
        },
        {
            id: 3,
            head: 'Lorem Ipsum4',
            description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',
            open: false,
        },
        {
            id: 4,
            head: 'Lorem Ipsum5',
            description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',
            open: false,
        },
    ])
    const onOpenAccord = (id) => {
        const newAccords = accords.map((accord) => {
            if(accord.id === id) {
                if(accord.open) {
                    accord.open = false;
                } else {
                    accord.open = true;
                }
                return accord;
            } else {
                accord.open = false;
                return accord;
            }
        })
        console.log(newAccords)
        setAccords(newAccords)
    }
    return (
        <div className="home-accords-holder">
            <h2>Frequently Asked Questions</h2>
            <div className="accords-wrap">
                {
                    accords.map((accord) => (
                        <Accord key={accord.id} accordInfo={accord} onOpenAccord={onOpenAccord} />
                    ))
                }
            </div>
        </div>
    )
}

export default HomeAccords;
