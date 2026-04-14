import { BetaAnalyticsDataClient } from '@google-analytics/data';

const propertyId = process.env.GA_PROPERTY_ID?.replace(/"/g, '')?.trim();

const client = propertyId && process.env.GA_PRIVATE_KEY
  ? new BetaAnalyticsDataClient({
      credentials: {
        client_email: process.env.GA_CLIENT_EMAIL?.replace(/"/g, '')?.trim(),
        private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n').replace(/"/g, ''),
      },
    })
  : null;

// ==========================================
// 더미 데이터 생성 (테스트 및 프리뷰용)
// ==========================================
function getMockPageViews(days: number) {
  const data = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    data.push({
      date: `${d.getMonth() + 1}/${d.getDate().toString().padStart(2, '0')}`,
      views: Math.floor(Math.random() * 500) + 100, // 100 ~ 600 views
      visitors: Math.floor(Math.random() * 300) + 50,
    });
  }
  return data;
}

const mockTrafficSources = [
  { source: '검색 엔진 (Organic)', users: 1250, fill: '#4ade80' },
  { source: '직접 접속 (Direct)', users: 840, fill: '#818cf8' },
  { source: '소셜 미디어 (Social)', users: 430, fill: '#f472b6' },
  { source: '추천 (Referral)', users: 210, fill: '#fbbf24' },
];

const mockDeviceUsage = [
  { name: 'Mobile', value: 68, fill: '#60a5fa' },
  { name: 'Desktop', value: 29, fill: '#34d399' },
  { name: 'Tablet', value: 3, fill: '#f43f5e' },
];

// ==========================================
// 실제 GA API 호출 함수
// ==========================================

export async function checkGAConnection() {
  if (!client || !propertyId) return "Env vars missing (client or propertyId is null)";
  try {
    await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '1daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'screenPageViews' }],
    });
    return null; // No error
  } catch (error: any) {
    return error.message || error.toString();
  }
}

export async function getPageViews(days = 30) {
  if (!client || !propertyId) return getMockPageViews(days);

  try {
    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
    });

    const rows = response.rows?.map(row => {
      const pDate = row.dimensionValues?.[0].value || '';
      const formattedDate = pDate.replace(/(\d{4})(\d{2})(\d{2})/, '$2/$3'); // MM/DD 형식
      
      return {
        date: formattedDate,
        views: parseInt(row.metricValues?.[0]?.value || '0', 10),
        visitors: parseInt(row.metricValues?.[1]?.value || '0', 10),
      };
    }) || [];
    
    return rows.reverse();
  } catch (error) {
    console.error('GA getPageViews Error:', error);
    return getMockPageViews(days);
  }
}

export async function getTrafficSources() {
  if (!client || !propertyId) return mockTrafficSources;

  try {
    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'activeUsers' }],
    });
    
    const colors = ['#4ade80', '#818cf8', '#f472b6', '#fbbf24', '#a78bfa', '#2dd4bf'];
    return response.rows?.map((row, i) => ({
      source: row.dimensionValues?.[0].value || 'Unknown',
      users: parseInt(row.metricValues?.[0].value || '0', 10),
      fill: colors[i % colors.length]
    })) || [];
  } catch (error) {
    console.error('GA getTrafficSources Error:', error);
    return mockTrafficSources;
  }
}

export async function getDeviceUsage() {
  if (!client || !propertyId) return mockDeviceUsage;

  try {
    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'activeUsers' }],
    });

    const colors: Record<string, string> = {
      'Mobile': '#60a5fa',
      'Desktop': '#34d399',
      'Tablet': '#f43f5e',
    };

    return response.rows?.map(row => {
      const name = row.dimensionValues?.[0].value || 'Unknown';
      return {
        name,
        value: parseInt(row.metricValues?.[0].value || '0', 10),
        fill: colors[name] || '#9ca3af'
      };
    }) || [];
  } catch (error) {
    console.error('GA getDeviceUsage Error:', error);
    return mockDeviceUsage;
  }
}
