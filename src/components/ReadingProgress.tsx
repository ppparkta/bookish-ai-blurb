
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Clock, Target, BookOpen, CheckCircle } from "lucide-react";

const ReadingProgress = () => {
  // 실제 완독한 책들 데이터
  const completedBooks = [
    { title: "달러구트 꿈 백화점", pages: 284, width: 180 },
    { title: "아몬드", pages: 267, width: 220 },
    { title: "어린왕자", pages: 142, width: 160 },
    { title: "미움받을 용기", pages: 295, width: 200 },
    { title: "코스모스", pages: 478, width: 240 },
    { title: "1984", pages: 350, width: 190 },
    { title: "해리포터와 마법사의 돌", pages: 423, width: 210 },
    { title: "데미안", pages: 201, width: 170 },
  ];

  // 총 완독 페이지 계산
  const totalCompletedPages = completedBooks.reduce((sum, book) => sum + book.pages, 0);

  const readingStats = {
    booksThisMonth: 3,
    totalBooks: completedBooks.length,
    monthlyGoal: 4,
    averagePages: Math.round(totalCompletedPages / completedBooks.length),
    totalPages: totalCompletedPages, // 실제 완독 페이지와 동일하게
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
      title: "보건교사 안은영",
      progress: 23,
      pagesRead: 91,
      totalPages: 396,
      daysReading: 2
    }
  ];

  // 책 색상은 무채색 계열로 제한하되 일부는 연두색
  const grayColors = ['#2a2a2a', '#404040', '#525252', '#666666', '#737373', '#8a8a8a', '#a3a3a3', '#b8b8b8', '#3a3a3a', '#4d4d4d'];
  const greenColors = ['#84cc16', '#65a30d'];

  // 해시 함수(책 제목+페이지수로 고정된 숫자 생성)
  function getHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  // 책별 색상 결정 (일부는 연두색)
  function getBookColor(title: string, pages: number, index: number): string {
    // 첫 번째와 세 번째 책을 연두색으로
    if (index === 0 || index === 2) {
      const greenIdx = getHash(title + pages + 'green') % greenColors.length;
      return greenColors[greenIdx];
    }
    const grayIdx = getHash(title + pages + 'gray') % grayColors.length;
    return grayColors[grayIdx];
  }

  // 책별 랜덤 크기 생성 (폭)
  function getBookWidth(title: string, pages: number): number {
    const hash = getHash(title + pages + 'width');
    return 160 + (hash % 100); // 160~260px 범위
  }

  return (
    <div className="space-y-6">
      {/* Monthly Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-white mb-2">{readingStats.booksThisMonth}</div>
            <div className="text-gray-300 text-sm flex items-center justify-center gap-1">
              <BookOpen className="w-4 h-4" />
              이번 달 완독
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-white mb-2">{readingStats.readingStreak}</div>
            <div className="text-gray-300 text-sm flex items-center justify-center gap-1">
              <Target className="w-4 h-4" />
              연속 독서일
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-white mb-2">{readingStats.totalPages.toLocaleString()}</div>
            <div className="text-gray-300 text-sm flex items-center justify-center gap-1">
              <TrendingUp className="w-4 h-4" />
              총 읽은 페이지
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-white mb-2">{readingStats.averagePages}</div>
            <div className="text-gray-300 text-sm flex items-center justify-center gap-1">
              <Clock className="w-4 h-4" />
              평균 페이지수
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Goal */}
      <Card className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
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
              className="h-3 bg-gray-700 [&_.bg-primary]:bg-gradient-to-r [&_.bg-primary]:from-lime-500 [&_.bg-primary]:to-green-500"
            />
            <p className="text-gray-300 text-sm">
              {readingStats.monthlyGoal - readingStats.booksThisMonth > 0 
                ? `목표까지 ${readingStats.monthlyGoal - readingStats.booksThisMonth}권 남았어요! 💪`
                : "이번 달 목표를 달성했어요! 🎉"
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Book Stack Visualization - 세로 스크롤, 가로 눕힌 책들 */}
      <Card className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            완독한 책들 ({completedBooks.length}권)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="max-h-96 overflow-y-auto">
            <div className="flex flex-col items-center space-y-1">
              {completedBooks.map((book, index) => {
                const bookHeight = Math.max(book.pages / 8, 20); // 책 두께 계산 
                const bookWidth = getBookWidth(book.title, book.pages); // 랜덤 너비
                const bookColor = getBookColor(book.title, book.pages, index);
                return (
                  <div
                    key={index}
                    className="relative group cursor-pointer transform hover:scale-[1.02] transition-all duration-300"
                    style={{ 
                      height: `${bookHeight}px`,
                      width: `${bookWidth}px`,
                      maxWidth: '280px'
                    }}
                  >
                    {/* 가로로 눕힌 책 모양 */}
                    <div
                      className="w-full h-full rounded-r-sm shadow-lg relative overflow-hidden flex items-center"
                      style={{ backgroundColor: bookColor }}
                    >
                      {/* 책 제목 (가로로) */}
                      <div className="absolute inset-0 flex items-center px-4">
                        <div className="text-sm font-semibold truncate flex-1 text-white">
                          {book.title}
                        </div>
                        <div className="text-white/80 text-xs ml-4">
                          {book.pages}p
                        </div>
                      </div>
                      {/* 책등 효과 (오른쪽) */}
                      <div className="absolute right-0 top-0 w-1 h-full bg-black/30"></div>
                      {/* 책 그림자 효과 (아래쪽) */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20"></div>
                    </div>
                    {/* 호버 툴팁 */}
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                      <div className="bg-white text-black text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
                        {book.title}<br />
                        {book.pages}페이지
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-gray-300 text-sm mt-4 text-center">
            총 {totalCompletedPages.toLocaleString()}페이지를 읽었어요! 📚
          </p>
        </CardContent>
      </Card>

      {/* Current Reading */}
      <Card className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            현재 읽고 있는 책
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {currentReading.map((book, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg p-4 space-y-3 border border-gray-700/30">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-white text-lg">{book.title}</h3>
                  <span className="text-gray-300 text-sm">{book.daysReading}일째 읽는 중</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>읽기 진행률</span>
                    <span className="text-white font-medium">{book.pagesRead} / {book.totalPages} 페이지 ({book.progress}%)</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-lime-500 to-green-500 h-2 rounded-full transition-all duration-500"
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
