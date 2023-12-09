const Modal=({onClose, content})=>{
    return (
        <div className="absolute right-10 top-20 z-20 border border-gray-600 px-5 pty-2 pb-5 rounded-xl bg-white shadow-lg">
                   <button onClick={onClose}> <span className="ml-auto absolute right-1 top-0 text-gray-500 text-xl"><i className="fa-solid fa-xmark"></i></span></button>
                <div>
                    <h3 className="flex gap-2 text-xl font-bold"><span className="text-2xl text-green-800 font-extrabold"><i className="fa-solid fa-check"></i></span>{content}</h3>
                </div>
        </div>
    )
}
export default Modal