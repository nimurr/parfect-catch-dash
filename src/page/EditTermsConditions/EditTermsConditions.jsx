// import { Button, Form, message } from "antd";
// import { useEffect, useState } from "react";
// import { IoChevronBack } from "react-icons/io5";
// import ReactQuill from "react-quill";
// import { Link } from "react-router-dom";
// import {
//   useCreateAndUpdateTramsMutation,
//   useGetTermsConditionQuery,
// } from "../../redux/features/setting/settingApi";
// import CustomButton from "../../utils/CustomButton";

// const EditTermsConditions = () => {
//   const [form] = Form.useForm();
//   const { data: treams } = useGetTermsConditionQuery();
//   const [content, setContent] = useState("");

//   // When termsContent loads from API, set it into content state
//   useEffect(() => {
//     if (treams?.[0]?.content) {
//       setContent(treams[0].content);
//       // If you want to reset form fields as well:
//       form.setFieldsValue({ content: treams[0].content });
//     }
//   }, [treams, form]);

//   const [createUpdateTerms, { isLoading }] = useCreateAndUpdateTramsMutation();

//   const handleSubmit = async () => {
//     try {
//       await createUpdateTerms({ data: { content } }).unwrap();
//       message.success("Terms and Conditions updated successfully!");
//     } catch (error) {
//       message.error("Failed to update Terms and Conditions!");
//     }
//   };

//   return (
//     <section className="w-full h-full min-h-screen ">
//       <div className="flex justify-between items-center py-5">
//         <div className="flex items-center">
//           <Link to="/settings/terms-conditions">
//             <IoChevronBack className="text-2xl" />
//           </Link>
//           <h1 className="text-2xl font-semibold">Edit Terms and Conditions</h1>
//         </div>
//       </div>

//       <div className="w-full p-6 rounded-lg shadow-md">
//         <Form form={form} layout="vertical" onFinish={handleSubmit}>
//           {/* Remove initialValue from Form.Item */}
//           <Form.Item name="content">
//             <ReactQuill
//               value={content}
//               onChange={setContent}
//               modules={{
//                 toolbar: [
//                   [{ header: [1, 2, 3, 4, 5, 6, false] }],
//                   [{ font: [] }],
//                   [{ list: "ordered" }, { list: "bullet" }],
//                   ["bold", "italic", "underline", "strike"],
//                   [{ align: [] }],
//                   [{ color: [] }, { background: [] }],
//                   ["blockquote", "code-block"],
//                   ["link", "image", "video"],
//                   [{ script: "sub" }, { script: "super" }],
//                   [{ indent: "-1" }, { indent: "+1" }],
//                   ["clean"],
//                 ],
//               }}
//               style={{ height: "300px" }}
//             />
//           </Form.Item>

//           <div className="w-full flex justify-end mt-20 md:mt-16">
//             <Button
//               type="default"
//               htmlType="button"
//               onClick={() => {
//                 // Optional: Reset content to original loaded terms on cancel
//                 if (treams?.[0]?.content) setContent(treams[0].content);
//               }}
//               className="mt-1 px-5 rounded-lg bg-gray-500 py-5 border-none"
//             >
//               Cancel
//             </Button>
//             <CustomButton className="p-1" htmlType="submit" loading={isLoading}>
//               {isLoading ? "Updating..." : "Update"}
//             </CustomButton>
//           </div>
//         </Form>
//       </div>
//     </section>
//   );
// };
// export default EditTermsConditions;



import { Button, Form, message } from "antd";
import { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import ReactQuill from "react-quill";
import { Link, useNavigate } from "react-router-dom"; // <-- import useNavigate
import {
  useCreateAndUpdateTramsMutation,
  useGetTermsConditionQuery,
} from "../../redux/features/setting/settingApi";
import CustomButton from "../../utils/CustomButton";

const EditTermsConditions = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate(); // <-- initialize navigate
  const { data: treams } = useGetTermsConditionQuery();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (treams?.[0]?.content) {
      setContent(treams[0].content);
      form.setFieldsValue({ content: treams[0].content });
    }
  }, [treams, form]);

  const [createUpdateTerms, { isLoading }] = useCreateAndUpdateTramsMutation();

  const handleSubmit = async () => {
    try {
      await createUpdateTerms({ data: { content } }).unwrap();
      message.success("Terms and Conditions updated successfully!");
      navigate("/settings/terms-conditions"); // <-- navigate after success
    } catch (error) {
      message.error("Failed to update Terms and Conditions!");
    }
  };

  return (
    <section className="w-full h-full min-h-screen ">
      <div className="flex justify-between items-center py-5">
        <div className="flex items-center">
          <Link to="/settings/terms-conditions">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold ml-3">
            Edit Terms and Conditions
          </h1>
        </div>
      </div>

      <div className="w-full p-6 rounded-lg shadow-md">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="content">
            <ReactQuill
              value={content}
              onChange={setContent}
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  [{ font: [] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["bold", "italic", "underline", "strike"],
                  [{ align: [] }],
                  [{ color: [] }, { background: [] }],
                  ["blockquote", "code-block"],
                  ["link", "image", "video"],
                  [{ script: "sub" }, { script: "super" }],
                  [{ indent: "-1" }, { indent: "+1" }],
                  ["clean"],
                ],
              }}
              style={{ height: "300px" }}
            />
          </Form.Item>

          <div className="w-full flex justify-end mt-20 md:mt-16 gap-4">
            <Button
              type="default"
              htmlType="button"
              onClick={() => navigate("/settings/terms-conditions")} // <-- navigate on cancel
              className="mt-1 px-5 rounded-lg bg-gray-500 py-5 border-none text-white"
            >
              Cancel
            </Button>
            <CustomButton className="p-1" htmlType="submit" loading={isLoading}>
              {isLoading ? "Updating..." : "Update"}
            </CustomButton>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default EditTermsConditions;
