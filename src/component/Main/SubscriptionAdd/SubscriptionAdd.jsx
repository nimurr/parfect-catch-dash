import { Form, Button, Select, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import CustomButton from '../../../utils/CustomButton';
import CustomInput from '../../../utils/CustomInput';
import { Link, useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import { useAddSubscriptionMutation } from '../../../redux/features/subdcription/subscription';

const SubscriptionAdd = () => {
  const [form] = Form.useForm();
  const [addSubscription] = useAddSubscriptionMutation();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const formData = {
      ...values,
      type: values.type || 'revenuecat', // default to 'revenuecat' if no type is selected
    };

    console.log('Form Data:', formData);

    try {
      const response = await addSubscription(formData).unwrap();
      console.log('Success:', response);
      if (response?.code === 201) {
        message.success("Add Successfully !!");
        navigate('/Subscription');
      }

      form.resetFields();
    } catch (error) {
      console.error('Submission Error:', error);
    }
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex gap-4 items-center my-6">
        <Link to={`/Subscription`} className="flex items-center">
          <IoChevronBack className="size-6" />
          <span className="text-2xl font-semibold">Add Subscription</span>
        </Link>
      </div>

      <div className="w-full mx-auto md:w-[50%] bg-gray-200 p-5 rounded-lg">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="mt-5"
        >
          {/* Subscription Title */}
          <Form.Item
            label="Subscription Name"
            name="title"
            rules={[{ required: true, message: 'Please enter the subscription name!' }]}
          >
            <CustomInput placeholder="Type name" className="bg-[#EAF5F7] border-[#309EAD]" />
          </Form.Item>

          {/* Amount */}
          <Form.Item
            label="Subscription Price"
            name="amount"
            rules={[{ required: true, message: 'Please enter the subscription price!' }]}
          >
            <CustomInput placeholder="Type price" className="bg-[#EAF5F7] border-[#309EAD]" />
          </Form.Item>

          {/* Limitation */}
          <Form.Item
            label="Limitation"
            name="limitation"
            rules={[{ required: true, message: 'Please select the limitation!' }]}
          >
            <Select
              className="bg-[#EAF5F7] border-[#309EAD]"
              placeholder="Select limitation"
            >
              {/* <Select.Option value="weekly">Weekly</Select.Option> */}
              <Select.Option value="monthly">Monthly</Select.Option>
              <Select.Option value="annual">Annual</Select.Option>
            </Select>
          </Form.Item>

          <div className='flex items-center gap-3 flex-wrap'>
            {/* Cupid Credits */}
            <Form.Item
              label="Cupid Credits"
              name="cupidCredits"
              rules={[{ required: true, message: 'Please enter the cupid credits!' }]}
            >
              <CustomInput placeholder="Enter cupid credits" className="bg-[#EAF5F7] border-[#309EAD]" type="number" />
            </Form.Item>

            {/* Hug Credits */}
            <Form.Item
              label="Hug Credits"
              name="hugCredits"
              rules={[{ required: true, message: 'Please enter the hug credits!' }]}
            >
              <CustomInput placeholder="Enter hug credits" className="bg-[#EAF5F7] border-[#309EAD]" type="number" />
            </Form.Item>

            {/* Kiss Credits */}
            <Form.Item
              label="Kiss Credits"
              name="kissCredits"
              rules={[{ required: true, message: 'Please enter the kiss credits!' }]}
            >
              <CustomInput placeholder="Enter kiss credits" className="bg-[#EAF5F7] border-[#309EAD]" type="number" />
            </Form.Item>

            {/* Lick Credits */}
            <Form.Item
              label="Lick Credits"
              name="lickCredits"
              rules={[{ required: true, message: 'Please enter the lick credits!' }]}
            >
              <CustomInput placeholder="Enter lick credits" className="bg-[#EAF5F7] border-[#309EAD]" type="number" />
            </Form.Item>
          </div>

          {/* Features */}
          <Form.List name="features" initialValue={[""]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <div key={key} className="flex items-center gap-4 mb-3">
                    <Form.Item
                      {...restField}
                      name={[name]}
                      fieldKey={[fieldKey]}
                      rules={[{ required: true, message: 'Please enter a feature!' }]}
                      className="w-full"
                    >
                      <CustomInput
                        placeholder="Type feature"
                        className="bg-[#EAF5F7] border-[#2C909D]"
                      />
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => remove(name)}
                      className="cursor-pointer bg-[#EAF5F7] p-3 rounded-full"
                    />
                  </div>
                ))}
                <Form.Item>
                  <Button
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    className="w-full bg-[#EAF5F7] py-5 border border-[#309EAD]"
                  >
                    Add More Features
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          {/* Stripe Price ID */}
          <Form.Item
            label="Stripe Price ID"
            name="stripePriceId"
            rules={[{ required: true, message: 'Please enter the Stripe Price ID!' }]}
          >
            <CustomInput placeholder="Enter Stripe Price ID" className="bg-[#EAF5F7] border-[#309EAD]" />
          </Form.Item>

          {/* Type */}
          <Form.Item
            label="Subscription Type"
            name="type"
            rules={[{ required: true, message: 'Please select the subscription type!' }]}
          >
            <Select
              className="bg-[#EAF5F7] border-[#309EAD]"
              placeholder="Select type"
            >
              <Select.Option value="free">Free</Select.Option>
              <Select.Option value="stripe">Stripe</Select.Option>
              <Select.Option value="revenuecat">RevenueCat</Select.Option>
            </Select>
          </Form.Item>

          {/* Submit Button */}
          <CustomButton border className="w-full" htmlType="submit">
            Save
          </CustomButton>
        </Form>
      </div>
    </div>
  );
};

export default SubscriptionAdd;
