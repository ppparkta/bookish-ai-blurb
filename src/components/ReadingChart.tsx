
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, BarChart3, TrendingUp, Calendar, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

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
  // Mock data for reading progress over time
  const readingData = [
    { date: "1월 1주", page: 0, target: 50 },
    { date: "1월 2주", page: 32, target: 100 },
    { date: "1월 3주", page: 67, target: 150 },
    { date: "1월 4주", page: 89, target: 200 },
    { date: "2월 1주", page: 134, target: 250 },
    { date: "2월 2주", page: 178, target: 300 },
    { date: "2월 3주", page: book.currentPage, target: 350 }
  ];

  const weeklyData = [
    { week: "1주차", pages: 32 },
    { week: "2주차", pages: 35 },
    { week: "3주차", pages: 22 },
    { week: "4주차", pages: 45 },
    { week: "5주차", pages: 44 },
    { week: "6주차", pages: 30 },
    { week: "7주차", pages: 40 }
  ];

  const progressPercentage = Math.round((book.currentPage / book.totalPages) * 100);
  const averagePagesPerWeek = Math.round(book.currentPage / readingData.length);
  const estimatedWeeksToComplete = Math.ceil((book.totalPages - book.currentPage) / averagePagesPerWeek);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="bg-gray-900/95 backdrop-blur-lg border border-gray-700/50 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-gray-700/30">
          <CardTitle className="text-xl flex items-center gap-2 text-white">
            <BarChart3 className="w-5 h-5 text-lime-400" />
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
                {book.currentPage} / {book.totalPages} 페이지 ({progressPercentage}%)
              </p>
            </div>
          </div>

          {/* 주요 통계 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gray-800/50 border border-gray-700/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">주간 평균</p>
                    <p className="text-xl font-bold text-white">{averagePagesPerWeek}페이지</p>
                  </div>
                  <TrendingUp className="w-6 h-6 text-lime-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border border-gray-700/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">예상 완독</p>
                    <p className="text-xl font-bold text-white">{estimatedWeeksToComplete}주 후</p>
                  </div>
                  <Calendar className="w-6 h-6 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border border-gray-700/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">진행률</p>
                    <p className="text-xl font-bold text-white">{progressPercentage}%</p>
                  </div>
                  <Target className="w-6 h-6 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 진행률 차트 */}
          <Card className="bg-gray-800/50 border border-gray-700/30">
            <CardHeader>
              <CardTitle className="text-white text-lg">읽기 진행률</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={readingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#9CA3AF"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="page" 
                      stroke="#84CC16" 
                      strokeWidth={3}
                      dot={{ fill: '#84CC16', strokeWidth: 2, r: 4 }}
                      name="실제 진행률"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="target" 
                      stroke="#6B7280" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: '#6B7280', strokeWidth: 2, r: 3 }}
                      name="목표 진행률"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* 주간 읽기량 차트 */}
          <Card className="bg-gray-800/50 border border-gray-700/30">
            <CardHeader>
              <CardTitle className="text-white text-lg">주별 읽기량</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="week" 
                      stroke="#9CA3AF"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                    <Bar 
                      dataKey="pages" 
                      fill="url(#greenGradient)"
                      radius={[4, 4, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#84CC16" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* 진행률 바 */}
          <Card className="bg-gray-800/50 border border-gray-700/30">
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">전체 진행률</span>
                  <span className="text-white font-medium">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-lime-500 to-green-500 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                    style={{ width: `${progressPercentage}%` }}
                  >
                    <span className="text-xs text-black font-medium">
                      {progressPercentage > 15 ? `${progressPercentage}%` : ''}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 text-center">
                  {book.totalPages - book.currentPage}페이지 남음
                </p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReadingChart;
