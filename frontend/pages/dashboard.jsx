import CardsDashboard from "./components/dashboard/Cards";
// import PieChart from "./components/dashboard/PieChart";
const Dashboard = () => {
    const dadosContas = {
        contasAPagar: 5000,
        contasAReceber: 8000,
    };
    return (
        <div>
            <CardsDashboard />
            {/* <PieChart data={dadosContas} /> */}
        </div>
    );
};

export default Dashboard;
