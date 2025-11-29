import { useEffect } from 'react';
import { Form, Button, Select, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import CustomButton from '../../../utils/CustomButton';
import CustomInput from '../../../utils/CustomInput';
import { Link, useParams } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import { useEditSubscriptionMutation, useGetSingleSubscriptionQuery } from '../../../redux/features/subdcription/subscription';

const EditSubscription = () => {
  const { id } = useParams();
  const [form] = Form.useForm();

  const { data, isLoading } = useGetSingleSubscriptionQuery(id);
  const subData = data?.data?.attributes;

  const [updateSub] = useEditSubscriptionMutation();

  // Set initial values for form fields
  useEffect(() => {
    if (subData) {
      form.setFieldsValue({
        subscriptionName: subData.title,
        subscriptionPrice: subData.amount,
        limitation: subData.limitation,
        stripePriceId: subData.stripePriceId,
        cupidCredits: subData.cupidCredits,
        hugCredits: subData.hugCredits,
        kissCredits: subData.kissCredits,
        lickCredits: subData.lickCredits,
        type: subData.type,
        subscriptionsfields: subData.features?.map((feature) => ({ field: feature })) || [],
      });
    }
  }, [subData, form]);

  const onFinish = async (values) => {
    const formatted = {
      title: values.subscriptionName,
      amount: values.subscriptionPrice,
      limitation: values.limitation,
      stripePriceId: values.stripePriceId,
      cupidCredits: values.cupidCredits,
      hugCredits: values.hugCredits,
      kissCredits: values.kissCredits,
      lickCredits: values.lickCredits,
      type: values.type,
      features: values.subscriptionsfields?.map((item) => item.field) || [],
    };

    console.log(formatted);

    try {
      const res = await updateSub({ formatted, id }).unwrap();
      if (res?.code == 200) {
        return message.success("Update Successfully !!");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-4 items-center my-6">
        <Link className="flex items-center" to={`/Subscription`}>
          <IoChevronBack className="size-6" />
          <span className="text-2xl font-semibold ml-2">Edit Subscription</span>
        </Link>
      </div>

      <div className="w-full md:w-[50%] mx-auto bg-gray-200 rounded-lg p-5">
        <Form form={form} layout="vertical" onFinish={onFinish} className="mt-5">
          {/* Subscription Name */}
          <Form.Item
            label="Subscription Name"
            name="subscriptionName"
            rules={[{ required: true, message: 'Please enter the subscription name!' }]}
          >
            <CustomInput placeholder="Type name" className="bg-[#EAF5F7] border-[#309EAD]" />
          </Form.Item>

          {/* Subscription Price */}
          <Form.Item
            label="Subscription Price"
            name="subscriptionPrice"
            rules={[{ required: true, message: 'Please enter the subscription price!' }]}
          >
            <CustomInput placeholder="Type price" className="bg-[#EAF5F7] border-[#309EAD]" />
          </Form.Item>

          {/* Limitation */}
          <Form.Item
            label="Limitation"
            name="limitation"
            rules={[{ required: true, message: 'Please select a limitation!' }]}
          >
            <Select placeholder="Select limitation" className="bg-[#EAF5F7] border-[#309EAD]">
              {/* <Select.Option value="weekly">Weekly</Select.Option> */}
              <Select.Option value="monthly">Monthly</Select.Option>
              <Select.Option value="annual">Annual</Select.Option>
            </Select>
          </Form.Item>

          <div className='flex items-center gap-3 flex-wrap'>
            {/* Stripe Price ID */}
            <Form.Item
              label="Stripe Price ID"
              name="stripePriceId"
              rules={[{ required: true, message: 'Please enter Stripe Price ID!' }]}
            >
              <CustomInput placeholder="Stripe price ID" className="bg-[#EAF5F7] border-[#309EAD]" />
            </Form.Item>

            {/* Cupid Credits */}
            <Form.Item
              label="Cupid Credits"
              name="cupidCredits"
              rules={[{ required: true, message: 'Please enter cupid credits!' }]}
            >
              <CustomInput placeholder="Enter cupid credits" className="bg-[#EAF5F7] border-[#309EAD]" type="number" />
            </Form.Item>

            {/* Hug Credits */}
            <Form.Item
              label="Hug Credits"
              name="hugCredits"
              rules={[{ required: true, message: 'Please enter hug credits!' }]}
            >
              <CustomInput placeholder="Enter hug credits" className="bg-[#EAF5F7] border-[#309EAD]" type="number" />
            </Form.Item>

            {/* Kiss Credits */}
            <Form.Item
              label="Kiss Credits"
              name="kissCredits"
              rules={[{ required: true, message: 'Please enter kiss credits!' }]}
            >
              <CustomInput placeholder="Enter kiss credits" className="bg-[#EAF5F7] border-[#309EAD]" type="number" />
            </Form.Item>

            {/* Lick Credits */}
            <Form.Item
              label="Lick Credits"
              name="lickCredits"
              rules={[{ required: true, message: 'Please enter lick credits!' }]}
            >
              <CustomInput placeholder="Enter lick credits" className="bg-[#EAF5F7] border-[#309EAD]" type="number" />
            </Form.Item>
          </div>

          {/* Features */}
          <Form.List name="subscriptionsfields" initialValue={[""]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div className="flex items-center gap-4 mb-3" key={key}>
                    <Form.Item
                      {...restField}
                      name={[name, 'field']}
                      rules={[{ required: true, message: 'Please enter the feature!' }]}
                      className="w-full"
                    >
                      <CustomInput placeholder="Feature" className="bg-[#EAF5F7] border-[#309EAD]" />
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
                    className="w-full bg-[#EAF5F7] py-5 border border-[#FFFBE6]"
                  >
                    Add Feature
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          {/* Subscription Type */}
          <Form.Item
            label="Subscription Type"
            name="type"
            rules={[{ required: true, message: 'Please select a subscription type!' }]}
          >
            <Select
              placeholder="Select type"
              className="bg-[#EAF5F7] border-[#309EAD]"
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

export default EditSubscription;
