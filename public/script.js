Vue.component('text-decode', {
    props: ['message', 'speed'],
    data: function() {
        return {
            decodedMessage: '',
            encodedMessage: '',
            observer: null,
        };
    },
    mounted: function() {
        this.setEncodedMessage();
        this.observer = new IntersectionObserver(this.handleIntersection, { threshold: 0.1 });
        this.observer.observe(this.$el);
    },
    beforeDestroy: function() {
        if (this.observer) {
            this.observer.disconnect();
        }
    },
    methods: {
        handleIntersection: function(entries) {
            if (entries[0].isIntersecting) {
                setTimeout(() => {
                    this.decodeMessage();
                    this.observer.disconnect();
                }, 500); // Delay of 500ms (half a second)
            }
        },
        setEncodedMessage: function() {
            for (let i = 0; i < this.message.length; i++) {
                if (this.message.charAt(i) == ' ') {
                    this.encodedMessage += ' ';
                } else {
                    this.encodedMessage += String.fromCharCode((Math.random() > 0.5 ? 65 : 97) + Math.floor(Math.random() * 26));
                }
            }
        },
        decodeMessage: function() {  
            let intervalId = setInterval(() => {
                this.decodedMessage += this.message.charAt(0);
                this.message = this.message.slice(1);
                this.encodedMessage = this.encodedMessage.slice(1);

                if (this.encodedMessage === '') {
                    clearInterval(intervalId);
                }
            }, this.speed);
        }
    },
    template: `
        <div>
            <span>{{ decodedMessage }}</span><span class="splatoon-square">{{ encodedMessage }}</span>
        </div>
    `,
});

Vue.component('project-card', {
    props: ['project'],
    data() {
        return {
            isVisible: false,
            observer: null,
        };
    },
    mounted() {
        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                this.isVisible = true;
                this.$el.classList.add('visible');
                this.observer.disconnect();
            }
        }, { threshold: 0.15 });
        this.observer.observe(this.$el);
    },
    beforeDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    },
    template: `
        <div class="card project-card">
            <div class="card-image">
                <figure v-if="project.youtubeUri" class="image">
                    <iframe width="100%" height="250em" :src="project.youtubeUri" title="Tilty Minos Gameplay" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </figure>
                <figure v-else-if="project.imageUris.length" class="image">
                    <img :src="project.imageUris[0]" alt="Project Image">
                </figure>
            </div>
            <div class="card-content">
                <p class="title is-4" style="margin-bottom: 0px">
                    <text-decode :message="project.name" speed="100"></text-decode>
                </p>
                <div class="content">
                    <p>{{ project.description }}</p>
                    <div>
                        <div class="tags">
                            <span class="tag" v-for="tech in project.technologies" :key="tech"><strong>{{ tech }}</strong></span>
                        </div>
                    </div>
                    <div class="buttons">
                        <a v-if="project.projectUri" :href="project.projectUri" class="button is-primary" target="_blank">
                                <span class="icon">
                                    <i class="fas fa-external-link-alt"></i>
                                </span>
                                <span>View project</span>
                        </a>
                        <a v-if="project.youtubeUri" :href="project.youtubeUri" class="button is-danger" target="_blank">
                            <span class="icon">
                                <i class="fab fa-youtube"></i>
                            </span>
                            <span>YouTube</span>
                        </a>
                        <a v-if="project.githubUri" :href="project.githubUri" class="button is-link" target="_blank">
                            <span class="icon">
                                <i class="fab fa-github"></i>
                            </span>
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `
});

new Vue({
    el: '#app',
    data: {
        projects: [],
    },
    mounted: function() {
        axios.get('https://bradleyaiken.com/projects')
            .then(response => {
                this.projects = response.data;
                console.log(this.projects);
            })
            .catch(error => {
                console.log(error);
            });
    },
});

window.addEventListener('DOMContentLoaded', () => {
    const scrollIndicator = document.getElementById('scroll-indicator');
    let scrolled = false;

    // Show scroll indicator after a delay
    setTimeout(() => {
        if (!scrolled) scrollIndicator.classList.add('show');
    }, 2500);

    // Hide scroll indicator and move it up when user starts scrolling
    window.addEventListener('scroll', () => {
        scrolled = true;
        scrollIndicator.classList.remove('show');
        scrollIndicator.classList.add('hide');
    });
});