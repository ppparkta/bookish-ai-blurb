
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, BookOpen, TrendingUp } from "lucide-react";
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

  const progressPercentage = Math.round((parseInt(currentPage) || 0) / book.totalPages * 100);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="bg-gray-900/95 backdrop-blur-lg border border-gray-700/50 shadow-2xl w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-gray-700/30">
          <CardTitle className="text-xl flex items-center gap-2 text-white">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            진행률 업데이트
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
        
        <CardContent className="space-y-6 p-6">
          {/* Book Info */}
          <div className="flex gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/30">
            <img
              src={book.cover}
              alt={book.title}
              className="w-16 h-24 object-cover rounded shadow-md"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-white">{book.title}</h3>
              <p className="text-gray-300">{book.author}</p>
              <p className="text-sm text-gray-400">총 {book.totalPages}페이지</p>
            </div>
          </div>

          {/* Current Progress */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPage" className="text-white font-medium">현재까지 읽은 페이지</Label>
              <Input
                id="currentPage"
                type="number"
                min="0"
                max={book.totalPages}
                value={currentPage}
                onChange={(e) => setCurrentPage(e.target.value)}
                placeholder={`0 ~ ${book.totalPages}`}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500"
              />
            </div>

            {/* Progress Visualization */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">진행률</span>
                <span className="text-white font-medium">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 text-center">
                {book.totalPages - (parseInt(currentPage) || 0)}페이지 남음
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              취소
            </Button>
            <Button
              onClick={handleUpdate}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
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
