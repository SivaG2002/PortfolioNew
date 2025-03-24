import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { database } from './firebase'; // Adjust path as needed
import { ref, push, onValue } from 'firebase/database';
import emailjs from '@emailjs/browser';

// Styled Components
const ContactContainer = styled.div`
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

const ContentWrapper = styled.div`
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Section = styled.section`
  padding: 20px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: #e74c3c;
  margin-bottom: 20px;
`;

const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 20px;
  justify-items: center;
`;

const SocialItem = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #34495e;
  font-size: 1rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
  }
`;

const Divider = styled.hr`
  border: 0;
  height: 2px;
  background: #3498db;
  margin: 20px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 500px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const TextareaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Textarea = styled.textarea`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
`;

const EmailSendButton = styled.button`
  width: 40px;
  height: 40px;
  background: #25D366; // WhatsApp green
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #20b858;
  }
`;

const ChatIcon = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background: #25D366; // WhatsApp green
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  animation: jump 0.5s infinite alternate;
  animation-delay: 5s;

  @keyframes jump {
    from { transform: translateY(0); }
    to { transform: translateY(-10px); }
  }

  img {
    width: 35px;
    height: 35px;
  }
`;

const ChatPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: calc(80% * 1.25); // 4:5 ratio
  max-width: 960px;
  max-height: 648px;
  background: rgb(57, 55, 53); // WhatsApp chat background
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 20;
  padding: 10px;
  animation: popup 0.5s ease-out;
  display: flex;
  flex-direction: column;

  @keyframes popup {
    from { transform: translate(-50%, -50%) scale(0); }
    to { transform: translate(-50%, -50%) scale(1); }
  }
`;

const ChatHeader = styled.div`
  background: #075E54; // WhatsApp header green
  color: white;
  font-size: 1.2rem;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px 10px 0 0;
`;

const CloseButton = styled.button`
  background: transparent;
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background: url('https://i.pinimg.com/736x/58/c3/33/58c33377dfcbb3022493dec49d098b02.jpg') repeat; // WhatsApp background pattern
  background-size: cover;
`;

const ChatDate = styled.div`
  text-align: center;
  align-self: center;
  margin-left: 50%;
  font-size: 0.8rem;
  color: #999;
  background: #D9FDD3;
  padding: 5px 10px;
  border-radius: 5px;
  display: inline-block;
  width: fit-content;
`;

const ChatMessage = styled.div`
  display: flex;
  justify-content: ${({ isOwn }) => (isOwn ? 'flex-end' : 'flex-start')};
  margin: 5px 0;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 8px 12px;
  background: ${({ isOwn }) => (isOwn ? '#DCF8C6' : '#FFFFFF')};
  border-radius: 10px;
  position: relative;
`;

const MessageText = styled.div`
  font-size: 1rem;
  color: #000;
  word-wrap: break-word;
`;

const MessageTime = styled.div`
  font-size: 0.7rem;
  color: #666;
  margin-top: 2px;
  text-align: ${({ isOwn }) => (isOwn ? 'right' : 'left')};
`;

const ChatInputWrapper = styled.div`
  display: flex;
  padding: 10px;
  background: rgb(18, 17, 17);
  border-top: 1px solid #ddd;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 1rem;
  margin-right: 10px;
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  background: #25D366;
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #20b858;
  }
`;

const ContactPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [lastSentMessageId, setLastSentMessageId] = useState(null); // Track last sent message

  useEffect(() => {
    const messagesRef = ref(database, 'chats');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.entries(data).map(([id, msg]) => ({
          id,
          text: msg.text,
          date: new Date(msg.date),
          isOwn: id === lastSentMessageId, // Mark as own if it matches the last sent message
        }));
        setMessages(messageList);
      }
    });
  }, [lastSentMessageId]);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatInput.trim()) {
      const newMessage = { text: chatInput, date: new Date().toISOString() };
      const messageRef = push(ref(database, 'chats'), newMessage);
      setLastSentMessageId(messageRef.key); // Store the key of the newly sent message
      setChatInput('');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      name: form.name.value,
      subject: form.subject.value,
      message: form.message.value,
      from_email: form.email.value, // Sender's email
      to_email: 'sivagnair2002@gmail.com', // Recipient's email
    };

    emailjs
      .send(
        'service_q7lrj3r', // Your EmailJS Service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS Template ID
        formData,
        '6Fex8dsQZ1Y8ulnjL' // Your EmailJS Public Key
      )
      .then(
        (result) => {
          alert('Message sent successfully to sivagnair2002@gmail.com!');
          form.reset(); // Clear the form
        },
        (error) => {
          alert('Failed to send message: ' + error.text);
        }
      );
  };

  const socialMedia = [
    { name: 'X', icon: 'https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?t=st=1742730270~exp=1742733870~hmac=049b372e67cf8357720665168b815c830c238f73c712e706564f659b28e6bea8&w=740', url: '#' },
    { name: 'Facebook', icon: 'https://static.vecteezy.com/system/resources/previews/023/986/613/original/facebook-logo-facebook-logo-transparent-facebook-icon-transparent-free-free-png.png', url: '#' },
    { name: 'Instagram', icon: 'https://psfonttk.com/wp-content/uploads/2020/09/Instagram-Logo-Transparent-1024x987.png', url: '#' },
    { name: 'LinkedIn', icon: 'https://static.vecteezy.com/system/resources/thumbnails/018/930/587/small_2x/linkedin-logo-linkedin-icon-transparent-free-png.png', url: '#' },
    { name: 'Snapchat', icon: 'http://pngimg.com/uploads/snapchat/small/snapchat_PNG9.png', url: '#' },
    { name: 'TikTok', icon: 'http://pngimg.com/uploads/tiktok/small/tiktok_PNG6.png', url: '#' },
    { name: 'Threads', icon: 'https://i.pinimg.com/originals/33/7f/27/337f27be6bfddfcb5ecc9b95b1d3ac2b.png', url: '#' },
    { name: 'Reddit', icon: 'https://static.vecteezy.com/system/resources/previews/018/930/474/non_2x/reddit-logo-reddit-icon-transparent-free-png.png', url: '#' },
    { name: 'YouTube', icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg', url: '#' },
    { name: 'Pinterest', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png', url: '#' },
  ];

  const codingPlatforms = [
    { name: 'GitHub', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg', url: '#' },
    { name: 'GitLab', icon: 'https://logodix.com/logo/258469.png', url: '#' },
    { name: 'Bitbucket', icon: 'https://a.storyblok.com/f/89691/x/f0227d5045/logo-bitbucket.svg', url: '#' },
    { name: 'LeetCode', icon: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png', url: '#' },
    { name: 'HackerRank', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png', url: '#' },
    { name: 'CodePen', icon: 'https://images.icon-icons.com/3781/PNG/512/codepen_icon_232024.png', url: '#' },
  ];

  const getDateLabel = (date) => {
    const today = new Date();
    if (date.toDateString() === today.toDateString()) return 'Today';
    return date.toLocaleDateString();
  };

  return (
    <ContactContainer>
      <Title>Contact Me</Title>
      <ContentWrapper>
        <Section>
          <SectionTitle>Social Media</SectionTitle>
          <SocialGrid>
            {socialMedia.map((social) => (
              <SocialItem key={social.name} href={social.url} target="_blank">
                <img src={social.icon} alt={social.name} />
                <span>{social.name}</span>
              </SocialItem>
            ))}
          </SocialGrid>
        </Section>

        <Section>
          <SectionTitle>Coding Platforms</SectionTitle>
          <SocialGrid>
            {codingPlatforms.map((platform) => (
              <SocialItem key={platform.name} href={platform.url} target="_blank">
                <img src={platform.icon} alt={platform.name} />
                <span>{platform.name}</span>
              </SocialItem>
            ))}
          </SocialGrid>
        </Section>

        <Divider />

        <Section>
          <SectionTitle>Contact Me</SectionTitle>
          <Form onSubmit={handleFormSubmit}>
            <Input type="text" name="name" placeholder="Name" required />
            <Input type="email" name="email" placeholder="Your Email" required />
            <Input type="text" name="subject" placeholder="Subject" required />
            <TextareaWrapper>
              <Textarea name="message" placeholder="Message" required />
              <EmailSendButton type="submit">
                <img src="https://cdn-icons-png.flaticon.com/512/60/60525.png" alt="Send" style={{ width: '20px', height: '20px' }} />
              </EmailSendButton>
            </TextareaWrapper>
          </Form>
        </Section>
      </ContentWrapper>

      <ChatIcon onClick={() => setIsChatOpen(true)}>
        <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="Chat" />
      </ChatIcon>

      {isChatOpen && (
        <ChatPopup>
          <ChatHeader>
            Live Chat
            <CloseButton onClick={() => setIsChatOpen(false)}>×</CloseButton>
          </ChatHeader>
          <ChatMessages>
            {messages.length > 0 && (
              <ChatDate>{getDateLabel(messages[messages.length - 1].date)}</ChatDate>
            )}
            {messages
              .sort((a, b) => b.date - a.date)
              .map((msg) => (
                <ChatMessage key={msg.id} isOwn={msg.isOwn}>
                  <MessageBubble isOwn={msg.isOwn}>
                    <MessageText>{msg.text}</MessageText>
                    <MessageTime isOwn={msg.isOwn}>
                      {msg.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </MessageTime>
                  </MessageBubble>
                </ChatMessage>
              ))}
          </ChatMessages>
          <ChatInputWrapper>
            <ChatInput
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a message..."
            />
            <SendButton onClick={handleChatSubmit}>
              <img src="https://cdn-icons-png.flaticon.com/512/60/60525.png" alt="Send" style={{ width: '20px', height: '20px' }} />
            </SendButton>
          </ChatInputWrapper>
        </ChatPopup>
      )}
    </ContactContainer>
  );
};

export default ContactPage;