document.addEventListener("DOMContentLoaded", () => {

    /* ------------------------------
       READ MORE / SHOW LESS
    ------------------------------ */
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.left-box') || btn.closest('.review-card');
            const fullElements = card.querySelectorAll('.more-info, .review-full');

            fullElements.forEach(full => {
                if (full.classList.contains('hidden')) {
                    full.classList.remove('hidden');
                    btn.textContent = "Show Less";
                } else {
                    full.classList.add('hidden');
                    btn.textContent = "Read More";
                }
            });
        });
    });


    /* ------------------------------
       ACTOR IMAGE → SHOW QUOTES
    ------------------------------ */
    document.querySelectorAll('.actor-img.clickable').forEach(img => {
        img.addEventListener('click', () => {
            const iframe = img.parentElement.querySelector('.quote-video');
            iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
        });
    });


    /* ------------------------------
       SEE CLIP BUTTONS
    ------------------------------ */
    document.querySelectorAll(".see-clip-btn").forEach(button => {
        button.addEventListener("click", () => {
            const iframe = button.nextElementSibling;

            if (iframe.style.display === "none" || iframe.style.display === "") {
                iframe.style.display = "block";
                button.textContent = "Hide Clip";
            } else {
                iframe.style.display = "none";
                button.textContent = "See Clip";
            }
        });
    });


    /* ------------------------------
       SCROLL ANIMATION
    ------------------------------ */
    const scrollElements = document.querySelectorAll('.scroll-effect');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("appear");
            else entry.target.classList.remove("appear");
        });
    }, { threshold: 0.2 });

    scrollElements.forEach(el => observer.observe(el));


    /* ------------------------------
       MEMBER PROFILES MODAL
    ------------------------------ */
    

    /* ------------------------------
       VIDEO MODAL
    ------------------------------ */
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const videoSrc = btn.dataset.video;
            const modal = document.getElementById('video-modal');
            const iframe = document.getElementById('video-frame');

            iframe.src = videoSrc + "?autoplay=1";
            modal.style.display = 'flex';
        });
    });

    // Close video modal
    const closeVideoBtn = document.querySelector('.close-btn');
    if (closeVideoBtn) {
        closeVideoBtn.addEventListener('click', () => {
            const modal = document.getElementById('video-modal');
            const iframe = document.getElementById('video-frame');
            iframe.src = "";
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', e => {
        const modal = document.getElementById('video-modal');
        if (e.target === modal) {
            const iframe = document.getElementById('video-frame');
            iframe.src = "";
            modal.style.display = 'none';
        }
    });


    /* ------------------------------
       REACTIONS & SHARES
    ------------------------------ */
    document.querySelectorAll(".review-card").forEach(card => {
        const reactBtn = card.querySelector(".react-btn");
        const reactCount = card.querySelector(".react-count");
        const shareBtn = card.querySelector(".share-btn");
        const shareCount = card.querySelector(".share-count");

        if (!reactBtn || !reactCount || !shareBtn || !shareCount) return;

        const cardId = card.querySelector(".review-header h3").textContent.trim();

        // Default random counts
        if (!localStorage.getItem(cardId + "-reactCount")) {
            const defaultReact = Math.floor(Math.random() * 51) + 150;
            reactCount.textContent = defaultReact;
            localStorage.setItem(cardId + "-reactCount", defaultReact);
        }
        if (!localStorage.getItem(cardId + "-shareCount")) {
            const defaultShare = Math.floor(Math.random() * 46) + 100;
            shareCount.textContent = defaultShare;
            localStorage.setItem(cardId + "-shareCount", defaultShare);
        }

        // Restore reaction state
        const reactedStored = localStorage.getItem(cardId + "-reacted") === "true";
        if (reactedStored) reactBtn.classList.add("active");

        reactCount.textContent = localStorage.getItem(cardId + "-reactCount");
        shareCount.textContent = localStorage.getItem(cardId + "-shareCount");

        // Reaction button
        reactBtn.addEventListener("click", e => {
            e.stopPropagation();
            const isActive = reactBtn.classList.toggle("active");
            let count = parseInt(reactCount.textContent, 10) || 0;
            count += isActive ? 1 : -1;
            if (count < 0) count = 0;
            reactCount.textContent = count;

            localStorage.setItem(cardId + "-reacted", isActive);
            localStorage.setItem(cardId + "-reactCount", count);
        });

        // Share button
        shareBtn.addEventListener("click", e => {
            e.stopPropagation();
            let count = parseInt(shareCount.textContent, 10) || 0;
            count += 1;
            shareCount.textContent = count;

            shareBtn.classList.add("share-pop");
            setTimeout(() => shareBtn.classList.remove("share-pop"), 300);

            localStorage.setItem(cardId + "-shareCount", count);
        });
    });

});
