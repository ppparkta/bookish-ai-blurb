
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    coverUrl: "",
    category: ""
  });
  const { toast } = useToast();

  const categories = [
    "소설", "에세이", "자기계발", "경제/경영", "인문학", "과학", "역사", "철학", "종교", "예술", "기타"
  ];

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="bg-gray-900/95 backdrop-blur-lg border border-gray-700/50 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-gray-700/30">
          <CardTitle className="text-xl flex items-center gap-2 text-white">
            <BookOpen className="w-5 h-5 text-white" />
            책 직접 등록하기
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
        
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white font-medium">책 제목 *</Label>
              <Input
                id="title"
                placeholder="책 제목을 입력하세요"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author" className="text-white font-medium">저자 *</Label>
              <Input
                id="author"
                placeholder="저자명을 입력하세요"
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="publisher" className="text-white font-medium">출판사</Label>
              <Input
                id="publisher"
                placeholder="출판사를 입력하세요"
                value={formData.publisher}
                onChange={(e) => setFormData(prev => ({ ...prev, publisher: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalPages" className="text-white font-medium">총 페이지 수</Label>
              <Input
                id="totalPages"
                type="number"
                placeholder="300"
                value={formData.totalPages}
                onChange={(e) => setFormData(prev => ({ ...prev, totalPages: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white font-medium">카테고리</Label>
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
            <Label htmlFor="coverUrl" className="text-white font-medium">책 표지 URL (선택사항)</Label>
            <Input
              id="coverUrl"
              placeholder="https://example.com/book-cover.jpg"
              value={formData.coverUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, coverUrl: e.target.value }))}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white font-medium">책 소개 (선택사항)</Label>
            <Textarea
              id="description"
              placeholder="책에 대한 간단한 소개를 작성해주세요"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              취소
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-lime-500 to-green-500 text-black hover:from-lime-600 hover:to-green-600 font-bold"
            >
              서재에 추가하기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManualBookAdd;
