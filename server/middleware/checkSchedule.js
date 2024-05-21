function schedulesConflict(newCourse, oldCourses){
    const parsedSchedule = parseSchedule(newCourse.schedule)
    for(const day of parsedSchedule.scheduleDays){
        const enrolled = enrolledDuring(day, parsedSchedule.scheduleHours, oldCourses)
        if(enrolled.isEnrolled){
            return({
                conflict: true,
                conflictingCourse: enrolled.course
            })
        }
    }
    return({
        conflict: false
    })
}
module.exports = schedulesConflict


//returns true if the user is enrolled during a time
function enrolledDuring(day, hours, courses){
    for (const course of courses) {
        const schedule = parseSchedule(course.schedule);

        for (const scheduleDay of schedule.scheduleDays) {
            const isCorrectDay = scheduleDay === day;
            const isCorrectHour = schedule.scheduleHours[0] < hours[1] && schedule.scheduleHours[1] > hours[0];

            if (isCorrectDay && isCorrectHour) {
                return {
                    isEnrolled: true,
                    course: course
                }
            }
        }
    }

    return {
        isEnrolled: false,
        course: {
            class_id:0,
            classroom_number: "",
            credit_hours: 0,
            description:"",
            maximum_capacity:0,
            schedule:"",
            title:"",
            tuition_cost:""
        }
    };
}




//parses the schedule so it is in a more usable format
//EX:
//TH 8-9 => { scheduleDays: ['Thursday'], scheduleHours: [8, 9] }
//MWF 11-12 => { scheduleDays: ['Monday', 'Wednesday', 'Friday'] scheduleHours: [11, 12] }
//TTH 1-2 => { scheduleDays: ['Tuesday', 'Thursday'], scheduleHours: [13, 14] }
function parseSchedule(schedule){
    let scheduleDays = []
    let scheduleHours = []

    //loop through each letter
    for(let i=0; i<schedule.length; i++){
        const prevLetter = schedule[i-1]
        const letter = schedule[i]
        const nextLetter = schedule[i+1]

        //test if the letter and next letter form a date
        if(letter.toUpperCase()  === 'F'){
            scheduleDays.push('Friday')
        } 
        else if(letter.toUpperCase() === 'T' && nextLetter.toUpperCase() === 'H'){
            scheduleDays.push('Thursday')
        } 
        else if(letter.toUpperCase() === 'W'){
            scheduleDays.push('Wednesday')
        } 
        else if(letter.toUpperCase() === 'T'){
            scheduleDays.push('Tuesday')
        } 
        else if(letter.toUpperCase() === 'M'){
            scheduleDays.push('Monday')
        }


        //schedule times
        if(!isNaN(Number(letter)) && letter !== " "){
            let scheduleTime

            //handle 2 character long numbers
            if(!isNaN(Number(nextLetter))){
                scheduleTime = Number(letter + nextLetter)
            } 
            //handle 1 character long numbers
            else if(Number(letter) !== 0 && (isNaN(Number(prevLetter)) || prevLetter === " ")){
                scheduleTime = Number(letter)
            }
            //don't add an hour to the schedule if the hour is undefined
            if(scheduleTime !== undefined){
                if(scheduleTime < 7){
                    scheduleTime += 12
                }
                scheduleHours.push(scheduleTime)
            }
        }

    }

    //format the response
    const formattedResponse = {
        scheduleDays: scheduleDays,
        scheduleHours: scheduleHours,
    }
    return(formattedResponse)
}
