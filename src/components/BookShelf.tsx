
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, CheckCircle, Edit3 } from "lucide-react";

const BookShelf = () => {
  // Mock data for user's books
  const userBooks = [
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
      reviewPreview: "꿈이라는 소재를 정말 창의적으로 풀어낸 작품이었다..."
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
      reviewPreview: "인생의 선택에 대해 깊이 생각해보게 되는..."
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
      reviewPreview: null
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500 text-white"><CheckCircle className="w-3 h-3 mr-1" />완독</Badge>;
      case "reading":
        return <Badge className="bg-blue-500 text-white"><Clock className="w-3 h-3 mr-1" />읽는 중</Badge>;
      case "wishlist":
        return <Badge className="bg-gray-500 text-white"><BookOpen className="w-3 h-3 mr-1" />읽고 싶은</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/20 backdrop-blur-lg border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            내 서재 ({userBooks.length}권)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6">
            {userBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white/30 backdrop-blur-sm rounded-xl p-6 hover:bg-white/40 transition-all duration-300"
              >
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
                      <p className="text-white/80">{book.author}</p>
                    </div>

                    {book.status !== "wishlist" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-white/80">
                          <span>읽기 진행률</span>
                          <span>{book.currentPage} / {book.totalPages} 페이지 ({book.progress}%)</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${book.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {book.reviewPreview && (
                      <div className="bg-white/20 rounded-lg p-3">
                        <p className="text-white/90 text-sm italic">"{book.reviewPreview}"</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {book.status === "wishlist" && (
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                          읽기 시작
                        </Button>
                      )}
                      {book.status === "reading" && (
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                          진행률 업데이트
                        </Button>
                      )}
                      {(book.status === "completed" || book.reviewPreview) && (
                        <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                          <Edit3 className="w-4 h-4 mr-2" />
                          독후감 {book.status === "completed" ? "수정" : "작성"}
                        </Button>
                      )}
                    </div>
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

export default BookShelf;
