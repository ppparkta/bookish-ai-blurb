import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, TrendingUp, Edit2, CheckCircle, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ReviewForm from "./ReviewForm";
import ReadingChart from "./ReadingChart";
import ProgressUpdateModal from "./ProgressUpdateModal";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  status: string;
  category?: string;
  currentPage?: number;
  totalPages?: number;
}

const BookShelf = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Load books from localStorage
    const savedBooks = JSON.parse(localStorage.getItem('bookshelf') || '[]');
    if (savedBooks.length === 0) {
      // Add some default books if none exist
      const defaultBooks = [
        {
          id: 1,
          title: "달러구트 꿈 백화점",
          author: "이미예",
          cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
          status: "reading",
          category: "판타지",
          currentPage: 150,
          totalPages: 300
        },
        {
          id: 2,
          title: "미드나이트 라이브러리",
          author: "매트 헤이그",
          cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
          status: "completed",
          category: "소설",
          currentPage: 250,
          totalPages: 250
        },
        {
          id: 3,
          title: "보건교사 안은영",
          author: "정세랑",
          cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
          status: "want-to-read",
          category: "소설"
        }
      ];
      setBooks(defaultBooks);
      localStorage.setItem('bookshelf', JSON.stringify(defaultBooks));
    } else {
      setBooks(savedBooks);
    }
  }, []);

  const filterBooks = (status: string) => {
    return books.filter(book => book.status === status);
  };

  const handleViewChart = (book: Book) => {
    setSelectedBook(book);
    setShowChart(true);
  };

  const handleWriteReview = (book: Book) => {
    setSelectedBook(book);
    setShowReviewForm(true);
  };

  const handleMarkCompleted = (book: Book) => {
    const updatedBooks = books.map(b => 
      b.id === book.id ? { ...b, status: "completed", currentPage: b.totalPages } : b
    );
    setBooks(updatedBooks);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBooks));
    
    toast({
      title: "완독 완료! 🎉",
      description: `"${book.title}"을(를) 완독하셨네요! 독후감을 작성해보세요.`,
    });
  };

  const handleUpdateProgress = (book: Book) => {
    setSelectedBook(book);
    setShowProgressModal(true);
  };

  const handleBookClick = (book: Book) => {
    if (book.status === 'reading' || book.status === 'completed') {
      navigate('/my-reviews', { state: { book } });
    }
  };

  const renderBookCard = (book: Book) => (
    <div
      key={book.id}
      className={`bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50 transition-all duration-300 ${
        book.status === 'want-to-read' ? '' : 'hover:bg-gray-700/50 cursor-pointer'
      }`}
      onClick={() => handleBookClick(book)}
    >
      <div className="flex gap-4">
        <img
          src={book.cover}
          alt={book.title}
          className="w-16 h-24 object-cover rounded shadow-md"
        />
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-white text-lg mb-1 truncate ${
            book.status === 'want-to-read' ? '' : 'hover:text-lime-400'
          }`}>
            {book.title}
          </h3>
          <p className="text-gray-300 text-sm mb-2 truncate">{book.author}</p>
          {book.category && (
            <Badge variant="outline" className="bg-gray-700/50 text-gray-300 border-gray-600 text-xs mb-2">
              {book.category}
            </Badge>
          )}
          {book.status === "reading" && book.currentPage && book.totalPages && (
            <div className="text-xs text-gray-400 mb-2">
              {Math.round((book.currentPage / book.totalPages) * 100)}% 완료 ({book.currentPage}/{book.totalPages}p)
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mt-2">
            {book.status === "reading" && (
              <>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewChart(book);
                  }}
                  className="bg-gray-600 hover:bg-gray-500 text-white text-xs h-7"
                >
                  <BarChart3 className="w-3 h-3 mr-1" />
                  진행도 확인
                </Button>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWriteReview(book);
                  }}
                  className="bg-gray-600 hover:bg-gray-500 text-white text-xs h-7"
                >
                  <Edit2 className="w-3 h-3 mr-1" />
                  중간 독후감
                </Button>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkCompleted(book);
                  }}
                  className="bg-lime-500 hover:bg-lime-600 text-black text-xs h-7"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  완독했어요
                </Button>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateProgress(book);
                  }}
                  className="bg-gray-600 hover:bg-gray-500 text-white text-xs h-7"
                >
                  진행률 업데이트
                </Button>
              </>
            )}
            {book.status === "completed" && (
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleWriteReview(book);
                }}
                className="bg-gray-600 hover:bg-gray-500 text-white text-xs h-7"
              >
                <Edit2 className="w-3 h-3 mr-1" />
                독후감 작성
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Reading Books */}
      {filterBooks("reading").length > 0 && (
        <Card className="bg-gray-900/90 backdrop-blur-lg border-lime-500/30 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-lime-400" />
              읽는 중 ({filterBooks("reading").length}권)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4">
              {filterBooks("reading").map(renderBookCard)}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completed Books */}
      {filterBooks("completed").length > 0 && (
        <Card className="bg-gray-900/90 backdrop-blur-lg border-lime-500/30 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-lime-400" />
              완독한 책 ({filterBooks("completed").length}권)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4">
              {filterBooks("completed").map(renderBookCard)}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Want to Read Books */}
      {filterBooks("want-to-read").length > 0 && (
        <Card className="bg-gray-900/90 backdrop-blur-lg border-lime-500/30 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-lime-400" />
              읽고 싶은 책 ({filterBooks("want-to-read").length}권)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4">
              {filterBooks("want-to-read").map(renderBookCard)}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      {showReviewForm && selectedBook && (
        <ReviewForm
          book={selectedBook}
          onClose={() => {
            setShowReviewForm(false);
            setSelectedBook(null);
          }}
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

      {showProgressModal && selectedBook && (
        <ProgressUpdateModal
          book={selectedBook}
          onClose={() => {
            setShowProgressModal(false);
            setSelectedBook(null);
          }}
        />
      )}
    </div>
  );
};

export default BookShelf;
