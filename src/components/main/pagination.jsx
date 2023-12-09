function Pagination({hasNext,hasPrev,handleNext,handlePrev,page,pages}){

    // This is the pagination component this will need controls to work which will be send from using props
    return (
        <>
        <div className="flex justify-center gap-2">
            <button onClick={handlePrev} className={` bg-yellow-500 px-5 py-2 rounded-lg hover:bg-slate-300 ${hasPrev ? "cursor-pointer" : "cursor-default"}`}>
            <span className="text-white font-extrabold text-x"><i class="fa-solid fa-arrow-left"></i></span>
                                   </button>
            <span>{page} off {pages}</span>
            <button onClick={handleNext} className={`bg-yellow-500 px-5 py-2 rounded-lg hover:bg-slate-300 ${hasNext ? "cursor-pointer" : "cursor-default"}`}>
            <span className="text-white font-extrabold text-xl"><i class="fa-solid fa-arrow-right"></i></span>
            </button>
        </div>
        </>
    )
}


export default Pagination