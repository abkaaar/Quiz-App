"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';

const SampleQuiz = () => {


  return (
   
      <section className="container mx-auto px-4 mt-24 flex flex-col gap-8">
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
        </div>
        <div className="grid md:grid-cols-3 gap-8">
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

          <Link href="/quizs/matching" className="hover:scale-105 transition-transform duration-300">
            <Card>
              <CardHeader>
                <Image src="/choose.png" alt="hero-image" width={100} height={100} className="object-cover object-center mx-auto mb-4" />

                <CardTitle>Matching Quiz</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Student match related items (e.g., words ).</p>
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
        </div>
      </section>
  
  );
}

export default SampleQuiz;
