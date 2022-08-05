const timeTo = {
    hoursTo: (futureTime) => {
        const now = Date.now()
        const timeLeft = (futureTime - now) / 1000;
        const hoursLeft = Math.floor(timeLeft / 3600);
        const minutesLeft = Math.floor((timeLeft - (Math.floor(timeLeft / 3600) * 3600)) / 60)
        const secondsLeft = Math.floor(timeLeft - (Math.floor(((timeLeft - (Math.floor(timeLeft / 3600) * 3600)) / 60) + hoursLeft * 60) * 60))
        var output = `**`

        if (!hoursLeft == 0) output += `${hoursLeft} hours, ${minutesLeft} minutes, ${secondsLeft} seconds!**`
        else if (!minutesLeft == 0) output += `${minutesLeft} minutes, ${secondsLeft} seconds!**`
        else output += `${secondsLeft} seconds!**`
        return output
    }
}
module.exports = timeTo