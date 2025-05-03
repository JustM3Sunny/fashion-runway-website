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

      const userData = await response.json();
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

      let { name, email, address, phone, profilePicture } = userData;

      // Sanitize data to prevent XSS vulnerabilities
      name = DOMPurify.sanitize(name);
      email = DOMPurify.sanitize(email);
      address = DOMPurify.sanitize(address);
      phone = DOMPurify.sanitize(phone);

      let profilePictureURL = profilePicture || defaultProfilePicture;

      // Validate profile picture URL
      if (profilePicture) { // Only validate if a profile picture is provided
        try {
          new URL(profilePictureURL);
        } catch (error) {
          console.warn("Invalid profile picture URL. Using default.");
          profilePictureURL = defaultProfilePicture;
        }
      }

      profilePictureURL = DOMPurify.sanitize(profilePictureURL);


      const profileHTML = `
        <div class="bg-white shadow rounded-lg p-4">
          <div class="flex items-center space-x-4">
            <img class="h-12 w-12 rounded-full object-cover" src="${profilePictureURL}" alt="Profile Picture" onerror="this.onerror=null;this.src='${defaultProfilePicture}';">
            <div>
              <h2 class="text-xl font-semibold">${name}</h2>
              <p class="text-gray-500">${email}</p>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-gray-700">Address: ${address}</p>
            <p class="text-gray-700">Phone: ${phone}</p>
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