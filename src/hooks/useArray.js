import React from "react";


export default function useArray(defaultArray){

    const [state, setState] = React.useState(defaultArray);


    function push(value){
        setState((val)=>[...val, value]);
    }

    function remove(index){
        setState((val)=>val.filter((val, ind)=>ind != index ));
    }

    function empty(){
        setState([]);
    }

    return [state, {push, remove, empty}]

}