import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartGauge({
  dataChart,
  title,
  type = '',
  isNegative,
}) {
  const titleCard = (title) => {
    switch (title) {
      case 'WFO':
        return 'At Office';
      case 'WFH':
        return 'At Home';
      case 'sppd':
        return 'Buss. Trip';
      case 'SPPD':
        return 'Buss. Trip';
      case 'izin':
        return 'Permit';
      case 'Izin':
        return 'Permit';
      case 'absent':
        return 'Tidak Absen';
      case 'hadir':
        return 'Kehadiran';
      case 'cuti':
        return 'Leave';
      case 'sakit':
        return 'Sick';
      case 'Cuti':
        return 'Leave';
      case 'Sakit':
        return 'Sick';
      case 'kehadiran':
        return 'Presence';
      case 'Hadir':
        return 'Presence';
      case 'Belum Absen':
        return 'Not Absence';
      case 'Tidak Absen':
        return 'Absent';

      default:
        return title;
    }
  };

  const data = {
    labels: dataChart?.map((item) => titleCard(item.name)),
    datasets: [
      {
        label: '# of Work',
        data: dataChart?.map((item) => item.value),
        backgroundColor: [
          'rgba(75, 192, 192, 1)',
          isNegative ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
    needleValue: 580,
  };

  const options = {
    rotation: 270, // start angle in degrees
    circumference: 180, // sweep angle in degrees
    cutout: '85%',
    borderRadius: 20,
    needle: {
      radiusPercentage: 1,
      widthPercentage: 1,
      lengthPercentage: 60,
      color: 'rgba(0, 0, 0, 1)',
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 12,
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
    <div className="relative ">
      <Doughnut data={data} options={options} />
      <div className="flex justify-evenly items-center p-4 bg-slate-50 rounded-md shadow-md shadow-slate-200/50 mt-4">
        {dataChart?.map((item) => (
          <div key={Math.random()} className="flex items-center gap-2">
            <span className="text-zinc-500 text-sm capitalize">
              {titleCard(item.name)}
            </span>{' '}
            :{' '}
            <span className="text-zinc-800 font-semibold">
              {' '}
              {item.value}{' '}
              <small className="font-normal">
                {item.value > 1 ? `${type}s` : type}
              </small>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
