class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        //  debugger
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }
        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause)
    }

    start = () => {
        // if the clock is already running, it is stopped to run again
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }        
        if (this.onStart) {
            this.onStart(this.timeRemaining);
        }
        this.tick();
        // intervalId represents the id of the interval to be managed
        this.intervalId = setInterval(this.tick, 10)
        // by assining the this to intervalId, it is created as an instance variable
    }

    pause = () => {
        // clearInterval uses the id from intervalId to stop setInterval
        clearInterval(this.intervalId); 
    };

    tick = () => {
        // timeRemaining has a getter that is called whenever this.timeRemaining its called
        if (this.timeRemaining <= 0) {
            this.pause();
            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            // timeRemaining has a setter, so whenever its value is reasigned the method is called
            this.timeRemaining = this.timeRemaining - .01;
            if (this.onTick) {
                this.onTick(this.timeRemaining);
            }
            // the value after '=', timeRemaining - 1 its passed as an argument to the setter methods 
        }
    }

    get timeRemaining() {
        return parseFloat(this.durationInput.value)        
    }

    // the setter is called whenever timeRemaining method is reasigned
    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    }
}
