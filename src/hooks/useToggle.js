import React from "react";


export default function(defaultValue){

    const [value, setValue] = React.useState(defaultValue);

    function toggleValue(value){
        setValue((currentValue)=>{
            return typeof value == 'boolean' ? value : !currentValue;
        })
    }

    return [value, toggleValue];
}