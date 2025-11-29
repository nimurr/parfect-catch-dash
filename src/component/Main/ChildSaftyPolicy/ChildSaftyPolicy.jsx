import { Spin } from "antd"; // Importing Spin
import { IoChevronBack } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";

import { useGetChildSafetyPolicyQuery } from "../../../redux/features/setting/settingApi";
import CustomButton from "../../../utils/CustomButton";

const ChildSaftyPolicy = () => {
  const { data: privacyPolicyData, isLoading } = useGetChildSafetyPolicyQuery();

  // Log data to inspect its structure
  console.log("privacyPolicyData:", privacyPolicyData?.data?.attributes[0]?.content);

  return (
    <section className="w-full h-full min-h-screen">
      <div className="flex justify-between items-center py-5">
        <div className="flex items-center">
          <Link to="/settings">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Child safty policy</h1>
        </div>
        <Link to={"/settings/edit-child-safety-policy/11"}>
          <CustomButton border>
            <TbEdit className="size-5" />
            <span>Edit</span>
          </CustomButton>
        </Link>
      </div>

      {/* Show Spin loader if data is loading */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[calc(100vh-120px)]">
          <Spin />
        </div>
      ) : (
        <div className="ml-2">
          {/* Check if privacyPolicyData is an array or a single object */}
          {privacyPolicyData ? (
            Array.isArray(privacyPolicyData) ? (
              privacyPolicyData.map((privacy) => (
                <div key={privacy.id} className="text-lg">


                  <div dangerouslySetInnerHTML={{ __html: privacy?.content }} />

                </div>
              ))
            ) : (
              <p className="text-lg">{privacyPolicyData.content}</p>
            )
          ) : (
            <p className="text-lg">No Privacy Policy content available.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default ChildSaftyPolicy;
