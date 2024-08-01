
import Card from "../../components/card/Card"
import {landInfo} from "../../helpers/landInfo"
import { useState } from "react"

export default function Home(){

    const [information, setInformation] = useState(landInfo);

    return (
        <div style={{display:"grid", gridTemplateColumns: "auto auto", margin:"15px 10px 5px 10px", gap:"15px"}}>
            { 
                information.map((text , index) => {
                    return <Card key={index} text={text.text} image={text.image} title={text.title} />;
                })
            
            }
        </div>
        
    )
}

