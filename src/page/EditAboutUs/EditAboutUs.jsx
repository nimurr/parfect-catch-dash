import { Button, Form, message } from "antd";
import { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateAndPostAboutMutation,
  useGetAboutUsQuery,
} from "../../redux/features/setting/settingApi"; // Import the mutation hook
import CustomButton from "../../utils/CustomButton";

const EditAboutUs = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { data: about } = useGetAboutUsQuery();
  const [content, setContent] = useState(""); // Default content for the About Us section

  // Use the mutation hook for creating or updating About Us content
  const [createAndPostAbout, { isLoading }] = useCreateAndPostAboutMutation();

  // When about content loads from API, set it into content state and form
  useEffect(() => {
    if (about?.[0]?.content) {
      setContent(about[0].content);
      form.setFieldsValue({ content: about[0].content });
    }
  }, [about, form]);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Call the mutation to create or update the About Us content
      await createAndPostAbout({ data: { content } }).unwrap();
      message.success("About Us content updated successfully!");
      navigate("/settings/about-us"); // Navigate after success
    } catch (error) {
      message.error("Failed to update About Us content.");
    }
  };

  return (
    <section className="w-full h-full min-h-screen ">
      {/* Header Section */}
      <div className="flex justify-between items-center py-5">
        <div className="flex items-center">
          <Link to="/settings/about-us">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold ml-3">Edit About Us</h1>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full p-6 rounded-lg shadow-md">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* React Quill for About Us Content */}
          <Form.Item name="content" initialValue={content}>
            <ReactQuill
              value={content}
              onChange={(value) => setContent(value)}
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

          {/* Buttons */}
          <div className="w-full flex justify-end gap-4 mt-16">
            <Button
              type="default"
              htmlType="button"
              onClick={() => navigate("/settings/about-us")}
              className="mt-1 px-5 rounded-lg bg-gray-500 py-5 border-none text-white"
              icon={<i className="fas fa-sync-alt"></i>}
            >
              Cancel
            </Button>
            <CustomButton
              className="p-1"
              htmlType="submit"
              loading={isLoading}
              type="primary"
            >
              {isLoading ? "Updating..." : "Update"}
            </CustomButton>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default EditAboutUs;
