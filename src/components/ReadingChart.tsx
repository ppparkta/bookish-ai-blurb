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
    <Card className="bg-[#23272f] backdrop-blur-xl border border-white/10 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-white" />
          {bookTitle} 읽기 진행률
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                stroke="#e5e7eb"
                fontSize={12}
              />
              <YAxis 
                stroke="#e5e7eb"
                fontSize={12}
                domain={[0, 100]}
                label={{ value: '완독률 (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#e5e7eb' } }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(168,255,120,0.95)',
                  border: '1px solid #A8FF78',
                  borderRadius: '8px',
                  color: '#000'
                }}
                formatter={(value: number) => [`${value}%`, '완독률']}
                labelFormatter={(label) => `날짜: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="progress" 
                stroke="#A8FF78" 
                strokeWidth={3}
                dot={{ fill: '#A8FF78', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#A8FF78' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadingChart;
