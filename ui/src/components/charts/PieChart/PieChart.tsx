import Chart from 'react-google-charts';

type PieChartData = {
  label: string;
  value: number;
};

interface PieChartProps {
  data: PieChartData[];
  title: string;
}

const PieChart = (props: PieChartProps) => {
  const data = [
    ['Type', 'Value'],
    ...props.data.map((d) => [d.label, d.value]),
  ];

  return (
    <Chart
      options={{
        title: props.title,
      }}
      chartType='PieChart'
      width='100%'
      height='400px'
      data={data}
    />
  );
};

export default PieChart;
