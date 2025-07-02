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

const BookSearch = () => {
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
    },
    {
      isbn: "9788972756194",
      title: "코스모스",
      author: "칼 세이건",
      cover: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=200&h=300&fit=crop",
      publisher: "사이언스북스",
      pubdate: "2001-12-01",
      description: "우주와 인간에 대한 경이로운 통찰을 담은 과학 명저"
    },
    {
      isbn: "9780141036144",
      title: "1984",
      author: "조지 오웰",
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop",
      publisher: "Penguin",
      pubdate: "2008-07-01",
      description: "전체주의의 위험성을 경고하는 디스토피아 소설"
    },
    {
      isbn: "9781408855652",
      title: "해리포터와 마법사의 돌",
      author: "J.K. 롤링",
      cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&h=300&fit=crop",
      publisher: "문학수첩",
      pubdate: "2014-11-01",
      description: "마법 세계로의 초대, 해리포터 시리즈의 시작"
    },
    {
      isbn: "9788937460449",
      title: "데미안",
      author: "헤르만 헤세",
      cover: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=200&h=300&fit=crop",
      publisher: "민음사",
      pubdate: "2007-10-20",
      description: "자아를 찾아가는 한 소년의 성장 소설"
    },
    {
      isbn: "9788990982575",
      title: "미움받을 용기",
      author: "기시미 이치로",
      cover: "https://images.unsplash.com/photo-1455885664032-3c620901b5b0?w=200&h=300&fit=crop",
      publisher: "인플루엔셜",
      pubdate: "2014-11-10",
      description: "아들러 심리학을 바탕으로 한 자기계발서"
    },
    {
      isbn: "9788932920345",
      title: "죽음에 관하여",
      author: "엘리자베스 퀴블러 로스",
      cover: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?w=200&h=300&fit=crop",
      publisher: "청림출판",
      pubdate: "2016-03-15",
      description: "삶과 죽음에 대한 깊은 통찰을 담은 인문서"
    },
    {
      isbn: "9788936433598",
      title: "어린왕자",
      author: "생텍쥐페리",
      cover: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=200&h=300&fit=crop",
      publisher: "문학동네",
      pubdate: "2015-05-20",
      description: "순수와 사랑, 인생의 본질을 담은 명작 동화"
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
      <div className="py-2 space-y-4">
        <div className="flex gap-4 mb-4">
          <Input
            placeholder="책 제목이나 저자명을 검색하세요..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-lime-500"
          />
          <Button 
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-gray-700 text-white border border-gray-700 hover:bg-gray-800 shadow-lg"
          >
            <Search className="w-4 h-4 mr-2" />
            {isLoading ? "검색중..." : "검색"}
          </Button>
        </div>
        <Button 
          onClick={() => setShowManualAdd(true)}
          variant="outline"
          className="w-full border-[#A8FF78] text-[#A8FF78] bg-[#23272f] hover:bg-[#A8FF78] hover:text-gray-900 hover:border-[#A8FF78] border transition-colors duration-200"
        >
          <Edit className="w-4 h-4 mr-2" />
          원하는 책이 없나요? 직접 등록하기
        </Button>
      </div>

      {/* Search Results */}
      {books.length > 0 && (
        <Card className="bg-[#23272f] backdrop-blur-xl border border-white/10 shadow-2xl">
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
                  className="bg-[#23272f] backdrop-blur-sm rounded-lg p-4 flex gap-4 hover:bg-gray-800 transition-all duration-300 border border-white/10"
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-16 h-24 object-cover rounded-lg shadow-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-lg mb-1">{book.title}</h3>
                    <p className="text-gray-200 text-sm mb-2">{book.author} · {book.publisher}</p>
                    <p className="text-gray-300 text-sm line-clamp-2">{book.description}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => handleAddToShelf(book)}
                      className="bg-gray-700 text-white border border-white/20 hover:bg-gray-600 shadow-lg"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      서재에 담기
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Manual Book Add Modal */}
      {showManualAdd && (
        <ManualBookAdd onClose={() => setShowManualAdd(false)} />
      )}
    </div>
  );
};

export default BookSearch;
