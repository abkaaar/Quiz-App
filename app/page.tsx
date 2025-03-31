import QuizSettings from "@/components/quiz-settings";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Brain, TrophyIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
   
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
       
        <Navbar/>

        <main 
          className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center h-screen py-12"
          style={{ backgroundImage: 'url(/banner.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="space-y-6">
            <h2 className="text-5xl font-extrabold text-white leading-tight">
              Learn. Challenge. Grow.
            </h2>
            <p className="text-xl text-white">
              Quizapp is is an interactive web-based quiz platform designed for students accross all levels with the aim to make learning fun, engaging, and rewarding by providing subject-specific quizzes tailored to students. 
            </p>
            <div className="flex space-x-4">
              <Button size="lg" className="px-8">
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Link href="/quizs" className="hidden md:block">
              <Button variant="outline" size="lg" className="px-8">
          Explore Quizzes
              </Button>
              </Link>
            </div>
          </div>
        </main>
        <section className="container mx-auto px-4 mt-24">
          <h3 className="text-3xl font-bold text-center mb-12">Why Quizapp?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <BookOpen className="w-10 h-10 text-blue-600 mb-4" />
                <CardTitle>Diverse Subjects</CardTitle>
              </CardHeader>
              <CardContent>
                <p>From science to history, we cover a wide range of topics to keep your learning exciting.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Brain className="w-10 h-10 text-green-600 mb-4" />
                <CardTitle>Adaptive Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Our AI-powered quizzes adapt to your skill level, ensuring optimal challenge and growth.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrophyIcon className="w-10 h-10 text-yellow-600 mb-4" />
                <CardTitle>Track Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Detailed analytics help you understand your strengths and areas for improvement.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <footer className="container mx-auto px-4 py-12 text-center">
          <p className="text-gray-600">&copy; 2025 Quizapp. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
