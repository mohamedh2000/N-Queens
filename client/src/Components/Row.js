import React from 'react';

const Row = ({row = []}) => {

    const STYLE = {
        queenStyle: "bg-yellow-400 w-full h-full p-5 ",
        emptyStyle: "bg-gray-400 w-full h-full p-5 "
    }

    return (
        <div className={`flex flex-row w-full`}> 
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