import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

// Styled Components
const RoadmapContainer = styled.div`
  height: 90vh;
  background: linear-gradient(135deg, #000000 70%, #3b1a6d 100%);
  width: 100%;
  font-family: 'Poppins', sans-serif;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: clamp(1.8rem, 5vw, 3rem);
  color: #2c3e50;
  text-align: center;
  padding: 2rem 0;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  z-index: 3;
`;

const TimelineContainer = styled.div`
  flex: 1;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const TimelineContent = styled.div`
  position: relative;
  min-height: 120%;
  padding-bottom: 40px;
`;

const TimelineLine = styled.div`
  position: absolute;
  width: 4px;
  background: linear-gradient(to bottom, #3498db, #e74c3c);
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  height: 0; // Start with zero height
  animation: growLine 2s ease-out forwards; // Animation for line growth

  @media (max-width: 768px) {
    left: 20px;
    transform: none;
  }

  @keyframes growLine {
    from {
      height: 0;
    }
    to {
      height: 100%;
    }
  }
`;

const EducationNode = styled.div`
  position: relative;
  margin: 40px 0;
  padding: 20px;
  background: white;
  border-radius: 50px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  width: 100%;
  max-width: 400px;
  z-index: 2;
  opacity: 0; // Start invisible
  transform: ${({ isLeft }) => (isLeft ? 'translateX(-100%)' : 'translateX(100%)')}; // Start off-screen
  animation: growNode 0.8s ease-out forwards; // Animation for node growth
  animation-delay: ${({ delay }) => delay}s; // Staggered delay

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  @media (min-width: 769px) {
    width: 45%;
    ${({ isLeft }) => isLeft ? `
      margin-right: auto;
      margin-left: 5%;
    ` : `
      margin-left: auto;
      margin-right: 5%;
    `}
  }

  @media (max-width: 768px) {
    margin-left: 50px;
  }

  @keyframes growNode {
    from {
      opacity: 0;
      transform: ${({ isLeft }) => (isLeft ? 'translateX(-100%)' : 'translateX(100%)')};
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const NodeCircle = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: #3498db;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  border: 3px solid white;

  @media (min-width: 769px) {
    ${({ isLeft }) => isLeft ? `
      right: -30px;
    ` : `
      left: -30px;
    `}
  }

  @media (max-width: 768px) {
    left: -35px;
  }
`;

const NodeTitle = styled.h2`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: #e74c3c;
  margin-bottom: 10px;
  font-weight: 600;
`;

const NodeDetail = styled.p`
  font-size: clamp(0.9rem, 2vw, 1rem);
  color: #34495e;
  margin: 5px 0;
  line-height: 1.6;
`;

const EducationRoadmap = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    // Ensure animations run on mount
    const nodes = timelineRef.current.querySelectorAll(`${EducationNode}`);
    nodes.forEach((node, index) => {
      node.style.animationDelay = `${index * 0.5 + 2}s`; // Stagger nodes after line
    });
  }, []);

  return (
    <RoadmapContainer>
      <Title>My Education Journey</Title>
      
      <TimelineContainer>
        <TimelineContent ref={timelineRef}>
          <TimelineLine />
          
          <EducationNode isLeft delay={0}>
            <NodeCircle isLeft />
            <NodeTitle>Elementary Schooling</NodeTitle>
            <NodeDetail><strong>Institution:</strong> Sree Buddha Central School</NodeDetail>
            <NodeDetail><strong>Years:</strong> 2005 - 2017</NodeDetail>
            <NodeDetail><strong>Board:</strong> CBSE</NodeDetail>
          </EducationNode>

          <EducationNode delay={0.5}>
            <NodeCircle />
            <NodeTitle>10th Grade</NodeTitle>
            <NodeDetail><strong>Institution:</strong> Sree Buddha Central School</NodeDetail>
            <NodeDetail><strong>Year:</strong> 2018</NodeDetail>
            <NodeDetail><strong>Board:</strong> CBSE</NodeDetail>
          </EducationNode>

          <EducationNode isLeft delay={1}>
            <NodeCircle isLeft />
            <NodeTitle>12th Grade</NodeTitle>
            <NodeDetail><strong>Institution:</strong> Sree Buddha Central School</NodeDetail>
            <NodeDetail><strong>Year:</strong> 2020</NodeDetail>
            <NodeDetail><strong>Board:</strong> CBSE</NodeDetail>
            <NodeDetail><strong>Stream:</strong> Computer Science</NodeDetail>
          </EducationNode>

          <EducationNode delay={1.5}>
            <NodeCircle />
            <NodeTitle>B.Tech</NodeTitle>
            <NodeDetail><strong>Institution:</strong> Sree Buddha College of Engineering</NodeDetail>
            <NodeDetail><strong>Years:</strong> 2020 - 2024</NodeDetail>
            <NodeDetail><strong>Specialization:</strong> Artificial Intelligence & Machine Learning</NodeDetail>
          </EducationNode>
        </TimelineContent>
      </TimelineContainer>
    </RoadmapContainer>
  );
};

export default EducationRoadmap;