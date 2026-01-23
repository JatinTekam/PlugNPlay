import BasicCard from "./BasicCard";
import { CardsImg } from "../utils/utils";

function FeaturedCards(){

    return(
        <div className="w-full px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 place-items-center">
                    {
                        CardsImg.length > 0 && CardsImg.map((card)=>{
                            return <BasicCard key={card.title} card={card}/>
                        })
                    }
                </div>
            </div>
        </div>
    )

}

export default FeaturedCards;