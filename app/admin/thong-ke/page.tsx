'use client';

import React, { useEffect, useRef, useState } from 'react';
import Chart, { ChartConfiguration, ChartTypeRegistry } from 'chart.js/auto';
import Widget from './Widget';
import { DashboardTypeService } from '@/services/dashboard.service';
import { DashboardType } from '@/type/dashboard';

const colors = {
  purple: {
    default: 'rgba(149, 76, 233, 1)',
    half: 'rgba(149, 76, 233, 0.5)',
    quarter: 'rgba(149, 76, 233, 0.25)',
    zero: 'rgba(149, 76, 233, 0)',
  },
  indigo: {
    default: 'rgba(80, 102, 120, 1)',
    quarter: 'rgba(80, 102, 120, 0.25)',
  },
};

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardType>();
  const canvasEl = useRef<HTMLCanvasElement | null>(null);

  const loadDataAsync = async () => {
    setDashboard(await DashboardTypeService.getDashboard());
  };

  useEffect(() => {
    loadDataAsync();
  }, []);

  useEffect(() => {
    if (canvasEl.current) {
      const ctx = canvasEl.current.getContext('2d');
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 16, 0, 600);
        gradient.addColorStop(0, colors.purple.half);
        gradient.addColorStop(0.65, colors.purple.quarter);
        gradient.addColorStop(1, colors.purple.zero);

        const data = {
          labels: dashboard?.visitor?.map((item) => {
            const startDate = new Date(item.startDateOfWeek);
            const day = startDate.getDate();
            const month = startDate.getMonth() + 1;
            const year = startDate.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            return formattedDate;
          }),
          datasets: [
            {
              backgroundColor: gradient,
              label: 'Số lượt truy cập',
              data: dashboard?.visitor?.map((item) => item.sum) || [1],
              fill: true,
              borderWidth: 2,
              borderColor: colors.purple.default,
              lineTension: 0.2,
              pointBackgroundColor: colors.purple.default,
              pointRadius: 3,
            },
          ],
        };
        const config: ChartConfiguration<
          keyof ChartTypeRegistry,
          number[],
          string
        > = {
          type: 'line',
          data: data,
        };
        const myLineChart = new Chart(ctx, config);

        return function cleanup() {
          myLineChart.destroy();
        };
      }
    }
  });

  return (
    <div className='App'>
      <div className='widgets'>
        <Widget type='user' dataContent={dashboard?.productsCount || 0} />
        <Widget type='order' dataContent={dashboard?.articlesCount || 0} />
        <Widget type='balance' dataContent={dashboard?.partnerCount || 0} />
      </div>
      <div>
        <canvas id='myChart' ref={canvasEl} height='100' />
      </div>
    </div>
  );
}
