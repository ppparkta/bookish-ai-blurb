
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { X, Sparkles, BookOpen, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Book {
  id?: number;
  isbn?: string;
  title: string;
  author: string;
  cover: string;
}

interface ReviewFormProps {
  book: Book;
  onClose: () => void;
}

const emotionOptions = [
  "😊 즐거웠어요",
  "😢 슬펐어요", 
  "😡 화났어요",
  "🤔 생각하게 됐어요",
  "💝 감동받았어요",
  "😴 지루했어요",
  "🔥 흥미진진했어요",
  "😱 놀랐어요"
];

const ReviewForm = ({ book, onClose }: ReviewFormProps) => {
  const [formData, setFormData] = useState({
    rating: [4],
    currentPage: "",
    totalPages: "",
    thoughts: "",
    favoriteQuote: "",
    selectedEmotions: [] as string[],
    generatedReview: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const toggleEmotion = (emotion: string) => {
    setFormData(prev => ({
      ...prev,
      selectedEmotions: prev.selectedEmotions.includes(emotion)
        ? prev.selectedEmotions.filter(e => e !== emotion)
        : [...prev.selectedEmotions, emotion]
    }));
  };

  const handleGenerateReview = async () => {
    if (!formData.thoughts.trim()) {
      toast({
        title: "내용을 입력해주세요",
        description: "AI가 요약할 수 있도록 간단한 느낌이라도 적어주세요!",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const emotionText = formData.selectedEmotions.length > 0 
        ? `${formData.selectedEmotions.join(', ')} 감정을 느꼈다.` 
        : '다양한 감정을 느꼈다.';
      
      const generatedReview = `이 책을 읽으면서 ${emotionText} ${formData.thoughts}

${formData.favoriteQuote ? `특히 인상 깊었던 부분은 "${formData.favoriteQuote}"이었는데, 이를 통해 새로운 시각을 얻을 수 있었다.` : '작가의 독특한 관점을 통해 새로운 시각을 얻을 수 있었다.'}

전반적으로 ${formData.rating[0]}점을 주고 싶은 작품이며, 다른 사람들에게도 추천하고 싶다.

${formData.currentPage && formData.totalPages && formData.currentPage !== formData.totalPages ? '아직 완독하지는 않았지만, ' : ''}읽기 전 vs 읽은 후의 생각 변화가 있어서 의미 있는 독서 경험이었다.`;

      setFormData(prev => ({ ...prev, generatedReview }));
      setIsGenerating(false);
      
      toast({
        title: "AI 독후감이 생성되었어요! ✨",
        description: "마음에 들지 않으면 수정하거나 다시 생성할 수 있어요",
      });
    }, 2000);
  };

  const handleSave = () => {
    const reviewType = formData.currentPage === formData.totalPages || !formData.currentPage ? "완독" : "중간독후감";
    
    const newReview = {
      id: Date.now(),
      type: reviewType as "완독" | "중간독후감",
      date: new Date().toISOString().split('T')[0],
      rating: formData.rating[0],
      content: formData.generatedReview || formData.thoughts,
      emotions: formData.selectedEmotions,
      quote: formData.favoriteQuote
    };

    // Save to localStorage
    const bookId = book.id || book.isbn || book.title;
    const existingReviews = JSON.parse(localStorage.getItem(`reviews_${bookId}`) || '[]');
    existingReviews.push(newReview);
    localStorage.setItem(`reviews_${bookId}`, JSON.stringify(existingReviews));
    
    toast({
      title: "독후감이 저장되었어요! 📚",
      description: `"${book.title}"의 독후감이 내 서재에 추가되었습니다`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="bg-gray-900/95 backdrop-blur-lg border border-lime-500/30 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl flex items-center gap-2 text-white">
            <BookOpen className="w-5 h-5 text-lime-400" />
            독후감 작성
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Book Info */}
          <div className="flex gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/30">
            <img
              src={book.cover}
              alt={book.title}
              className="w-16 h-24 object-cover rounded shadow-md"
            />
            <div>
              <h3 className="font-semibold text-lg text-white">{book.title}</h3>
              <p className="text-gray-300">{book.author}</p>
            </div>
          </div>

          {/* Rating with green gradient slider */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">평점</Label>
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Slider
                  value={formData.rating}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, rating: value }))}
                  max={5}
                  min={1}
                  step={0.5}
                  className="w-full"
                />
                <style jsx>{`
                  .slider-track {
                    background: linear-gradient(to right, #84cc16, #22c55e) !important;
                  }
                `}</style>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-lime-400 fill-current" />
                <span className="font-semibold text-lg text-white">{formData.rating[0]}</span>
              </div>
            </div>
          </div>

          {/* Reading Progress */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentPage" className="text-white">현재 페이지</Label>
              <Input
                id="currentPage"
                type="number"
                placeholder="ex) 150"
                value={formData.currentPage}
                onChange={(e) => setFormData(prev => ({ ...prev, currentPage: e.target.value }))}
                className="bg-gray-800/50 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalPages" className="text-white">전체 페이지</Label>
              <Input
                id="totalPages"
                type="number"
                placeholder="ex) 300"
                value={formData.totalPages}
                onChange={(e) => setFormData(prev => ({ ...prev, totalPages: e.target.value }))}
                className="bg-gray-800/50 border-gray-600 text-white"
              />
            </div>
          </div>

          {/* Emotions */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">어떤 감정이 들었나요?</Label>
            <div className="grid grid-cols-2 gap-2">
              {emotionOptions.map((emotion) => (
                <Button
                  key={emotion}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => toggleEmotion(emotion)}
                  className={`text-left justify-start h-auto py-2 ${
                    formData.selectedEmotions.includes(emotion)
                      ? 'bg-lime-500 border-lime-500 text-white hover:bg-lime-600'
                      : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  {emotion}
                </Button>
              ))}
            </div>
          </div>

          {/* Thoughts */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">어떤 생각이 들었나요?</Label>
            <Textarea
              placeholder="이 책을 읽으면서 어떤 생각이나 감정이 들었나요? AI가 이를 바탕으로 멋진 독후감을 만들어드릴게요 ✨"
              rows={4}
              value={formData.thoughts}
              onChange={(e) => setFormData(prev => ({ ...prev, thoughts: e.target.value }))}
              className="bg-gray-800/50 border-gray-600 text-white"
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
              className="bg-gray-800/50 border-gray-600 text-white"
            />
          </div>

          {/* AI Generate Button */}
          <Button
            onClick={handleGenerateReview}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-lime-500 to-green-500 text-black hover:from-lime-600 hover:to-green-600 shadow-lg"
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
                className="bg-gray-800/30 border-gray-600 text-white"
              />
              <p className="text-sm text-gray-400">
                💡 마음에 들지 않으면 직접 수정하거나 다시 생성할 수 있어요!
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800/50"
            >
              취소
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-lime-500 text-black hover:bg-lime-600"
              disabled={!formData.thoughts.trim() && !formData.generatedReview.trim()}
            >
              저장하기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewForm;
