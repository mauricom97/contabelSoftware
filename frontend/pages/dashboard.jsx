import CardsDashboard from "./components/dashboard/Cards";
import Sidebar from "./components/Sidebar";
// import PieChart from "./components/dashboard/PieChart";
const Dashboard = () => {
    const dadosContas = {
        contasAPagar: 5000,
        contasAReceber: 8000,
    };
    return (
        <div>
            <Sidebar />
            <CardsDashboard />
            {/* <PieChart data={dadosContas} /> */}
        </div>
    );
};

export default Dashboard;
