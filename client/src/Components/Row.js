import React from 'react';

const Row = ({row = []}) => {

    const STYLE = {
        queenStyle: "bg-gray-400 w-full h-full p-5 rounded-2xl",
        emptyStyle: "w-full h-full p-5 rounded-2xl"
    }

    return (
        <div className={`grid grid-cols-${row.length}`}> 
            {row.map((val) => {
                if(val === 1) {
                    return <div className={STYLE.queenStyle}> Q </div>
                }
                else {
                    return <div className={STYLE.emptyStyle}> . </div>
                }
            })}
        </div>
    )
}

export default Row;