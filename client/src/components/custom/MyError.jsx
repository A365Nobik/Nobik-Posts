import { IoMdCloseCircle } from "react-icons/io";
export default function MyError({ anyError ,setAnyError}) {
  return (
    <>
      {anyError ? (
        <div className="border-2 w-max bg-red-500 p-2 rounded-md">
          <span onClick={()=>setAnyError('')} className="flex justify-end float-end">
            <IoMdCloseCircle className="text-2xl"/>
          </span>
          <span className="flex justify-center items-center w-100 text-center overflow-auto">
            <p>{anyError}</p>
          </span>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
