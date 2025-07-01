
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, BookOpen, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  onBookSelect: (book: Book) => void;
}

const BookSearch = ({ onBookSelect }: BookSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
          description: "다른 키워드로 검색해보세요",
        });
      }
    }, 1000);
  };

  const handleAddToShelf = (book: Book) => {
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

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Input
              placeholder="책 제목이나 저자명을 검색하세요..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40"
            />
            <Button 
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-white text-black hover:bg-gray-200 shadow-lg"
            >
              <Search className="w-4 h-4 mr-2" />
              {isLoading ? "검색중..." : "검색"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {books.length > 0 && (
        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
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
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-4 flex gap-4 hover:bg-white/10 transition-all duration-300 border border-white/10"
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-16 h-24 object-cover rounded-lg shadow-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-lg mb-1">{book.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{book.author} · {book.publisher}</p>
                    <p className="text-gray-300 text-sm line-clamp-2">{book.description}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => handleAddToShelf(book)}
                      className="bg-white/10 text-white border border-white/20 hover:bg-white/20 shadow-lg"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      서재에 담기
                    </Button>
                    <Button
                      onClick={() => onBookSelect(book)}
                      className="bg-white text-black hover:bg-gray-200 shadow-lg"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      독후감 쓰기
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookSearch;
