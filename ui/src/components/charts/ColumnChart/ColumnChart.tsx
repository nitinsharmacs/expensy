import Chart from 'react-google-charts';

type ColumnChartData = {
  xAxis: string;
  yAxis: number;
};

interface ColumnChartProps {
  data: ColumnChartData[];
  title: string;
}

const ColumnChart = (props: ColumnChartProps) => {
  const data = [['', ''], ...props.data.map((d) => [d.xAxis, d.yAxis])];

  return (
    <Chart
      options={{
        title: props.title,
      }}
      chartType='ColumnChart'
      width='100%'
      height='400px'
      data={data}
    />
  );
};

export default ColumnChart;
