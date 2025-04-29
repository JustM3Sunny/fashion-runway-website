// js/profile.js

// This file handles the user profile functionality, including displaying user information,
// allowing users to edit their profile details, and managing user authentication state.

// Consider using a module bundler like Webpack or Parcel for better organization in larger projects.

document.addEventListener('DOMContentLoaded', () => {
  const profileContainer = document.getElementById('profile-container');
  const logoutButton = document.getElementById('logout-button');

  if (!profileContainer) {
    console.error("Profile container element not found.");
    return;
  }

  const defaultProfilePicture = "images/default-profile.jpg";

  // Function to fetch user profile data from an API (replace with your actual API endpoint)
  async function fetchUserProfile() {
    try {
      // Simulate fetching data from an API
      // In a real application, replace this with an actual API call using 'fetch' or 'axios'.
      const response = await new Promise(resolve => setTimeout(() => {
        resolve({
          ok: true, // Simulate a successful response
          json: () => Promise.resolve({
            name: "John Doe",
            email: "john.doe@example.com",
            address: "123 Main St, Anytown",
            phone: "555-123-4567",
            profilePicture: "images/john-doe.jpg" // Replace with actual image path
          })
        });
      }, 500));

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await await response.json();
      return userData;

    } catch (error) {
      console.error("Error fetching user profile:", error);
      profileContainer.innerHTML = `<p class="text-red-500">Error loading profile. Please try again later.</p>`;
      return null;
    }
  }

  // Function to display the user profile data in the container
  async function displayUserProfile() {
    try {
      const userData = await fetchUserProfile();

      if (!userData) {
        return;
      }

      const { name, email, address, phone, profilePicture } = userData;

      // Sanitize data to prevent XSS vulnerabilities
      const sanitizedName = DOMPurify.sanitize(name);
      const sanitizedEmail = DOMPurify.sanitize(email);
      const sanitizedAddress = DOMPurify.sanitize(address);
      const sanitizedPhone = DOMPurify.sanitize(phone);
      let sanitizedProfilePicture = DOMPurify.sanitize(profilePicture || defaultProfilePicture); // Use default if undefined

      // Validate profile picture URL
      try {
          new URL(sanitizedProfilePicture);
      } catch (error) {
          console.warn("Invalid profile picture URL. Using default.");
          sanitizedProfilePicture = defaultProfilePicture;
      }


      const profileHTML = `
        <div class="bg-white shadow rounded-lg p-4">
          <div class="flex items-center space-x-4">
            <img class="h-12 w-12 rounded-full object-cover" src="${sanitizedProfilePicture}" alt="Profile Picture">
            <div>
              <h2 class="text-xl font-semibold">${sanitizedName}</h2>
              <p class="text-gray-500">${sanitizedEmail}</p>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-gray-700">Address: ${sanitizedAddress}</p>
            <p class="text-gray-700">Phone: ${sanitizedPhone}</p>
          </div>
          <div class="mt-4">
            <a href="edit-profile.html" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit Profile</a>
          </div>
        </div>
      `;

      profileContainer.innerHTML = profileHTML;

    } catch (error) {
      console.error("Error in displayUserProfile:", error);
      profileContainer.innerHTML = `<p class="text-red-500">Error loading profile. Please try again later.</p>`;
    }
  }

  // Call the function to display the user profile
  displayUserProfile();

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('authToken');
      window.location.href = 'login.html';
    });
  } else {
    console.warn("Logout button not found.  Ensure it exists in the HTML.");
  }
});