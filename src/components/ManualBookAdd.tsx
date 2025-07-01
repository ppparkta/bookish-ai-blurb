import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ManualBookAddProps {
  onClose: () => void;
}

const ManualBookAdd = ({ onClose }: ManualBookAddProps) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    totalPages: "",
    description: "",
    coverUrl: ""
  });
  const { toast } = useToast();

  const handleSave = () => {
    if (!formData.title.trim() || !formData.author.trim()) {
      toast({
        title: "필수 정보를 입력해주세요",
        description: "책 제목과 저자는 반드시 입력해야 합니다",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "책이 서재에 추가되었습니다! 📚",
      description: `"${formData.title}"이(가) 읽고 싶은 책 목록에 추가되었어요`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <Card className="bg-white/95 backdrop-blur-lg border-0 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="justify-center items-center pb-2">
          <CardTitle className="text-2xl font-bold text-black text-center w-full flex items-center justify-center gap-2">
            <BookOpen className="w-6 h-6 text-black" />
            책 직접 등록하기
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8 space-y-6 text-black">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-black">책 제목 *</Label>
              <Input
                id="title"
                placeholder="책 제목을 입력하세요"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="text-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author" className="text-black">저자 *</Label>
              <Input
                id="author"
                placeholder="저자명을 입력하세요"
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                className="text-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="publisher" className="text-black">출판사</Label>
              <Input
                id="publisher"
                placeholder="출판사를 입력하세요"
                value={formData.publisher}
                onChange={(e) => setFormData(prev => ({ ...prev, publisher: e.target.value }))}
                className="text-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalPages" className="text-black">총 페이지 수</Label>
              <Input
                id="totalPages"
                type="number"
                placeholder="300"
                value={formData.totalPages}
                onChange={(e) => setFormData(prev => ({ ...prev, totalPages: e.target.value }))}
                className="text-black"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverUrl" className="text-black">책 표지 URL (선택사항)</Label>
            <Input
              id="coverUrl"
              placeholder="https://example.com/book-cover.jpg"
              value={formData.coverUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, coverUrl: e.target.value }))}
              className="text-black"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-black">책 소개 (선택사항)</Label>
            <Textarea
              id="description"
              placeholder="책에 대한 간단한 소개를 작성해주세요"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="text-black"
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-gray-600 to-gray-800 text-white border-0 hover:from-gray-700 hover:to-gray-900"
            >
              취소
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-green-400 to-lime-400 text-black border-0 hover:from-green-500 hover:to-lime-500 font-bold"
            >
              서재에 추가하기
            </Button>
          </div>

          <footer className="w-full text-center text-xs text-gray-300 flex flex-col items-center justify-center px-4 py-4 mt-8" style={{ fontFamily: 'Pretendard, sans-serif' }}>
            <div>© 2025 Sooyang. All rights reserved.</div>
            <div className="mt-1">
              by Sooyang | <a href="https://github.com/ppparkta/bookish-ai-blurb" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">GitHub</a>
            </div>
          </footer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManualBookAdd;
