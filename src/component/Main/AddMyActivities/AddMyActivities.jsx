import { FiUpload } from "react-icons/fi";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";

const AddMyActivities = () => {
  return (
    <section>
      <Link className="flex  items-center my-6" to={`/MyActivities`}><IoChevronBack className="size-6" /><span className="text-2xl font-semibold">Add activities</span></Link>
      <div className="flex items-center justify-center md:mt-20">
        <div className="w-full max-w-2xl mx-auto p-6 ">
          {/* File Upload Box */}
          <div className="border-2 border-dashed border-yellow-400 bg-yellow-50 p-6 rounded-md flex flex-col items-center justify-center">
            <FiUpload className="text-3xl text-gray-600" />
            <p className="mt-2 text-gray-700 font-medium">
              Drop File Or Browse
            </p>
            <p className="text-xs text-gray-500">
              Format: .Jpeg, .Png & Max File Size: 25 MB
            </p>
            <button className="mt-3 px-4 py-2 bg-yellow-400 text-white rounded-lg text-sm font-medium hover:bg-yellow-500">
              Browse Files
            </button>
          </div>

          {/* Activity Name Input */}
          <div className="mt-6">
            <label className="block text-gray-700 font-medium mb-2">
              Activities Name
            </label>
            <input
              type="text"
              placeholder="Type name"
              className="w-full border bg-yellow-50 border-yellow-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Choose Level */}
          <div className="mt-6">
            <label className="block text-gray-700 font-medium mb-2">
              Choose level
            </label>
            <div className="flex flex-wrap gap-4">
              {["Beginner", "Intermediate", "Advanced", "Very Advanced"].map(
                (level) => (
                  <label key={level} className="flex items-center space-x-2">
                    <input type="checkbox" className="text-yellow-500" />
                    <span className="text-gray-700">{level}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button className="px-7 py-3 bg-yellow-400 text-white font-semibold rounded-md hover:bg-yellow-500">
              Save
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddMyActivities;
