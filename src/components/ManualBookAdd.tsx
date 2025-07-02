
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, BookOpen, Plus } from "lucide-react";
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
    category: "",
    description: "",
    coverUrl: ""
  });
  const { toast } = useToast();

  const categories = [
    "소설", "시/에세이", "자기계발", "경제/경영", "인문학", "과학", 
    "역사", "예술", "종교", "여행", "요리", "취미", "기타"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.author.trim()) {
      toast({
        title: "필수 정보를 입력해주세요",
        description: "제목과 저자는 반드시 입력해야 합니다.",
        variant: "destructive"
      });
      return;
    }

    const newBook = {
      id: Date.now(),
      title: formData.title,
      author: formData.author,
      publisher: formData.publisher || "출판사 미상",
      cover: formData.coverUrl || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
      isbn: `manual-${Date.now()}`,
      pubdate: new Date().toISOString().split('T')[0],
      description: formData.description || "직접 등록한 책입니다.",
      status: 'want-to-read',
      category: formData.category || '기타',
      currentPage: 0,
      totalPages: parseInt(formData.totalPages) || 300
    };

    // Add to bookshelf
    const existingBooks = JSON.parse(localStorage.getItem('bookshelf') || '[]');
    existingBooks.push(newBook);
    localStorage.setItem('bookshelf', JSON.stringify(existingBooks));

    toast({
      title: "책이 등록되었습니다! 📚",
      description: `"${formData.title}"이(가) 내 서재에 추가되었어요`,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="bg-gray-900/95 backdrop-blur-lg border border-lime-500/30 shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl flex items-center gap-2 text-white">
            <BookOpen className="w-5 h-5 text-lime-400" />
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
        
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">책 제목 *</Label>
              <Input
                id="title"
                placeholder="책 제목을 입력하세요"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="bg-gray-800/50 border-gray-600 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author" className="text-white">저자 *</Label>
              <Input
                id="author"
                placeholder="저자명을 입력하세요"
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                className="bg-gray-800/50 border-gray-600 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="publisher" className="text-white">출판사</Label>
              <Input
                id="publisher"
                placeholder="출판사를 입력하세요"
                value={formData.publisher}
                onChange={(e) => setFormData(prev => ({ ...prev, publisher: e.target.value }))}
                className="bg-gray-800/50 border-gray-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-white">카테고리</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                  <SelectValue placeholder="카테고리를 선택하세요" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="text-white hover:bg-gray-700">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalPages" className="text-white">총 페이지 수</Label>
              <Input
                id="totalPages"
                type="number"
                placeholder="ex) 300"
                value={formData.totalPages}
                onChange={(e) => setFormData(prev => ({ ...prev, totalPages: e.target.value }))}
                className="bg-gray-800/50 border-gray-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverUrl" className="text-white">책 표지 이미지 URL</Label>
              <Input
                id="coverUrl"
                placeholder="https://example.com/cover.jpg"
                value={formData.coverUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, coverUrl: e.target.value }))}
                className="bg-gray-800/50 border-gray-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">책 소개</Label>
              <Textarea
                id="description"
                placeholder="책에 대한 간단한 소개를 입력하세요"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="bg-gray-800/50 border-gray-600 text-white"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800/50"
              >
                취소
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-lime-500 text-black hover:bg-lime-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                등록하기
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManualBookAdd;
