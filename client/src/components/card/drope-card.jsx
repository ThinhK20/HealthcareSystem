export default function DropeCard(props) {
   return (
      <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 ">
         <div className="relative mx-4 mt-4 overflow-hidden text-white  rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
            <img src={props.img} alt="ui/ux review check" className="inline" />
         </div>
         <div className="p-6">
            <div className="flex items-center justify-between mb-3">
               <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900 text-center w-full">
                  {props.name}
               </h5>
            </div>
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
               {props.description}
            </p>
         </div>
         <div className="p-6 pt-3"></div>
      </div>
   );
}
