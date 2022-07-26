// main app
var day;
var month;
var year;

let century = null;
let decade = null;

let ones = null;
let tens = null;

let doom;
let dayOfDate;
let index;
let no_month_error = true;


function loadDate(){ 
    day = parseInt(document.getElementById('day').value);
    month = parseInt(document.getElementById('month').value);
    year = parseInt(document.getElementById('year').value);

    century = parseInt(year/100);
    decade = year%100;
    ones = century%10;
    tens = parseInt(century/10);
}

function weekDays(dayOfDate){
    let wantedDay;
    switch(dayOfDate){
        case 0:
            wantedDay = 'Sunday';
            break;
        case 1:
            wantedDay = 'Monday';
            break;
        case 2:
            wantedDay = 'Tuesday';
            break;
        case 3:
            wantedDay = 'Wednesday';
            break;
        case 4:
            wantedDay = 'Thursday';
            break;
        case 5:
            wantedDay = 'Friday';
            break;
        case 6:
            wantedDay = 'Saturday';
            break;
        default:
            wantedDay = 'not found!';
    }
    return wantedDay;
}

function get_day_of_year(){
    if ((ones%2)==0){
        if (ones == 2 || ones == 6){
            if ((tens%2) == 0){
                doom = 5;
            }else{
                doom = 2;
            }
        }else{
            if ((tens%2) == 0){
                doom = 2;
            }else{
                doom = 5;
            }
        }
    }else{
        if (ones == 7 || ones == 3){
            if ((tens%2) == 0){
                doom = 3;
            }else{
                doom = 0;
            }
        }else{
            if ((tens%2) == 0){
                doom = 0;
            }else{
                doom = 3;
            }
        }  
    }
        
    doom = doom + decade + parseInt(decade/4);
    
    while (doom >= 0){
        dayOfDate = doom;
        doom = doom - 7;
    }
}

function get_day_of_month(){
    if (month == 1){
        if ((year%4) == 0){
            index = 4;
        }else{
            index = 3;
        }
    }else if(month == 2){
        if ((year%4) == 0){
            index = 29;
        }else{
            index = 28;
        }
    }else if(month == 3){
        index = 14;
    }else if(month == 4){
        index = 4;
    }else if(month == 5){
        index = 9;
    }else if(month == 6){
        index = 6;
    }else if(month == 7){
        index = 11;
    }else if(month == 8){
        index = 8;
    }else if(month == 9){
        index = 5;
    }else if(month == 10){
        index = 10;
    }else if(month == 11){
        index = 7;
    }else if(month == 12){
        index = 12;
    }else{
        no_month_error = false
        document.getElementById('repeated-date').textContent = "Month Invalid!"
        document.getElementById('result').textContent = "please, try again."
        document.getElementById('close').onclick = function(){document.getElementById('month').focus();}
        
    }
}

function get_day_of_date(){
    index = index - day;

    if (index < 0){
        index = dayOfDate + Math.abs(index);
        while (index >= 0){
            dayOfDate = index;
            index = index - 7;
        }
    }else{
        index = dayOfDate - index;
        while (index < 0){
            index = index + 7;
            dayOfDate = index;
        }
    }  
}  

document.getElementById('enter').onclick = function() {
    loadDate();
    get_day_of_year(); 
    get_day_of_month();   
    get_day_of_date();
    if(no_month_error){
        if(day < 31 && day > 0){
            document.getElementById('repeated-date').textContent = "The day of " + day.toString() + "/" + month.toString() + "/" + year.toString() + " is ...";
            document.getElementById('result').textContent = weekDays(dayOfDate);    
        }else{
            document.getElementById('repeated-date').textContent = "Day Invalid!";
            document.getElementById('result').textContent = "please, try again.";
            document.getElementById('close').onclick = function(){document.getElementById('day').focus();}
            
        }
    }
}

// update copyright year
document.getElementById("current-year").innerHTML = new Date().getFullYear();

// PWA SW
window.addEventListener('load', () => {
    registerSW();
})

async function registerSW() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('./sw.js');
      } catch (e) {
        console.log(`SW registration failed`);
      }
    }
  }