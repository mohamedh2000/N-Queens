import React from 'react';
import Row from './Row.js'

const BoardSolution = ({solution = []}) => {

    console.log(solution)

    return (
        <div className="w-full">
            {solution.map((row) => 
                <Row row={row} />
            )}
        </div>
    )
}

export default BoardSolution;