"use client"

import React from 'react';
import { Progress } from 'antd';
import { useGlobalContext } from '../context/globalState';
import 'antd/dist/reset.css'; // Ensure you import this for Ant Design reset styles

const Skills = () => {
  const { Skills, loading } = useGlobalContext();

  if (loading) return <>Loading...</>;
  if (!Skills || Skills.length === 0) return <div>No skills found</div>;

  const calculateSkillSums = (skillsArray) => {
    return skillsArray.reduce((acc, skill) => {
      if (acc[skill.type]) {
        acc[skill.type] += skill.amount;
      } else {
        acc[skill.type] = skill.amount;
      }
      return acc;
    }, {});
  };

  const skillSums = calculateSkillSums(Skills);
  const sortedSkills = Object.entries(skillSums)
    .map(([type, amount]) => ({ type, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 6);

  const totalAmount = sortedSkills.reduce((total, skill) => total + skill.amount, 0);

  const skillsWithPercentages = sortedSkills.map(skill => ({
    type: skill.type,
    percentage: (skill.amount / totalAmount) * 100
  }));

  return (
    <div className="w-full max-w-lg mx-auto p-3">
      <h2 className="text-[16px] font-bold text-black mb-2 text-center">Best Skills</h2>
      {skillsWithPercentages.map(skill => (
        <div key={skill.type} className="scroll-mb-0.5">
          <div className="text-sm font-semibold text-black capitalize">
            {skill.type.replace("skill_", "").replace('-', '')}
          </div>
          <Progress
            percent={skill.percentage.toFixed(0)}
            className="rounded-md"
            strokeColor="#FF9B05" // Custom color for the progress bar
          />
        </div>
      ))}
    </div>
  );
};

export default Skills;
