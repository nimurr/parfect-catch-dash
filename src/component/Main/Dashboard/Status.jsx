// import { FaDatabase } from "react-icons/fa";
// import { PiCurrencyCircleDollar, PiUsersThreeFill } from "react-icons/pi";
// // import { useGetDashboardStatusQuery } from "../../../redux/features/dashboard/dashboardApi";
// const Status = () => {
//   // const {} = useGetDashboardStatusQuery();
//   return (
//     <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
//       <div className="flex  items-center p-5 rounded-lg bg-[#309EAD]">
//         <div className="size-20 p-3 flex justify-center items-center rounded-full bg-primary  bg-[#309EAD] ">
//           <PiUsersThreeFill className="size-8" />
//         </div>
//         <div className="space-y-2">
//           <h1 className="text-center text-4xl font-semibold text-[#222222]">
//             369
//           </h1>
//           <h1>Total User</h1>
//         </div>
//       </div>
//       <div className="flex items-center p-5 rounded-lg bg-[#309EAD]">
//         <div className="size-20 p-3 flex justify-center items-center rounded-full bg-primary  bg-[#309EAD] ">
//           <PiCurrencyCircleDollar className="size-8" />
//         </div>
//         <div className="space-y-2">
//           <h1 className="text-center text-4xl font-semibold text-[#222222]">
//             359
//           </h1>
//           <h1>Total Revenue </h1>
//         </div>
//       </div>
//       <div className="flex items-center p-5 rounded-lg bg-[#309ead9f]">
//         <div className="size-20 p-3 flex justify-center items-center rounded-full bg-primary  bg-[#78aab1] ">
//           <FaDatabase className="size-8" />
//         </div>
//         <div className="space-y-2">
//           <h1 className="text-center text-4xl font-semibold text-[#222222]">
//             01
//           </h1>
//           <h1>Total Subcription</h1>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Status;




import { FaDatabase } from "react-icons/fa";
import { PiCurrencyCircleDollar, PiUsersThreeFill } from "react-icons/pi";

const Status = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Total Users Card */}
      <div className="flex items-center p-5 rounded-lg bg-[#309EAD]">
        <div className="p-3 flex justify-center items-center rounded-full bg-[#ffffff]">
          <PiUsersThreeFill className="text-4xl text-[#222222]" />
        </div>
        <div className="space-y-2 ml-4">
          <h1 className="text-center text-[#222222] text-2xl font-bold">Total User</h1>
          <h1 className="text-center text-4xl font-semibold text-[#222222]">369</h1>
          <p className="text-center text-[#1f1f1f]">Last month total 1050</p>
        </div>
      </div>

      {/* Total Revenue Card */}
      <div className="flex items-center p-5 rounded-lg bg-[#309EAD]">
        <div className="p-3 flex justify-center items-center rounded-full bg-[#ffffff]">
          <PiCurrencyCircleDollar className="text-4xl text-[#222222]" />
        </div>
        <div className="space-y-2 ml-4">
          <h1 className="text-center text-[#222222] text-2xl font-bold">Total User</h1>
          <h1 className="text-center text-4xl font-semibold text-[#222222]">359</h1>

          <p className="text-center text-[#1f1f1f]">Last month total 1050</p>
        </div>
      </div>

      {/* Total Subscription Card */}
      <div className="flex items-center p-5 rounded-lg bg-[#309EAD]">
        <div className="p-3 flex justify-center items-center rounded-full bg-[#ffffff]">
          <FaDatabase className="text-4xl text-[#222222]" />
        </div>
        <div className="space-y-2 ml-4">
          <h1 className="text-center text-[#222222] text-2xl font-bold">Total User</h1>
          <h1 className="text-center text-4xl font-semibold text-[#222222]">01</h1>

          <p className="text-center text-[#1f1f1f]">Last month total 1050</p>
        </div>
      </div>
    </div>
  );
};

export default Status;
