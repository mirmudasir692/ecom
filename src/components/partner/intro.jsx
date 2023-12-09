import { Link } from "react-router-dom"

function Intro(){
    return (
        <>
        <div className="flex mr-auto ml-auto flex-row mt-14 max-lg:flex-col border-2 border-slate-950 rounded-2xl">
            <div>
                <img className=" w-3/4 max-lg:h-96 max-lg:w-full rounded-lg" src="/src/assets/img1.jpg" alt="" />
            </div>
            <div>
                <div className="p-5 font-light text-start text-xl flex flex-col gap-5 mt-20">
                <h1 className="text-center text-3xl font-normal leading-10 pb-5 border-b border-slate-950">Partner Program: Join Us in Shaping the Future Together</h1>
                        <p>
                            🌟 Welcome to our Partner Program! 🌟
                        </p>
                        <p>
                             We believe in the power of collaboration and the strength that comes from working together towards common goals. We are thrilled to invite you to join our exclusive community of partners where innovation, creativity, and success converge.
                        </p>
                        <p>
                            As a valued partner, you'll have the opportunity to unlock new possibilities, drive growth, and be a key player in shaping the future. Our commitment to excellence, combined with your unique strengths, will pave the way for mutual success.
                        </p>
                        <p>
                            Let's embark on this exciting journey together! Join us, and let's create something extraordinary.
                        </p>
                        <p>
                            Thank you for choosing [Your Company Name]. We can't wait to achieve great things together!
                        </p>
                        <Link to="/partner/register_partner" className="bg-gray-400 w-1/3 ml-auto mr-auto py-2 rounded-lg hover:bg-slate-700 hover:text-white text-center flex flex-row justify-center gap-2">Register
                        <span className="rotate-180 text-base"><i class="fa-solid fa-hand-point-up"></i></span>
                        </Link>
                    
                </div>
            </div>
        </div>
        </>
    )
}
export default Intro