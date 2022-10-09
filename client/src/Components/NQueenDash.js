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
        axios(`https://localhost:3002?num=${inputVal ?? 2}`).then((res) => {
            console.log(res.data);
        })
    }


    return (
        <div className="w-full h-full">
            <div className="grid grid-cols-3 w-full h-full justify-center items-center p-5 rounded-2xl">
                <div className="w-full h-full flex flex-col justify-center items-center space-y-3 shadow-2xl p-5 rounded-2xl">
                    <b className="typewriter"> NQueens Input: </b>
                    <input className="shadow-2xl rounded-full w-3/4p-3 outline-none text-center"
                    value={inputVal} onChange={(e) => setVal(e.target.value)}/>
                    <button className={STYLE.btn} onClick={() => getSolution()}>Confirm</button>
                </div>
                <BoardSolution solutions={solutions}/>
            </div>
            
        </div>
    )
}

export default NQueenDash;