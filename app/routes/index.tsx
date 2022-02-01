import { useEffect, useState } from 'react'
import json from '../../../wcag-file.json'

interface WcagObject {
    criterion: string; 
    criterionNumber: string; 
    fullName: string; 
    description: string; 
    conformanceLevel: string; 
    link: string; 
    requirements?: {}
}

interface WcagLibray {
    [key: string]: WcagObject
}

const wcag: WcagLibray = json;

export default function Index() {

    const [question, setQuestion] = useState<any>()
    const [isCorrect, setIsCorrect] = useState(false)
    const [score, setScore] = useState(0)
    const [showCorrect, setShowCorrect] = useState(false)

    const nextQuestion = () => {
        setShowCorrect(false)
        setIsCorrect(false)
        const keys = Object.keys(wcag);
        
        const getRandomCriterion = () => {
            const range = keys.length;
            const a = Math.floor(Math.random() * ( range - 1 ) + 1)
    
            return wcag[keys[a]]
        }

        const answer = getRandomCriterion()

        const q = {
            answer,
            answers: Array(
                getRandomCriterion(), 
                getRandomCriterion(),  
                getRandomCriterion(),  
                getRandomCriterion()
            )
        }
            
        const randomizeAnswer = Math.floor(Math.random () * 4 - 1 + 1)
        q.answers[randomizeAnswer] = answer;

        setQuestion(q)
    }

    useEffect(() => {
        setShowCorrect(false)
        nextQuestion()
    }, [])

    const checkAnswer = (a) => {
        if (question.answer.criterionNumber === a.criterionNumber) {
            setScore(score + 1)
            setIsCorrect(true)
        }
        setShowCorrect(true)
    }

    return (
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4", maxHeight: '100vh' }}>
          { `score: ${score}`}
        <br/>
        <div style={{ padding: '20px', background: isCorrect ? '#9FE2BF' : 'lightsalmon', margin: "1%", fontSize: '20px' }}>
            <p dangerouslySetInnerHTML={{ __html: question?.answer.description.html }}></p>
        </div>

        <div style={{ display: 'flex', flexFlow: 'row wrap', marginTop: '10px' }}>
        { question?.answers.map((answer) => {
            return <button onClick={() => checkAnswer(answer)} style={{ fontSize: '20px', flex: "1 1 48%", padding: '24px', margin: '1%', background: showCorrect && answer.criterionNumber === question.answer.criterionNumber ? '#9FE2BF' : 'inherit'
            
            }}>
                { answer.fullName }
            </button>
        }) }
        </div>

        <div>
            { showCorrect && <button onClick={nextQuestion}>next question</button>}
        </div>

      </div>
    );
  }
