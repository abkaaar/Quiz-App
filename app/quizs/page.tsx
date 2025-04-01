"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SampleQuiz from "@/components/Samplequiz";
import { db, storage } from "@/utils/firebase";
import {
  getAuth,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";

const QuizsPage = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [quizName, setQuizName] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null); // ✅ Store user ID

  interface ImageChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & {
      files: FileList | null;
    };
  }

  const handleImageChange = (e: ImageChangeEvent): void => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

    // Fetch and store authenticated user ID
    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserId(user.uid); // ✅ Store the user ID in state
          console.log("User ID:", user.uid);
        } else {
          setUserId(null);
          console.log("No user signed in.");
        }
      });
  
      return () => unsubscribe(); // Cleanup on unmount
    }, []);

  const handleSave = async () => {
    if (!quizName || !subject || !grade) {
      toast({
        title: "Incomplete form",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      let imageUrl = "";

      if (image) {
        const storageRef = ref(
          storage,
          `quiz-covers/${Date.now()}-${image.name}`
        );
        const snapshot = await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const quizData = {
        name: quizName,
        subject,
        grade,
        imageUrl,
        createdAt: new Date(),
        questions: [],
        userId, // ✅ Associate quiz with user
      };

      const docRef = await addDoc(collection(db, "quizzes"), quizData);

      setQuizzes([...quizzes, { id: docRef.id, ...quizData }]);

      toast({
        title: "Success",
        description: "Quiz created successfully",
      });

      setOpen(false);
      setQuizName("");
      setSubject("");
      setGrade("");
      setImage(null);
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({
        title: "Error",
        description: "Failed to create quiz",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid; // ✅ Get current user ID
        console.log("User ID:", userId);
  
        setLoading(true);
        try {
          const querySnapshot = await getDocs(collection(db, "quizzes"));
          const quizzesList = querySnapshot.docs
            .map((doc) => ({ id: doc.id, ...(doc.data() as { userId: string }) }))
            .filter((quiz) => quiz.userId === userId); // ✅ Only fetch user's quizzes
  
          setQuizzes(quizzesList);
        } catch (error) {
          console.error("Error fetching quizzes:", error);
          toast({
            title: "Error",
            description: "Failed to fetch quizzes",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No user signed in.");
        setQuizzes([]); // Clear quizzes if no user
      }
    });
  
    return () => unsubscribe(); // Cleanup the listener when component unmounts
  }, []);
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar />
      <section className="container mx-auto px-4 mt-24 flex flex-col gap-8">
        <div className="flex flex-col items-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="w-1/4 mb-4 self-center" size="lg">
                <Plus className="mr-2" />
                Create
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Quiz</DialogTitle>
                <DialogDescription>
                  Fill in the details to create your new quiz.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                    placeholder="Quiz name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject" className="text-right">
                    Subject
                  </Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="geography">Geography</SelectItem>
                      <SelectItem value="art">Art</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="pe">Physical Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="grade" className="text-right">
                    Grade
                  </Label>
                  <Select value={grade} onValueChange={setGrade}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="university">University</SelectItem>
                      <SelectItem value="secondary">
                        Secondary School
                      </SelectItem>
                      <SelectItem value="primary">Primary School</SelectItem>
                      <SelectItem value="kindergarten">Kindergarten</SelectItem>
                      <SelectItem value="nursery">Nursery</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cover" className="text-right">
                    Cover Image
                  </Label>
                  <div className="col-span-3">
                    <div
                      className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        document.getElementById("file-upload")?.click()
                      }
                    >
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-2 text-sm text-gray-500">
                        {image
                          ? image.name
                          : "Click to upload or drag and drop"}
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                    {image && (
                      <div className="mt-2">
                        <img
                          src="/api/placeholder/200/150"
                          alt="Cover preview"
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" onClick={handleSave} disabled={loading}>
                  {loading ? "Saving..." : "Save Quiz"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Display quizzes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
              >
                <div className="h-48 bg-gray-200">
                  {quiz.imageUrl ? (
                    <img
                      src={quiz.imageUrl}
                      alt={quiz.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{quiz.name}</h3>
                  <div className="flex justify-between mt-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {quiz.subject}
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {quiz.grade}
                    </span>
                  </div>
                  <div className="mt-4">
                    <Link href={`/quizs/${quiz.id}`}>
                      <Button className="w-full">Edit Quiz</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">
                No quizzes found. <br /> Create your first quiz!
              </p>
            </div>
          )}
        </div>
        <SampleQuiz />
      </section>
      <Footer />
    </div>
  );
};

export default QuizsPage;
