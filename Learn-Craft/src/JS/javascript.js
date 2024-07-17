document.addEventListener('DOMContentLoaded', function() {
    // Function to load content into an element
    function loadContent(url, selector) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                console.log('Content loaded for', selector);
                document.querySelector(selector).innerHTML = data;
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation for', url, ':', error);
            });
    }

    // Load header and footer content
    Promise.all([
        loadContent('header.ejs', '.header'),
        loadContent('footer.ejs', '.footer'),
        loadContent('sidebar.ejs', 'side-bar')
    ]).then(() => {
        let body = document.body;

        let profile = document.querySelector('.header .flex .profile');
        let searchForm = document.querySelector('.header .flex .search-form');
        let sideBar = document.querySelector('.side-bar');
        let toggleBtn = document.getElementById('toggle-btn');

        // Ensure profile exists before adding event listener
        let userBtn = document.querySelector('#user-btn');
        if (userBtn && profile) {
            userBtn.onclick = () => {
                profile.classList.toggle('active');
                if (searchForm) searchForm.classList.remove('active');
            }
        }

        // Ensure searchForm exists before adding event listener
        let searchBtn = document.querySelector('#search-btn');
        if (searchBtn && searchForm) {
            searchBtn.onclick = () => {
                searchForm.classList.toggle('active');
                if (profile) profile.classList.remove('active');
            }
        }

        // Ensure sideBar exists before adding event listener
        let menuBtn = document.querySelector('#menu-btn');
        if (menuBtn && sideBar) {
            menuBtn.onclick = () => {
                sideBar.classList.toggle('active');
                body.classList.toggle('active');
            }

            let closeSideBarBtn = document.querySelector('.side-bar .close-side-bar');
            if (closeSideBarBtn) {
                closeSideBarBtn.onclick = () => {
                    sideBar.classList.remove('active');
                    body.classList.remove('active');
                }
            }
        }

        window.onscroll = () => {
            if (profile) profile.classList.remove('active');
            if (searchForm) searchForm.classList.remove('active');

            if (window.innerWidth < 1200 && sideBar) {
                sideBar.classList.remove('active');
                body.classList.remove('active');
            }
        }

        let darkMode = localStorage.getItem('dark-mode');

        const enableDarkMode = () => {
            if (toggleBtn) {
                toggleBtn.classList.replace('fa-sun', 'fa-moon');
            }
            body.classList.add('dark');
            localStorage.setItem('dark-mode', 'enabled');
        }

        const disableDarkMode = () => {
            if (toggleBtn) {
                toggleBtn.classList.replace('fa-moon', 'fa-sun');
            }
            body.classList.remove('dark');
            localStorage.setItem('dark-mode', 'disabled');
        }

        if (darkMode === 'enabled') {
            enableDarkMode();
        }

        // Ensure toggleBtn exists before adding event listener
        if (toggleBtn) {
            toggleBtn.onclick = (e) => {
                let darkMode = localStorage.getItem('dark-mode');
                if (darkMode === 'disabled') {
                    enableDarkMode();
                } else {
                    disableDarkMode();
                }
            }
        }
    });
});
