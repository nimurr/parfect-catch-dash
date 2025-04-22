
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import CustomButton from "../../utils/CustomButton";



const TermsconditionPage = () => {


  return (
    <section className="w-full h-full min-h-screen">
      <div className="flex justify-between items-center py-5">
        <div className="flex  items-center">
          <Link to="/settings">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Terms of Conditions</h1>
        </div>
        <Link to={"/settings/edit-terms-conditions/11"}>
          <CustomButton border>
            <TbEdit className="size-5" />
            <span>Edit</span>
          </CustomButton>
        </Link>
      </div>

      <div className="text-lg text-black px-5">
        {/* {term.content} */}
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim repellat
        facere laudantium voluptates! Sapiente temporibus non officia eligendi
        vitae repellendus dolorum impedit, consequuntur aspernatur, rem autem
        labore, provident quaerat voluptates odio. Consectetur amet quo deserunt
        autem? Ducimus quia eius, at sequi aperiam quibusdam voluptatum eligendi
        praesentium, necessitatibus hic, dolorem omnis rem quo? Ex, maxime?
        Obcaecati nesciunt harum omnis asperiores maxime sapiente architecto ad
        quae necessitatibus at? Sunt eveniet ipsa aliquam iusto voluptatibus
        quasi enim. Iste rem enim totam, nobis qui repudiandae nam placeat a
        delectus, explicabo dolor. Est aliquam quam explicabo ratione deleniti
        quidem quo, veritatis, commodi velit illum minus.
      </div>
    </section>
  );
};

export default TermsconditionPage;
