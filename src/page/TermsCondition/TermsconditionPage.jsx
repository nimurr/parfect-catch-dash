// import { IoChevronBack } from "react-icons/io5";
// import { Link } from "react-router-dom";
// import { TbEdit } from "react-icons/tb";
// import CustomButton from "../../utils/CustomButton";
// import { useGetTermsConditionQuery } from "../../redux/features/setting/settingApi";
// import { Spin, message } from "antd"; // Import Spin for loading

// const TermsconditionPage = () => {
//   const { data, isLoading, isError } = useGetTermsConditionQuery();

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-[calc(100vh-120px)]">
//         <Spin />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex justify-center items-center h-[calc(100vh-120px)]">
//         <p className="text-lg text-red-500">Failed to load Terms and Conditions</p>
//       </div>
//     );
//   }
//   const termsContent = data?.attributes?.[0]?.content;
//   return (
//     <section className="w-full h-full min-h-screen">
//       <div className="flex justify-between items-center py-5">
//         <div className="flex items-center">
//           <Link to="/settings">
//             <IoChevronBack className="text-2xl" />
//           </Link>
//           <h1 className="text-2xl font-semibold">Terms of Conditions</h1>
//         </div>
//         <Link to={"/settings/edit-terms-conditions/11"}>
//           <CustomButton border>
//             <TbEdit className="size-5" />
//             <span>Edit</span>
//           </CustomButton>
//         </Link>
//       </div>

//       <div className="text-lg text-black px-5">
//         {/* Render the terms and conditions content */}
//         {termsContent ? (
//           <div dangerouslySetInnerHTML={{ __html: termsContent }} />
//         ) : (
//           <p>No terms and conditions available.</p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default TermsconditionPage;





import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import CustomButton from "../../utils/CustomButton";
import { useGetTermsConditionQuery } from "../../redux/features/setting/settingApi";
import { Spin, message } from "antd"; // Import Spin for loading

const TermsconditionPage = () => {
  const { data, isLoading, isError } = useGetTermsConditionQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-120px)]">
        <Spin />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-120px)]">
        <p className="text-lg text-red-500">Failed to load Terms and Conditions</p>
      </div>
    );
  }

  // Ensure data.attributes exists and contains items
  const termsContent = data?.[0]?.content;  // Access the first item in the array

  return (
    <section className="w-full h-full min-h-screen">
      <div className="flex justify-between items-center py-5">
        <div className="flex items-center">
          <Link to="/settings">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Terms of Conditions</h1>
        </div>
        <Link to={"/settings/edit-terms-conditions/11"}>
          <CustomButton border>
            <TbEdit className="size-5" />
            <span>Edit</span>
          </CustomButton>
        </Link>
      </div>

      <div className="text-lg text-black px-5">
        {/* Render the terms and conditions content */}
        {termsContent ? (
          <div dangerouslySetInnerHTML={{ __html: termsContent }} />
        ) : (
          <p>No terms and conditions available.</p>
        )}
      </div>
    </section>
  );
};

export default TermsconditionPage;

