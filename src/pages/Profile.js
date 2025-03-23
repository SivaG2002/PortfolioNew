import React from "react";
import styled, { keyframes } from "styled-components";
import { FaEnvelope, FaPhoneAlt, FaLinkedin, FaGithub, FaMapMarkerAlt, FaUser, FaCalendarAlt } from 'react-icons/fa';

// Animations
const drawIn = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const drawBorder = keyframes`
  0% {
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
  }
  25% {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }
  50% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
  75% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
  100% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
`;

// Styled Components
const ProfileSection = styled.section`
  position: relative;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  padding: 10px 40px;
  box-sizing: border-box;
  overflow: hidden;
  background: linear-gradient(135deg, #000000 70%, #3b1a6d 100%);;
`;

const ProfileHeading = styled.h2`
  margin-bottom: 50px;
  font-size: 52px;
  font-weight: bold;
  background: linear-gradient(90deg, #00ddeb, #ff00ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 2px;
  text-shadow: 0 2px 10px rgba(0,221,235,0.2);

  @media (max-width: 768px) {
    font-size: 42px;
    margin-bottom: 40px;
  }

  @media (max-width: 480px) {
    font-size: 32px;
    margin-bottom: 30px;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  gap: 40px;
  
  @media (max-width: 992px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ProfileLeft = styled.div`
  flex: 0 0 30%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  
  @media (max-width: 992px) {
    width: 100%;
    max-width: 400px;
    order: 1;
  }
`;

const ProfileRight = styled.div`
  flex: 0 0 65%;
  
  @media (max-width: 992px) {
    width: 100%;
    order: 2;
  }
`;

const ProfileImageContainer = styled.div`
  align-self: center;
  width: 80%;
  aspect-ratio: 1 ;
  border-radius: 50px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  animation: ${drawIn} 1.5s ease forwards;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 3px solid #00ddeb;
    border-radius: 50px;
    z-index: 1;
    animation: ${drawBorder} 1.5s ease forwards;
    pointer-events: none;
  }
  
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(0,221,235,0.3), rgba(255,0,255,0.3));
    opacity: 0.5;
    mix-blend-mode: overlay;
  }
`;

const ProfilePhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const DoodleBox = styled.div`
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 15px;
  color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 25px;
  animation: ${drawIn} 1.5s ease forwards;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 15px;
    border: 2px solid rgba(0, 221, 235, 0.5);
    border-image: linear-gradient(45deg, #00ddeb, #ff00ff) 1;
    
    z-index: -1;
    opacity: 0.5;
    animation: ${drawBorder} 1.5s ease forwards;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.1);
  }

  h3 {
    font-size: 24px;
    margin: 0 0 20px 0;
    color: #00ddeb;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    border-bottom: 1px solid rgba(0, 221, 235, 0.3);
    padding-bottom: 10px;

    @media (max-width: 768px) {
      font-size: 20px;
      margin-bottom: 15px;
    }

    @media (max-width: 480px) {
      font-size: 18px;
      margin-bottom: 12px;
    }
  }

  p {
    font-size: 16px;
    line-height: 1.7;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    color: rgba(255, 255, 255, 0.9);

    @media (max-width: 768px) {
      font-size: 15px;
    }

    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
`;

const AboutMeBox = styled(DoodleBox)`
    border-radius: 15px;
       

`;
const Hobbies = styled(DoodleBox)`
  margin-top: 20px;
  justify-content: justify;
`;
const DetailsBox = styled(DoodleBox)`
  margin-bottom: 0;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ProfileDetailsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-family: 'Roboto', sans-serif;

  li {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    
    &:last-child {
      margin-bottom: 0;
    }
  }

  strong {
    color: #00ddeb;
    margin-right: 5px;
    font-weight: 500;
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  margin-right: 12px;
  color: #ff00ff;
  font-size: 18px;
`;

const Flag = styled.span`
  font-size: 18px;
  margin-left: 8px;
  vertical-align: middle;
`;

const DetailValue = styled.span`
  color: rgba(255, 255, 255, 0.85);
`;


function Profile() {
  return (
    <ProfileSection id="profile">
      <ProfileContainer>
        <ProfileLeft>
          <ProfileImageContainer>
            <ProfilePhoto src="profilepic.png" alt="Profile" />
          </ProfileImageContainer>
          
          <DetailsBox>
            <h3>Personal Details</h3>
            <ProfileDetailsList>
              <li>
                <IconWrapper><FaUser /></IconWrapper>
                <strong>Age:</strong> <DetailValue>22</DetailValue>
              </li>
              <li>
                <IconWrapper><FaMapMarkerAlt /></IconWrapper>
                <strong>Location:</strong> <DetailValue>Kochi, Ernakulam</DetailValue>
              </li>
              <li>
                <IconWrapper><FaCalendarAlt /></IconWrapper>
                <strong>State/Country:</strong> <DetailValue>Kerala, India</DetailValue>
                <Flag role="img" aria-label="India flag">🇮🇳</Flag>
              </li>
            </ProfileDetailsList>
          </DetailsBox>

          <DetailsBox>
            <h3>Contact Information</h3>
            <ProfileDetailsList>
              <li>
                <IconWrapper><FaEnvelope /></IconWrapper>
                <strong>Email:</strong> <DetailValue>sivagnairofficial@example.com</DetailValue>
              </li>
              <li>
                <IconWrapper><FaPhoneAlt /></IconWrapper>
                <strong>Phone:</strong> <DetailValue>+91 6282684814</DetailValue>
              </li>
              <li>
                <IconWrapper><FaLinkedin /></IconWrapper>
                <strong>LinkedIn:</strong> <DetailValue>linkedin.com/in/sivagnair</DetailValue>
              </li>
              <li>
                <IconWrapper><FaGithub /></IconWrapper>
                <strong>GitHub:</strong> <DetailValue>github.com/SivaG2002</DetailValue>
              </li>
            </ProfileDetailsList>
          </DetailsBox>
        </ProfileLeft>

        <ProfileRight>
          <AboutMeBox>
            <h3>About Me</h3>
            <p>
              I am Siva G Nair, a passionate AI Developer and Full Stack
              Developer with a love for creating innovative solutions. I enjoy
              exploring new technologies, designing sleek web interfaces, and
              gaming in my free time. My journey in tech started when I was a
              teenager, tinkering with code to build small games and websites.
            </p>
            <br />
            <p>
              Over the years, I've honed my skills in both front-end and
              back-end development, specializing in AI-driven applications that
              solve real-world problems. I'm always eager to learn and take on
              new challenges, whether it's building a complex web app or diving
              into the latest machine learning frameworks.
            </p>
            <br />
            <p>
              I'm also a creative thinker, often finding inspiration in nature and art, which I
              incorporate into my design work. My goal is to create technology that not only functions
              flawlessly but also delivers a delightful user experience through thoughtful design and
              intuitive interfaces.
            </p>
          </AboutMeBox>
          <Hobbies>
            <h3>Hobbies & Interests</h3>
            <p>
              When I'm not coding, you'll find me exploring the great outdoors,
              capturing moments with my camera, or immersing myself in the latest
              video games. I'm an avid reader, with a keen interest in science fiction
              and fantasy novels, and a music enthusiast who enjoys playing the guitar
              and composing tunes in my free time.
            </p>
            <br />
            <p>
              I'm also a fitness enthusiast, practicing yoga and meditation to
              maintain a healthy body and mind. I believe in the power of balance
              and strive to find harmony in all aspects of my life, whether it's
              work, play, or personal growth.
            </p>
          </Hobbies>
        </ProfileRight>
      </ProfileContainer>
    </ProfileSection>
  );
}

export default Profile;
