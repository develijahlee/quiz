import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/quiz.module.scss'

const Quiz: NextPage = () => {
  const [data, setData] = useState([] as any[]);
  const [questionCount, setQuestionCount] = useState(0)
  const [answerCount, setAnswerCount] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [startTime, setStartTime] = useState({})

  useEffect(() => {
    const start = new Date();
    setStartTime(start)
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
    setQuestionCount(questionCount => questionCount + 1)
    setAnswered(false)
  }

  const timePassed = (endTime: Date): string => {
    let timeDiff = +endTime - +startTime
    timeDiff /= 1000
    let minutes = timeDiff / 60
    if (minutes >= 1) {
      let decimal = minutes - Math.floor(minutes)
      let remainingSeconds = decimal * 30
      return `${Math.round(minutes)} minutes and ${Math.round(remainingSeconds)} seconds`
    } else {
      return `${Math.round(timeDiff)} seconds`
    }
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
        {questionCount !== data.length && (
          <p>questionCount: {questionCount + 1} out of {data.length}</p>
        )}
        {data.slice(questionCount, questionCount + 1).map((d) => (
          <div key={d.correct_answer}>
            <p dangerouslySetInnerHTML={{ __html: d.question }} />
            {d.incorrect_answers.map((d: string) => (
              <p key={d} dangerouslySetInnerHTML={{ __html: d }} onClick={(e) => handleClick(false, e.target)} />
            ))}
            <p dangerouslySetInnerHTML={{ __html: d.correct_answer }} onClick={(e) => handleClick(true, e.target)} />
          </div>
        ))}

        {answered && (
          <button onClick={showNextQuestion}>next</button>
        )}

        {questionCount === data.length && (
          <>
            <p>{timePassed(new Date())}</p>
            <p>correct answers: {answerCount}</p>
            <p>wrong answers: {data.length - answerCount}</p>
            <Link href="/">
              <a>Try again</a>
            </Link>
          </>
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
