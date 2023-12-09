import { Link } from "react-router-dom"
function Intro(){
    return (
        <>
            <div className="mt-20 flex flex-col justify-center">
            <div className="flex border flex-row border-gray-400 rounded-lg gap-10 p-10 max-sm:flex-col">
                <img className="w-80 h-80 rounded-lg" src="/src/assets/customer.jpg" alt="" />
                <p className="font-semibold text-gray-500 mt-auto mb-auto px-5">Discover a world of seamless shopping at our ecommerce website! Explore a curated selection of high-quality products, from fashion and electronics to home essentials. Enjoy a user-friendly experience, secure transactions, and swift delivery. Elevate your online shopping journey with us, where style meets convenience, and quality is a promise.</p>
            </div>
            <div className="flex justify-center flex-col ml-auto mr-auto gap-5">
                <h4 className="font-bold text-2xl">If you have any queries, please feel free to contact us..</h4>
                <Link to="query" className="py-3 px-5 w-fit bg-slate-500 ml-auto mr-auto font-bold rounded-lg hover:bg-gray-400">
                Write Query <span><i className="fa-solid fa-arrow-right"></i></span>
                </Link>
            </div>
        </div>
        </>
    )
}
export default Intro