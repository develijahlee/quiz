import React, { useEffect, useState, useRef } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/quiz.module.scss'

const Quiz: NextPage = () => {
  const [data, setData] = useState([] as any[]);
  const [questionCount, setQuestionCount] = useState(0)
  const [answerCount, setAnswerCount] = useState(0)
  const [answered, setAnswered] = useState(false)
  const correctAnswerRef = useRef(null)

  useEffect(() => {
    const results = JSON.parse(window.localStorage.getItem('results') || '{}')
    setData(results)
  }, []);

  const handleClick = (value: boolean, e: any): void => {
    setAnswered(true)
    if (value && !answered) {
      e.classList.add(styles.correct)
      setAnswerCount(answerCount => answerCount + 1)
    } else if (!value && !answered) {
      e.classList.add(styles.incorrect)
    }
  }

  const showNextQuestion = (): void => {
    if (answered) {
      setQuestionCount(questionCount => questionCount + 1)
      setAnswered(false)
    } else {
      alert('choose an answer')
    }
    correctAnswerRef.current?.classList.remove(styles.correct)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Quiz</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">the quiz</a>
        </h1>
        {data.slice(questionCount, questionCount + 1).map((d, index) => (
          <div key={index}>
            <p dangerouslySetInnerHTML={{ __html: d.question }} />
            {d.incorrect_answers.map((d: string) => (
              <p key={d} dangerouslySetInnerHTML={{ __html: d }} onClick={(e) => handleClick(false, e.target)} />
            ))}
            <p ref={correctAnswerRef} dangerouslySetInnerHTML={{ __html: d.correct_answer }} onClick={(e) => handleClick(true, e.target)} />
          </div>
        ))}

        {questionCount !== data.length ? (
          <>
            <p>questionCount: {questionCount + 1} out of {data.length}</p>
            <button onClick={showNextQuestion}>next</button>
          </>
        ) : (
          <p>answerCount: {answerCount}</p>
        )}

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Quiz
