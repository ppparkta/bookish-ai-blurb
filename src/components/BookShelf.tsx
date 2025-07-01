
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Clock, CheckCircle, Edit3, TrendingUp, Search, Filter, Star } from "lucide-react";
import ProgressUpdateModal from "./ProgressUpdateModal";
import ReadingChart from "./ReadingChart";

const BookShelf = () => {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [showChart, setShowChart] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("completedDate");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data - 확장된 데이터
  const [userBooks, setUserBooks] = useState([
    {
      id: 1,
      title: "달러구트 꿈 백화점",
      author: "이미예",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop",
      status: "completed",
      progress: 100,
      totalPages: 284,
      currentPage: 284,
      rating: 4.5,
      reviewPreview: "꿈이라는 소재를 정말 창의적으로 풀어낸 작품이었다...",
      completedDate: "2024-01-15"
    },
    {
      id: 2,
      title: "미드나이트 라이브러리",
      author: "매트 헤이그",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop",
      status: "reading",
      progress: 65,
      totalPages: 320,
      currentPage: 208,
      rating: null,
      reviewPreview: "인생의 선택에 대해 깊이 생각해보게 되는...",
      completedDate: null
    },
    {
      id: 3,
      title: "보건교사 안은영",
      author: "정세랑",
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop",
      status: "wishlist",
      progress: 0,
      totalPages: 396,
      currentPage: 0,
      rating: null,
      reviewPreview: null,
      completedDate: null
    },
    {
      id: 4,
      title: "아몬드",
      author: "손원평",
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop",
      status: "completed",
      progress: 100,
      totalPages: 267,
      currentPage: 267,
      rating: 4.8,
      reviewPreview: "감정에 대한 깊은 이해를 얻게 해준 소설...",
      completedDate: "2024-01-20"
    }
  ]);

  // 필터링 및 정렬된 책 목록
  const filteredAndSortedBooks = userBooks
    .filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === "all" || book.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "completedDate":
          if (!a.completedDate && !b.completedDate) return 0;
          if (!a.completedDate) return 1;
          if (!b.completedDate) return -1;
          return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime();
        case "progress":
          return b.progress - a.progress;
        case "rating":
          if (!a.rating && !b.rating) return 0;
          if (!a.rating) return 1;
          if (!b.rating) return -1;
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const getReadingHistory = (bookId: number) => {
    const mockHistories: { [key: number]: any[] } = {
      1: [
        { date: "1/1", page: 50, progress: 18 },
        { date: "1/3", page: 120, progress: 42 },
        { date: "1/5", page: 200, progress: 70 },
        { date: "1/7", page: 284, progress: 100 }
      ],
      2: [
        { date: "1/10", page: 80, progress: 25 },
        { date: "1/12", page: 150, progress: 47 },
        { date: "1/14", page: 208, progress: 65 }
      ],
      4: [
        { date: "1/16", page: 67, progress: 25 },
        { date: "1/18", page: 134, progress: 50 },
        { date: "1/20", page: 267, progress: 100 }
      ]
    };
    return mockHistories[bookId] || [];
  };

  const handleProgressUpdate = (bookId: number, newPage: number) => {
    setUserBooks(books => 
      books.map(book => 
        book.id === bookId 
          ? { 
              ...book, 
              currentPage: newPage, 
              progress: Math.round(newPage / book.totalPages * 100),
              status: newPage === book.totalPages ? "completed" : book.status
            }
          : book
      )
    );
    setSelectedBook(null);
  };

  const handleStartReading = (bookId: number) => {
    setUserBooks(books => 
      books.map(book => 
        book.id === bookId 
          ? { ...book, status: "reading" }
          : book
      )
    );
  };

  const handleReviewWrite = (book: any) => {
    navigate('/review-write', { state: { book } });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/20 text-green-400 border border-green-500/30"><CheckCircle className="w-3 h-3 mr-1" />완독</Badge>;
      case "reading":
        return <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30"><Clock className="w-3 h-3 mr-1" />읽는 중</Badge>;
      case "wishlist":
        return <Badge className="bg-gray-500/20 text-gray-400 border border-gray-500/30"><BookOpen className="w-3 h-3 mr-1" />읽고 싶은</Badge>;
      default:
        return null;
    }
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-600"
            }`}
          />
        ))}
        <span className="text-white/80 text-sm ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            내 서재 ({filteredAndSortedBooks.length}권)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* 검색 및 필터 */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="책 제목으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 bg-white/5 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/20">
                <SelectItem value="completedDate">완독시점 역순</SelectItem>
                <SelectItem value="progress">읽기 진행률 순</SelectItem>
                <SelectItem value="rating">별점 순</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-32 bg-white/5 border-white/20 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/20">
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="completed">완독</SelectItem>
                <SelectItem value="reading">읽는중</SelectItem>
                <SelectItem value="wishlist">읽고싶은</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 책 목록 */}
          <div className="grid gap-6">
            {filteredAndSortedBooks.map((book) => (
              <div key={book.id}>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10">
                  <div className="flex gap-6">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-20 h-28 object-cover rounded-lg shadow-lg"
                    />
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-white text-xl">{book.title}</h3>
                          {getStatusBadge(book.status)}
                        </div>
                        <p className="text-gray-400">{book.author}</p>
                        {book.rating && (
                          <div className="mt-2">
                            {renderStarRating(book.rating)}
                          </div>
                        )}
                      </div>

                      {book.status !== "wishlist" && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>읽기 진행률</span>
                            <span>{book.currentPage} / {book.totalPages} 페이지 ({book.progress}%)</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-white to-gray-300 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${book.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {book.reviewPreview && (
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <p className="text-gray-300 text-sm italic">"{book.reviewPreview}"</p>
                        </div>
                      )}

                      <div className="flex gap-2 flex-wrap">
                        {book.status === "wishlist" && (
                          <Button 
                            onClick={() => handleStartReading(book.id)}
                            className="bg-white text-black hover:bg-gray-200 shadow-lg"
                          >
                            읽기 시작
                          </Button>
                        )}
                        {book.status === "reading" && (
                          <>
                            <Button 
                              onClick={() => setSelectedBook(book)}
                              className="bg-white/10 text-white border border-white/20 hover:bg-white/20"
                            >
                              진행률 업데이트
                            </Button>
                            <Button
                              onClick={() => setShowChart(showChart === book.id ? null : book.id)}
                              className="bg-white/10 text-white border border-white/20 hover:bg-white/20"
                            >
                              <TrendingUp className="w-4 h-4 mr-2" />
                              진행률 그래프
                            </Button>
                          </>
                        )}
                        {book.status === "completed" && (
                          <Button
                            onClick={() => setShowChart(showChart === book.id ? null : book.id)}
                            className="bg-white/10 text-white border border-white/20 hover:bg-white/20"
                          >
                            <TrendingUp className="w-4 h-4 mr-2" />
                            진행률 그래프
                          </Button>
                        )}
                        <Button 
                          onClick={() => handleReviewWrite(book)}
                          className="bg-white text-black hover:bg-gray-200 shadow-lg"
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          독후감 작성
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reading Progress Chart */}
                {showChart === book.id && book.status !== "wishlist" && (
                  <div className="mt-4">
                    <ReadingChart 
                      bookTitle={book.title}
                      history={getReadingHistory(book.id)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Update Modal */}
      {selectedBook && (
        <ProgressUpdateModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onUpdate={handleProgressUpdate}
        />
      )}
    </div>
  );
};

export default BookShelf;
