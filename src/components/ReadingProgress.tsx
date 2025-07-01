
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

  const currentReading = [
    {
      title: "미드나이트 라이브러리",
      progress: 65,
      pagesRead: 208,
      totalPages: 320,
      daysReading: 5
    },
    {
      title: "아몬드",
      progress: 23,
      pagesRead: 67,
      totalPages: 292,
      daysReading: 2
    }
  ];

  return (
    <div className="space-y-6">
      {/* Monthly Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/20 backdrop-blur-lg border-0 shadow-xl">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-white mb-2">{readingStats.booksThisMonth}</div>
            <div className="text-white/80 text-sm flex items-center justify-center gap-1">
              <BookOpen className="w-4 h-4" />
              이번 달 완독
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/20 backdrop-blur-lg border-0 shadow-xl">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-white mb-2">{readingStats.readingStreak}</div>
            <div className="text-white/80 text-sm flex items-center justify-center gap-1">
              <Target className="w-4 h-4" />
              연속 독서일
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/20 backdrop-blur-lg border-0 shadow-xl">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-white mb-2">{readingStats.totalPages}</div>
            <div className="text-white/80 text-sm flex items-center justify-center gap-1">
              <TrendingUp className="w-4 h-4" />
              총 읽은 페이지
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/20 backdrop-blur-lg border-0 shadow-xl">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-white mb-2">{readingStats.averagePages}</div>
            <div className="text-white/80 text-sm flex items-center justify-center gap-1">
              <Clock className="w-4 h-4" />
              평균 페이지수
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Goal */}
      <Card className="bg-white/20 backdrop-blur-lg border-0 shadow-xl">
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
              className="h-3 bg-white/20"
            />
            <p className="text-white/80 text-sm">
              {readingStats.monthlyGoal - readingStats.booksThisMonth > 0 
                ? `목표까지 ${readingStats.monthlyGoal - readingStats.booksThisMonth}권 남았어요! 💪`
                : "이번 달 목표를 달성했어요! 🎉"
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Current Reading */}
      <Card className="bg-white/20 backdrop-blur-lg border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            현재 읽고 있는 책
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {currentReading.map((book, index) => (
              <div key={index} className="bg-white/20 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-white text-lg">{book.title}</h3>
                  <span className="text-white/80 text-sm">{book.daysReading}일째 읽는 중</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-white/80">
                    <span>읽기 진행률</span>
                    <span>{book.pagesRead} / {book.totalPages} 페이지 ({book.progress}%)</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
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
