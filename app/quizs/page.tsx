import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Brain, TrophyIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const QuizsPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
       <Navbar/>
       <section className="container mx-auto px-4 mt-24 flex flex-col gap-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/quizs/multiple-choice" className="hover:scale-105 transition-transform duration-300">
            <Card>
              <CardHeader>
                <BookOpen className="w-10 h-10 text-blue-600 mb-4" />
                <CardTitle>Multiple Choice Quiz</CardTitle>
              </CardHeader>
              <CardContent>
                <p>From science to history, students choose the correct answer from a set of options.</p>
              </CardContent>
            </Card>
            </Link>

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
        <Footer/>
        </div>
    );
}

export default QuizsPage;
