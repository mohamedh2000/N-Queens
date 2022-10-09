import React from 'react';
import Row from './Row.js'

const BoardSolution = ({solutions = []}) => {

    console.log(solutions)

    return (
        <div className="w-full justify-center items-center grid grid-rows-3">
            {solutions.map((row) => 
                <Row row={row} />
            )}
        </div>
    )
}

export default BoardSolution;