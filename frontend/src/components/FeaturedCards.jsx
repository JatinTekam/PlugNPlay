import BasicCard from "./BasicCard";
import { CardsImg } from "../utils/utils";

function FeaturedCards(){

    return(<>
        <div className=" place-items-center w-[70%] grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] min-h-70 mx-auto">
           {
            CardsImg.length > 0 && CardsImg.map((card)=>{
                return <BasicCard key={card.title} card={card}/>
            })
           }
        </div>
    </>)

}

export default FeaturedCards;