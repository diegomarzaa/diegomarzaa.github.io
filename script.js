document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Animated skill bars
  const skillBars = document.querySelectorAll('.skill-bar');
  const animateSkillBars = () => {
      skillBars.forEach(bar => {
          const percentage = bar.getAttribute('data-percentage');
          bar.style.width = percentage;
      });
  };

  // Intersection Observer for skill bars animation
  const skillsSection = document.querySelector('#skills');
  const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              animateSkillBars();
              skillsObserver.unobserve(entry.target);
          }
      });
  }, { threshold: 0.5 });

  skillsObserver.observe(skillsSection);

  // Typing effect for hero section
  const heroText = document.querySelector('.hero-text h2');
  const text = heroText.textContent;
  heroText.textContent = '';
  let i = 0;

  function typeWriter() {
      if (i < text.length) {
          heroText.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
      }
  }

  typeWriter();

  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      hero.style.backgroundPositionY = scrollPosition * 0.7 + 'px';
  });

  // Project filter
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          const filter = button.getAttribute('data-filter');
          
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');

          projectCards.forEach(card => {
              if (filter === 'all' || card.classList.contains(filter)) {
                  card.style.display = 'block';
              } else {
                  card.style.display = 'none';
              }
          });
      });
  });

  // Form submission
  const form = document.querySelector('.contact-form');
  form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Add your form submission logic here (e.g., AJAX request to your server)
      alert('Thank you for your message! I will get back to you soon.');
      form.reset();
  });

  // Scroll-triggered animations
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  const elementInView = (el, dividend = 1) => {
      const elementTop = el.getBoundingClientRect().top;
      return (
          elementTop <=
          (window.innerHeight || document.documentElement.clientHeight) / dividend
      );
  };

  const displayScrollElement = (element) => {
      element.classList.add('scrolled');
  };

  const handleScrollAnimation = () => {
      animatedElements.forEach((el) => {
          if (elementInView(el, 1.25)) {
              displayScrollElement(el);
          }
      });
  };

  window.addEventListener('scroll', () => {
      handleScrollAnimation();
  });
});