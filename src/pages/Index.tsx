
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Plus, TrendingUp } from "lucide-react";
import BookSearch from "@/components/BookSearch";
import BookShelf from "@/components/BookShelf";
import ReadingProgress from "@/components/ReadingProgress";

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

const Index = () => {
  const [activeTab, setActiveTab] = useState("search");
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
  ]);
  const [reviews, setReviews] = useState<any[]>([]);

  const handleAddToShelf = (newBook: Book) => {
    setBooks(prev => [...prev, newBook]);
  };

  const handleUpdateBooks = (updatedBooks: Book[]) => {
    setBooks(updatedBooks);
  };

  const handleReviewSaved = (review: any) => {
    setReviews(prev => [...prev, review]);
    // 독후감이 있는 책으로 업데이트
    setBooks(prev => prev.map(book => 
      book.id === review.bookId 
        ? { ...book, hasReview: true, rating: review.rating }
        : book
    ));
  };

  const handleBookCompleted = (bookId: number) => {
    setBooks(prev => prev.map(book => 
      book.id === bookId 
        ? { ...book, status: "completed" as const, currentPage: book.totalPages }
        : book
    ));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-white" />
            <h1 className="text-4xl font-bold text-white tracking-tight">BookVibe</h1>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-full p-2 flex gap-2 border border-white/10">
            <Button
              variant={activeTab === "search" ? "secondary" : "ghost"}
              onClick={() => setActiveTab("search")}
              className={`rounded-full px-6 transition-all duration-300 ${
                activeTab === "search" 
                  ? "bg-white text-black shadow-xl" 
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="mr-2 hidden sm:inline-block"><Search className="w-4 h-4" /></span>
              책 찾기
            </Button>
            <Button
              variant={activeTab === "shelf" ? "secondary" : "ghost"}
              onClick={() => setActiveTab("shelf")}
              className={`rounded-full px-6 transition-all duration-300 ${
                activeTab === "shelf" 
                  ? "bg-white text-black shadow-xl" 
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="mr-2 hidden sm:inline-block"><BookOpen className="w-4 h-4" /></span>
              내 서재
            </Button>
            <Button
              variant={activeTab === "progress" ? "secondary" : "ghost"}
              onClick={() => setActiveTab("progress")}
              className={`rounded-full px-6 transition-all duration-300 ${
                activeTab === "progress" 
                  ? "bg-white text-black shadow-xl" 
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="mr-2 hidden sm:inline-block"><TrendingUp className="w-4 h-4" /></span>
              진행률
            </Button>
          </div>
        </div>

        {/* Content with animation */}
        <div className="max-w-6xl mx-auto relative">
          <div className={`transition-all duration-500 ease-in-out ${
            activeTab === "search" ? "opacity-100 transform-none" : "opacity-0 transform translate-x-4 absolute inset-0 pointer-events-none"
          }`}>
            {activeTab === "search" && <BookSearch onAddToShelf={handleAddToShelf} />}
          </div>
          <div className={`transition-all duration-500 ease-in-out ${
            activeTab === "shelf" ? "opacity-100 transform-none" : "opacity-0 transform translate-x-4 absolute inset-0 pointer-events-none"
          }`}>
            {activeTab === "shelf" && <BookShelf books={books} onUpdateBooks={handleUpdateBooks} />}
          </div>
          <div className={`transition-all duration-500 ease-in-out ${
            activeTab === "progress" ? "opacity-100 transform-none" : "opacity-0 transform translate-x-4 absolute inset-0 pointer-events-none"
          }`}>
            {activeTab === "progress" && <ReadingProgress books={books} />}
          </div>
        </div>

        <footer className="w-full text-center text-xs text-gray-300 flex flex-col items-center justify-center px-4 py-4 mt-8" style={{ fontFamily: 'Pretendard, sans-serif' }}>
          <div>© 2025 Sooyang. All rights reserved.</div>
          <div className="mt-1">
            by Sooyang | <a href="https://github.com/ppparkta/bookish-ai-blurb" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">GitHub</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
