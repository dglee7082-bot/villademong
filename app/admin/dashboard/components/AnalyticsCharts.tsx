'use client';

import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell
} from 'recharts';
import styles from './AnalyticsCharts.module.css';

interface AnalyticsChartsProps {
  pageViews: any[];
  trafficSources: any[];
  deviceUsage: any[];
}

export default function AnalyticsCharts({ pageViews, trafficSources, deviceUsage }: AnalyticsChartsProps) {
  return (
    <div className={styles.chartsContainer}>
      
      {/* 1. 사이트 트래픽 추이 (Line Chart) */}
      <div className={`${styles.chartCard} ${styles.fullWidth}`}>
        <div className={styles.chartHeader}>
          <h3 className={styles.chartTitle}>최근 30일 접속 추이 (페이지뷰 & 방문자)</h3>
        </div>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={pageViews} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dx={-10} />
              <RechartsTooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
              />
              <Line type="monotone" dataKey="views" name="페이지뷰" stroke="#818cf8" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="visitors" name="방문자" stroke="#34d399" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.chartsRow}>
        {/* 2. 유입 경로 (Bar Chart) */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>사용자 유입 경로</h3>
          </div>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={trafficSources} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
                <XAxis type="number" hide />
                <YAxis dataKey="source" type="category" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 13}} dx={-10} width={100} />
                <RechartsTooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="users" name="방문자 수" radius={[0, 4, 4, 0]} barSize={20}>
                  {trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. 기기별 통계 (Donut Pie Chart) */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>디바이스 비율</h3>
          </div>
          <div className={styles.chartWrapper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={deviceUsage}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {deviceUsage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Legend replacement for aesthetics */}
            <div className={styles.pieLegend}>
              {deviceUsage.map((entry, index) => (
                <div key={`legend-${index}`} className={styles.legendItem}>
                  <span className={styles.legendColor} style={{ backgroundColor: entry.fill }}></span>
                  <span className={styles.legendLabel}>{entry.name}</span>
                  <span className={styles.legendValue}>{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
