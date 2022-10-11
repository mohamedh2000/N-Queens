import React from 'react';
import Row from './Row.js'

const BoardSolution = ({solution = []}) => {

    console.log(solution)

    return (
        <div className={solution.length != 1 ? `w-full` : 'p-3 rounded-xl'}>
            {solution.map((row) => 
                <Row row={row} />
            )}
        </div>
    )
}

export default BoardSolution;