import { useState, useMemo, useCallback, useEffect } from "react"





const TestMemo = ()=>{

    const [counter, setCounter] = useState(0);
    const [multiplier, setMultiplier] = useState(1000);
    const [answer, setAnswer] = useState(0);

    // const renderedValue = useMemo(()=>{
        
    //     return counter * multiplier;

    // }, [counter]);

    let renderedValue = answer;

    const extCalc = useCallback(function(){

        renderedValue = counter * multiplier;
      
    }, [counter])

    extCalc()

    useEffect(function(){
        setAnswer(renderedValue);
    }, [counter])

    return <div>
        <h2>Test Memo</h2>
        <p>Rendered Counter : {renderedValue}</p>
        <p>{counter}</p>
        <input type="number" placeholder="Multiplier" value={multiplier} onChange={(e)=>setMultiplier(e.target.value)} />
        <button onClick={()=>{setCounter((c)=>c+1)}}>Increment</button>
    </div>
}

export default TestMemo;