import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ data }) => {
    const contas = {
        contasAPagar: 5000,
        contasAReceber: 8000,
    };
    const chartData = {
        labels: ["Contas a Pagar", "Contas a Receber"],
        datasets: [
            {
                data: [contas.contasAPagar, contas.contasAReceber],
                backgroundColor: ["#FF6384", "#36A2EB"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB"],
            },
        ],
    };

    return <Pie data={chartData} />;
};

export default PieChart;
