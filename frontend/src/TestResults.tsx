import './index.css';
import Navigation from './Navigation';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

export interface ITestResult {
    codecA: string;
    codecB: string;
    song: string;
    playlistId: number;
    userAge: string;
    correctAnswer: boolean;
    user: number;
    date: Date;
}

export default function TestResults() {

    const [testResults, setTestResults] = useState<ITestResult[]>([]);
    const [averageCorrect, setAverageCorrect] = useState<number>(0);
    const navigate = useNavigate();

    const calculateAverageCorrect = (results: ITestResult[]) => {

        const totalCorrect = results.filter(result => result.correctAnswer).length;
        setAverageCorrect(totalCorrect / results.length);
    };

    useEffect(() => {
        const fetchTestResults = async () => {
            try {
                const playlistId = localStorage.getItem('playlistId');
                const res: Response = await fetch(`http://localhost:8000/playlist/${playlistId}/testresult`);

                if(res.status === 404){
                    console.log('404')
                    navigate('/');
                }
                if(res.status === 200){
                    const data = await res.json();
                    const testResults: ITestResult[] = data.result;

                    setTestResults(testResults);
                    calculateAverageCorrect(testResults);
                }
            } catch (error) {
                console.error('Error fetching test results:', error);
            }
        };
        fetchTestResults();
    }, []);

    return(
        <div>
            <Navigation/>
            <div className="p-4 mx-50 my-20">
                <div className="mb-4 p-4 bg-white shadow-md rounded-md">
                    <h1 className="text-2xl font-bold">Average Correct Answers</h1>
                    <p className="text-lg">{(averageCorrect * 100).toFixed(2)}%</p>
                </div>
                <div className="bg-white shadow-md rounded-md">
                    <ul>
                        {testResults.map((result, index) => (
                            <li key={index} className="p-4 border-b border-gray-200">
                                <p className="text-lg font-medium">{result.song}</p>
                                <p className="text-sm text-gray-600">Correct Answer: {result.correctAnswer ? 'Yes' : 'No'}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
