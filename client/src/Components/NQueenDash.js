import React, { useState, useMemo, useEffect } from 'react';
import BoardSolution from './BoardSolution.js';
import axios from 'axios';

const NQueenDash = () => {

    const [solutions, setSolutions] = useState([]);
    const [inputVal, setVal] = useState();

    const STYLE = {
        btn: "shadow-2xl rounded-full outline-none hover:bg-green-500 p-4 w-3/4 bg-green-400 text-white"
    }

    const getSolution = () => {
        axios(`http://localhost:3002?num=${inputVal ?? 2}`, {headers: {"Access-Control-Allow-Origin": "*"}}).then((res) => {
            setSolutions(res.data);
        })
    }

    return (
            <div className="flex flex-col space-y-10 w-full h-full justify-center items-center p-5 rounded-2xl">
                <div className="w-1/3 min-w-[180px] max-h-[210px] h-full flex flex-col justify-center items-center space-y-3 shadow-2xl p-5 rounded-2xl">
                    <b className="typewriter"> NQueens Input: </b>
                    <input className="shadow-2xl rounded-full w-full p-3 outline-none text-center"
                    value={inputVal} onChange={(e) => setVal(e.target.value)}/>
                    <button className={STYLE.btn} onClick={() => getSolution()}>Confirm</button>
                </div>
                <i> Solutions: {solutions.length}</i>
                <ul className={`flex flex-row h-full space-x-5 w-full overflow-x-scroll ${solutions.length === 0 ? ' text-center justify-center items-center' : ''}`}>
                    {solutions.length == 0 ? <i>There are no solutions</i> : solutions.map((solution) => <BoardSolution solution={solution} />)}
                </ul>
                
            </div>
    )
}

export default NQueenDash;