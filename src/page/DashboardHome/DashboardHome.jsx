import IncomeGraphChart from "../../component/Main/Dashboard/IncomeGraphChart";
import Piechart from "../../component/Main/Dashboard/Piechart";
import RecentTransactions from "../../component/Main/Dashboard/RecentTransactions";
import Status from "../../component/Main/Dashboard/Status";
const DashboardHome = () => {
  return (
    <section>
      <h1 className="text-2xl font-semibold py-3 px-3">Overview</h1>
      <div className="px-3">
        <Status />
        <div className="my-10">
          <IncomeGraphChart />
          {/* <Piechart /> */}
        </div>
        <RecentTransactions />
      </div>
    </section>
  );
};

export default DashboardHome;
