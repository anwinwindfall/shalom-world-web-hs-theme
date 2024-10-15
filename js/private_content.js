function redirectIfNotLoggedIn() {
    if (!localStorage.getItem("sw_election_campaign_signed_in")) {
        window.location.href = "https://prayer.shalomworld.org/prayer-campaign";
    }
    else {
        window.location.href = document.referrer;
    }
}
redirectIfNotLoggedIn()