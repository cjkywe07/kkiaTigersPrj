// 일정 넣기
const gameArr = [];
const teamArr = {
    NCHT: "/img/team-dinos.png",
    HTSK: "/img/team-landers.png",
    OBHT: "/img/team-bears.png",
    HHHT: "/img/team-eagles.png",
    HTWO: "/img/team-heros.png",
    SSHT: "/img/team-lions.png",
    HTLT: "/img/team-giants.png",
    HTLG: "/img/team-twins.png",
    KTHT: "/img/team-wiz.png"
};

const $game = document.querySelectorAll(".game-wrap .game-item");
$game.forEach((game) => {
    let arr = game.innerText.split("/");
    gameArr.push({
        gameDate : arr[0],
        homeGame : arr[1],
        opponent : arr[2],
    })
})

const gameSetting = () => {

    const $month = document.querySelector(".year-month");
    const $dateArr = document.querySelectorAll(".dates .day span");
    const $aTag = document.querySelectorAll(".tag");

    $dateArr.forEach((date, index) => {
        // 일정 셋팅
        let that = `${$month.innerText}.${date.innerText}`;
        gameArr.forEach((game) => {
            if(game.gameDate == that) { // 기록 있으면
                date.style.backgroundImage = `url(${teamArr[game.opponent]})`;
                date.style.cursor = "pointer";

                if(game.homeGame == "true") {
                    date.style.backgroundColor = '#ffeeee';
                } else {
                    date.style.backgroundColor = '';
                }
            }
        })

        // 공식으로 이동
        date.onclick= () => {

            let setMonth = $month.innerText;
            let setDate = date.innerText;
            let dateComplete = "";
            let setTeamCode = "";

            // year month 가공
            let arr = setMonth.split(".");
            if(arr[1].length == 1) {
                arr[1] = `0${arr[1]}`;
                setMonth = arr.join("");
            }
            // date 가공
            if(date.innerText.length == 1){
                setDate = `0${date.innerText}`;
            }

            dateComplete = setMonth + setDate;

            gameArr.forEach((game) => {
                if(game.gameDate == that) { // 기록 있으면
                    setTeamCode = game.opponent;
                    url = `https://tigers.co.kr/game/schedule/view?type=major&gameKey=${dateComplete}${setTeamCode}0&gameDate=${dateComplete}`
                    window.open(`${url}`, "_blank"); // 새창 열기
                }
            })

        }
    })
};

// 달력 ------------------
$(document).ready(function () {
    calendarInit();
});

/*
    달력 렌더링 할 때 필요한 정보 목록 

    현재 월(초기값 : 현재 시간)
    금월 마지막일 날짜와 요일
    전월 마지막일 날짜와 요일
*/

function calendarInit() {
    // 날짜 정보 가져오기
    var date = new Date(); // 현재 날짜(로컬 기준) 가져오기
    var utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000; // uct 표준시 도출
    var kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
    var today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)

    var thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // 달력에서 표기하는 날짜 객체

    var currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
    var currentMonth = thisMonth.getMonth(); // 달력에서 표기하는 월
    var currentDate = thisMonth.getDate(); // 달력에서 표기하는 일

    // kst 기준 현재시간
    // console.log(thisMonth);

    // 캘린더 렌더링
    renderCalender(thisMonth);

    function renderCalender(thisMonth) {
        // 렌더링을 위한 데이터 정리
        currentYear = thisMonth.getFullYear();
        currentMonth = thisMonth.getMonth();
        currentDate = thisMonth.getDate();

        // 이전 달의 마지막 날 날짜와 요일 구하기
        var startDay = new Date(currentYear, currentMonth, 0); // 0번째는 지난달 마지막날을 의미한다
        var prevDate = startDay.getDate();
        var prevDay = startDay.getDay();

        // 이번 달의 마지막날 날짜와 요일 구하기
        var endDay = new Date(currentYear, currentMonth + 1, 0);
        var nextDate = endDay.getDate();
        var nextDay = endDay.getDay();

        // 현재 월 표기
        $(".year-month").text(currentYear + "." + (currentMonth + 1));

        // 렌더링 html 요소 생성
        calendar = document.querySelector(".dates");
        calendar.innerHTML = "";

        // 지난달
        for (var i = prevDate - prevDay + 1; i <= prevDate; i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day prev disable">' + i + "</div>";
        }
        // 이번달
        for (var i = 1; i <= nextDate; i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="tag day current display-flex-set"><span>' + i + "</span></div>";
        }
        // 다음달
        for (var i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day next disable">' + i + "</div>";
        }

        // 높이 조절
        const $mainHeight = $(".cal-main").height();

        if ($mainHeight == 745) {
            $(".cal-wrap").css("height", 1014);
            $("#game-wrapper").css("height", 1070);
        } else if ($mainHeight == 885) {
            $(".cal-wrap").css("height", 1174);
            $("#game-wrapper").css("height", 1230);
        }

        gameSetting();
    }

    // 이전달로 이동
    $(".go-prev").on("click", function () {
        thisMonth = new Date(currentYear, currentMonth - 1, 1);
        renderCalender(thisMonth);
    });

    // 다음달로 이동
    $(".go-next").on("click", function () {
        thisMonth = new Date(currentYear, currentMonth + 1, 1);
        renderCalender(thisMonth);
    });
}
