import { useState, useEffect } from 'react';
import { getAllLessonPlans } from '../../../data/endpoints';

export const LessonPlans = () => {

  const [lessonPlans, setLessonPlans] = useState([]);

  useEffect(() => {
    const fetchLessonPlans = async () => {
      const plans = await getAllLessonPlans();
      setLessonPlans(plans);
    }
    fetchLessonPlans();
  }, []);

  return (
    <div>
      {/* <h2>Lesson Plans</h2>
      <div>
        {lessonPlans.map(plan => (
          <div key={plan.id}>
            <h3>{plan.title}</h3>
            <p>{plan.description}</p>
          </div>
        ))}
      </div> */}
    </div>
  )
}

export default LessonPlans;