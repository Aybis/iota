import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function ChartBar({ title, dataChart, type }) {
  const data = {
    labels: dataChart?.map((item) => item.alias.substring(0, 4)),
    datasets: [
      {
        label: 'Attendance',
        data: dataChart?.map((item) => item.hadir + item.sppd),
        backgroundColor: 'rgba(53, 162, 235, 1)',
      },
      {
        label: 'Explanation',
        data: dataChart?.map((item) => item.sakit + item.izin + item.cuti),
        backgroundColor: 'rgba(255, 206, 86,1)',
      },
      {
        label: 'Not Absence',
        data: dataChart?.map(
          (item) =>
            item.total_karyawan -
            (item.hadir + item.izin + item.cuti + item.sakit),
        ),
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          borderWidth: 4,
        },
        ticks: {
          min: 0,
          // max: 1000,
          // stepSize: 200, // <----- This prop sets the stepSize
        },
      },
      x: {
        grid: {
          display: false,
          borderWidth: 4,
        },
      },
    },
    plugins: {
      datalabels: {
        color: '#000',
        anchor: 'end',
        clamp: false,
        align: 'top',
        offset: 5,
        opacity: function (val) {
          let value = val.dataset.data;
          return value.map((item) => {
            return item > 0 ? 1 : 0;
          });
        },
      },
      legend: {
        position: 'bottom',
        labels: {
          padding: 24,
          font: {
            size: 12,
          },
          margin: {
            top: 20,
          },
        },
      },
      title: {
        padding: {
          bottom: 32,
          top: 12,
        },
        display: true,
        text: title,
        font: {
          size: 20,
        },
      },
    },
  };

  return (
    <Bar
      height={120}
      options={options}
      plugins={[ChartDataLabels]}
      data={data}
    />
  );
}
