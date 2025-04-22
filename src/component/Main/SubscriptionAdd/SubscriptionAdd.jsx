import { Form, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import CustomButton from '../../../utils/CustomButton';
import CustomInput from '../../../utils/CustomInput';
import { Link } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

const SubscriptionAdd = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form Values:', values);
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex gap-4 items-center my-6">
        <Link className="flex  items-center my-6" to={`/SubscriptionCard`}><IoChevronBack className="size-6" /><span className="text-2xl font-semibold">Add Subscription</span></Link>
      </div>

      <div className="w-full md:w-[50%] ">
        {/* Form Section */}
        <Form form={form} layout="vertical" onFinish={onFinish} className="mt-5">
          <div className="w-full mb-4">
            {/* Subscription Name */}
            <Form.Item
              label="Subscription Name"
              name="subscriptionName"
              rules={[{ required: true, message: 'Please enter the subscription name!' }]}
              className="w-full"
            >
              <CustomInput placeholder="Type name" className='bg-[#FEF8E8] border-[#AB7843]' />
            </Form.Item>
          </div>

          <div className="w-full mb-4">
            {/* Subscription Price */}
            <Form.Item
              label="Subscription Price"
              name="subscriptionPrice"
              rules={[{ required: true, message: 'Please enter the subscription price!' }]}
              className="w-full"
            >
              <CustomInput placeholder="Type price"  className='bg-[#FEF8E8] border-[#AB7843]' />
            </Form.Item>
          </div>

          {/* Dynamic Fields for Additional Subscriptions */}
          <Form.List name="subscriptionsfields" initialValue={[""]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <div className="flex items-center gap-4 mb-3" key={key}>
                    <Form.Item
                      {...restField}
                      name={[name, 'field']}
                      fieldKey={[fieldKey, 'field']}
                      rules={[{ required: true, message: 'Please enter the subscription type!' }]}
                      className="w-full"
                    >
                      <CustomInput placeholder="Type subscription" className='bg-[#FEF8E8] border-[#AB7843]' />
                    </Form.Item>

                    {/* Minus Icon to Remove Field */}
                    <MinusCircleOutlined
                      onClick={() => remove(name)}
                      className="font-semibold cursor-pointer bg-[#AB7843] p-3 rounded-full"
                    />
                  </div>
                ))}

                {/* Add More Fields Button */}
                <Form.Item>
                  <Button
                    onClick={() => add()}
                    icon={<PlusOutlined className="bg-[#AB7843] p-1 rounded-full " />}
                    style={{ width: '100%' }}
                    className="bg-[#FFFBE6] py-5 border border-[#FFFBE6]"
                  >
                    Add Fields
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          {/* Save Button */}
          <CustomButton border className="w-full">
            Save
          </CustomButton>
        </Form>
      </div>
    </div>
  );
};

export default SubscriptionAdd;
