
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Plus, TrendingUp } from "lucide-react";
import BookSearch from "@/components/BookSearch";
import BookShelf from "@/components/BookShelf";
import ReadingProgress from "@/components/ReadingProgress";
import ReviewForm from "@/components/ReviewForm";

const Index = () => {
  const [activeTab, setActiveTab] = useState("search");
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-rose-400">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-white" />
            <h1 className="text-4xl font-bold text-white">BookVibe</h1>
          </div>
          <p className="text-white/80 text-lg">
            📖 힙한 독서 기록, AI로 스마트하게 ✨
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/20 backdrop-blur-lg rounded-full p-2 flex gap-2">
            <Button
              variant={activeTab === "search" ? "secondary" : "ghost"}
              onClick={() => setActiveTab("search")}
              className={`rounded-full px-6 ${
                activeTab === "search" 
                  ? "bg-white text-purple-600 shadow-lg" 
                  : "text-white hover:bg-white/20"
              }`}
            >
              <Search className="w-4 h-4 mr-2" />
              책 찾기
            </Button>
            <Button
              variant={activeTab === "shelf" ? "secondary" : "ghost"}
              onClick={() => setActiveTab("shelf")}
              className={`rounded-full px-6 ${
                activeTab === "shelf" 
                  ? "bg-white text-purple-600 shadow-lg" 
                  : "text-white hover:bg-white/20"
              }`}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              내 서재
            </Button>
            <Button
              variant={activeTab === "progress" ? "secondary" : "ghost"}
              onClick={() => setActiveTab("progress")}
              className={`rounded-full px-6 ${
                activeTab === "progress" 
                  ? "bg-white text-purple-600 shadow-lg" 
                  : "text-white hover:bg-white/20"
              }`}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              진행률
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === "search" && (
            <BookSearch onBookSelect={setSelectedBook} />
          )}
          
          {activeTab === "shelf" && (
            <BookShelf />
          )}
          
          {activeTab === "progress" && (
            <ReadingProgress />
          )}
        </div>

        {/* Review Modal */}
        {selectedBook && (
          <ReviewForm 
            book={selectedBook} 
            onClose={() => setSelectedBook(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default Index;
