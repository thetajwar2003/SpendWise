import merge from 'lodash/merge';
import ReactApexChart from '../graphs';
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader, Typography } from '@mui/material';
import { formatNumber } from '../../utils/format';
import { Options } from '../graphs';

const CHART_HEIGHT = 494;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
    height: CHART_HEIGHT,
    marginTop: theme.spacing(2),
    '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
    '& .apexcharts-legend': {
        height: LEGEND_HEIGHT,
        borderTop: `solid 1px ${ theme.palette.divider }`,
    },
}));

export default function BankingLoanWheel({ title, series, labels, totalPaid }) {
    const theme = useTheme();

    const chartOptions = merge(Options(), {
        labels,
        fill: {
            type: 'gradient',
            gradient: {
                colorStops: [
                    [{ offset: 0, color: theme.palette.primary.light }, { offset: 100, color: theme.palette.primary.main }],
                    [{ offset: 0, color: theme.palette.secondary.light }, { offset: 100, color: theme.palette.secondary.main }],
                ],
            },
        },
        plotOptions: {
            radialBar: {
                hollow: { size: '68%' },
                dataLabels: { total: { formatter: () => formatNumber(totalPaid) } },
            },
        },
    });

    return (
        <Card>
            <CardHeader title={title} />
            <ChartWrapperStyle>
                <ReactApexChart type="radialBar" series={series} options={chartOptions} height={310} />
                <Typography variant="body1" align="center">Total Paid: <Typography variant="h4">${totalPaid}</Typography></Typography>
            </ChartWrapperStyle>
        </Card>
    );
}
