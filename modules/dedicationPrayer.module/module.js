document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
  
    form.addEventListener("submit", handleSubmit);
  
    // Add event listener for success popup close button
    document.getElementById("closeSuccess").addEventListener("click", handleCloseSuccess);
    document.getElementById("closeErrorOk").addEventListener("click", handleErrorOk);
  });
  
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submit started");
  
    // Show the loader
    showLoader();
  
    const formData = {
      firstName: document.querySelector('input[name="firstName"]').value.trim(),
      lastName: document.querySelector('input[name="lastName"]').value.trim(),
      email: document.querySelector('input[name="email"]').value.trim(),
    };
    
    // console.log("formData", formData);
  
    try {
      const checkEmailResponse = await checkEmail(formData);
      // console.log("checkEmailResponse", checkEmailResponse);
  
      if (checkEmailResponse.status === 200) {
        const emailCheckerData = await checkEmailResponse.json();
          const userInteractionResponse = await createUserInteraction(formData);
          const userInteractionData = await userInteractionResponse.json();
          await createAssociation(emailCheckerData?.id.trim(), userInteractionData?.id);

          // Hide the loader
          hideLoader();
            console.log("200+5");
            
          // Show success popup
          showSuccessPopup("Your submission was successful.");
          
          

        // if (emailCheckerData?.properties?.firstname === formData.firstName && emailCheckerData?.properties?.lastname === formData.lastName) {
        //   const updateContact = await updateNewContact(formData, emailCheckerData?.id.trim());
        //   // console.log("updateContact", updateContact);
  
        //   if (updateContact.ok) {
        //     const userInteractionResponse = await createUserInteraction(formData);
        //     const userInteractionData = await userInteractionResponse.json();
        //     await createAssociation(emailCheckerData?.id.trim(), userInteractionData?.id);
  
        //     // Hide the loader
        //     hideLoader();
  
        //     // Show success popup
        //     showSuccessPopup("Your submission was successful.");
        //   } else {
        //     // Hide the loader
        //     hideLoader();
        //     showErrorPopup("Failed to update contact. Please try again.");
        //   }
        // } else {
        //   hideLoader();
        //   showErrorPopup("Another name exists with the same email ID. Please try again with a different email.");
        // }
      } else if (checkEmailResponse.status === 404) {
        const createNewContactResponse = await createNewContact(formData);
        if (createNewContactResponse.ok) {
          const createNewContactData = await createNewContactResponse.json();
          const userInteractionResponse = await createUserInteraction(formData);
          const userInteractionData = await userInteractionResponse.json();
          await createAssociation(createNewContactData?.id, userInteractionData?.id);
          hideLoader();
          showSuccessPopup("Form submission was successful!");
        } else {
          hideLoader();
          showErrorPopup("Failed to create new contact. Please try again.");
        }
      } else {
        hideLoader();
        showErrorPopup("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      hideLoader();
      showErrorPopup("An error occurred. Please try again.");
    }
  }
  
  // Functions to show/hide loader and popups
  function showLoader() {
    // console.log(" show loader started");
    document.getElementById("loader").style.display = "flex";
  
    const message1 = document.getElementById('message1');
    const message2 = document.getElementById('message2');
  
    // Reset messages
    message1.classList.remove('show');
    message2.classList.remove('show');
  
    // Fade in the first message
    setTimeout(() => {
      message1.classList.add('show');
    }, 500); // Delay to ensure loader is displayed first
  
    // Fade in the second message after 2 seconds
    setTimeout(() => {
      message2.classList.add('show');
    }, 2500); // 2 seconds after the first message
  }
  
  function hideLoader() {
    document.getElementById("loader").style.display = "none";
  }
  
  function showErrorPopup(message) {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("errorMessage").innerText = message;
    document.getElementById("errorPopup").style.display = "block";
    
  }
  
  function handleErrorOk() {
    document.getElementById("errorPopup").style.display = "none";
    window.location.reload();
  }
  
  function showSuccessPopup(message) {
    localStorage.setItem("sw_election_campaign_signed_in", "true");
    window.location.href="https://prayer.shalomworld.org/presidential-election/prayer-campaign"
    document.getElementById("successMessage").innerHTML = `<strong>Success!</strong><br/>${message}`;
    document.getElementById("successPopup").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
  }
  
  function handleCloseSuccess() {
    document.getElementById("successPopup").style.display = "none";
    
    window.location.reload();  // Reloads the page after closing
  }
  
  // API functions (same as before)
  async function checkEmail(formData) {
    const apiUrl = `https://prayer.shalomworld.org/_hcms/api/sw/search-contact?email=${formData.email}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: "073ba37c9056cb4ade5aeada8f624e5ecd0170e95f8047db4a349d59cd1b07b3",
        "Content-Type": "application/json",
      },
    });
    return response;
  }
  
  async function createNewContact(formData) {
    const apiUrl = `https://prayer.shalomworld.org/_hcms/api/sw/create-contact`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: "073ba37c9056cb4ade5aeada8f624e5ecd0170e95f8047db4a349d59cd1b07b3",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
        },
      }),
    });
    return response;
  }
  
  async function updateNewContact(formData, contactId) {
    const apiUrl = `https://prayer.shalomworld.org/_hcms/api/sw/update-contact?contactId=${contactId}`;
    const response = await fetch(apiUrl, {
      method: "PATCH",
      headers: {
        Authorization: "073ba37c9056cb4ade5aeada8f624e5ecd0170e95f8047db4a349d59cd1b07b3",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
        },
      }),
    });
    return response;
  }
  
  async function createUserInteraction(formData) {
    const apiUrl = `https://prayer.shalomworld.org/_hcms/api/sw/create-user-interaction`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: "073ba37c9056cb4ade5aeada8f624e5ecd0170e95f8047db4a349d59cd1b07b3",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          interaction_type: "contact_us",
          user_interaction_name: `US Election Prayer Campaign - ${formData.firstName} ${formData.lastName}`,
          email: formData.email,
        },
      }),
    });
    return response;
  }
  
  async function createAssociation(contactId, userInteractionId) {
    const apiUrl = `https://prayer.shalomworld.org/_hcms/api/sw/associate-contact-interaction?contactId=${contactId}&userInteractionId=${userInteractionId}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: "073ba37c9056cb4ade5aeada8f624e5ecd0170e95f8047db4a349d59cd1b07b3",
        "Content-Type": "application/json",
      },
    });
    return response;
  }
  