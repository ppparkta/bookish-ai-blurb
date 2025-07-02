
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, TrendingUp, Target, Award, Calendar, Star } from "lucide-react";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  status: "want-to-read" | "reading" | "completed";
  totalPages: number;
  currentPage: number;
  rating?: number;
  hasReview: boolean;
  category?: string;
  readCount?: number;
}

interface ReadingProgressProps {
  books: Book[];
}

const ReadingProgress = ({ books }: ReadingProgressProps) => {
  const currentlyReading = books.filter(book => book.status === "reading");
  const completedBooks = books.filter(book => book.status === "completed");
  const wantToRead = books.filter(book => book.status === "want-to-read");

  const totalPagesRead = books.reduce((total, book) => total + book.currentPage, 0);
  const completedPagesFromCompletedBooks = completedBooks.reduce((total, book) => total + book.totalPages, 0);
  const averageRating = completedBooks.filter(book => book.rating).reduce((sum, book) => sum + (book.rating || 0), 0) / completedBooks.filter(book => book.rating).length || 0;

  const thisYearGoal = 24;
  const completionRate = (completedBooks.length / thisYearGoal) * 100;

  const getBookGradient = (index: number) => {
    const gradients = [
      "from-blue-400/20 via-purple-400/30 to-pink-400/20",
      "from-emerald-400/20 via-teal-400/30 to-cyan-400/20",
      "from-lime-400/20 via-green-400/30 to-emerald-400/20",
      "from-orange-400/20 via-red-400/30 to-pink-400/20",
      "from-violet-400/20 via-purple-400/30 to-indigo-400/20",
      "from-rose-400/20 via-pink-400/30 to-purple-400/20"
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="space-y-6">
      {/* 전체 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">총 읽은 페이지</p>
                <p className="text-2xl font-bold text-white">{totalPagesRead.toLocaleString()}</p>
              </div>
              <BookOpen className="w-8 h-8 text-lime-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">읽는 중</p>
                <p className="text-2xl font-bold text-white">{currentlyReading.length}권</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">완독한 책</p>
                <p className="text-2xl font-bold text-white">{completedBooks.length}권</p>
              </div>
              <Award className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">평균 별점</p>
                <p className="text-2xl font-bold text-white">{averageRating.toFixed(1)}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 올해 목표 */}
      <Card className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-lime-400" />
            2024년 독서 목표
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">완독률</span>
            <span className="text-white font-semibold">{completedBooks.length}/{thisYearGoal}권 ({completionRate.toFixed(1)}%)</span>
          </div>
          <Progress value={completionRate} className="h-3 bg-gray-700">
            <div 
              className="bg-gradient-to-r from-lime-500 to-green-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(completionRate, 100)}%` }}
            />
          </Progress>
          <p className="text-sm text-gray-400">
            {thisYearGoal - completedBooks.length > 0 
              ? `목표까지 ${thisYearGoal - completedBooks.length}권 남았어요!` 
              : "목표를 달성했어요! 🎉"}
          </p>
        </CardContent>
      </Card>

      {/* 현재 읽고 있는 책들 */}
      {currentlyReading.length > 0 && (
        <Card className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              현재 읽고 있는 책들
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentlyReading.map((book) => (
              <div key={book.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
                <div className="flex gap-4">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-16 h-24 object-cover rounded shadow-md"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-white">{book.title}</h3>
                        <p className="text-gray-300 text-sm">{book.author}</p>
                      </div>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                        읽는 중
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">진행률</span>
                        <span className="text-white">{book.currentPage}/{book.totalPages} 페이지 ({Math.round((book.currentPage / book.totalPages) * 100)}%)</span>
                      </div>
                      <Progress value={(book.currentPage / book.totalPages) * 100} className="h-2 bg-gray-700">
                        <div 
                          className="bg-gradient-to-r from-lime-500 to-green-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${(book.currentPage / book.totalPages) * 100}%` }}
                        />
                      </Progress>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* 완독한 책들 */}
      {completedBooks.length > 0 && (
        <Card className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              완독한 책들
              <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
                총 {completedPagesFromCompletedBooks.toLocaleString()}페이지를 읽었어요!
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {completedBooks.map((book, index) => (
                <div 
                  key={book.id} 
                  className={`relative group cursor-pointer transition-all duration-300 hover:scale-105`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${getBookGradient(index)} backdrop-blur-sm rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-lg p-3 border border-gray-700/20 hover:border-gray-600/40 transition-all duration-300">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-32 object-cover rounded mb-2 shadow-lg"
                    />
                    <h4 className="text-white text-xs font-medium line-clamp-2 mb-1">{book.title}</h4>
                    <p className="text-gray-400 text-xs line-clamp-1 mb-2">{book.author}</p>
                    {book.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-yellow-400">{book.rating}</span>
                      </div>
                    )}
                    {book.hasReview && (
                      <Badge variant="outline" className="bg-lime-500/10 text-lime-400 border-lime-500/30 text-xs mt-1">
                        독후감 작성완료
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 읽고 싶은 책들 */}
      {wantToRead.length > 0 && (
        <Card className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gray-400" />
              읽고 싶은 책들
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {wantToRead.map((book) => (
                <div key={book.id} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-32 object-cover rounded mb-2 shadow-md"
                  />
                  <h4 className="text-white text-xs font-medium line-clamp-2 mb-1">{book.title}</h4>
                  <p className="text-gray-400 text-xs line-clamp-1">{book.author}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReadingProgress;
