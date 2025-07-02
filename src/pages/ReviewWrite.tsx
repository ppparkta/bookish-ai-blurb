
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Sparkles, BookOpen, Star, CheckCircle, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  cover: string;
  status: string;
  totalPages: number;
  currentPage: number;
  category?: string;
  readCount?: number;
}

interface ReviewWriteProps {
  onReviewSaved?: (review: any) => void;
  onBookCompleted?: (bookId: number) => void;
}

const ReviewWrite = ({ onReviewSaved, onBookCompleted }: ReviewWriteProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const book = location.state?.book as Book;
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    rating: [4],
    thoughts: "",
    favoriteQuote: "",
    generatedReview: "",
    emotions: [] as string[],
    category: book?.category || "",
    readCount: book?.readCount || 1,
    isIntermediate: location.state?.isIntermediate || false
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const emotionOptions = [
    "😊 즐거웠어요", "😢 슬펐어요", "😮 놀라웠어요", "😤 화났어요", 
    "🤔 생각하게 됐어요", "💝 감동받았어요", "😴 지루했어요", "🔥 흥미진진했어요"
  ];

  const categories = [
    "소설", "에세이", "자기계발", "경제/경영", "인문학", "과학", "역사", "철학", "종교", "예술", "기타"
  ];

  // 임시저장 기능
  useEffect(() => {
    if (!book) {
      navigate('/');
      return;
    }
    
    // 페이지 로드 시 임시저장된 내용 복원
    const savedData = localStorage.getItem(`review-draft-${book.id}`);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData(prev => ({ ...prev, ...parsed }));
      toast({
        title: "임시저장된 내용을 불러왔습니다",
        description: "이전에 작성하던 내용을 복원했어요",
      });
    }
  }, [book, navigate, toast]);

  // 임시저장
  const handleTempSave = () => {
    if (!book) return;
    localStorage.setItem(`review-draft-${book.id}`, JSON.stringify(formData));
    toast({
      title: "임시저장 완료! 💾",
      description: "작성 중인 내용이 안전하게 저장되었습니다",
    });
  };

  // 뒤로가기
  const handleGoBack = () => {
    if (formData.thoughts || formData.favoriteQuote || formData.generatedReview) {
      if (confirm("작성 중인 내용이 있습니다. 임시저장 하시겠어요?")) {
        handleTempSave();
      }
    }
    navigate('/');
  };

  const handleEmotionToggle = (emotion: string) => {
    setFormData(prev => ({
      ...prev,
      emotions: prev.emotions.includes(emotion)
        ? prev.emotions.filter(e => e !== emotion)
        : [...prev.emotions, emotion]
    }));
  };

  const handleGenerateReview = async () => {
    if (!formData.thoughts.trim() && formData.emotions.length === 0) {
      toast({
        title: "내용을 입력해주세요",
        description: "느낀 점을 작성하거나 감정을 선택해주세요!",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const emotionText = formData.emotions.length > 0 
        ? `이 책을 읽으면서 ${formData.emotions.join(', ')} 감정을 느꼈다. ` 
        : '';
      
      const intermediateText = formData.isIntermediate 
        ? "현재 읽는 중이지만, 지금까지의 내용을 바탕으로 " 
        : "";
      
      const generatedReview = `${intermediateText}${emotionText}${formData.thoughts ? `${formData.thoughts}라는 생각이 들었다.` : ''} 

${formData.favoriteQuote ? `특히 인상 깊었던 부분은 "${formData.favoriteQuote}"이었는데, 이를 통해 새로운 시각을 얻을 수 있었다.` : ''}

${formData.category ? `${formData.category} 분야의 책으로서 ` : ''}전반적으로 ${formData.rating[0]}점을 주고 싶은 작품이며, ${formData.readCount > 1 ? `${formData.readCount}회째 읽고 있지만 ` : ''}다른 사람들에게도 추천하고 싶다.

${formData.isIntermediate ? "아직 완독하지는 않았지만, " : ""}읽기 전 vs 읽은 후의 생각 변화가 있어서 의미 있는 독서 경험이었다.`;

      setFormData(prev => ({ ...prev, generatedReview }));
      setIsGenerating(false);
      
      toast({
        title: "AI 독후감이 생성되었어요! ✨",
        description: "마음에 들지 않으면 수정하거나 다시 생성할 수 있어요",
      });
    }, 2000);
  };

  const handleComplete = () => {
    if (onBookCompleted && book) {
      onBookCompleted(book.id);
    }
    toast({
      title: "완독 완료! 🎉",
      description: `"${book?.title}"를 완독하셨네요! 축하드려요`,
    });
    // 임시저장 데이터 삭제
    localStorage.removeItem(`review-draft-${book?.id}`);
    navigate('/');
  };

  const handleSave = () => {
    const reviewData = {
      id: Date.now(),
      bookId: book?.id,
      type: formData.isIntermediate ? "중간독후감" : "완독",
      date: new Date().toISOString().split('T')[0],
      rating: formData.rating[0],
      content: formData.generatedReview || formData.thoughts,
      emotions: formData.emotions,
      quote: formData.favoriteQuote,
      category: formData.category,
      readCount: formData.readCount
    };

    if (onReviewSaved) {
      onReviewSaved(reviewData);
    }

    const reviewType = formData.isIntermediate ? "중간 독후감" : "독후감";
    toast({
      title: `${reviewType}이 저장되었어요! 📚`,
      description: `"${book?.title}"의 ${reviewType}이 내 서재에 저장되었습니다`,
    });
    
    // 임시저장 데이터 삭제
    localStorage.removeItem(`review-draft-${book?.id}`);
    navigate('/');
  };

  if (!book) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gray-900/90 backdrop-blur-lg border border-gray-700/50 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleGoBack}
                className="text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                뒤로가기
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleTempSave}
                className="text-black border-gray-700 hover:bg-gray-800 bg-white"
              >
                <Save className="w-4 h-4 mr-2" />
                임시저장
              </Button>
            </CardHeader>

            <CardContent className="p-8 space-y-6 text-white">
              {/* 타이틀 */}
              <div className="flex items-center justify-center pb-2">
                <span className="text-2xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-white" />
                  {formData.isIntermediate ? "중간 독후감 작성하기" : "독후감 작성하기"}
                </span>
              </div>

              {/* Book Info */}
              <div className="flex gap-4 p-4 bg-gray-800/50 rounded-lg text-white border border-gray-700/30">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-16 h-24 object-cover rounded shadow-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-white">{book.title}</h3>
                  <p className="text-gray-300">{book.author}</p>
                  <p className="text-sm text-gray-400">
                    {book.currentPage} / {book.totalPages} 페이지 
                    ({Math.round(book.currentPage / book.totalPages * 100)}%)
                  </p>
                </div>
              </div>

              {/* Category and Read Count */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-white">카테고리</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="text-white hover:bg-gray-700">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-white">회차</Label>
                  <Select 
                    value={formData.readCount.toString()} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, readCount: parseInt(value) }))}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {[1,2,3,4].map((count) => (
                        <SelectItem key={count} value={count.toString()} className="text-white hover:bg-gray-700">
                          {count}회독
                        </SelectItem>
                      ))}
                      <SelectItem value="5" className="text-white hover:bg-gray-700">
                        5회독 이상
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-white">평점</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={formData.rating}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, rating: value }))}
                    max={5}
                    min={1}
                    step={0.5}
                    className="flex-1 [&_.range]:bg-gradient-to-r [&_.range]:from-lime-500 [&_.range]:to-green-500 [&_.thumb]:bg-lime-500 [&_.thumb]:border-lime-600"
                  />
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-lime-400 fill-lime-400" />
                    <span className="font-semibold text-lg text-white">{formData.rating[0]}</span>
                  </div>
                </div>
              </div>

              {/* Emotion Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-white">어떤 감정이 들었나요? (선택사항)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {emotionOptions.map((emotion) => (
                    <Button
                      key={emotion}
                      variant="outline"
                      onClick={() => handleEmotionToggle(emotion)}
                      className={`text-sm transition-all border-gray-700 ${
                        formData.emotions.includes(emotion)
                          ? "bg-gray-700 text-white border-gray-600"
                          : "text-black hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      {emotion}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Thoughts */}
              <div className="space-y-2">
                <Label htmlFor="thoughts" className="text-white">느낀 점 (간단하게라도 적어주세요!)</Label>
                <Textarea
                  id="thoughts"
                  placeholder="이 책을 읽으면서 어떤 생각이나 감정이 들었나요? AI가 이를 바탕으로 멋진 독후감을 만들어드릴게요 ✨"
                  rows={4}
                  value={formData.thoughts}
                  onChange={(e) => setFormData(prev => ({ ...prev, thoughts: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
              </div>

              {/* Favorite Quote */}
              <div className="space-y-2">
                <Label htmlFor="quote" className="text-white">인상 깊은 구절 (선택사항)</Label>
                <Input
                  id="quote"
                  placeholder="기억에 남는 문장이나 구절이 있다면..."
                  value={formData.favoriteQuote}
                  onChange={(e) => setFormData(prev => ({ ...prev, favoriteQuote: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
              </div>

              {/* AI Generate Button */}
              <Button
                onClick={handleGenerateReview}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-lime-500 to-green-500 text-black hover:from-lime-600 hover:to-green-600 font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isGenerating ? "AI가 독후감을 작성하는 중..." : "AI로 독후감 생성하기 ✨"}
              </Button>

              {/* Generated Review */}
              {formData.generatedReview && (
                <div className="space-y-2">
                  <Label className="text-white">AI가 생성한 독후감</Label>
                  <Textarea
                    value={formData.generatedReview}
                    onChange={(e) => setFormData(prev => ({ ...prev, generatedReview: e.target.value }))}
                    rows={8}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <p className="text-sm text-gray-400">
                    💡 마음에 들지 않으면 직접 수정하거나 다시 생성할 수 있어요!
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                {!formData.isIntermediate && book.status !== "completed" && (
                  <Button
                    onClick={handleComplete}
                    className="flex-1 bg-gradient-to-r from-lime-500 to-green-500 text-black hover:from-lime-600 hover:to-green-600"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    완독했어요
                  </Button>
                )}
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-800 text-white hover:from-gray-700 hover:to-gray-900"
                  disabled={!formData.thoughts.trim() && formData.emotions.length === 0}
                >
                  {formData.isIntermediate ? "중간 독후감 저장" : "독후감 저장하기"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReviewWrite;
