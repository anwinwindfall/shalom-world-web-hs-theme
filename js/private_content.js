function redirectIfNotLoggedIn() {
    console.log(document.referrer, "referrer");
    
    if (!localStorage.getItem("sw_election_campaign_signed_in")) {
        
        window.location.href = "https://prayer.shalomworld.org/prayer-campaign#loginForm";
        
    }
}
redirectIfNotLoggedIn()