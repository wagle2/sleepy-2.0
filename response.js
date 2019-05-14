T = require("ThreadManager.js");
I = require("Interactive.js");
D = require("DBManager.js")("DB");
K = require("KBManager.js");
Git= require("Git.js");
U =require("Utils.js");
File = require("File.js")
GLOBAL = require("GLOBAL.js")
Router = require("Router.js")

for (var i in GLOBAL) {
    this[i] = GLOBAL[i]
}

function response(room, msg, sender, isGroupChat, replier, imageDB) {
    /** @param {String} room - 방 이름
      * @param {String} msg - 메세지 내용
      * @param {String} sender - 발신자 이름
      * @param {Boolean} isGroupChat - 단체채팅 여부
      * @param {Object} replier - 세션 캐싱 답장 메소드 객체
      * @param {Object} imageDB - 프로필 이미지와 수신된 이미지 캐싱 객체
      * @method imageDB.getImage() - 수신된 이미지가 있을 경우 Base64 인코딩 되어있는 JPEG 이미지 반환, 기본 값 null
      * @method imageDB.getProfileImage() - Base64 인코딩 되어있는 JPEG 프로필 이미지 반환, 기본 값 null
      * @method replier.reply("문자열") - 메시지가 도착한 방에 답장을 보내는 메소드 
      */

        I.run(room, sender, msg);
        //인터렉티브 적용
        var r = { replier: replier, msg: msg, sender: sender, room: room};

        try {
            if(r.msg =="!로딩" && r.room=="시립대 봇제작방"){
                r.replier.reply("로딩시작")
                    U.update();
                    U.reload();
                    return;
            }else if (msg.indexOf("*") == 0) {
                replier.reply(String(eval(msg.substring(1))).encoding());
                return;	
            } else{
                func(r);
            }
        }catch (e) {
                replier.reply( e + "\n" + e.stack);
        }
        if(msg == "어흥"){
            r.replier.reply("애옹애옹");
        } else if(msg == "애옹"){
            r.replier.reply("어흐으응");
        }

}

function func(r){
    if(Router.check(["/버스"],'b',[''],r)){
        return Router.route("Bus",r)
    }
}


 function 다른방(r) {
    if(r.msg.indexOf("#버스")!=-1){
        광주버스(r);
    } else if(r.msg.indexOf("!정류장다운로드")!=-1){
        광주버스정류장받아오기(r);
    } else if(r.msg.indexOf("#날씨")!=-1){
        weather.func(r);
    } else if(r.msg.indexOf("#대전")!=-1){
        r.msg = r.msg.slice(4,r.msg.length+1);
        hero1 = r.msg.split(",")[0];
        hero2 = r.msg.split(",")[1];
        Battle.gameStart(r,hero1,hero2);
    } else if(r.msg.indexOf("#전투력")!=-1){
        r.msg = r.msg.slice(5,r.msg.length+1);
        hero = new Battle.Character(r.msg);
        hero.stat(r);
    } else if(r.msg.indexOf("#강화")!=-1){
        item(r);
    }else if(r.msg.indexOf("#아이템")==0){
        myItem(r);
    }
}


function 고딩방(r) {
    if(r.msg == "송재형"){
        r.replier.reply("인간조무사");
    } else if(r.msg == "양대훈"){
        r.replier.reply("20cm & 휴지심") ;       
    } else if(r.msg == "고건훈"){
        r.replier.reply("유흥중입니다.");
    } else if(r.msg == "이명훈"){
        r.replier.reply("조별과제마스터");
    } else if(r.msg == "박경관"){
        r.replier.reply("보험계리사");  
    } else if(r.msg == "천승현"){
        r.replier.reply("돌창");
    } else if(r.msg.indexOf("#버스")!=-1){
        광주버스(r);
    } else if(r.msg.indexOf("!정류장다운로드")!=-1){
        광주버스정류장받아오기(r);
    } else if(r.msg.indexOf("#날씨")!=-1){
        weather.func(r);
    } else if(r.msg.indexOf("#대전")!=-1){
        r.msg = r.msg.slice(4,r.msg.length+1);
        hero1 = r.msg.split(",")[0];
        hero2 = r.msg.split(",")[1];
        Battle.gameStart(r,hero1,hero2);
    } else if(r.msg.indexOf("#전투력")!=-1){
        r.msg = r.msg.slice(5,r.msg.length+1);
        hero = new Battle.Character(r.msg);
        hero.stat(r);
    } else if(r.msg.indexOf("#강화")!=-1){
        item(r);
    } else if(r.msg.lastIndexOf("확률")>=(r.msg.length -2)&&r.msg.lastIndexOf("확률")!=-1){
        percent(r);
    }else if(r.msg.indexOf("#아이템")==0){
        myItem(r);
    }
}

percent = function(r){
    r.replier.reply(r.msg + "은 " + Math.floor(Math.random()*100) + "% 입니다.");
}
 
weather = {
    func : function (r){
        if(r.msg.length==3){
            r.replier.reply("@날씨 기능 사용법")
        } else{
            var inputString = r.msg.split(" ")[1];
            if (inputString=="쿠팡머"||inputString=="쿠팡대"||inputString=="시립머"||inputString=="시립대"||inputString=="서울시립대"){inputString=1123056000,weatherUrl="09230104"}
            else if (inputString=="전남머"||inputString=="전남대"||inputString=="용봉동"||inputString=="전머"||inputString=="용봉"){inputString=2917059000,weatherUrl="05170107"}
            else if (inputString=="일곡동"||inputString=="일곡"||inputString=="일곡지구"){inputString=2917066900,weatherUrl="05170127"}
            else if (inputString=="상무지구"||inputString=="상무"||inputString=="상지"||inputString=="머창"){inputString=2914074500,weatherUrl="05140120"}
            else if (inputString=="조선대학교"||inputString=="조선대"||inputString=="조선머"||inputString=="조대"||inputString=="조머"){inputString=2911063000,weatherUrl="05110118"}
            else if (inputString=="충남대학교"||inputString=="충남대"||inputString=="충남머"||inputString=="충대"||inputString=="충머"){inputString=3014072000,weatherUrl="07140116"}
            else{
                r.replier.reply("날씨 리스트에 존재하지 않는 지역입니다.");
                return;
            }
            r.replier.reply(this.parse(r,inputString,weatherUrl));
        }
        
    },

    parse : function (r,areaCode,weatherUrl){
        var weatherUrl = "https://m.weather.naver.com/m/main.nhn?regionCode=" + String(weatherUrl)
        //r.replier.reply(weatherUrl)
        var weatherSoup = org.jsoup.Jsoup.connect(weatherUrl).get();
        var location = weatherSoup.select("#content > div > div > div.section_top > div.section_location > a.title._cnLnbLinktoMap > strong").text();
        var nowWeather = (String(weatherSoup.select("div > div:nth-child(1) > div > div.card.card_now > div.weather_set_summary")).split("<br>")[0].split('<div class="weather_set_summary">')[1].split("</div>")[0]).trim().replace(" ","").extensionRight(한글공백,5);
        var nowTemp = weatherSoup.select("div > div:nth-child(1) > div > div.card.card_now > div.weather_set > div.set.set_text > strong > em").text();
        var nowTime = weatherSoup.select("div > div:nth-child(1) > div > div.card.card_now > span").text()
        var todayLowTemp = weatherSoup.select("div > div:nth-child(1) > div > div.card.card_now > div.weather_set > div.set.set_text > div > span.day_low > em").text()
        var todayHighTemp = weatherSoup.select("div > div:nth-child(1) > div > div.card.card_now > div.weather_set > div.set.set_text > div > span.day_high > em").text()
        var pm10 =  weatherSoup.select("div > div:nth-child(1) > div > div.card.card_now > div.weather_set_detail > div > ul > li.finedust em").text().split(" ")[0]
        var pm2_5 =  weatherSoup.select("div > div:nth-child(1) > div > div.card.card_now > div.weather_set_detail > div > ul > li.finedust em").text().split(" ")[1]
        var uv =  weatherSoup.select("div > div:nth-child(1) > div > div.card.card_now > div.weather_set_detail > div > ul > li.uv > span").text()
        this.str = "";
        this.str += "(야옹)" + location + "\n　→ " 
                        + nowTime + "\n----------------------------------\n"
                        + "시　　날씨　기온 습도 최저 최고\n" 
                        + new Date().getHours() + "　" + nowWeather.replace(/\(.*?\)/g,"").extensionRight(한글공백,5) + nowTemp + "　" + nowTemp + "　"+ todayLowTemp + "　"+ todayHighTemp + "\n"
                        + "----------------------------------\n"
                        + "PM10　　PM2.5　　자외선(해)\n"
                        + "　"+ pm10 + "　　　 " + pm2_5 + "　 　　 " + uv +"\n"
                        + "----------------------------------\n"

        var baseLink = "http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=" + areaCode;
        var baseParse = org.jsoup.Jsoup.connect(baseLink).get();
        var area = String(baseParse.select("category").text());
        var time = String(baseParse.select("pubData").text()).replace(/[()]/g, '');
        var baseTodayWeather = baseParse.select('data').toArray()//.filter(v=>v.select("day").text() == "0" )
        //오늘인것들만 추출
        this.str += '시　　날씨　기온 강수 습도 풍량\n';
        for(var i in baseTodayWeather){
            var repeatStr = baseTodayWeather[i];
            this.str += String(repeatStr.select("hour").text()).extension("0",2) + "　";
            this.str += String(repeatStr.select("wfKor").text()).replace(/\s/g,"").extensionRight(한글공백,5);
            this.str += String(repeatStr.select("temp").text()).slice(0,-2).extension("0",2)+ "　";
            this.str += String(repeatStr.select("pop").text()).extensionRight(" ",2) + "　";
            this.str += String(repeatStr.select("reh").text()) + "　";
            this.str += repeatStr.select("ws").text().substring(0,3)+"\n";
            if(i==5){this.str += 투명공백.repeat(500)}
        }
        this.str =  this.str.trim()
        return  this.str;
    }
}

String.prototype.extension=function(char,length){
	const addLength = (length-this.toString().length >= 0) ? length-this.toString().length : 0; 
	return char.repeat(addLength)+this.toString();
}
String.prototype.extensionRight=function(char,length){
	const addLength = (length-this.toString().length >= 0) ? length-this.toString().length : 0; 
	return this.toString()+char.repeat(addLength);
}

Object.defineProperty(String.prototype,"encoding",{
    value:function(){
          return this.replace(/\\u([\da-fA-F]{4})/g,(m,p1)=>String.fromCharCode(parseInt(p1,16)));
    }
 });

/* [추가사항]
 *  1. 공격할때 특수문자.
 *  2. 




 */
Battle = {
    isGameover : false,
    isBattle : false,
    Character : function(name, hp, att, luk){
        this.name = new java.lang.String(name);
        this.rand = Math.pow(this.name.hashCode(),8);
        this.hp = Number((this.rand).toString().slice(3,6))+1
        this.att = Number((this.rand).toString().slice(6,8))+13;
        this.luk = Number((this.rand).toString().slice(8,10));
        this.maxHp = this.hp
    },
    gameStart : function(r,hero1,hero2){
        isGameover = false;
        isBattle = false;
        hero1 = new this.Character(hero1);
        hero2 = new this.Character(hero2);
        str = ""
        turn = 0
        while (!isGameover) {
            str += ("[Battle] "+ hero1.name + " VS " + hero2.name+ 투명공백.repeat(500));
            isBattle = true;   while(isBattle) {
                if(turn >= 100){
                    r.replier.reply("두 자강두천의 대결이 무승부로 끝났습니다.");
                    isBattle=false;
                    isGameover=true;
                    return;
                }
                turn += 1;
                str += ("\n★Turn : "+ turn+"\n\n");
                hero1.attack(hero2);
                hero1.heal(10);
                if (hero2.hp > 0) {
                    hero2.attack(hero1);
                    hero2.heal(10)
                }
                }
        } 
        r.replier.reply(str)
        return "";
    }
}

Battle.Character.prototype.stat = function(r) {
    r.replier.reply("[Stat] "+ this.name + "\n"
                    + "체력   : " + this.maxHp + "\n"
                    + "공격력 : " + this.att + "\n"
                    + "회피율 : " + this.luk)
}

Battle.Character.prototype.attacked = function(damage) {
    this.hp -= damage;
    str += (this.name + '의 체력이 ' + this.hp + '가 되었습니다\n');
    if (this.hp <= 0) {
        str += (this.name + '의 패배!')
      isBattle = false;
      isGameover = true;
    }
}

Battle.Character.prototype.attack = function(target) {
    str += ("🔪"+this.name + '의 공격!\n');
    if (Math.random() * 100 >= target.luk/4){
        target.attacked(this.att);
    } else{
        str += (target.name + '의 회피!\n');
    }
}  

Battle.Character.prototype.heal = function(percent) {
    if (Math.random() * 100 <= percent){
        str += (this.name + '의 힐링!\n'+ this.name + '의 체력이 ' + this.hp + '가 되었습니다\n');
        this.hp = this.maxHp;
    }
    
}

item = function(r){
    this.name = r.sender;
    this.itemName = r.msg.slice(4,r.msg.length+1).trim();
    this.lev = 0;
    this.add = ""
    
    //쿨타임 체크
    if(isCoolTime(r,this.name)!=false){
        r.replier.reply("강화를 준비중이다옹~(야옹)");
        return;
    }
    //먼저 있는지 체크하고
    if(cheakOverlap(this.name,this.itemName)==true){
        this.lev = D.selectForArray('items','reinforce',"name=? and item=?",[this.name,this.itemName])
        prop = Math.random()*100;
        if(this.lev < 5){
            if(prop < 0){
                D.delete('items',"name=? and item=?",[this.name,this.itemName]);
                r.replier.reply("강화가 실패하여 [+"+ this.lev + "]" +this.itemName + " 아이템이 파괴됩니다.");
            } else if(prop <= 70){
                this.lev++;
                D.update('items',{reinforce:this.lev,lastTime:(new Date().getTime())},"name=? and item=?",[this.name,this.itemName]);
                r.replier.reply("★강화성공★\n [+"+ this.lev + "]"+ (this.lev>=5?" 은빛 ":" 동색 ") +this.itemName);
            } else if(prop > 70){
                D.update('items',{reinforce:this.lev,lastTime:(new Date().getTime())},"name=? and item=?",[this.name,this.itemName]);
                r.replier.reply("★강화실패★\n [+"+ this.lev + "] 동색 " +this.itemName);
            } else {
                r.replier.reply("아무런 변화도 일어나지 않았습니다.")
            }
        } else if(this.lev >= 5 && this.lev < 10){
            if(prop < 0){
                D.delete('items',"name=? and item=?",[this.name,this.itemName]);
                r.replier.reply("강화가 실패하여 [+"+ this.lev + "] 은빛 " +this.itemName + " 아이템이 파괴됩니다.");
            } else if(prop <= 70){
                this.lev++;
                D.update('items',{reinforce:this.lev,lastTime:(new Date().getTime())},"name=? and item=?",[this.name,this.itemName]);
                r.replier.reply("★강화성공★\n [+"+ this.lev + "]"+ (this.lev>=10?" 금빛 ":" 은빛 ") +this.itemName);
            } else if(prop > 70){
                this.lev--;
                D.update('items',{reinforce:this.lev,lastTime:(new Date().getTime())},"name=? and item=?",[this.name,this.itemName]);
                r.replier.reply("★강화실패★\n [+"+ this.lev + "]"+ (this.lev>=5?" 은빛 ":" 동색 ") +this.itemName);
            } else {
                r.replier.reply("아무런 변화도 일어나지 않았습니다.")
            }
        } else if(this.lev >= 10 && this.lev < 13){
            if(prop < 10){
                D.delete('items',"name=? and item=?",[this.name,this.itemName]);
                r.replier.reply("강화가 실패하여 [+"+ this.lev + "] 금빛 " +this.itemName + " 아이템이 파괴됩니다.");
            } else if(prop <= 50){
                this.lev++;
                D.update('items',{reinforce:this.lev,lastTime:(new Date().getTime())},"name=? and item=?",[this.name,this.itemName]);
                r.replier.reply("★강화성공★\n [+"+ this.lev + "]"+ (this.lev>=13?" 찬란한 ":" 금빛 ") +this.itemName);
            } else if(prop > 50){
                this.lev--;
                D.update('items',{reinforce:this.lev,lastTime:(new Date().getTime())},"name=? and item=?",[this.name,this.itemName]);
                r.replier.reply("★강화실패★\n [+"+ this.lev + "]"+ (this.lev>=10?" 금빛 ":" 은빛 ") +this.itemName);
            } else {
                r.replier.reply("아무런 변화도 일어나지 않았습니다.")
            }
        } else if(this.lev >= 13 && this.lev < 20){
            if(prop < 15){
                D.delete('items',"name=? and item=?",[this.name,this.itemName]);
                r.replier.reply("강화가 실패하여 [+"+ this.lev + "]"+ (this.lev>=13?" 찬란한 ":" 금빛 ") +this.itemName + " 아이템이 파괴됩니다.");
            } else if(prop <= 30){
                this.lev++;
                D.update('items',{reinforce:this.lev,lastTime:(new Date().getTime())},"name=? and item=?",[this.name,this.itemName]);
                r.replier.reply("★강화성공★\n [+"+ this.lev + "]"+ (this.lev>=13?" 찬란한 ":" 금빛 ") +this.itemName);
            } else if(prop > 30){
                this.lev--;
                D.update('items',{reinforce:this.lev,lastTime:(new Date().getTime())},"name=? and item=?",[this.name,this.itemName]);
                r.replier.reply("★강화실패★\n [+"+ this.lev + "]"+ (this.lev>=13?" 찬란한 ":" 금빛 ") +this.itemName);
            } else {
                r.replier.reply("아무런 변화도 일어나지 않았습니다.")
            }
        }
        
    //없으면 만든다.
    } else if(cheakOverlap(this.name,this.itemName)==false){
        var add = D.insert('items',{name:this.name,item:this.itemName,reinforce:this.lev,lastTime:new Date().getTime()});
        r.replier.reply("★ "+r.sender + "님의 " + (this.itemName).이가() + " 생성되었습니다.");
    } else{
        r.replier.reply("오류!");
    }
    return "";
}

showItems = function(){
    return (D.selectForString('items'));
}

cheakOverlap = function(Name,itemName){
    var item = D.selectForObject('items',['name','item'],"name=? and item=?",[Name,itemName]);
    if(item[0]==undefined){
        return false;
    } else{
        return true;
    }
}

isCoolTime = function(r,Name){
    var realTime = Number(new Date().getTime());
    var lastTime = Number(D.selectForObject('items',['lastTime'],"name=?",[Name],{orderBy: 'lastTime DESC'})[0]);
    if((realTime-lastTime)<= 10000){
        //r.replier.reply("realTime:" + realTime + "\nlastTime : "+ lastTime + "\n" + (realTime-lastTime));
        return true;
    } else {
        //r.replier.reply("realTime:" + realTime + "\nlastTime : "+ lastTime + "\n" + (realTime-lastTime));
        return false;
    }
}

myItem = function(r){
    owner = r.sender;
    I.register("myItem"+r.sender,r.room,r.sender,function(input){
        r.replier.reply("1. 아이템 확인\n2. 아이템 제거");
        msg=input.getMsg();
        if(msg==1){
            tmp = D.selectForString('items',["item","reinforce"],"name=?",[owner],{orderBy: 'reinforce DESC'});
            (tmp.length!=0?r.replier.reply(tmp):r.replier.reply("아이템이 없다옹~"));
            return;
        } else if(msg==2){
            tmp = D.selectForString('items',["item","reinforce"],"name=?",[owner],{orderBy: 'reinforce DESC'});
            if(tmp.length==0){
                r.replier.reply("아이템이 없다옹~");
                return;
            }
            r.replier.reply(tmp)
            r.replier.reply("아이템 이름을 입력하라옹~");
            msg=input.getMsg();
            D.delete('items',"item=?",[msg]);
            r.replier.reply("제거 완료다옹~");
        } else {
            r.replier.reply("제대로 입력하라옹~")
            return;
        }
    })
}


// Date.prototype
Object.defineProperty(Date.prototype,"toDateString",{
    value:function(sep){
       sep = (sep==undefined) ? '-' : sep;
       return String(this.getFullYear()).extension("0",4)+sep+String(this.getMonth()+1).extension("0",2)+sep+String(this.getDate()).extension("0",2);
    }
 });
 Object.defineProperty(Date.prototype,"toTimeString",{
    value:function(sep){
    sep = (sep==undefined) ? ':' : sep;
       return String(this.getHours()).extension("0",2)+sep+String(this.getMinutes()).extension("0",2)+sep+String(this.getSeconds()).extension("0",2);
    }
 });
 Object.defineProperty(String.prototype,"받침",{
    value:function(){
       var lastCharCode=this.toString().charCodeAt(this.toString().length-1);
       if(lastCharCode>="가".charCodeAt(0) && lastCharCode<="힣".charCodeAt(0)){
          if((lastCharCode-"가".charCodeAt(0))%28==0) return false;
          else return true;
       }else return false;
    }
 });
 Object.defineProperty(String.prototype,"이가",{
    value:function(){
       return this.toString().받침() ? this.toString()+"이" : this.toString()+"가"; 
    }
 });


 var WCC = T.register("weatherClockCheck",()=>{
	while(true){
		if( 7 == new Date().getHours() ){
			r={msg : '#날씨 전머', room : '고딩',replier:{reply:function(msg){
				Api.replyRoom(r.room,msg)
				}}
			}
			weather.func(r);
			java.lang.Thread.sleep(6*1000);
		}
		java.lang.Thread.sleep(59*1000); //59초
	}
}).start();

//이 아래 6가지 메소드는 스크립트 액티비티에서 사용하는 메소드들
function onCreate(savedInstanceState, activity) {}
function onStart(activity) {}
function onResume(activity) {}
function onPause(activity) {}
function onStop(activity) {}
function onDestroy(activity) {}
