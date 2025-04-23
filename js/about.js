// js/about.js

// This file handles the dynamic functionality for the About page.
// It focuses on UI/UX enhancements and data fetching/manipulation.

document.addEventListener('DOMContentLoaded', () => {
  console.log("About page script loaded.");

  const API_ENDPOINT = '/api/about'; // Example API endpoint

  // Function to fetch about page content (replace with actual API call)
  async function fetchAboutContent() {
    try {
      // Simulate fetching data from a server (replace with actual API endpoint)
      // const response = await fetch(API_ENDPOINT);
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      // const aboutData = await response.json();
      // return aboutData;

      // Mock data for demonstration purposes
      return new Promise(resolve => {
        setTimeout(() => {
          const aboutData = {
            title: "About Our Company",
            description: "We are a company dedicated to providing high-quality products and services.  Our mission is to exceed customer expectations and build lasting relationships.",
            teamMembers: [
              { name: "John Doe", role: "CEO", bio: "Experienced leader with a passion for innovation." },
              { name: "Jane Smith", role: "CTO", bio: "Technical expert driving our technology strategy." },
              { name: "Peter Jones", role: "Marketing Manager", bio: "Creative marketer focused on customer engagement." }
            ]
          };
          resolve(aboutData);
        }, 500); // Simulate network latency
      });

    } catch (error) {
      console.error("Failed to fetch about content:", error);
      // Handle the error gracefully, e.g., display an error message to the user
      return {
        title: "Error Loading Content",
        description: "Failed to load about information. Please try again later.",
        teamMembers: []
      }; // Return default data to prevent the app from breaking
    }
  }

  // Function to render the about page content
  async function renderAboutContent() {
    const aboutData = await fetchAboutContent();

    // Update the title
    updateTextContent('about-title', aboutData.title);

    // Update the description
    updateTextContent('about-description', aboutData.description);

    // Render team members (example, adjust based on your HTML structure)
    const teamContainer = document.getElementById('team-container');
    if (teamContainer) {
      teamContainer.innerHTML = ''; // Clear existing content
      aboutData.teamMembers.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('team-member', 'p-4', 'border', 'rounded', 'shadow-md'); // Tailwind classes

        const nameElement = document.createElement('h3');
        nameElement.classList.add('text-lg', 'font-semibold'); // Tailwind classes
        nameElement.textContent = member.name;

        const roleElement = document.createElement('p');
        roleElement.classList.add('text-gray-600'); // Tailwind classes
        roleElement.textContent = member.role;

        const bioElement = document.createElement('p');
        bioElement.classList.add('text-sm'); // Tailwind classes
        bioElement.textContent = member.bio;

        memberDiv.appendChild(nameElement);
        memberDiv.appendChild(roleElement);
        memberDiv.appendChild(bioElement);

        teamContainer.appendChild(memberDiv);
      });
    }
  }

  // Helper function to update text content of an element
  function updateTextContent(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = text;
    }
  }

  // Call the render function to populate the page
  renderAboutContent();

  // Example of a simple UI interaction (replace with actual functionality)
  const learnMoreButton = document.getElementById('learn-more-button');
  if (learnMoreButton) {
    learnMoreButton.addEventListener('click', () => {
      alert("Learn more functionality triggered!"); // Replace with actual action
    });
  }


  // Example of adding a class to the body for page-specific styling
  document.body.classList.add('about-page');


  // Smooth scrolling to sections (example)
  const aboutSection = document.getElementById('about-section');
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  }

});