
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Clock, Target, BookOpen } from "lucide-react";

const ReadingProgress = () => {
  const readingStats = {
    booksThisMonth: 3,
    totalBooks: 12,
    monthlyGoal: 4,
    averagePages: 280,
    totalPages: 3360,
    readingStreak: 7
  };

  const completedBooks = [
    { title: "달러구트 꿈 백화점", pages: 284, color: "#8B5CF6" },
    { title: "아몬드", pages: 267, color: "#06B6D4" },
    { title: "어린왕자", pages: 142, color: "#F59E0B" },
    { title: "미움받을 용기", pages: 295, color: "#10B981" },
    { title: "코스모스", pages: 478, color: "#EF4444" },
  ];

  const currentReading = [
    {
      title: "미드나이트 라이브러리",
      progress: 65,
      pagesRead: 208,
      totalPages: 320,
      daysReading: 5
    },
    {
      title: "보건교사 안은영",
      progress: 23,
      pagesRead: 91,
      totalPages: 396,
      daysReading: 2
    }
  ];

  return (
    <div className="space-y-6">
      {/* Monthly Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-white mb-2">{readingStats.booksThisMonth}</div>
            <div className="text-gray-400 text-sm flex items-center justify-center gap-1">
              <BookOpen className="w-4 h-4" />
              이번 달 완독
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-white mb-2">{readingStats.readingStreak}</div>
            <div className="text-gray-400 text-sm flex items-center justify-center gap-1">
              <Target className="w-4 h-4" />
              연속 독서일
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-white mb-2">{readingStats.totalPages}</div>
            <div className="text-gray-400 text-sm flex items-center justify-center gap-1">
              <TrendingUp className="w-4 h-4" />
              총 읽은 페이지
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-white mb-2">{readingStats.averagePages}</div>
            <div className="text-gray-400 text-sm flex items-center justify-center gap-1">
              <Clock className="w-4 h-4" />
              평균 페이지수
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Goal */}
      <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            이번 달 목표
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between text-white">
              <span>월간 독서 목표</span>
              <span className="font-semibold">{readingStats.booksThisMonth} / {readingStats.monthlyGoal} 권</span>
            </div>
            <Progress 
              value={(readingStats.booksThisMonth / readingStats.monthlyGoal) * 100} 
              className="h-3 bg-white/10"
            />
            <p className="text-gray-400 text-sm">
              {readingStats.monthlyGoal - readingStats.booksThisMonth > 0 
                ? `목표까지 ${readingStats.monthlyGoal - readingStats.booksThisMonth}권 남았어요! 💪`
                : "이번 달 목표를 달성했어요! 🎉"
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Book Stack Visualization */}
      <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            완독한 책들 ({completedBooks.length}권)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <div className="flex items-end space-x-2 min-w-max pb-4">
              {completedBooks.map((book, index) => {
                const bookHeight = Math.max(book.pages / 3, 40); // 최소 높이 40px
                return (
                  <div
                    key={index}
                    className="relative group cursor-pointer transform hover:scale-105 transition-all duration-300"
                    style={{ height: `${bookHeight}px`, minWidth: '60px' }}
                  >
                    {/* 책 모양 */}
                    <div
                      className="w-14 h-full rounded-t-sm shadow-lg relative overflow-hidden"
                      style={{ backgroundColor: book.color }}
                    >
                      {/* 책 제목 (세로로) */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div 
                          className="text-white text-xs font-semibold writing-mode-vertical text-center px-1"
                          style={{ 
                            writingMode: 'vertical-rl',
                            textOrientation: 'mixed',
                            lineHeight: '1.2'
                          }}
                        >
                          {book.title}
                        </div>
                      </div>
                      
                      {/* 책등 효과 */}
                      <div className="absolute right-0 top-0 w-1 h-full bg-black/20"></div>
                    </div>
                    
                    {/* 호버 툴팁 */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                        {book.title}<br />
                        {book.pages}페이지
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            총 {completedBooks.reduce((sum, book) => sum + book.pages, 0)}페이지를 읽었어요! 📚
          </p>
        </CardContent>
      </Card>

      {/* Current Reading */}
      <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            현재 읽고 있는 책
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {currentReading.map((book, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 space-y-3 border border-white/10">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-white text-lg">{book.title}</h3>
                  <span className="text-gray-400 text-sm">{book.daysReading}일째 읽는 중</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>읽기 진행률</span>
                    <span>{book.pagesRead} / {book.totalPages} 페이지 ({book.progress}%)</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-white to-gray-300 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${book.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReadingProgress;
