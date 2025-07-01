import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Clock, Target, BookOpen, CheckCircle } from "lucide-react";

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
    { title: "달러구트 꿈 백화점", pages: 284, width: 180 },
    { title: "아몬드", pages: 267, width: 220 },
    { title: "어린왕자", pages: 142, width: 160 },
    { title: "미움받을 용기", pages: 295, width: 200 },
    { title: "코스모스", pages: 478, width: 240 },
    { title: "1984", pages: 350, width: 190 },
    { title: "해리포터와 마법사의 돌", pages: 423, width: 210 },
    { title: "데미안", pages: 201, width: 170 },
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

  // 책 색상은 해시 기반으로 고정하되, 기본은 무채색 계열, 10~20% 확률로만 연두색 계열
  const greenColors = ['#A8FF78', '#CFFFAC', '#B6FFCE', '#D0FFB7', '#E0FFC2'];
  const grayColors = ['#2a2a2a', '#404040', '#525252', '#666666', '#737373', '#8a8a8a', '#a3a3a3', '#b8b8b8', '#3a3a3a', '#4d4d4d'];

  // 해시 함수(책 제목+페이지수로 고정된 숫자 생성)
  function getHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  // 책별 색상 결정: 해시값의 마지막 자리를 기준으로 0~1(20%)이면 연두, 나머지는 무채색
  function getBookColor(title, pages) {
    const hash = getHash(title + pages);
    if (hash % 10 === 0) {
      // 10% 확률로 연두색 계열
      const greenIdx = getHash(title + pages + 'green') % greenColors.length;
      return greenColors[greenIdx];
    } else {
      const grayIdx = getHash(title + pages + 'gray') % grayColors.length;
      return grayColors[grayIdx];
    }
  }

  // 완독한 책들 중 2권만 무채색으로 랜덤하게 선택(책 배열이 바뀌지 않는 한 고정)
  const grayBookIndexes = (() => {
    if (completedBooks.length <= 2) return completedBooks.map((_, i) => i);
    // completedBooks의 각 책에 대해 해시값을 구해 정렬 후 앞 2개 인덱스만 gray로
    const hashes = completedBooks.map((book, idx) => ({
      idx,
      hash: getHash(book.title + book.pages)
    }));
    hashes.sort((a, b) => a.hash - b.hash);
    return [hashes[0].idx, hashes[1].idx];
  })();

  return (
    <div className="space-y-6">
      {/* Monthly Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#23272f] backdrop-blur-xl border border-white/10 shadow-2xl">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-white mb-2">{readingStats.booksThisMonth}</div>
            <div className="text-gray-300 text-sm flex items-center justify-center gap-1">
              <BookOpen className="w-4 h-4" />
              이번 달 완독
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#23272f] backdrop-blur-xl border border-white/10 shadow-2xl">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-white mb-2">{readingStats.readingStreak}</div>
            <div className="text-gray-300 text-sm flex items-center justify-center gap-1">
              <Target className="w-4 h-4" />
              연속 독서일
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#23272f] backdrop-blur-xl border border-white/10 shadow-2xl">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-white mb-2">{readingStats.totalPages}</div>
            <div className="text-gray-300 text-sm flex items-center justify-center gap-1">
              <TrendingUp className="w-4 h-4" />
              총 읽은 페이지
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#23272f] backdrop-blur-xl border border-white/10 shadow-2xl">
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
      <Card className="bg-[#23272f] backdrop-blur-xl border border-white/10 shadow-2xl">
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
              className="h-3 bg-[#A8FF78]/20 [&_.bg-primary]:bg-[#A8FF78]"
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
      <Card className="bg-[#23272f] backdrop-blur-xl border border-white/10 shadow-2xl">
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
                const bookWidth = book.width; // 랜덤 너비
                const bookColor = getBookColor(book.title, book.pages);
                // 연두색 계열이면 글씨 어둡게, 무채색이면 흰색
                const isGreen = ['#A8FF78', '#CFFFAC', '#B6FFCE', '#D0FFB7', '#E0FFC2'].includes(bookColor);
                return (
                  <div
                    key={index}
                    className="relative group cursor-pointer transform hover:scale-[1.02] transition-all duration-300"
                    style={{ 
                      height: `${bookHeight}px`,
                      width: `${bookWidth}px`,
                      maxWidth: '250px'
                    }}
                  >
                    {/* 가로로 눕힌 책 모양 */}
                    <div
                      className="w-full h-full rounded-r-sm shadow-lg relative overflow-hidden flex items-center"
                      style={{ backgroundColor: bookColor }}
                    >
                      {/* 책 제목 (가로로) */}
                      <div className="absolute inset-0 flex items-center px-4">
                        <div className={`text-sm font-semibold truncate flex-1 ${isGreen ? 'text-gray-900' : 'text-white'}`}>
                          {book.title}
                        </div>
                        <div className={`${isGreen ? 'text-gray-900' : 'text-white/80'} text-xs ml-4`}>
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
                      <div className="bg-white text-black text-xs rounded px-2 py-1 whitespace-nowrap">
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
            총 {completedBooks.reduce((sum, book) => sum + book.pages, 0)}페이지를 읽었어요! 📚
          </p>
        </CardContent>
      </Card>

      {/* Current Reading */}
      <Card className="bg-[#23272f] backdrop-blur-xl border border-white/10 shadow-2xl">
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
                  <span className="text-gray-300 text-sm">{book.daysReading}일째 읽는 중</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>읽기 진행률</span>
                    <span>{book.pagesRead} / {book.totalPages} 페이지 ({book.progress}%)</span>
                  </div>
                  <div className="w-full bg-[#A8FF78]/20 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#A8FF78] to-green-200 h-2 rounded-full transition-all duration-500"
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
