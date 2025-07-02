import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronDown, ChevronRight, BookOpen, Star, Calendar, Palette } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import html2canvas from "html2canvas";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  status: string;
  category?: string;
}

interface Review {
  id: number;
  type: "완독" | "중간독후감";
  date: string;
  rating?: number;
  content: string;
  emotions: string[];
  quote?: string;
}

const getVibeColor = () => {
  const colors = [
    "from-pink-500 to-purple-500",
    "from-blue-500 to-cyan-500", 
    "from-green-500 to-lime-500",
    "from-orange-500 to-red-500",
    "from-purple-500 to-pink-500"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const MyReviews = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const book = location.state?.book as Book;
  
  const [openReviews, setOpenReviews] = useState<number[]>([]);

  // Mock data for reviews
  const reviews: Review[] = [
    {
      id: 1,
      type: "중간독후감",
      date: "2024-01-15",
      content: "이 책을 읽으면서 😊 즐거웠어요, 🤔 생각하게 됐어요 감정을 느꼈다. 작가의 독특한 관점을 통해 새로운 시각을 얻을 수 있었다.\n\n전반적으로 4점을 주고 싶은 작품이며, 다른 사람들에게도 추천하고 싶다.\n\n아직 완독하지는 않았지만, 읽기 전 vs 읽은 후의 생각 변화가 있어서 의미 있는 독서 경험이었다.",
      emotions: ["😊 즐거웠어요", "🤔 생각하게 됐어요"],
      rating: 4,
      quote: "인생은 선택의 연속이다"
    },
    {
      id: 2,
      type: "완독",
      date: "2024-01-28",
      content: "이 책을 읽으면서 💝 감동받았어요, 🔥 흥미진진했어요 감정을 느꼈다. 마지막까지 읽고 나서 정말 깊은 감동을 받았다.\n\n특히 인상 깊었던 부분은 \"모든 순간이 소중하다\"이었는데, 이를 통해 새로운 시각을 얻을 수 있었다.\n\n전반적으로 4.5점을 주고 싶은 작품이며, 다른 사람들에게도 추천하고 싶다.\n\n읽기 전 vs 읽은 후의 생각 변화가 있어서 의미 있는 독서 경험이었다.",
      emotions: ["💝 감동받았어요", "🔥 흥미진진했어요"],
      rating: 4.5,
      quote: "모든 순간이 소중하다"
    }
  ];

  // vibeColor를 고정 상태로 관리
  const [vibeColor, setVibeColor] = useState(getVibeColor());
  // reviews 배열이 바뀔 때만 vibeColor를 새로 뽑음
  useEffect(() => {
    setVibeColor(getVibeColor());
  }, [JSON.stringify(reviews)]);

  const toggleReview = (reviewId: number) => {
    setOpenReviews(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const getVibeMessage = () => {
    const messages = [
      "감성적인 독서가 🌸",
      "깊이 있는 사색가 📚", 
      "열정적인 리더 🔥",
      "따뜻한 감성의 소유자 💝",
      "호기심 많은 탐험가 🌟"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const tailwindColorMap: Record<string, string> = {
    'from-pink-500': '#ec4899',
    'to-purple-500': '#a21caf',
    'from-blue-500': '#3b82f6',
    'to-cyan-500': '#06b6d4',
    'from-green-500': '#22c55e',
    'to-lime-500': '#84cc16',
    'from-orange-500': '#f97316',
    'to-red-500': '#ef4444',
    'from-purple-500': '#a21caf',
    'to-pink-500': '#ec4899',
  };

  function getVibeGradientHex() {
    const vibe = getVibeColor();
    const [from, to] = vibe.split(' ');
    return [tailwindColorMap[from] || '#a8edea', tailwindColorMap[to] || '#fed6e3'];
  }

  if (!book) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              내 서재로
            </Button>
          </div>

          {/* Vibe Summary */}
          <Card className="bg-gray-900/90 backdrop-blur-lg border border-gray-700/50 shadow-2xl mb-8">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${vibeColor} animate-pulse flex items-center justify-center`}>
                  <Palette className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">나의 독서 바이브</h2>
                  <p className="text-xl text-lime-400 font-semibold">{getVibeMessage()}</p>
                </div>
                <div className="flex items-center justify-center gap-6 text-gray-300">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    <span>{reviews.length}개의 독후감</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-lime-400" />
                    <span>평균 {(reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length).toFixed(1)}점</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Book Info */}
          <Card className="bg-gray-900/90 backdrop-blur-lg border border-gray-700/50 shadow-2xl mb-8">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-20 h-28 object-cover rounded shadow-lg"
                />
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-2">{book.title}</h1>
                  <p className="text-lg text-gray-300 mb-2">{book.author}</p>
                  {book.category && (
                    <Badge variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-600">
                      {book.category}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">내 독후감 목록</h2>
            {reviews.map((review) => (
              <Card key={review.id} className="bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 shadow-xl">
                <Collapsible>
                  <CollapsibleTrigger 
                    className="w-full"
                    onClick={() => toggleReview(review.id)}
                  >
                    <CardHeader className="hover:bg-gray-800/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Badge 
                            variant="outline" 
                            className={`${
                              review.type === "완독" 
                                ? "bg-lime-500/20 text-lime-400 border-lime-500/30" 
                                : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                            }`}
                          >
                            {review.type}
                          </Badge>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{review.date}</span>
                          </div>
                          {review.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-lime-400 fill-lime-400" />
                              <span className="text-sm text-white">{review.rating}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1 hidden sm:flex">
                            {review.emotions.slice(0, 3).map((emotion, index) => (
                              <span key={index} className="text-xs bg-gray-700 px-2 py-1 rounded">
                                {emotion.split(' ')[0]}
                              </span>
                            ))}
                          </div>
                          {openReviews.includes(review.id) ? (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0 pb-6 px-6">
                      <div className="space-y-4">
                        {review.quote && (
                          <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-lime-500 space-y-2">
                            <p className="text-gray-300 italic" style={{wordBreak: 'break-all'}}>
                              "{review.quote}"
                            </p>
                          </div>
                        )}
                        <div className="prose prose-invert max-w-none">
                          <p className="text-gray-200 leading-relaxed whitespace-pre-line">
                            {review.content}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {review.emotions.map((emotion, index) => (
                            <Badge 
                              key={index} 
                              variant="outline" 
                              className="bg-gray-800/50 text-gray-300 border-gray-600"
                            >
                              {emotion}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReviews;
