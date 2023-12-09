import { useState } from "react"

function BannerComp(props){


  /* These are the props needed for showing customized Banner accoring to the need
   */

    const [show,setShow] = useState()
    const BorderColor = props.border
    const BgColor = props.bgcolor
    const TextColor = props.textcolor


    /* i will have props property so and the content and color of this will handled from the calling component */
    return (
        <div className={`rounded-md border-l-4 ${BorderColor} ${BgColor} p-4 mt-10`}>
  <div className="flex items-center justify-between space-x-4">
   
    <div className="ml-auto mr-auto">
      <p className={`${TextColor} font-thin text-xl`}>
        {props.content}
      </p>
    </div>
    <div>
        <button onClick={props.onClose}>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="h-6 w-6 cursor-pointer text-red-600"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
        </button>
    </div>
  </div>
</div>

    )
}

export default BannerComp