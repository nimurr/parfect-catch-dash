
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";

// JSON Data for subscriptions
const subscriptionData = [
  { 
    id: 2,
    "title": "Basic",
    "price": "$49.99",
    "period": "Per Month",
    "features": [
      "Unlimited product updates",
      "Access to basic support",
      "Unlimited product updates",
      "Appointment reminders",
      "Email and community support"
    ]
  },
  { 
    id: 3,
    "title": "Premium User",
    "price": "$4.99",
    "period": "Per Month",
    "features": [
      "Unlimited product updates",
      "Access to basic support",
      "Unlimited product updates",
      "Appointment reminders",
      "Email and community support"
    ]
  },
  
];

const SubscriptionCard = () => {
  return (
    <section className="pt-5">
    <div className="pb-5 flex items-center justify-between">
        <Link className="flex  items-center my-6" to={`/Subscription`}><IoChevronBack className="size-6" /><span className="text-2xl font-semibold">Subscription</span></Link>
        <div>
            <Link to={`/Subscription/add`}>
                <button className="py-3 px-5 rounded-md bg-[#EAF5F7]">Add Subscriptions</button>
            </Link>
        </div>
    </div>

    
    <div className="flex space-x-4">
      {subscriptionData.map((subscription, id) => (
        <div key={id} className="w-80 h-[583px] bg-[#EAF5F7] rounded-lg shadow-lg space-y-10">
          <h2 className="text-2xl font-bold mb-4 px-6 text-center pt-5">{subscription.title}</h2>
           <div className="border-b-2 border-gray-200 "></div>
          <div className="text-3xl font-semibold mb-4 flex items-center  justify-center pt-5" >
            {subscription.price} <span className="text-sm ml-1">{subscription.period}</span>
          </div>

          <ul className="space-y-2 mb-4 px-6 ">
            {subscription.features.map((feature, id,) => (
              <li key={id} className="flex  items-center text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-300 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 110-16 8 8 0 010 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          <div className="flex justify-between px-6 py-6">
             <Link className="flex items-center text-sm bg-[#2C909D]  px-7 py-3 rounded-lg text-center" to={`/Subscription/${id}`}> 
            <button className="text-center">
             Edit
            </button>
             </Link>
            <button className="flex items-center text-sm  px-7 py-3 rounded-lg border border-[#2C909D]">
             
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
    </section>
  );
};

export default SubscriptionCard;

