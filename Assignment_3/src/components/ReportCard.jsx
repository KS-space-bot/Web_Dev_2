import React, { useState } from 'react'
import '../App.css'
import report from '../data'

const ReportCard = () => {
  const [reportState, setReportState] = useState(report)

  function submitHandler(event) {
    event.preventDefault()

    const name = event.target.name.value.trim()
    const marks = event.target.marks.value.trim()

    if (name && marks) {
      setReportState((prevData) => [...prevData, { name, marks }])
      event.target.reset()
    }
  }

  const TotalStudents = reportState.length
  const passedStudents = reportState.filter((item) => Number(item.marks) >= 40).length
  const avgMarks = TotalStudents > 0 
    ? reportState.reduce((acc, item) => acc + Number(item.marks), 0) / TotalStudents 
    : 0

  return (
    <div className='report-card'>
      <div className="stats-grid">
        <div className="stat-box">
          <label>Total Students</label>
          <p>{TotalStudents}</p>
        </div>
        <div className="stat-box">
          <label>Passed</label>
          <p className="pass-text">{passedStudents}</p>
        </div>
        <div className="stat-box">
          <label>Failed</label>
          <p className="fail-text">{TotalStudents - passedStudents}</p>
        </div>
        <div className="stat-box">
          <label>Avg. Marks</label>
          <p>{avgMarks.toFixed(2)}</p>
        </div>
      </div>

      <form className="input-form" onSubmit={submitHandler}>
        <input name='name' placeholder='Student Name' required />
        <input name='marks' type="number" placeholder='Marks' required />
        <button type="submit">Add Student</button>
      </form>
      
      <div className="student-list">
        {reportState.map((item, index) => (
          <div className='student-item' key={index}>
            <span className='student-name'>{item.name}</span>
            <span className={`student-marks ${Number(item.marks) >= 40 ? 'pass' : 'fail'}`}>
              {item.marks}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReportCard