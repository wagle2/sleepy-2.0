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
function 광주버스정류장불러오기(){
    bis = File.JSONread("/sdcard/test.json")
    return bis
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
        광주버스정류장불러오기();
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
    if(Router.check(["#버스"],'b',[''],r)){
        return Router.route("Bus",r);
    } else if(Router.check(["#날씨"],'b',[''],r)){
        return Router.route("Weather",r);
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
