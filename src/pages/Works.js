import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Works.css';

// Import images from src/assets
import hero1 from '../assets/hero1.jpg';

const Works = () => {
  // Sample data for the hero carousel with imported images
  const heroData = [
    {
      id: 1,
      title: 'YOUR TITLE HERE',
      year: '2022',
      seasons: '5 Seasons',
      description: ' with custom text and images, it’s easy!',
      poster: hero1,
    },
    {
      id: 2,
      title: 'ANOTHER TITLE',
      year: '2023',
      seasons: '3 Seasons',
      description: 'Explore a new adventure with this exciting project!',
      poster: hero1,
    },
    {
      id: 3,
      title: 'NEXT FEATURE',
      year: '2024',
      seasons: '1 Season',
      description: 'Discover the latest work in this stunning series!',
      poster: hero1,
    },
  ];

  // Sample data for the main carousel
  const works = [
    { id: 1, title: 'Project 1', poster: 'https://img.freepik.com/premium-photo/ai-background_611522-1.jpg?w=2000' },
    { id: 2, title: 'Project 2', poster: 'https://thumbs.dreamstime.com/b/artificial-intelligence-concept-logo-ai-abstract-futuristic-electronic-circuit-technology-backgroundt-logo-ai-artificial-305771595.jpg' },
    { id: 3, title: 'Project 3', poster: 'https://th.bing.com/th/id/OIP.yX7QmK8cvWjbeNCYDPh2ogAAAA?rs=1&pid=ImgDetMain' },
    { id: 4, title: 'Project 4', poster: 'https://th.bing.com/th/id/OIP.57VFdT00GfKbhIU3uH49hgHaDP?rs=1&pid=ImgDetMain' },
    { id: 5, title: 'Project 5', poster: 'https://e4njohordzs.exactdn.com/wp-content/uploads/2021/06/MindMed.jpg?strip=all&lossy=1&ssl=1' },
    { id: 6, title: 'Project 6', poster: 'https://th.bing.com/th/id/OIP.0CJ-2B-Abjy6iDzhoYiotQHaGB?rs=1&pid=ImgDetMain' },
    { id: 7, title: 'Project 7', poster: 'https://c8.alamy.com/comp/2J2WG5G/concept-of-globalization-with-connected-icons-2J2WG5G.jpg' },
  ];

  // Slick slider settings for hero carousel
  const heroSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  // Slick slider settings for main carousel
  const mainSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="works-page">
      {/* Hero Carousel Section */}
      <div className="hero-carousel">
        <Slider {...heroSettings}>
          {heroData.map((hero) => (
            <div key={hero.id} className="hero-section">
              <img
                src={hero.poster}
                alt={hero.title}
                className="hero-image"
                onError={() => console.error(`Failed to load image for ${hero.title}`)}
              />
              <div className="hero-overlay">
                <div className="hero-content">
                  <h1 className="hero-title">{hero.title}</h1>
                  <div className="hero-meta">
                    <span>{hero.year}</span>
                    <span>{hero.seasons}</span>
                  </div>
                  <p className="hero-description">{hero.description}</p>
                  <div className="hero-buttons">
                    <button className="play-btn">View</button>
                    <button className="my-list-btn">Code</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Main Carousel Section */}
      <div className="carousel-section">
        <h2>Featured Projects</h2>
        <Slider {...mainSettings}>
          {works.map((work) => (
            <div key={work.id} className="work-card">
              <img src={work.poster} alt={work.title} className="work-poster" />
              <p className="work-title">{work.title}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Works;