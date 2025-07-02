
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, BookOpen, Heart, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ManualBookAdd from "./ManualBookAdd";

interface Book {
  isbn: string;
  title: string;
  author: string;
  cover: string;
  publisher: string;
  pubdate: string;
  description: string;
}

interface BookSearchProps {
  onAddToShelf: (book: Omit<Book, 'isbn'> & { id: number; status: string; totalPages: number; currentPage: number; hasReview: boolean; category?: string; readCount: number }) => void;
}

const BookSearch = ({ onAddToShelf }: BookSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showManualAdd, setShowManualAdd] = useState(false);
  const { toast } = useToast();

  // Mock data for demonstration
  const mockBooks: Book[] = [
    {
      isbn: "9788936434267",
      title: "달러구트 꿈 백화점",
      author: "이미예",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop",
      publisher: "팩토리나인",
      pubdate: "2020-07-08",
      description: "잠들어야만 입장할 수 있는 신비로운 꿈 백화점 이야기"
    },
    {
      isbn: "9788954429467",
      title: "미드나이트 라이브러리",
      author: "매트 헤이그",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop",
      publisher: "인플루엔셜",
      pubdate: "2021-03-10",
      description: "인생의 갈림길에서 만나는 무한한 가능성의 도서관"
    },
    {
      isbn: "9788936433598",
      title: "보건교사 안은영",
      author: "정세랑",
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop",
      publisher: "민음사",
      pubdate: "2015-03-20",
      description: "학교에서 벌어지는 초자연적 현상을 다루는 보건교사의 이야기"
    }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const filteredBooks = mockBooks.filter(book => 
        book.title.includes(searchQuery) || book.author.includes(searchQuery)
      );
      setBooks(filteredBooks);
      setIsLoading(false);
      
      if (filteredBooks.length === 0) {
        toast({
          title: "검색 결과가 없습니다",
          description: "다른 키워드로 검색하거나 수동으로 등록해보세요",
        });
      }
    }, 1000);
  };

  const handleAddToShelf = (book: Book) => {
    const newBook = {
      id: Date.now(),
      title: book.title,
      author: book.author,
      cover: book.cover,
      status: "want-to-read",
      totalPages: 300,
      currentPage: 0,
      hasReview: false,
      category: "소설",
      readCount: 1
    };
    
    onAddToShelf(newBook);
    toast({
      title: "서재에 추가되었습니다! 📚",
      description: `"${book.title}"이(가) 읽고 싶은 책 목록에 추가되었어요`,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleManualBookAdded = (bookData: any) => {
    const newBook = {
      id: Date.now(),
      title: bookData.title,
      author: bookData.author,
      cover: bookData.coverUrl || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop",
      status: "want-to-read",
      totalPages: parseInt(bookData.totalPages) || 300,
      currentPage: 0,
      hasReview: false,
      category: bookData.category || "기타",
      readCount: 1
    };
    
    onAddToShelf(newBook);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card className="bg-gray-900/80 backdrop-blur-xl border border-lime-500/30 shadow-2xl">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="책 제목이나 저자명을 검색하세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-300 focus:border-lime-500"
              />
              <Button 
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-gray-700 text-white hover:bg-gray-600 shadow-lg whitespace-nowrap"
              >
                <Search className="w-4 h-4 mr-2" />
                {isLoading ? "검색중..." : "검색"}
              </Button>
            </div>
            <Button 
              onClick={() => setShowManualAdd(true)}
              variant="outline"
              className="w-full border-lime-500 text-lime-400 bg-transparent hover:bg-lime-500/10 hover:text-lime-300 border transition-colors duration-200"
            >
              <Edit className="w-4 h-4 mr-2" />
              원하는 책이 없나요? 직접 등록하기
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {books.length > 0 && (
        <Card className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              검색 결과 ({books.length}권)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4">
              {books.map((book) => (
                <div
                  key={book.isbn}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-16 h-24 object-cover rounded-lg shadow-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="text-center sm:text-left">
                        <h3 className="font-semibold text-white text-lg">{book.title}</h3>
                        <p className="text-gray-200 text-sm">{book.author} · {book.publisher}</p>
                        <p className="text-gray-300 text-sm mt-2 line-clamp-2">{book.description}</p>
                      </div>
                      <div className="flex justify-center sm:justify-start pt-2">
                        <Button
                          onClick={() => handleAddToShelf(book)}
                          size="sm"
                          className="bg-gray-700 text-white border border-white/20 hover:bg-gray-600 shadow-lg"
                        >
                          <Heart className="w-4 h-4 mr-2" />
                          서재에 담기
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Manual Book Add Modal */}
      {showManualAdd && (
        <ManualBookAdd 
          onClose={() => setShowManualAdd(false)} 
          onBookAdded={handleManualBookAdded}
        />
      )}
    </div>
  );
};

export default BookSearch;
