// js/profile.js

// This file handles the user profile functionality, including displaying user information,
// allowing users to edit their profile details, and managing user authentication state.

// Assuming we have a global object 'app' to manage application state and utilities.
// If not, consider using a module bundler like Webpack or Parcel for better organization.

document.addEventListener('DOMContentLoaded', () => {
  const profileContainer = document.getElementById('profile-container'); // Get the profile container element

  if (!profileContainer) {
    console.error("Profile container element not found.");
    return;
  }

  // Function to fetch user profile data from an API (replace with your actual API endpoint)
  async function fetchUserProfile() {
    try {
      // Simulate fetching data from an API
      const userData = {
        name: "John Doe",
        email: "john.doe@example.com",
        address: "123 Main St, Anytown",
        phone: "555-123-4567",
        profilePicture: "images/default-profile.jpg" // Replace with actual image path
      };

      // Simulate a delay to mimic network request
      await new Promise(resolve => setTimeout(resolve, 500));

      return userData;

    } catch (error) {
      console.error("Error fetching user profile:", error);
      // Display an error message to the user
      profileContainer.innerHTML = `<p class="text-red-500">Error loading profile. Please try again later.</p>`;
      return null;
    }
  }

  // Function to display the user profile data in the container
  async function displayUserProfile() {
    const userData = await fetchUserProfile();

    if (!userData) {
      return; // Exit if fetching failed
    }

    // Create HTML elements to display the user profile data
    const profileHTML = `
      <div class="bg-white shadow rounded-lg p-4">
        <div class="flex items-center space-x-4">
          <img class="h-12 w-12 rounded-full object-cover" src="${userData.profilePicture}" alt="Profile Picture">
          <div>
            <h2 class="text-xl font-semibold">${userData.name}</h2>
            <p class="text-gray-500">${userData.email}</p>
          </div>
        </div>
        <div class="mt-4">
          <p class="text-gray-700">Address: ${userData.address}</p>
          <p class="text-gray-700">Phone: ${userData.phone}</p>
        </div>
        <div class="mt-4">
          <button id="edit-profile-button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit Profile</button>
        </div>
      </div>
    `;

    profileContainer.innerHTML = profileHTML;

    // Add event listener to the edit profile button
    const editProfileButton = document.getElementById('edit-profile-button');
    if (editProfileButton) {
      editProfileButton.addEventListener('click', () => {
        // Redirect to the edit profile page (replace with your actual URL)
        window.location.href = 'edit-profile.html';
      });
    } else {
      console.warn("Edit profile button not found.");
    }
  }

  // Call the function to display the user profile
  displayUserProfile();

  // Example of handling user logout (replace with your actual logout logic)
  const logoutButton = document.getElementById('logout-button'); // Assuming a logout button exists in the HTML
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      // Clear user session (e.g., remove token from local storage)
      localStorage.removeItem('authToken');

      // Redirect to the login page (replace with your actual URL)
      window.location.href = 'login.html';
    });
  } else {
    console.warn("Logout button not found.  Ensure it exists in the HTML.");
  }
});