/**
 * Created by suhyun on 2017. 1. 24..
 */
$(function () {
    $('.network-option-opener').click(function () {
        var target = $('#config');

        if (!target.hasClass('open')) {
            target.addClass('open');
            $('.glyphicon').removeClass('glyphicon-plus');
            $('.glyphicon').addClass('glyphicon-minus');
        } else {
            target.removeClass('open');
            $('.glyphicon').removeClass('glyphicon-minus');
            $('.glyphicon').addClass('glyphicon-plus');
        }

    });

});


function createNetworkData(q, color) {
    // create an array with edges
    var edges = [], nodes = [];

    if (q.startsWith('q12')) {
        edges = new vis.DataSet([
            {from: '드라마', to: 'root'},
            {from: '시사', to: 'root'},
            {from: '예능', to: 'root'},
            {from: '코미디', to: 'root'},
            {from: '가요', to: 'root'},
            {from: '역도요정김복주', to: '드라마'},
            {from: '푸른바다의전설', to: '드라마'},
            {from: '낭만닥터김사부', to: '드라마'},
            {from: '도깨비', to: '드라마'},
            {from: '크리미널마인드', to: '드라마'},
            {from: '화랑', to: '드라마'},
            {from: '구르미그린달빛', to: '드라마'},

            {from: '미운오리새끼', to: '예능'},
            {from: '아는형님', to: '예능'},
            {from: '우리결혼했어요', to: '예능'},
            {from: '무한도전', to: '예능'},
            {from: '런닝맨', to: '예능'},
            {from: '신서유기3', to: '예능'},
            {from: '슈퍼맨이돌아왔다', to: '예능'},
            {from: '냉장고를부탁해', to: '예능'},
            {from: '문제적남자', to: '예능'},
            {from: '비정상회담', to: '예능'},
            {from: '마이리틀텔레비전', to: '예능'},
            {from: '삼시세끼', to: '예능'},
            {from: '라디오스타', to: '예능'},

            {from: 'SNL', to: '코미디'},
            {from: '코미디빅리그', to: '코미디'},
            {from: '개그콘서트', to: '코미디'},

            {from: '복면가왕', to: '가요'},
            {from: '케이팝스타', to: '가요'},
            {from: '뮤직뱅크', to: '가요'},
            {from: '프로듀스101', to: '가요'},


            {from: '썰전', to: '시사'},
            {from: '그것이알고싶다', to: '시사'},
            {from: 'jtbc뉴스룸', to: '시사'},
            {from: '청문회', to: '시사'},
            {from: 'YTN', to: '시사'},


        ]);
        nodes = new vis.DataSet([
            {id: 'root', label: 'TV프로그램', color: color[0], font: {color: 'inherit', face: 'Hanna'}, value: 70},
            {id: '드라마', label: '드라마', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 50},
            {id: '시사', label: '시사', color: color[5], font: {color: 'inherit', face: 'Hanna'}, value: 35},
            {id: '예능', label: '예능', color: color[7], font: {color: 'inherit', face: 'Hanna'}, value: 60},
            {id: '코미디', label: '코미디', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 20},
            {id: '가요', label: '가요', color: color[4], font: {color: 'inherit', face: 'Hanna'}, value: 10},

            {id: '역도요정김복주', label: '역도요정김복주', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 10},
            {id: '푸른바다의전설', label: '푸른바다의전설', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 20},
            {id: '낭만닥터김사부', label: '낭만닥터김사부', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 17},
            {id: '도깨비', label: '도깨비', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 40},
            {id: '크리미널마인드', label: '크리미널마인드', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 3},
            {id: '화랑', label: '화랑', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 5},
            {id: '구르미그린달빛', label: '구르미그린달빛', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 3},

            {id: '미운오리새끼', label: '미운오리새끼', color: color[7], font: {color: 'inherit', face: 'Hanna'}, value: 20},
            {id: '아는형님', label: '아는형님', color: color[7], font: {color: 'inherit', face: 'Hanna'}, value: 35},
            {id: '우리결혼했어요', label: '우리결혼했어요', color: color[7], font: {color: 'inherit', face: 'Hanna'}, value: 7},
            {id: '무한도전', label: '무한도전', color: color[7], font: {color: 'inherit', face: 'Hanna'}, value: 40},
            {id: '런닝맨', label: '런닝맨', color: color[7], font: {color: 'inherit', face: 'Hanna'}, value: 3},
            {id: '신서유기3', label: '신서유기3', color: color[7], font: {color: 'inherit', face: 'Hanna'}, value: 1},
            {id: '슈퍼맨이돌아왔다', label: '슈퍼맨이돌아왔다', color: color[7], font: {color: 'inherit', face: 'Hanna'}, value: 7},
            {id: '냉장고를부탁해', label: '냉장고를부탁해', color: color[7], font: {color: 'inherit', face: 'Hanna'}, value: 5},
            {id: '문제적남자', label: '문제적남자', color: color[7], font: {color: 'inherit', face: 'Hanna'}, value: 7},
            {id: '비정상회담', label: '비정상회담', color: color[7], font: {color: 'inherit', face: 'Hanna'}, value: 2},
            {id: '마이리틀텔레비전', label: '마이리틀텔레비전', color: color[7], font: {color: 'inherit', face: 'Hanna'}, value: 3},
            {id: '삼시세끼', label: '삼시세끼', color: color[7], font: {color: 'inherit', face: 'Hanna'}, value: 10},
            {id: '라디오스타', label: '라디오스타', color: color[7], font: {color: 'inherit', face: 'Hanna'}, value: 25},

            {id: 'SNL', label: 'SNL', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 12},
            {id: '코미디빅리그', label: '코미디빅리그', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 1},
            {id: '개그콘서트', label: '개그콘서트', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 1},

            {id: '복면가왕', label: '복면가왕', color: color[4], font: {color: 'inherit', face: 'Hanna'}, value: 15},
            {id: '케이팝스타', label: '케이팝스타', color: color[4], font: {color: 'inherit', face: 'Hanna'}, value: 10},
            {id: '뮤직뱅크', label: '뮤직뱅크', color: color[4], font: {color: 'inherit', face: 'Hanna'}, value: 6},
            {id: '프로듀스101', label: '프로듀스101', color: color[4], font: {color: 'inherit', face: 'Hanna'}, value: 2},

            {id: '썰전', label: '썰전', color: color[5], font: {color: 'inherit', face: 'Hanna'}, value: 10},
            {id: '그것이알고싶다', label: '그것이알고싶다', color: color[5], font: {color: 'inherit', face: 'Hanna'}, value: 25},
            {id: 'jtbc뉴스룸', label: 'jtbc뉴스룸', color: color[5], font: {color: 'inherit', face: 'Hanna'}, value: 35},
            {id: '청문회', label: '청문회', color: color[5], font: {color: 'inherit', face: 'Hanna'}, value: 10},
            {id: 'YTN', label: 'YTN', color: color[5], font: {color: 'inherit', face: 'Hanna'}, value: 10},

        ]);
    }
    else if (q.startsWith('q4')) {
        edges = new vis.DataSet([
            {from: '연애', to: 'root'},
            {from: '일상', to: 'root'},
            {from: '대학생활', to: 'root'},
            {from: '캠퍼스', to: 'root'},
            {from: '학업', to: 'root'},

            {from: 'CC', to: '연애'},
            {from: '남친 만들기', to: '연애'},
            {from: '여친 만들기', to: '연애'},

            {from: '자취', to: '일상'},
            {from: '클럽', to: '일상'},
            {from: '알바', to: '일상'},
            {from: '여행', to: '일상'},
            {from: '꾸미기', to: '일상'},
            {from: '염색', to: '일상'},
            {from: '화장', to: '일상'},
            {from: '짧은 치마', to: '일상'},

            {from: '학생회', to: '대학생활'},
            {from: '동아리', to: '대학생활'},
            {from: 'MT', to: '대학생활'},
            {from: '축제', to: '대학생활'},
            {from: '과잠', to: '대학생활'},
            {from: 'OT', to: '대학생활'},
            {from: '기숙사', to: '대학생활'},
            {from: '교환학생', to: '대학생활'},

            {from: '캠퍼스 걷기', to: '캠퍼스'},
            {from: '잔디밭', to: '캠퍼스'},
            {from: '맥주', to: '캠퍼스'},
            {from: '치맥', to: '캠퍼스'},
            {from: '돗자리', to: '캠퍼스'},

            {from: '수강신청', to: '학업'},
            {from: '도서관', to: '학업'},
            {from: '과탑', to: '학업'},
            {from: '파란학기', to: '학업'},
            {from: '논문', to: '학업'},
            {from: '장학금', to: '학업'},

        ]);
        nodes = new vis.DataSet([
            {id: 'root', label: '가장 해보고 싶은 것', color: color[0], font: {color: 'inherit', face: 'Hanna'}, value: 60},

            {id: '연애', label: '연애', color: color[1], font: {color: 'inherit', face: 'Hanna'}, value: 35},
            {id: 'CC', label: 'CC', color: color[1], font: {color: 'inherit', face: 'Hanna'}, value: 10},
            {id: '남친 만들기', label: '남친 만들기', color: color[1], font: {color: 'inherit', face: 'Hanna'}, value: 10},
            {id: '여친 만들기', label: '여친 만들기', color: color[1], font: {color: 'inherit', face: 'Hanna'}, value: 10},


            {id: '일상', label: '일상', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 50},
            {id: '자취', label: '자취', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 1},
            {id: '클럽', label: '클럽', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 1},
            {id: '알바', label: '알바', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 20},
            {id: '여행', label: '여행', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 1},
            {id: '꾸미기', label: '꾸미기', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 10},
            {id: '염색', label: '염색', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 1},
            {id: '화장', label: '화장', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 1},
            {id: '짧은 치마', label: '짧은 치마', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 1},


            {id: '대학생활', label: '대학생활', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 35},
            {id: '학생회', label: '학생회', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 5},
            {id: '동아리', label: '동아리', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 20},
            {id: 'MT', label: 'MT', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 10},
            {id: '축제', label: '축제', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 1},
            {id: '과잠', label: '과잠', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 1},
            {id: 'OT', label: 'OT', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 8},
            {id: '기숙사', label: '기숙사', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 5},
            {id: '교환학생', label: '교환학생', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 1},

            {id: '캠퍼스', label: '캠퍼스', color: color[4], font: {color: 'inherit', face: 'Hanna'}, value: 15},
            {id: '캠퍼스 걷기', label: '캠퍼스 걷기', color: color[4], font: {color: 'inherit', face: 'Hanna'}, value: 1},
            {id: '잔디밭', label: '잔디밭', color: color[4], font: {color: 'inherit', face: 'Hanna'}, value: 1},


            {id: '학업', label: '학업', color: color[5], font: {color: 'inherit', face: 'Hanna'}, value: 25},
            {id: '수강신청', label: '수강신청', color: color[5], font: {color: 'inherit', face: 'Hanna'}, value: 1},
            {id: '도서관', label: '도서관', color: color[5], font: {color: 'inherit', face: 'Hanna'}, value: 13},
            {id: '과탑', label: '과탑', color: color[5], font: {color: 'inherit', face: 'Hanna'}, value: 6},
            {id: '파란학기', label: '파란학기', color: color[5], font: {color: 'inherit', face: 'Hanna'}, value: 7},
            {id: '논문', label: '논문', color: color[5], font: {color: 'inherit', face: 'Hanna'}, value: 2},
            {id: '장학금', label: '장학금', color: color[5], font: {color: 'inherit', face: 'Hanna'}, value: 3},
        ]);
    }
    else if (q.startsWith('q13')) {
        edges = new vis.DataSet([
            {from: '정치', to: '관심사'},
            {from: '일상', to: '관심사'},
            {from: '대학', to: '관심사'},
            {from: '외모', to: '관심사'},

            {from: '연애', to: '일상'},
            {from: '연예', to: '일상'},
            {from: '게임', to: '일상'},
            {from: '여행', to: '일상'},

            {from: '남자친구', to: '연애'},
            {from: '여자친구', to: '연애'},

            {from: '도깨비', to: '연예'},
            {from: '공유', to: '연예'},
            {from: '힙합', to: '연예'},
            {from: '레드벨벳', to: '연예'},
            {from: '젝스키스', to: '연예'},
            {from: '박보검', to: '연예'},
            {from: '트와이스', to: '연예'},
            {from: '아이유', to: '연예'},

            {from: '오버워치', to: '게임'},

            {from: '맛집', to: '여행'},
            {from: '일본', to: '여행'},
            {from: '홍콩', to: '여행'},

            {from: '학업', to: '대학'},
            {from: '아주대학교', to: '대학'},
            {from: '선배', to: '대학'},
            {from: '대학생활', to: '대학'},
            {from: '동기', to: '대학'},

            {from: '토익', to: '학업'},
            {from: 'C언어', to: '학업'},
            {from: '딥러닝', to: '학업'},
            {from: '인공지능', to: '학업'},

            {from: '쇼핑', to: '외모'},
            {from: '화장법', to: '외모'},
            {from: '염색', to: '외모'},
            {from: '뷰티', to: '외모'},
            {from: '다이어트', to: '외모'},
            {from: '패션', to: '외모'},
            {from: '헬스', to: '외모'},

            {from: '최순실', to: '정치'},
            {from: '박근혜', to: '정치'},
            {from: '문고리3인방', to: '정치'},
            {from: '처벌', to: '정치'},
            {from: '구속', to: '정치'},
            {from: '비선실세', to: '정치'},
            {from: '청문회', to: '정치'},
        ])

        nodes = new vis.DataSet([
            {id: '관심사', label:'관심사', color:color[0], font: {color: 'inherit', face: 'Hanna'}, value: 100},
            {id: '정치', label:'정치', color:color[1], font: {color: 'inherit', face: 'Hanna'}, value: 30},
            {id: '일상', label:'일상', color:color[2], font: {color: 'inherit', face: 'Hanna'}, value: 80},
            {id: '대학', label:'대학', color:color[3], font: {color: 'inherit', face: 'Hanna'}, value: 60},
            {id: '외모', label:'외모', color:color[4], font: {color: 'inherit', face: 'Hanna'}, value: 50},
            {id: '연애', label:'연애', color:color[5],font: {color: 'inherit', face: 'Hanna'}, value: 40},
            {id: '연예', label:'연예', color:color[6],font: {color: 'inherit', face: 'Hanna'}, value: 60},
            {id: '게임', label:'게임', color:color[7],font: {color: 'inherit', face: 'Hanna'}, value: 20},
            {id: '여행', label:'여행', color:color[0],font: {color: 'inherit', face: 'Hanna'}, value: 50},

            {id: '남자친구', label:'남자친구', color:color[5],font: {color: 'inherit', face: 'Hanna'}, value: 30},
            {id: '여자친구', label:'여자친구', color:color[5],font: {color: 'inherit', face: 'Hanna'}, value: 30},

            {id: '도깨비', label:'도깨비', color:color[6],font: {color: 'inherit', face: 'Hanna'}, value: 40},
            {id: '공유', label:'공유', color:color[6],font: {color: 'inherit', face: 'Hanna'}, value: 30},
            {id: '힙합', label:'힙합', color:color[6],font: {color: 'inherit', face: 'Hanna'}, value: 10},
            {id: '레드벨벳', label:'레드벨벳', color:color[6],font: {color: 'inherit', face: 'Hanna'}, value: 5},
            {id: '젝스키스', label:'젝스키스', color:color[6],font: {color: 'inherit', face: 'Hanna'}, value: 1},
            {id: '박보검', label:'박보검', color:color[6],font: {color: 'inherit', face: 'Hanna'}, value: 3},
            {id: '트와이스', label:'트와이스', color:color[6],font: {color: 'inherit', face: 'Hanna'}, value:7},
            {id: '아이유', label:'아이유', color:color[6],font: {color: 'inherit', face: 'Hanna'}, value: 5},

            {id: '오버워치', label:'오버워치', color:color[7],font: {color: 'inherit', face: 'Hanna'}, value: 20},

            {id: '맛집', label:'맛집', color:color[0],font: {color: 'inherit', face: 'Hanna'}, value: 14},
            {id: '일본', label:'일본', color:color[0],font: {color: 'inherit', face: 'Hanna'}, value: 10},
            {id: '홍콩', label:'홍콩', color:color[0],font: {color: 'inherit', face: 'Hanna'}, value: 3},

            {id: '학업', label:'학업', color:color[3],font: {color: 'inherit', face: 'Hanna'}, value: 50},
            {id: '아주대학교', label:'아주대학교', color:color[3],font: {color: 'inherit', face: 'Hanna'}, value: 30},
            {id: '선배', label:'선배', color:color[3],font: {color: 'inherit', face: 'Hanna'}, value: 10},
            {id: '대학생활', label:'대학생활', color:color[3],font: {color: 'inherit', face: 'Hanna'}, value: 20},
            {id: '동기', label:'동기', color:color[3],font: {color: 'inherit', face: 'Hanna'}, value: 20},
            {id: '토익', label:'토익', color:color[3],font: {color: 'inherit', face: 'Hanna'}, value: 16},
            {id: 'C언어', label:'C언어', color:color[3],font: {color: 'inherit', face: 'Hanna'}, value: 7},
            {id: '딥러닝', label:'딥러닝', color:color[3],font: {color: 'inherit', face: 'Hanna'}, value: 1},
            {id: '인공지능', label:'인공지능', color:color[3],font: {color: 'inherit', face: 'Hanna'}, value: 1},

            {id: '쇼핑', label:'쇼핑', color:color[4],font: {color: 'inherit', face: 'Hanna'}, value: 37},
            {id: '화장법', label:'화장법', color:color[4],font: {color: 'inherit', face: 'Hanna'}, value: 14},
            {id: '염색', label:'염색', color:color[4],font: {color: 'inherit', face: 'Hanna'}, value: 27},
            {id: '뷰티', label:'뷰티', color:color[4],font: {color: 'inherit', face: 'Hanna'}, value: 5},
            {id: '다이어트', label:'다이어트', color:color[4],font: {color: 'inherit', face: 'Hanna'}, value: 40},
            {id: '패션', label:'패션', color:color[4],font: {color: 'inherit', face: 'Hanna'}, value: 10},
            {id: '헬스', label:'헬스', color:color[4],font: {color: 'inherit', face: 'Hanna'}, value: 10},

            {id: '최순실', label:'최순실', color:color[1],font: {color: 'inherit', face: 'Hanna'}, value: 30},
            {id: '박근혜', label:'박근혜', color:color[1],font: {color: 'inherit', face: 'Hanna'}, value: 20},
            {id: '문고리3인방', label:'문고리3인방', color:color[1],font: {color: 'inherit', face: 'Hanna'}, value: 7},
            {id: '처벌', label:'처벌', color:color[1],font: {color: 'inherit', face: 'Hanna'}, value: 5},
            {id: '구속', label:'구속', color:color[1],font: {color: 'inherit', face: 'Hanna'}, value: 17},
            {id: '비선실세', label:'비선실세', color:color[1],font: {color: 'inherit', face: 'Hanna'}, value: 20},
            {id: '청문회', label:'청문회', color:color[1],font: {color: 'inherit', face: 'Hanna'}, value: 3},
        ])

    }
    else if (q.startsWith('q6') || q.startsWith('q7')) {
        edges = new vis.DataSet([
            {from: '좋은점', to: 'root'},
            {from: '나쁜점', to: 'root'},
            {from: '자유', to: '좋은점'},
            {from: '성인', to: '좋은점'},
            {from: '공부', to: '좋은점'},
            {from: '술', to: '자유'},
            {from: '늦은 귀가', to: '자유'},
            {from: '재수안한다', to: '자유'},
            {from: '어디든 갈 수 있다', to: '자유'},
            {from: '밤새', to: '자유'},
            {from: '여유', to: '자유'},
            {from: '주민등록증', to: '성인'},
            {from: '19금', to: '성인'},
            {from: '돈벌이', to: '성인'},
            {from: '스스로 개척', to: '성인'},
            {from: '운전면허', to: '성인'},
            {from: '투표', to: '성인'},
            {from: '전문적인 공부', to: '공부'},
            {from: '수업 선택', to: '공부'},

            {from: '책임', to: '나쁜점'},
            {from: '부담', to: '책임'},
            {from: '행동', to: '책임'},
            {from: '군대', to: '책임'},
            {from: '의무', to: '책임'},

            {from: '취업', to: '생활'},
            {from: '바빠짐', to: '생활'},
            {from: '개인 시간 부족', to: '생활'},

            {from: '돈벌기', to: '생활'},
            {from: '생활', to: '나쁜점'},
            {from: '돈', to: '생활'},
            {from: '성인요금', to: '돈'},
            {from: '용돈벌이', to: '돈'},
            {from: '학자금', to: '돈'},
            {from: '교통비', to: '돈'},
        ]);
        nodes = new vis.DataSet([
            {id: 'root', label: '성인이 되고나니', color: color[0], font: {color: 'inherit', face: 'Hanna'}, value: 60},

            {id: '좋은점', label: '좋은점', color: color[5], font: {color: 'inherit', face: 'Hanna'}, value: 50},

            {id: '자유', label: '자유', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 50},
            {id: '술', label: '술', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 40},
            {id: '늦은 귀가', label: '늦은 귀가', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 3},
            {id: '재수안한다', label: '재수안한다', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 4},
            {id: '어디든 갈 수 있다', label: '어디든 갈 수 있다', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 4},
            {id: '밤새', label: '밤새', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 15},
            {id: '여유', label: '여유', color: color[2], font: {color: 'inherit', face: 'Hanna'}, value: 25},


            {id: '성인', label: '성인', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 25},
            {id: '주민등록증', label: '주민등록증', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 15},
            {id: '19금', label: '19금', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 20},

            {id: '스스로 개척', label: '스스로 개척', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 10},
            {id: '운전면허', label: '운전면허', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 1},
            {id: '투표', label: '투표', color: color[3], font: {color: 'inherit', face: 'Hanna'}, value: 10},


            {id: '공부', label: '공부', color: color[4], font: {color: 'inherit', face: 'Hanna'}, value: 8},
            {id: '전문적인 공부', label: '전문적인 공부', color: color[4], font: {color: 'inherit', face: 'Hanna'}, value: 6},
            {id: '수업 선택', label: '수업 선택', color: color[4], font: {color: 'inherit', face: 'Hanna'}, value: 4},


            {id: '나쁜점', label: '나쁜점', color: color[1], font: {color: 'inherit', face: 'Hanna'}, value: 50},

            {id: '책임', label: '책임', color: color[6], font: {color: 'inherit', face: 'Hanna'}, value: 35},
            {id: '부담', label: '부담', color: color[6], font: {color: 'inherit', face: 'Hanna'}, value: 7},
            {id: '행동', label: '행동', color: color[6], font: {color: 'inherit', face: 'Hanna'}, value: 20},
            {id: '군대', label: '군대', color: color[6], font: {color: 'inherit', face: 'Hanna'}, value: 6},
            {id: '의무', label: '의무', color: color[6], font: {color: 'inherit', face: 'Hanna'}, value: 20},

            {id: '생활', label: '생활', color: color[7], font: {color: 'inherit', face: 'Hanna'}, value: 28},
            {id: '취업', label: '취업', color: color[7], font: {color: 'inherit', face: 'Hanna'}, value: 10},
            {id: '바빠짐', label: '바빠짐', color: color[7], font: {color: 'inherit', face: 'Hanna'}, value: 6},
            {id: '개인 시간 부족', label: '개인 시간 부족', color: color[7], font: {color: 'inherit', face: 'Hanna'}, value: 1},
            {id: '돈벌기', label: '돈벌기', color: color[7], font: {color: 'inherit', face: 'Hanna'}, value: 18},

            {id: '돈', label: '돈', color: color[0], font: {color: 'inherit', face: 'Hanna'}, value: 20},
            {id: '성인요금', label: '성인요금', color: color[0], font: {color: 'inherit', face: 'Hanna'}, value: 15},
            {id: '용돈벌이', label: '용돈벌이', color: color[0], font: {color: 'inherit', face: 'Hanna'}, value: 4},
            {id: '학자금', label: '학자금', color: color[0], font: {color: 'inherit', face: 'Hanna'}, value: 10},
            {id: '교통비', label: '교통비', color: color[0], font: {color: 'inherit', face: 'Hanna'}, value: 4},


        ]);
    }

    var da = {
        nodes: nodes,
        edges: edges
    };

    return da;
}

function drawNetwork01(question, color, da) {
    $('.graph-bg').removeClass('open');
    $('.network-bg').addClass('open');
    $('.question').addClass('cloudAndBar');
    $('.question').html(question.key);


    // create a network
    var container = document.getElementById('mynetwork');

    var options = {
        nodes: {
            shape: 'dot',
            scaling: {
                label: {
                    min: 25,
                    max: 25,
                }
            }
        },
        physics: {
            stabilization: false
        },
        configure: {
            filter: function (o, path) {
                if (path.indexOf('physics') !== -1) {
                    return true;
                }
                if (path.indexOf('smooth') !== -1 || o === 'smooth') {
                    return true;
                }
                return false;
            },
            container: document.getElementById('config')
        }
    };

    new vis.Network(container, da, options);

}
