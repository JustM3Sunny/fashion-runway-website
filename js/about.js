// js/about.js

// This file handles the dynamic functionality for the About page.
// It focuses on UI/UX enhancements and data fetching/manipulation.

document.addEventListener('DOMContentLoaded', () => {
  console.log("About page script loaded.");

  const API_ENDPOINT = '/api/about'; // Example API endpoint
  const ERROR_CONTAINER_ID = 'error-container';
  const TEAM_CONTAINER_ID = 'team-container';
  const LEARN_MORE_BUTTON_ID = 'learn-more-button';
  const ABOUT_SECTION_ID = 'about-section';
  const ABOUT_TITLE_ID = 'about-title';
  const ABOUT_DESCRIPTION_ID = 'about-description';

  // Function to fetch about page content (replace with actual API call)
  async function fetchAboutContent() {
    try {
      const response = await fetch(API_ENDPOINT);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();

    } catch (error) {
      console.error("Failed to fetch about content:", error);
      const errorMessage = "Failed to load about information. Please try again later.";
      displayErrorMessage(errorMessage);
      return {
        title: "Error Loading Content",
        description: errorMessage,
        teamMembers: []
      };
    }
  }

  // Function to render the about page content
  async function renderAboutContent() {
    try {
      const aboutData = await fetchAboutContent();

      updateTextContent(ABOUT_TITLE_ID, aboutData.title);
      updateTextContent(ABOUT_DESCRIPTION_ID, aboutData.description);

      renderTeamMembers(aboutData.teamMembers);

    } catch (error) {
      console.error("Error rendering about content:", error);
      displayErrorMessage("An unexpected error occurred while rendering the page.");
    }
  }

  function renderTeamMembers(teamMembers) {
    const teamContainer = document.getElementById(TEAM_CONTAINER_ID);
    if (!teamContainer) {
      console.warn(`Team container element with id "${TEAM_CONTAINER_ID}" not found.`);
      return;
    }

    teamContainer.innerHTML = ''; // Clear existing content

    if (!Array.isArray(teamMembers)) {
      console.error("teamMembers is not an array:", teamMembers);
      displayErrorMessage("Failed to load team members. Please try again later.");
      return;
    }

    const fragment = document.createDocumentFragment(); // Use a fragment for better performance

    teamMembers.forEach(member => {
      const memberDiv = createTeamMemberElement(member);
      fragment.appendChild(memberDiv);
    });

    teamContainer.appendChild(fragment); // Append the entire fragment at once
  }

  function createTeamMemberElement(member) {
    const memberDiv = document.createElement('div');
    memberDiv.classList.add('team-member', 'p-4', 'border', 'rounded', 'shadow-md'); // Tailwind classes

    const nameElement = document.createElement('h3');
    nameElement.classList.add('text-lg', 'font-semibold'); // Tailwind classes
    nameElement.textContent = member.name || 'Name not available';

    const roleElement = document.createElement('p');
    roleElement.classList.add('text-gray-600'); // Tailwind classes
    roleElement.textContent = member.role || 'Role not available';

    const bioElement = document.createElement('p');
    bioElement.classList.add('text-sm'); // Tailwind classes
    bioElement.textContent = member.bio || 'Bio not available';

    memberDiv.appendChild(nameElement);
    memberDiv.appendChild(roleElement);
    memberDiv.appendChild(bioElement);

    return memberDiv;
  }


  // Helper function to update text content of an element
  function updateTextContent(elementId, text) {
    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`Element with id "${elementId}" not found.`);
      return;
    }
    element.textContent = text || ''; // Handle null/undefined text
  }

  // Helper function to display error messages
  function displayErrorMessage(message) {
    const errorContainer = document.getElementById(ERROR_CONTAINER_ID);
    if (errorContainer) {
      errorContainer.textContent = message;
      errorContainer.style.display = 'block';
    } else {
      console.error(`Error: ${ERROR_CONTAINER_ID} element not found. Cannot display error message:`, message);
      alert(message); // Fallback if error container is missing
    }
  }

  // Call the render function to populate the page
  renderAboutContent();

  // Example of a simple UI interaction (replace with actual functionality)
  const learnMoreButton = document.getElementById(LEARN_MORE_BUTTON_ID);
  if (learnMoreButton) {
    learnMoreButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default link behavior
      window.location.href = "/learn-more";
    });
  }


  // Example of adding a class to the body for page-specific styling
  document.body.classList.add('about-page');


  // Smooth scrolling to sections (example)
  const aboutSection = document.getElementById(ABOUT_SECTION_ID);
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  }

});