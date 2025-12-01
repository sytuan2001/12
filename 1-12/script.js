const questions = [
    {
        numb: 1,
        question: "Đâu là tên một loại hình nghệ thuật sân khấu truyền thống của Việt Nam?",
        answer: "Chèo",
        options: [
            "Chèo",
            "Bơi",
            "Chạy",
            "Nhảy"
        ]
    },
    {
        numb: 2,
        question: "Bánh chưng thường được làm vào dịp nào?",
        answer: "Tết Nguyên Đán",
        options: [
            "Tết Trung Thu",
            "Tết Nguyên Đán",
            "Lễ Giáng Sinh",
            "Lễ Quốc Khánh"
        ]
    },
    {
        numb: 3,
        question: "Con vật nào là biểu tượng của SEA Games 31 tổ chức tại Việt Nam?",
        answer: "Sao La",
        options: [
            "Trâu vàng",
            "Sao La",
            "Voi",
            "Hổ"
        ]
    },
    {
        numb: 4,
        question: "Địa danh nào sau đây được UNESCO công nhận là Di sản thiên nhiên thế giới?",
        answer: "Vịnh Hạ Long",
        options: [
            "Hồ Gươm",
            "Vịnh Hạ Long",
            "Chùa Một Cột",
            "Bến Nhà Rồng"
        ]
    },
    {
        numb: 5,
        question: "Trong truyện cổ tích Tấm Cám, Tấm nuôi con vật gì trong giếng?",
        answer: "Cá Bống",
        options: [
            "Cá Chép",
            "Cá Bống",
            "Cá Vàng",
            "Cá Quả"
        ]
    },
    {
        numb: 6,
        question: "Tác giả của Truyện Kiều là ai?",
        answer: "Nguyễn Du",
        options: [
            "Nguyễn Trãi",
            "Nguyễn Du",
            "Hồ Xuân Hương",
            "Nguyễn Đình Chiểu"
        ]
    },
    {
        numb: 7,
        question: "Đỉnh núi cao nhất Việt Nam là đỉnh núi nào?",
        answer: "Fansipan",
        options: [
            "Ba Vì",
            "Tây Côn Lĩnh",
            "Fansipan",
            "Ngọc Linh"
        ]
    },
    {
        numb: 8,
        question: "Thành phố nào được mệnh danh là 'Thành phố ngàn hoa'?",
        answer: "Đà Lạt",
        options: [
            "Đà Nẵng",
            "Đà Lạt",
            "Nha Trang",
            "Sapa"
        ]
    },
    {
        numb: 9,
        question: "Ai là người đầu tiên đặt chân lên Mặt Trăng?",
        answer: "Neil Armstrong",
        options: [
            "Yuri Gagarin",
            "Neil Armstrong",
            "Buzz Aldrin",
            "Phạm Tuân"
        ]
    },
    {
        numb: 10,
        question: "Hóa chất nào thường được sử dụng để làm sạch nước trong bể bơi?",
        answer: "Clo",
        options: [
            "Oxi",
            "Clo",
            "Flo",
            "Nitơ"
        ]
    },
    {
        numb: 11,
        question: "Giải Nobel không có lĩnh vực nào sau đây?",
        answer: "Toán học",
        options: [
            "Vật lý",
            "Hóa học",
            "Toán học",
            "Y học"
        ]
    },
    {
        numb: 12,
        question: "Nước nào có diện tích lớn nhất thế giới?",
        answer: "Nga",
        options: [
            "Mỹ",
            "Trung Quốc",
            "Nga",
            "Canada"
        ]
    },
    {
        numb: 13,
        question: "World Wide Web (WWW) được phát minh bởi ai?",
        answer: "Tim Berners-Lee",
        options: [
            "Bill Gates",
            "Steve Jobs",
            "Tim Berners-Lee",
            "Mark Zuckerberg"
        ]
    },
    {
        numb: 14,
        question: "Trong bảng tuần hoàn hóa học, nguyên tố nào đứng ở vị trí số 1?",
        answer: "Hydro",
        options: [
            "Heli",
            "Oxi",
            "Hydro",
            "Cacbon"
        ]
    },
    {
        numb: 15,
        question: "Bức tranh 'Mona Lisa' là kiệt tác của họa sĩ nào?",
        answer: "Leonardo da Vinci",
        options: [
            "Pablo Picasso",
            "Vincent van Gogh",
            "Leonardo da Vinci",
            "Michelangelo"
        ]
    }
];

// Selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const next_btn = document.querySelector("footer .next_btn");
const money_list_items = document.querySelectorAll(".money_list li");
const modal = document.getElementById("modal-help");
const modalText = document.getElementById("modal-text");
const closeModal = document.querySelector(".close-modal");

// Lifeline buttons
const btn5050 = document.getElementById("lifeline-5050");
const btnPhone = document.getElementById("lifeline-phone");
const btnAudience = document.getElementById("lifeline-audience");

let timeValue =  30;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
let currentPrize = 0; // Current guaranteed prize
let usedLifelines = {
    "5050": false,
    "phone": false,
    "audience": false
};

// Money mapping (reverse of array index basically)
const moneyLevels = [
    200000, 400000, 600000, 1000000, 2000000,
    3000000, 6000000, 10000000, 14000000, 22000000,
    30000000, 40000000, 60000000, 85000000, 150000000
];

// If startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

// If exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// If continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(30); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
    updateMoneyLadder(0);
}

// If Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(0); //calling startTimerLine function
        timeText.textContent = "Thời gian"; //change the timeText to Time Left
        next_btn.style.display = "none";
        updateMoneyLadder(que_count);
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';

    // Map options to letters a, b, c, d
    // The data structure is options: ["A text", "B text", ...]
    // The correct answer is stored as the text itself in 'answer' property in my data

    // We need to randomize order? No, usually in Millionaire it's fixed A,B,C,D.
    // My data has options array.

    let option_tag = '<div class="option" onclick="optionSelected(this)"><span>'+ questions[index].options[0] +'</span></div>'
        + '<div class="option" onclick="optionSelected(this)"><span>'+ questions[index].options[1] +'</span></div>'
        + '<div class="option" onclick="optionSelected(this)"><span>'+ questions[index].options[2] +'</span></div>'
        + '<div class="option" onclick="optionSelected(this)"><span>'+ questions[index].options[3] +'</span></div>';

    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag

    // Reset option styles if any were hidden by 50/50
    const options = option_list.querySelectorAll(".option");
    options.forEach(opt => opt.style.visibility = "visible");
}

// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items

    // Highlight selection first (yellow/orange), wait a sec, then reveal?
    // For simplicity, reveal immediately or add small delay.
    // Let's reveal immediately for this version.

    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);

        // Update Safe Haven Prize
        // Safe havens are usually Q5 and Q10.
        if (que_numb >= 5) currentPrize = moneyLevels[4];
        if (que_numb >= 10) currentPrize = moneyLevels[9];
        if (que_numb == 15) currentPrize = moneyLevels[14];

        next_btn.style.display = "block"; //show the next button if user selected any option
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }

        // Game Over Logic
        // Calculate prize based on milestones
        let prizeMoney = 0;
        if(que_numb > 10) prizeMoney = moneyLevels[9];
        else if(que_numb > 5) prizeMoney = moneyLevels[4];
        else prizeMoney = 0;

        // Wait a moment then show result
        setTimeout(() => {
            showResult(prizeMoney);
        }, 1000);
        return; // Stop here, don't show next button
    }

    //once user selected on option then disable all options
    for(let i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
}

function showResult(forcedPrize = null){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");

    let finalMoney = 0;
    if (forcedPrize !== null) {
        finalMoney = forcedPrize;
    } else if (userScore === 15) {
        finalMoney = moneyLevels[14];
    } else {
        // This case covers if they just finish 15 questions but maybe we handle wrong answer inside optionSelected
        // If they win all 15:
        finalMoney = moneyLevels[userScore - 1] || 0;
    }

    let scoreTag = '<span>Chúc mừng bạn đã hoàn thành trò chơi! <p>Bạn đã trả lời đúng '+ userScore +' câu hỏi.</p> <p>Tiền thưởng: '+ finalMoney.toLocaleString('vi-VN') +' VNĐ</p></span>';
    scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Hết giờ"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user selected on option then disable all options
            }

            // Time out = Game Over with milestone money
            let prizeMoney = 0;
            if(que_numb > 10) prizeMoney = moneyLevels[9];
            else if(que_numb > 5) prizeMoney = moneyLevels[4];

            setTimeout(() => {
                showResult(prizeMoney);
            }, 1000);
        }
    }
}

function startTimerLine(time){
    // Reset styling
    time_line.style.width = "0px";

    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value
        // The width of header is roughly 100% or fixed px.
        // If we assume max width is 100%, we calculate percentage.
        // 30 seconds -> 100%.
        // 29ms interval ~ 1000 steps roughly (30000 / 29).
        // Actually simpler to just animate CSS width relative to total.

        // Let's use percentage.
        let percentage = (time / (30000 / 29)) * 100;

        if(percentage > 100) percentage = 100;
        time_line.style.width = percentage + "%"; //increasing width of time_line with px by time value

        if(time > 30000/29){ //if time value is greater than max
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> / <p>'+ questions.length +'</p> Câu hỏi</span>';
    const bottom_ques_counter = document.querySelector("footer .total_que");
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}

function updateMoneyLadder(currentIndex) {
    // Current Index is 0 for question 1.
    // The list in HTML is reversed order visual (15 on top), but we can select by data-level.
    money_list_items.forEach(item => {
        item.classList.remove("active");
        if(parseInt(item.getAttribute("data-level")) === (currentIndex + 1)) {
            item.classList.add("active");
            // Scroll to view if on mobile/scrollable
            item.scrollIntoView({behavior: "smooth", block: "center"});
        }
    });
}

// Result Box Buttons
const quit_quiz = result_box.querySelector(".buttons .quit");
const restart_quiz = result_box.querySelector(".buttons .restart");

quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 30;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;

    // Reset lifelines
    usedLifelines = { "5050": false, "phone": false, "audience": false };
    btn5050.classList.remove("used");
    btnPhone.classList.remove("used");
    btnAudience.classList.remove("used");

    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Thời gian"; //change the timeText to Time Left
    next_btn.style.display = "none";
    updateMoneyLadder(que_count);
}


// Lifeline Logic
btn5050.addEventListener("click", () => {
    if (usedLifelines["5050"]) return;

    usedLifelines["5050"] = true;
    btn5050.classList.add("used");

    // Logic: Hide 2 wrong answers
    let correctAns = questions[que_count].answer;
    let allOptions = Array.from(option_list.children);
    let wrongOptions = allOptions.filter(opt => opt.textContent !== correctAns);

    // Randomly select 2 wrong options to hide
    // Shuffle wrongOptions array
    for (let i = wrongOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wrongOptions[i], wrongOptions[j]] = [wrongOptions[j], wrongOptions[i]];
    }

    // Hide the first 2
    wrongOptions[0].style.visibility = "hidden";
    wrongOptions[1].style.visibility = "hidden";
});

btnPhone.addEventListener("click", () => {
    if (usedLifelines["phone"]) return;
    usedLifelines["phone"] = true;
    btnPhone.classList.add("used");

    let correctAns = questions[que_count].answer;
    // Simulate a friend answering
    // 80% chance correct
    let friendAnswer = correctAns;
    if (Math.random() > 0.8) {
        // Pick a wrong one
        const wrong = questions[que_count].options.filter(o => o !== correctAns);
        friendAnswer = wrong[Math.floor(Math.random() * wrong.length)];
    }

    showModal("Gọi điện thoại cho người thân", `Người thân của bạn khuyên bạn chọn đáp án: ${friendAnswer}`);
});

btnAudience.addEventListener("click", () => {
    if (usedLifelines["audience"]) return;
    usedLifelines["audience"] = true;
    btnAudience.classList.add("used");

    let correctAns = questions[que_count].answer;
    let options = questions[que_count].options;

    // Generate percentages
    // Correct answer gets high percentage (e.g. 50-80%)
    // Others split the rest

    let correctPercent = Math.floor(Math.random() * 31) + 50; // 50-80
    let remaining = 100 - correctPercent;

    let results = options.map(opt => {
        if (opt === correctAns) return { opt, pct: correctPercent };
        return { opt, pct: 0 };
    });

    // Distribute remaining among others
    let wrongIndices = results.map((r, i) => r.pct === 0 ? i : -1).filter(i => i !== -1);

    wrongIndices.forEach((idx, i) => {
        if (i === wrongIndices.length - 1) {
            results[idx].pct = remaining;
        } else {
            let p = Math.floor(Math.random() * remaining);
            results[idx].pct = p;
            remaining -= p;
        }
    });

    let msg = results.map(r => `${r.opt}: ${r.pct}%`).join("<br>");

    showModal("Ý kiến khán giả", msg);
});

// Modal Logic
function showModal(title, text) {
    modal.style.display = "block";
    document.querySelector(".modal-content").innerHTML = `<span class="close-modal">&times;</span><h3>${title}</h3><p>${text}</p>`;

    // Re-bind close button because innerHTML replaced it
    document.querySelector(".close-modal").onclick = () => {
        modal.style.display = "none";
    }
}

closeModal.onclick = () => {
    modal.style.display = "none";
}

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
