const app = Vue.createApp({
    data() {
        return {
            sound: false,
            hours: 0,
            minutes: 0,
            seconds: 0,
            tasks: [],
            notif: [],
            currentAudio: null // Store the audio instance here
        }
    },

    methods: {
        removeTask(index) {
            // Remove a task from the array
            this.tasks.splice(index, 1);
        },
        addTask() {
            let newHour = this.hours;
            let newMinute = this.minutes + 1;
        
            if (newMinute >= 60) {
                newMinute = 0;
                newHour = (newHour + 1) % 24; // Ensures 24-hour format
            }
        
            this.tasks.push({
                tobedone: false,
                hour: newHour,
                minutes: newMinute,
                text: ""
            });
        },
        fermer(task) {
            task.tobedone = false;
            let index = this.notif.indexOf(task);
            if (index !== -1) {
                this.notif.splice(index, 1);
            }

            if (this.currentAudio) {
                this.currentAudio.pause();
                this.currentAudio.currentTime = 0; // Reset audio time to the beginning
            }            
        },  
        isInvalidTask(task) {
            return task.hour < this.hours || 
                   (task.hour == this.hours && task.minutes < this.minutes) || 
                   task.text === "" ||
                   this.checkPreExistance(task);
        },
        checkPreExistance(task) {
            // Check if a similar task already exists
            return this.tasks.some(t => t !== task && t.hour === task.hour && t.minutes === task.minutes && t.text === task.text);
        },
        updateTime() {
            // Updates the time
            let date = new Date();
            this.hours = date.getHours();
            this.minutes = date.getMinutes();
            this.seconds = date.getSeconds();

            // Check if any task is due
            this.tasks.forEach(task => {

                if (task.tobedone && task.hour == this.hours && task.minutes == this.minutes) {
                    // Play a sound if enabled
                    if (this.sound) {
                        if (!this.currentAudio) { // Create new audio instance only if not already created, to avoid multiple instances
                            this.currentAudio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
                        }
                        this.currentAudio.play().catch(err => console.warn("Audio playback failed:", err));
                    }
                    if (!this.notif.includes(task)) {
                        this.notif.push(task);
                    }
                    // Browser will handle notifications separately
                }
            });
        }
    },

    computed: {
        filteredTasks() {
          return this.tasks?.filter(task => 
            task?.tobedone && 
            (task?.hour ?? 0) >= (this.hour ?? 0) && 
            (task?.minutes ?? 0) >= (this.minutes ?? 0)
          ) || [];
        }
      },      

    mounted() {
        // Update the time every second
        setInterval(this.updateTime, 1000);
    }
});

// Mount the app
app.mount("#app");