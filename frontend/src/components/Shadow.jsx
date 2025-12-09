function Shadow({darkMode}){


    return(<>
    
    <div className={`absolute z-10 bottom-0 w-[100%] h-[70px] bg-gradient-to-t ${darkMode ? "" : "from-[#0A0A0A]" }`}>

    </div>
    
    </>)
}

export default Shadow;