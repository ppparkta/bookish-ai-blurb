
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Sparkles, BookOpen, Heart, CheckCircle } from "lucide-react";
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
}

const ReviewWrite = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const book = location.state?.book as Book;
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    rating: [4],
    thoughts: "",
    favoriteQuote: "",
    generatedReview: "",
    emotions: [] as string[]
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const emotionOptions = [
    "😊 즐거웠어요", "😢 슬펐어요", "😮 놀라웠어요", "😤 화났어요", 
    "🤔 생각하게 됐어요", "💝 감동받았어요", "😴 지루했어요", "🔥 흥미진진했어요"
  ];

  useEffect(() => {
    if (!book) {
      navigate('/');
    }
  }, [book, navigate]);

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
      
      const generatedReview = `${emotionText}${formData.thoughts ? `${formData.thoughts}라는 생각이 들었다.` : ''} 

${formData.favoriteQuote ? `특히 인상 깊었던 부분은 "${formData.favoriteQuote}"이었는데, 이를 통해 새로운 시각을 얻을 수 있었다.` : ''}

전반적으로 ${formData.rating[0]}점을 주고 싶은 작품이며, 다른 사람들에게도 추천하고 싶다.

읽기 전 vs 읽은 후의 생각 변화가 있어서 의미 있는 독서 경험이었다.`;

      setFormData(prev => ({ ...prev, generatedReview }));
      setIsGenerating(false);
      
      toast({
        title: "AI 독후감이 생성되었어요! ✨",
        description: "마음에 들지 않으면 수정하거나 다시 생성할 수 있어요",
      });
    }, 2000);
  };

  const handleComplete = () => {
    toast({
      title: "완독 완료! 🎉",
      description: `"${book?.title}"를 완독하셨네요! 축하드려요`,
    });
    navigate('/');
  };

  const handleSave = () => {
    toast({
      title: "독후감이 저장되었어요! 📚",
      description: `"${book?.title}"의 독후감이 내 서재에 저장되었습니다`,
    });
    navigate('/');
  };

  if (!book) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-gray-800 hover:bg-black/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            뒤로가기
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">독후감 작성</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-lg border-0 shadow-2xl">
            <CardContent className="p-8 space-y-6">
              {/* Book Info */}
              <div className="flex gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-16 h-24 object-cover rounded shadow-md"
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{book.title}</h3>
                  <p className="text-gray-600">{book.author}</p>
                  <p className="text-sm text-gray-500">
                    {book.currentPage} / {book.totalPages} 페이지 
                    ({Math.round(book.currentPage / book.totalPages * 100)}%)
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">평점</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={formData.rating}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, rating: value }))}
                    max={5}
                    min={1}
                    step={0.5}
                    className="flex-1"
                  />
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                    <span className="font-semibold text-lg text-gray-800">{formData.rating[0]}</span>
                  </div>
                </div>
              </div>

              {/* Emotion Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">어떤 감정이 들었나요? (선택사항)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {emotionOptions.map((emotion) => (
                    <Button
                      key={emotion}
                      variant="outline"
                      onClick={() => handleEmotionToggle(emotion)}
                      className={`text-sm transition-all ${
                        formData.emotions.includes(emotion)
                          ? "bg-gray-800 text-white border-gray-800"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {emotion}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Thoughts */}
              <div className="space-y-2">
                <Label htmlFor="thoughts" className="text-gray-700">느낀 점 (간단하게라도 적어주세요!)</Label>
                <Textarea
                  id="thoughts"
                  placeholder="이 책을 읽으면서 어떤 생각이나 감정이 들었나요? AI가 이를 바탕으로 멋진 독후감을 만들어드릴게요 ✨"
                  rows={4}
                  value={formData.thoughts}
                  onChange={(e) => setFormData(prev => ({ ...prev, thoughts: e.target.value }))}
                  className="text-gray-800"
                />
              </div>

              {/* Favorite Quote */}
              <div className="space-y-2">
                <Label htmlFor="quote" className="text-gray-700">인상 깊은 구절 (선택사항)</Label>
                <Input
                  id="quote"
                  placeholder="기억에 남는 문장이나 구절이 있다면..."
                  value={formData.favoriteQuote}
                  onChange={(e) => setFormData(prev => ({ ...prev, favoriteQuote: e.target.value }))}
                  className="text-gray-800"
                />
              </div>

              {/* AI Generate Button */}
              <Button
                onClick={handleGenerateReview}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isGenerating ? "AI가 독후감을 작성하는 중..." : "AI로 독후감 생성하기 ✨"}
              </Button>

              {/* Generated Review */}
              {formData.generatedReview && (
                <div className="space-y-2">
                  <Label className="text-gray-700">AI가 생성한 독후감</Label>
                  <Textarea
                    value={formData.generatedReview}
                    onChange={(e) => setFormData(prev => ({ ...prev, generatedReview: e.target.value }))}
                    rows={8}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 text-gray-800"
                  />
                  <p className="text-sm text-gray-600">
                    💡 마음에 들지 않으면 직접 수정하거나 다시 생성할 수 있어요!
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                {book.status !== "completed" && (
                  <Button
                    onClick={handleComplete}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    완독했어요
                  </Button>
                )}
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-800 text-white"
                  disabled={!formData.thoughts.trim() && formData.emotions.length === 0}
                >
                  수정하기
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
