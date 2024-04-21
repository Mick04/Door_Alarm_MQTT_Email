timeOut = false
timerRunning = false 
doorClosedBeforTimeOut = true
set interval to 300 to start with then to 10 minutes


Main loop {

check state of mag switch
if Door not open and timer not running{

change LED to green.


}
if door open ,timer not running{

set timerRunning to true
current time is equal to millis()
previousTime is equal to current time

changge LED to blue


}

if door open and timerRunning is true and timeOut is false{
current time is equal to millis()
   if current time minus previous time is equal to or greater than interval{
timeOut = true
change LED to red
   }
}
if timeOut = true{

   if door is closed{
       check resetSwitch
   if resetSwitch is true {
       timeOut = false
       doorClosedBeforTimeOut = false
       timerRunning = false
       change LED to green
   }
}
}

if door closed and timerRunning is true and  doorClosedBeforTimeOut is true{
change LED to green

doorClosedBeforTimeOut to true
timerRunning to false
}


}