const jobsData = [
    {
        id: 1,
        title: "Senior React Engineer",
        company: "Tech Solutions Inc.",
        location: "Remote",
        salary: "₹25-40 LPA",
        description: "Design and implement scalable frontend architecture using React, Redux, and TypeScript. Must have 5+ years of experience.",
        contact: "hr@techsolutions.com",
        logoColor: "0A66C2" // Blue
    },
    {
        id: 2,
        title: "Digital Marketing Lead",
        company: "Growth Metrics Ltd.",
        location: "Bangalore",
        salary: "₹12-18 LPA",
        description: "Lead all digital marketing efforts, including SEO, SEM, and social media campaigns. Requires 3 years in a leadership role.",
        contact: "jobs@growthmetrics.com",
        logoColor: "F5A623" // Orange
    },
    {
        id: 3,
        title: "Data Scientist (AI/ML)",
        company: "Future Innovations",
        location: "Hyderabad",
        salary: "₹18-30 LPA",
        description: "Develop and deploy machine learning models to solve business problems. Python and TensorFlow expertise is a must.",
        contact: "ai@futureinnovations.com",
        logoColor: "1db954" // Green
    },
    {
        id: 4,
        title: "Customer Support Specialist",
        company: "ClientBridge",
        location: "Work From Home",
        salary: "₹4-6 LPA",
        description: "Provide excellent customer service via chat and email. Looking for enthusiastic and empathetic communicators.",
        contact: "support@clientbridge.com",
        logoColor: "7B68EE" // Purple
    }
];


/**
 * Renders the job cards based on the provided array of jobs.
 * @param {Array} jobs - Array of job objects to display.
 */
function displayJobs(jobs) {
    const container = document.getElementById('jobs-container');
    const message = document.getElementById('no-jobs-message');
    container.innerHTML = '';

    if (jobs.length === 0) {
        message.style.display = 'block';
        return;
    }
    message.style.display = 'none';

    jobs.forEach(job => {
        const firstLetter = job.company.charAt(0).toUpperCase();

        const cardHTML = `
            <div class="card job-card" onclick="viewJobDetails(${job.id})">
                <div class="company-logo-container">
                    <img src="https://via.placeholder.com/50x50/${job.logoColor}/FFFFFF?text=${firstLetter}" alt="${job.company} Logo">
                </div>
                <h2>${job.title}</h2>
                <p class="company-name">${job.company}</p>
                <p class="job-meta">${job.location} | ${job.salary}</p>
                <button class="apply-btn">View Details</button>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}


function searchJobs() {
    const titleSearch = document.getElementById('job-title-search').value.toLowerCase().trim();
    const locationSearch = document.getElementById('job-location-search').value.toLowerCase().trim();

    const filteredJobs = jobsData.filter(job =>
        (job.title.toLowerCase().includes(titleSearch) || job.company.toLowerCase().includes(titleSearch)) &&
        job.location.toLowerCase().includes(locationSearch)
    );

    displayJobs(filteredJobs);
}

/**
 * Shows job details in a modal.
 * @param {number} id 
 */
function viewJobDetails(id) {
    const job = jobsData.find(j => j.id === id);
    if (!job) return;

    document.getElementById('modal-title').textContent = job.title;
    document.getElementById('modal-company').textContent = `Company: ${job.company}`;
    document.getElementById('modal-meta').textContent = `Location: ${job.location} | Salary: ${job.salary}`;
    document.getElementById('modal-description').textContent = job.description;
    document.getElementById('modal-contact').textContent = job.contact;

    document.getElementById('modal-apply-btn').onclick = () => {
        window.location.href = `mailto:${job.contact}?subject=Application for ${job.title} Position&body=Dear Hiring Team,\n\nI am writing to express my strong interest...`;
    };

    document.getElementById('jobDetailsModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('jobDetailsModal').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    displayJobs(jobsData);

    
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    document.getElementById("postJobBtn").addEventListener("click", () => {
        alert("Redirecting to the Employer Job Posting Form (Mock action).");
    });

    document.getElementById('job-title-search').addEventListener('input', searchJobs);
    document.getElementById('job-location-search').addEventListener('input', searchJobs);
});


// Expose closeModal globally for HTML onclick
window.closeModal = closeModal;
window.searchJobs = searchJobs;
window.viewJobDetails = viewJobDetails;
window.filterJobs = searchJobs; // Using the search function for basic filtering

// === SIGNUP MODALS ===
document.querySelector(".signupbtn").addEventListener("click", () => {
    document.getElementById("employerSignupModal").classList.remove("hidden");
});

document.querySelector(".loginbtn").addEventListener("click", () => {
    document.getElementById("candidateSignupModal").classList.remove("hidden");
});

function closeSignup(id) {
    document.getElementById(id).classList.add("hidden");
}

// Close when clicking outside modal
window.addEventListener("click", (e) => {
    const employerModal = document.getElementById("employerSignupModal");
    const candidateModal = document.getElementById("candidateSignupModal");
    if (e.target === employerModal) closeSignup("employerSignupModal");
    if (e.target === candidateModal) closeSignup("candidateSignupModal");
});
