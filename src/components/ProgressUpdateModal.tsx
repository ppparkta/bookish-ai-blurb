import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  totalPages: number;
  currentPage: number;
}

interface ProgressUpdateModalProps {
  book: Book;
  onClose: () => void;
  onUpdate: (bookId: number, newPage: number) => void;
}

const ProgressUpdateModal = ({ book, onClose, onUpdate }: ProgressUpdateModalProps) => {
  const [currentPage, setCurrentPage] = useState(book.currentPage.toString());
  const { toast } = useToast();

  const handleUpdate = () => {
    const newPage = parseInt(currentPage);
    
    if (newPage < 0 || newPage > book.totalPages) {
      toast({
        title: "잘못된 페이지 번호",
        description: `0부터 ${book.totalPages} 사이의 숫자를 입력해주세요`,
        variant: "destructive"
      });
      return;
    }

    onUpdate(book.id, newPage);
    toast({
      title: "진행률이 업데이트되었어요! 📖",
      description: `"${book.title}" ${newPage}페이지까지 읽었어요`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="bg-white/95 backdrop-blur-lg border-0 shadow-2xl w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl flex items-center gap-2 text-white">
            <BookOpen className="w-5 h-5 text-gray-100" />
            진행률 업데이트
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Book Info */}
          <div className="flex gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
            <img
              src={book.cover}
              alt={book.title}
              className="w-16 h-24 object-cover rounded shadow-md"
            />
            <div>
              <h3 className="font-semibold text-lg text-white">{book.title}</h3>
              <p className="text-gray-200">{book.author}</p>
              <p className="text-sm text-gray-300">총 {book.totalPages}페이지</p>
            </div>
          </div>

          {/* Current Progress */}
          <div className="space-y-2">
            <Label htmlFor="currentPage" className="text-gray-100">현재까지 읽은 페이지</Label>
            <Input
              id="currentPage"
              type="number"
              min="0"
              max={book.totalPages}
              value={currentPage}
              onChange={(e) => setCurrentPage(e.target.value)}
              placeholder={`0 ~ ${book.totalPages}`}
              className="text-white"
            />
            <p className="text-sm text-gray-200">
              진행률: {Math.round((parseInt(currentPage) || 0) / book.totalPages * 100)}%
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              취소
            </Button>
            <Button
              onClick={handleUpdate}
              className="flex-1 bg-gradient-to-r from-gray-700 to-gray-900 text-white"
            >
              업데이트
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressUpdateModal;
