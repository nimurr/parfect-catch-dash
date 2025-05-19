import { Button, Form, message } from "antd";
import { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";
import {
  useCreateUpdatePrivacyMutation,
  useGetPrivacyPolicyQuery,
} from "../../redux/features/setting/settingApi";
import CustomButton from "../../utils/CustomButton";

const EditPrivacyPolicy = () => {
  const [form] = Form.useForm();
  const { data } = useGetPrivacyPolicyQuery();
  const [createUpdatePrivacy, { isLoading: isMutating }] =
    useCreateUpdatePrivacyMutation();
  const [content, setContent] = useState("");

  // Set the content if it exists
  useEffect(() => {
    if (data?.[0]?.content) {
      setContent(data[0].content);
      // If you want to reset form fields as well:
      form.setFieldsValue({ content: data[0].content });
    }
  }, [data, form]);

  const handleSubmit = async () => {
    // Prepare the data to be sent to the API
    const privacyPolicyData = { content };

    try {
      // Call the mutation to create/update privacy policy
      await createUpdatePrivacy({ data: privacyPolicyData }).unwrap();

      // Show success message
      message.success("Privacy policy updated successfully!");
    } catch (error) {
      // Handle error and show error message
      message.error("Failed to update privacy policy!");
    }
  };

  return (
    <section className="w-full h-full min-h-screen">
      <div className="flex justify-between items-center py-5">
        <div className="flex items-center">
          <Link to="/settings/privacy-policy">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold ml-2">Privacy Policy</h1>
        </div>
      </div>

      <div className="w-full p-6 rounded-lg shadow-md">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="content"
            initialValue={content}
            label="Privacy Policy Content"
            rules={[{ required: true, message: "Please enter the content!" }]}
          >
            <ReactQuill
              value={content}
              onChange={setContent}
              theme="snow"
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
              type="primary"
              htmlType="button"
              onClick={() => {
                // Optional: Reset content to original loaded terms on cancel
                if (data?.[0]?.content) setContent(data[0].content);
              }}
              className="mt-1 px-5 rounded-lg bg-gray-500 py-5 border-none"
            >
              Cancel
            </Button>
            <CustomButton
              className="p-1"
              htmlType="submit"
              loading={isMutating}
            >
              {isMutating ? "Updating..." : "Update"}
            </CustomButton>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default EditPrivacyPolicy;
