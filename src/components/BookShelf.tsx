import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SortAsc, BookOpen, Play, BarChart3, Edit, CheckCircle, Star, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ProgressUpdateModal from "./ProgressUpdateModal";
import ReadingChart from "./ReadingChart";

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

const BookShelf = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      title: "미드나이트 라이브러리",
      author: "매트 헤이그",
      cover: "/placeholder.svg",
      status: "reading",
      totalPages: 320,
      currentPage: 208,
      hasReview: false,
      category: "소설",
      readCount: 1
    },
    {
      id: 2,
      title: "아몬드",
      author: "손원평",
      cover: "/placeholder.svg",
      status: "completed",
      totalPages: 267,
      currentPage: 267,
      rating: 4.5,
      hasReview: true,
      category: "소설",
      readCount: 1
    },
    {
      id: 3,
      title: "달러구트 꿈 백화점",
      author: "이미예",
      cover: "/placeholder.svg",
      status: "want-to-read",
      totalPages: 284,
      currentPage: 0,
      hasReview: false,
      category: "소설",
      readCount: 1
    },
    {
      id: 4,
      title: "보건교사 안은영",
      author: "정세랑",
      cover: "/placeholder.svg",
      status: "reading",
      totalPages: 396,
      currentPage: 91,
      hasReview: false,
      category: "판타지",
      readCount: 1
    },
    {
      id: 5,
      title: "코스모스",
      author: "칼 세이건",
      cover: "/placeholder.svg",
      status: "completed",
      totalPages: 478,
      currentPage: 478,
      rating: 5,
      hasReview: true,
      category: "과학",
      readCount: 2
    },
    {
      id: 6,
      title: "1984",
      author: "조지 오웰",
      cover: "/placeholder.svg",
      status: "completed",
      totalPages: 350,
      currentPage: 350,
      rating: 4,
      hasReview: true,
      category: "고전",
      readCount: 1
    },
    {
      id: 7,
      title: "해리포터와 마법사의 돌",
      author: "J.K. 롤링",
      cover: "/placeholder.svg",
      status: "reading",
      totalPages: 423,
      currentPage: 120,
      hasReview: false,
      category: "판타지",
      readCount: 3
    },
    {
      id: 8,
      title: "데미안",
      author: "헤르만 헤세",
      cover: "/placeholder.svg",
      status: "want-to-read",
      totalPages: 201,
      currentPage: 0,
      hasReview: false,
      category: "고전",
      readCount: 1
    },
    {
      id: 9,
      title: "미움받을 용기",
      author: "기시미 이치로",
      cover: "/placeholder.svg",
      status: "completed",
      totalPages: 295,
      currentPage: 295,
      rating: 4.2,
      hasReview: true,
      category: "자기계발",
      readCount: 1
    },
    {
      id: 10,
      title: "죽음에 관하여",
      author: "엘리자베스 퀴블러 로스",
      cover: "/placeholder.svg",
      status: "want-to-read",
      totalPages: 320,
      currentPage: 0,
      hasReview: false,
      category: "인문학",
      readCount: 1
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showChart, setShowChart] = useState(false);

  // 필터링 및 정렬
  const filteredBooks = books
    .filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === "all" || book.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "progress":
          return ((b.currentPage / b.totalPages) * 100) - ((a.currentPage / a.totalPages) * 100);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "recent":
        default:
          return b.id - a.id;
      }
    });

  const handleStartReading = (book: Book) => {
    setBooks(books.map(b => 
      b.id === book.id ? { ...b, status: "reading" as const } : b
    ));
    toast({
      title: "읽기 시작! 📖",
      description: `"${book.title}" 읽기를 시작했어요`,
    });
  };

  const handleComplete = (book: Book) => {
    setBooks(books.map(b => 
      b.id === book.id ? { ...b, status: "completed" as const, currentPage: b.totalPages } : b
    ));
    toast({
      title: "완독 완료! 🎉",
      description: `"${book.title}"를 완독하셨네요! 축하드려요`,
    });
  };

  const handleProgressUpdate = (bookId: number, newPage: number) => {
    setBooks(books.map(book => 
      book.id === bookId ? { ...book, currentPage: newPage } : book
    ));
    setShowProgressModal(false);
  };

  const handleWriteReview = (book: Book, isIntermediate = false) => {
    navigate('/review-write', { 
      state: { 
        book: book,
        isIntermediate: isIntermediate 
      } 
    });
  };

  const handleViewReviews = (book: Book) => {
    navigate('/my-reviews', { state: { book } });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "want-to-read":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs whitespace-nowrap">읽고 싶은</Badge>;
      case "reading":
        return <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 text-xs whitespace-nowrap">읽는 중</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30 text-xs whitespace-nowrap">완독</Badge>;
      default:
        return null;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating) 
                ? "text-yellow-400 fill-yellow-400" 
                : i === Math.floor(rating) && rating % 1 !== 0
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-600"
            }`}
          />
        ))}
        <span className="text-sm text-gray-400 ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 검색 및 필터 */}
      <Card className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="책 제목으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
                <SortAsc className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="recent" className="text-white hover:bg-gray-700">최근 추가순</SelectItem>
                <SelectItem value="progress" className="text-white hover:bg-gray-700">진행률 순</SelectItem>
                <SelectItem value="rating" className="text-white hover:bg-gray-700">별점 순</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all" className="text-white hover:bg-gray-700">전체</SelectItem>
                <SelectItem value="want-to-read" className="text-white hover:bg-gray-700">읽고 싶은</SelectItem>
                <SelectItem value="reading" className="text-white hover:bg-gray-700">읽는 중</SelectItem>
                <SelectItem value="completed" className="text-white hover:bg-gray-700">완독</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 책 목록 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <Card key={book.id} className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl hover:shadow-3xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="relative">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-20 h-28 object-cover rounded shadow-lg cursor-pointer"
                    onClick={() => (book.status === "reading" || book.status === "completed") && handleViewReviews(book)}
                  />
                  {book.hasReview && (
                    <div className="absolute -top-2 -right-2 bg-lime-500 rounded-full p-1">
                      <FileText className="w-3 h-3 text-black" />
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-2 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 
                        className="font-semibold text-white group-hover:text-lime-300 transition-colors truncate cursor-pointer"
                        onClick={() => (book.status === "reading" || book.status === "completed") && handleViewReviews(book)}
                      >
                        {book.title}
                      </h3>
                      <p className="text-gray-400 text-sm truncate">{book.author}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {book.category && (
                          <Badge variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-600 text-xs">
                            {book.category}
                          </Badge>
                        )}
                        {book.readCount && book.readCount > 1 && (
                          <Badge variant="outline" className="bg-gray-700/70 text-gray-200 border-gray-500 text-xs">
                            {book.readCount}회독
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {getStatusBadge(book.status)}
                    </div>
                  </div>
                  
                  {book.rating && (
                    <div className="flex items-center">
                      {renderStars(book.rating)}
                    </div>
                  )}

                  {book.status !== "want-to-read" && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>진행률</span>
                        <span>{Math.round((book.currentPage / book.totalPages) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-lime-500 to-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(book.currentPage / book.totalPages) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 버튼들 */}
              <div className="mt-4 flex flex-wrap gap-2">
                {book.status === "want-to-read" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleStartReading(book)}
                      className="bg-gray-600 hover:bg-gray-700 text-white transition-all duration-200"
                    >
                      <Play className="w-3 h-3 mr-1" />
                      읽기 시작
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleComplete(book)}
                      className="bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-black transition-all duration-200"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      완독했어요
                    </Button>
                  </>
                )}

                {book.status === "reading" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedBook(book);
                        setShowProgressModal(true);
                      }}
                      className="bg-gray-600 hover:bg-gray-700 text-white transition-all duration-200"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      진행률 업데이트
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedBook(book);
                        setShowChart(true);
                      }}
                      className="bg-gray-600 hover:bg-gray-700 text-white transition-all duration-200"
                    >
                      <BarChart3 className="w-3 h-3 mr-1" />
                      진행도 확인
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleWriteReview(book, true)}
                      className="bg-gray-600 hover:bg-gray-700 text-white transition-all duration-200"
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      중간 독후감
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleWriteReview(book)}
                      className="bg-gray-600 hover:bg-gray-700 text-white transition-all duration-200"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      독후감 작성
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleComplete(book)}
                      className="bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-black transition-all duration-200"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      완독했어요
                    </Button>
                  </>
                )}

                {book.status === "completed" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedBook(book);
                        setShowChart(true);
                      }}
                      className="bg-gray-600 hover:bg-gray-700 text-white transition-all duration-200"
                    >
                      <BarChart3 className="w-3 h-3 mr-1" />
                      진행도 확인
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleWriteReview(book)}
                      className="bg-gray-600 hover:bg-gray-700 text-white transition-all duration-200"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      독후감 수정
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 모달들 */}
      {showProgressModal && selectedBook && (
        <ProgressUpdateModal
          book={selectedBook}
          onClose={() => {
            setShowProgressModal(false);
            setSelectedBook(null);
          }}
          onUpdate={handleProgressUpdate}
        />
      )}

      {showChart && selectedBook && (
        <ReadingChart
          book={selectedBook}
          onClose={() => {
            setShowChart(false);
            setSelectedBook(null);
          }}
        />
      )}

      {filteredBooks.length === 0 && (
        <Card className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
          <CardContent className="p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">책이 없습니다</h3>
            <p className="text-gray-400">
              {searchTerm || filterStatus !== "all" ? "검색 조건에 맞는 책이 없어요" : "아직 서재에 책이 없어요"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookShelf;
