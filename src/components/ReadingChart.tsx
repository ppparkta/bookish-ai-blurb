
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from "lucide-react";

interface ReadingHistoryEntry {
  date: string;
  page: number;
  progress: number;
}

interface ReadingChartProps {
  bookTitle: string;
  history: ReadingHistoryEntry[];
}

const ReadingChart = ({ bookTitle, history }: ReadingChartProps) => {
  return (
    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          {bookTitle} 읽기 진행률
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
                stroke="rgba(255,255,255,0.8)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.8)"
                fontSize={12}
                domain={[0, 100]}
                label={{ value: '완독률 (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'rgba(255,255,255,0.8)' } }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.9)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: number) => [`${value}%`, '완독률']}
                labelFormatter={(label) => `날짜: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="progress" 
                stroke="#ffffff" 
                strokeWidth={3}
                dot={{ fill: '#ffffff', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#e5e5e5' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadingChart;
