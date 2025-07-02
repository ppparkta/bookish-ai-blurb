import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, BookOpen, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  totalPages: number;
  currentPage: number;
}

interface ReadingChartProps {
  book: Book;
  onClose: () => void;
}

const ReadingChart = ({ book, onClose }: ReadingChartProps) => {
  // Mock reading progress data
  const progressData = [
    { date: "1/1", pages: 0, progress: 0 },
    { date: "1/5", pages: 45, progress: Math.round((45 / book.totalPages) * 100) },
    { date: "1/10", pages: 102, progress: Math.round((102 / book.totalPages) * 100) },
    { date: "1/15", pages: 158, progress: Math.round((158 / book.totalPages) * 100) },
    { date: "1/20", pages: book.currentPage, progress: Math.round((book.currentPage / book.totalPages) * 100) },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl p-4">
        <Card className="bg-gray-900/95 backdrop-blur-lg border border-gray-700/50 shadow-2xl max-h-[90vh] overflow-y-auto">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-gray-700/30">
            <CardTitle className="text-xl flex items-center gap-2 text-white">
              <TrendingUp className="w-5 h-5 text-lime-400" />
              독서 진행도 분석
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="space-y-6 p-6">
            {/* Book Info */}
            <div className="flex gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/30">
              <img
                src={book.cover}
                alt={book.title}
                className="w-16 h-24 object-cover rounded shadow-md"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-white">{book.title}</h3>
                <p className="text-gray-300">{book.author}</p>
                <p className="text-sm text-gray-400">
                  현재 진행률: {Math.round((book.currentPage / book.totalPages) * 100)}% 
                  ({book.currentPage}/{book.totalPages} 페이지)
                </p>
              </div>
            </div>

            {/* Progress Chart */}
            <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                읽기 진행률 그래프
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#9CA3AF"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      fontSize={12}
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                      formatter={(value: any, name: string) => [
                        name === 'progress' ? `${value}%` : `${value}페이지`,
                        name === 'progress' ? '진행률' : '읽은 페이지'
                      ]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="progress" 
                      stroke="#84cc16" 
                      strokeWidth={3}
                      dot={{ fill: '#84cc16', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#84cc16', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Reading Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30 text-center">
                <div className="text-2xl font-bold text-lime-400 mb-1">
                  {Math.round((book.currentPage / book.totalPages) * 100)}%
                </div>
                <div className="text-gray-300 text-sm">현재 진행률</div>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {book.totalPages - book.currentPage}
                </div>
                <div className="text-gray-300 text-sm">남은 페이지</div>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30 text-center">
                <div className="text-2xl font-bold text-lime-300 mb-1">
                  {Math.ceil((book.totalPages - book.currentPage) / 30)}
                </div>
                <div className="text-gray-300 text-sm">예상 완독일 (일 30p 기준)</div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={onClose}
                className="bg-gradient-to-r from-lime-500 to-green-500 text-black hover:from-lime-600 hover:to-green-600 px-8"
              >
                확인
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ReadingChart;
