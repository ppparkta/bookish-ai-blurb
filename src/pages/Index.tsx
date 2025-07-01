
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Plus, TrendingUp } from "lucide-react";
import BookSearch from "@/components/BookSearch";
import BookShelf from "@/components/BookShelf";
import ReadingProgress from "@/components/ReadingProgress";

const Index = () => {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-white" />
            <h1 className="text-4xl font-bold text-white tracking-tight">BookVibe</h1>
          </div>
          <p className="text-gray-300 text-lg font-light tracking-wide">
            📖 힙한 독서 기록, AI로 스마트하게 ✨
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-full p-2 flex gap-2 border border-white/10">
            <Button
              variant={activeTab === "search" ? "secondary" : "ghost"}
              onClick={() => setActiveTab("search")}
              className={`rounded-full px-6 transition-all duration-300 ${
                activeTab === "search" 
                  ? "bg-white text-black shadow-xl" 
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Search className="w-4 h-4 mr-2" />
              책 찾기
            </Button>
            <Button
              variant={activeTab === "shelf" ? "secondary" : "ghost"}
              onClick={() => setActiveTab("shelf")}
              className={`rounded-full px-6 transition-all duration-300 ${
                activeTab === "shelf" 
                  ? "bg-white text-black shadow-xl" 
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              내 서재
            </Button>
            <Button
              variant={activeTab === "progress" ? "secondary" : "ghost"}
              onClick={() => setActiveTab("progress")}
              className={`rounded-full px-6 transition-all duration-300 ${
                activeTab === "progress" 
                  ? "bg-white text-black shadow-xl" 
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              진행률
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === "search" && <BookSearch />}
          {activeTab === "shelf" && <BookShelf />}
          {activeTab === "progress" && <ReadingProgress />}
        </div>
      </div>
    </div>
  );
};

export default Index;
