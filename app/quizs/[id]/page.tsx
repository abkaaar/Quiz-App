"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { db } from "@/utils/firebase";
import { useParams } from "next/navigation";

interface Quiz {
  id: string;
  name: string;
  subject: string;
  grade: string;
  imageUrl?: string;
  description?: string;
  questions?: any[];
  createdAt?: any;
  createdBy?: string;
}

const QuizDetail = () => {
  const router = useRouter();
  const Params = useParams();
  const id = Array.isArray(Params.id) ? Params.id[0] : Params.id;
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("ID from URL:", id); // Debugging line
    
    if (!id) {
      setError("Quiz ID is missing.");
      setLoading(false);
      return;
    }

    const fetchQuiz = async () => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, "quizs", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setQuiz({ id: docSnap.id, ...docSnap.data() } as Quiz);
        } else {
          setError("Quiz not found.");
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setError("Failed to load quiz.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-gray-600">Loading quiz...</p>
    </div>
  );
  
  if (error) return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <p className="text-red-500">{error}</p>
      <Link href="/quizs">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Back to Quizzes
        </button>
      </Link>
    </div>
  );

  if (!quiz) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{quiz.name}</h1>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <p className="text-gray-700 bg-gray-100 px-3 py-1 rounded-full">Subject: {quiz.subject}</p>
          <p className="text-gray-700 bg-gray-100 px-3 py-1 rounded-full">Grade: {quiz.grade}</p>
          {quiz.createdAt && (
            <p className="text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
              Created: {new Date(quiz.createdAt.toDate()).toLocaleDateString()}
            </p>
          )}
        </div>

        {quiz.description && (
          <p className="text-gray-700 mb-6">{quiz.description}</p>
        )}

        {quiz.imageUrl ? (
          <div className="mb-6">
            <img 
              src={quiz.imageUrl} 
              alt="Quiz Cover" 
              className="w-full max-w-md rounded-lg shadow-md mx-auto" 
            />
          </div>
        ) : (
          <div className="mb-6 bg-gray-100 p-10 rounded-lg text-center">
            <p className="text-gray-500">No image available.</p>
          </div>
        )}

        {quiz.questions && quiz.questions.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Quiz contains {quiz.questions.length} questions</h2>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Start Quiz
            </button>
          </div>
        ) : (
          <p className="text-yellow-600 mb-6">This quiz doesn't have any questions yet.</p>
        )}

        <div className="flex justify-between mt-6">
          <Link href="/quizs">
            <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              Back to Quizzes
            </button>
          </Link>
          
          <div className="space-x-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Share Quiz
            </button>
            {/* You might want to add a condition here to only show this to quiz creators */}
            <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
              Edit Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;