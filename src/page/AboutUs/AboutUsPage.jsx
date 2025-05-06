// import { IoChevronBack } from "react-icons/io5";
// import { Link } from "react-router-dom";
// import { TbEdit } from "react-icons/tb";
// import CustomButton from "../../utils/CustomButton";
// // import { useGetAboutUsQuery } from "../../redux/features/setting/settingApi";
//  // Importing Spin

// const AboutUsPage = () => {
 
//   return (
//     <section className="w-full h-full min-h-screen">
//       <div className="flex justify-between items-center py-5">
//         <div className="flex  items-center">
//           <Link to="/settings">
//             <IoChevronBack className="text-2xl" />
//           </Link>
//           <h1 className="text-2xl font-semibold">About Us</h1>
//         </div>
//         <Link to={"/settings/edit-about-us/11"}>
//           <CustomButton border>
//             <TbEdit className="size-5" />
//             <span>Edit</span>
//           </CustomButton>
//         </Link>
//       </div>

//       {/* Show Spin loader if data is loading */}


//       <div>
//         <p className="text-lg px-5 text-black">
//           {/* {about.content} */}
           
//         </p>
//       </div>
//     </section>
//   );
// };

// export default AboutUsPage;





import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import CustomButton from "../../utils/CustomButton";
import { useGetAboutUsQuery } from "../../redux/features/setting/settingApi"; // Import the hook
import { Spin, message } from "antd"; 

const AboutUsPage = () => {
  const { data, isLoading, isError } = useGetAboutUsQuery(); 

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-120px)]">
        <Spin />
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-120px)]">
        <p className="text-lg text-red-500">Failed to load About Us content</p>
      </div>
    );
  }

  // Ensure the content exists
  const aboutContent = data?.[0]?.content;

  return (
    <section className="w-full h-full min-h-screen">
      <div className="flex justify-between items-center py-5">
        <div className="flex items-center">
          <Link to="/settings">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">About Us</h1>
        </div>
        <Link to={"/settings/edit-about-us/11"}>
          <CustomButton border>
            <TbEdit className="size-5" />
            <span>Edit</span>
          </CustomButton>
        </Link>
      </div>

      <div>
        {/* Display the About Us content */}
        {aboutContent ? (
          <p className="text-lg px-5 text-black" dangerouslySetInnerHTML={{ __html: aboutContent }} />
        ) : (
          <p className="text-lg px-5 text-black">No content available for About Us.</p>
        )}
      </div>
    </section>
  );
};

export default AboutUsPage;
