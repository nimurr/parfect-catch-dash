


import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDeleteSubscriptionMutation, useGetAllSubscriptionQuery } from "../../../redux/features/subdcription/subscription";
import { message } from "antd";


const SubscriptionCard = () => {
  const { data, error, isLoading } = useGetAllSubscriptionQuery();

  const [deleteSub] = useDeleteSubscriptionMutation();



  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching subscriptions</div>;
  }

  const subscription = data?.data?.attributes?.results;

  console.log(subscription)


  const handleDelete = async (id) => {


    try {

      const res = await deleteSub({ id }).unwrap();

      console.log(res)

      if (res?.code == 200) {
        return message.success("Delete Successfully !!")
      }

    } catch (error) {
      console.log(error)
      message.error(error?.data?.message);
    }

  }



  return (
    <section className="pt-5">
      <div className="pb-5 flex items-center justify-between">
        <Link className="flex items-center my-6" to={`/Subscription`}>

          <span className="text-2xl font-semibold">Subscription</span>
        </Link>
        <div>
          <Link to={`/Subscription/add`}>
            <button className="py-3 px-5 rounded-md bg-[#2C909D] text-white">Add Subscriptions</button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 items-start gap-5">
        {subscription.map((subscription, id) => (
          <div key={id} className="w-full bg-[#EAF5F7] rounded-lg shadow-lg ">
            <h2 className="text-2xl font-bold mb-4 px-6 text-center pt-5 capitalize">{subscription.title}</h2>
            <div className="border-b-2 border-gray-200 "></div>
            <div className="p-5">
              <div className="text-5xl font-semibold mb-5 flex items-center justify-center ">
                ${subscription.amount} <span className="text-sm ml-1">/{subscription.limitation}</span>
              </div>

              <ul className="space-y-2 mb-4  ">
                {subscription.features.map((feature, id) => (
                  <li key={id} className="flex items-center text-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-gray-300 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 110-16 8 8 0 010 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <h3 className=" border-b py-1 mb-4"> <span className="font-semibold">Stripe Price Id :</span> {subscription?.stripePriceId}</h3>


              <ul>
                <li className="flex items-center justify-between border-b py-1"> <span className="font-semibold">Cupid Credits:</span> {subscription?.cupidCredits} </li>
                <li className="flex items-center justify-between border-b py-1"> <span className="font-semibold">Hug Credits:</span> {subscription?.hugCredits}</li>
                <li className="flex items-center justify-between border-b py-1"> <span className="font-semibold">Kiss Gifts:</span> {subscription?.kissCredits}</li>
                <li className="flex items-center justify-between border-b py-1"> <span className="font-semibold">Lick Gifts:</span> {subscription?.lickCredits}</li>
              </ul>

              <div className="flex justify-between pt-6">
                <Link
                  className="flex items-center text-sm bg-[#2C909D] px-7 py-3 rounded-lg text-center"
                  to={`/Subscription/${subscription?.id}`}
                >
                  <button className="text-center">Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(subscription?.id)}
                  className="flex items-center text-sm px-7 py-3 rounded-lg border border-[#2C909D]">
                  Delete
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default SubscriptionCard;
