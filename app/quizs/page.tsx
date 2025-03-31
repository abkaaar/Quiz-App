"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Brain, Plus, TrophyIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';


import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

const QuizsPage = () => {

  const [open, setOpen] = useState(false);
  const [quizName, setQuizName] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [image, setImage] = useState<File | null>(null);

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

  const handleSave = () => {
    console.log('Saving quiz:', { quizName, subject, grade, image });
    setOpen(false);
    // Reset form after saving
    setQuizName('');
    setSubject('');
    setGrade('');
    setImage(null);
  };

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
                      <SelectItem value="secondary">Secondary School</SelectItem>
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
                    <div className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => document.getElementById('file-upload')?.click()}>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-2 text-sm text-gray-500">
                        {image ? image.name : "Click to upload or drag and drop"}
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
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleSave}>
                  Save Quiz
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>



        <div className="grid md:grid-cols-3 gap-8">
          <Link href="/quizs/multiple-choice" className="hover:scale-105 transition-transform duration-300">
            <Card>
              <CardHeader>
                <Image src="/multiple.png" alt="hero-image" width={100} height={100} className="object-cover object-center mx-auto mb-4" />
                <CardTitle>Multiple Choice</CardTitle>
              </CardHeader>
              <CardContent>
                <p>From science to history, students choose the correct answer from a set of options.</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/quizs/true-and-false" className="hover:scale-105 transition-transform duration-300">

            <Card>
              <CardHeader>
                <Image src="/tf.png" alt="hero-image" width={100} height={100} className="object-cover object-center mx-auto mb-4" />

                <CardTitle>True or False</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Simple two-option quiz (True / False).</p>
              </CardContent>
            </Card>
          </Link>

         <Link href="/quizs/fill-blanks" className="hover:scale-105 transition-transform duration-300">
         <Card>
            <CardHeader>
              <Image src="/fill.png" alt="hero-image" width={100} height={100} className="object-cover object-center mx-auto mb-4" />

              <CardTitle>Fill in the blanks</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Student type a missing word in a sentence.
              </p>
            </CardContent>
          </Card>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Link href="/quizs/matching" className="hover:scale-105 transition-transform duration-300">
          <Card>
            <CardHeader>
              <Image src="/choose.png" alt="hero-image" width={100} height={100} className="object-cover object-center mx-auto mb-4" />

              <CardTitle>Matching Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Student match related items (e.g., words and definitions).</p>
            </CardContent>
          </Card>
          </Link>
          <Link href="/quizs/reorder" className="hover:scale-105 transition-transform duration-300">
          <Card>
            <CardHeader>
              <Image src="/ordering.png" alt="hero-image" width={100} height={100} className="object-cover object-center mx-auto mb-4" />

              <CardTitle>Reorder the Sequence</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Student arrange steps in the correct order.</p>
            </CardContent>
          </Card>
          </Link>
          <Link href="/quizs/image" className="hover:scale-105 transition-transform duration-300">
          <Card>
            <CardHeader>
              <Image src="/picture.png" alt="hero-image" width={100} height={100} className="object-cover object-center mx-auto mb-4" />
              <CardTitle>Image-Based Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Student identify objects, flags, or people from images.</p>
            </CardContent>
          </Card>
          </Link>

        </div>
      </section>
      <Footer />
    </div>
  );
}

export default QuizsPage;
