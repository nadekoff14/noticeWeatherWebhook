
function getWeatherPost() {

  var DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1593203573541459072/UopKs-a324t-45y6789009876543210p9o87654321qazwsx";

  const url = "https://www.jma.go.jp/bosai/forecast/data/forecast/";
  const area = "340000"; // 広島
  var response = UrlFetchApp.fetch(`${url}${area}.json`); 

  var json=JSON.parse(response.getContentText());

  let reportDatetime = new Date(json[0]["reportDatetime"])

  let embeds = []

  for(const area of json[1].timeSeries[0].areas){
        if(area.area.name=="南部"){
          let today = new Date()
          for(const weatherCode of area.weatherCodes){
            imgurl = `https://www.jma.go.jp/bosai/forecast/img/${weatherCode}.png`
            imgurl = `https://weathernews.jp/onebox/img/wxicon/${weatherCode}.png`

            if (today.getMonth() + 1 == "3" && (today.getDate() == 27 || today.getDate() == 28 || today.getDate() == 29))
            embeds[embeds.length] = {
              "title": `${today.getMonth() + 1}月${today.getDate()}日`,
              "description": getIcon(allWeatherCode[weatherCode][3]) + " " + allWeatherCode[weatherCode][3],
              "color": 5620992,
              "thumbnail": {
                "url": imgurl
              }
            }

            today.setDate(today.getDate() + 1)
          }
        }
  }

  var data = {
    "content": `広島県南部の天気 ${reportDatetime.getMonth() + 1}月${reportDatetime.getDate()}日 ${reportDatetime.getHours()}時${reportDatetime.getMinutes()}分 更新`,
    "embeds":embeds
  }
  var options =
  {
    "method" : "POST",
    'contentType': 'application/json',
    'payload' : JSON.stringify(data)
  };
  UrlFetchApp.fetch(DISCORD_WEBHOOK, options);
  
}

function getIcon(weather){
  icon = {"晴":":sunny:", "曇":":cloud:", "雨":":cloud_rain:", "雪":":snowman2:"};
  state = {"一時":":left_right_arrow:", "時々":":left_right_arrow:", "のち":":arrow_right:", "後":":arrow_right:"};
  
  if(weather.length > 2){
     return icon[weather[0]] +state[weather.slice(1,3)] +icon[weather[3]];
  }
  else{
    return icon[weather[0]];
  }
    
}

const allWeatherCode = {"100":["100.svg","500.svg","100","晴","CLEAR"],"101":["101.svg","501.svg","100","晴時々曇","PARTLYCLOUDY"],"102":["102.svg","502.svg","300","晴一時雨","CLEAR,OCCASIONALSCATTEREDSHOWERS"],"103":["102.svg","502.svg","300","晴時々雨","CLEAR,FREQUENTSCATTEREDSHOWERS"],"104":["104.svg","504.svg","400","晴一時雪","CLEAR,SNOWFLURRIES"],"105":["104.svg","504.svg","400","晴時々雪","CLEAR,FREQUENTSNOWFLURRIES"],"106":["102.svg","502.svg","300","晴一時雨か雪","CLEAR,OCCASIONALSCATTEREDSHOWERSORSNOWFLURRIES"],"107":["102.svg","502.svg","300","晴時々雨か雪","CLEAR,FREQUENTSCATTEREDSHOWERSORSNOWFLURRIES"],"108":["102.svg","502.svg","300","晴一時雨か雷雨","CLEAR,OCCASIONALSCATTEREDSHOWERSAND/ORTHUNDER"],"110":["110.svg","510.svg","100","晴後時々曇","CLEAR,PARTLYCLOUDYLATER"],"111":["110.svg","510.svg","100","晴後曇","CLEAR,CLOUDYLATER"],"112":["112.svg","512.svg","300","晴後一時雨","CLEAR,OCCASIONALSCATTEREDSHOWERSLATER"],"113":["112.svg","512.svg","300","晴後時々雨","CLEAR,FREQUENTSCATTEREDSHOWERSLATER"],"114":["112.svg","512.svg","300","晴後雨","CLEAR,RAINLATER"],"115":["115.svg","515.svg","400","晴後一時雪","CLEAR,OCCASIONALSNOWFLURRIESLATER"],"116":["115.svg","515.svg","400","晴後時々雪","CLEAR,FREQUENTSNOWFLURRIESLATER"],"117":["115.svg","515.svg","400","晴後雪","CLEAR,SNOWLATER"],"118":["112.svg","512.svg","300","晴後雨か雪","CLEAR,RAINORSNOWLATER"],"119":["112.svg","512.svg","300","晴後雨か雷雨","CLEAR,RAINAND/ORTHUNDERLATER"],"120":["102.svg","502.svg","300","晴朝夕一時雨","OCCASIONALSCATTEREDSHOWERSINTHEMORNINGANDEVENING,CLEARDURINGTHEDAY"],"121":["102.svg","502.svg","300","晴朝の内一時雨","OCCASIONALSCATTEREDSHOWERSINTHEMORNING,CLEARDURINGTHEDAY"],"122":["112.svg","512.svg","300","晴夕方一時雨","CLEAR,OCCASIONALSCATTEREDSHOWERSINTHEEVENING"],"123":["100.svg","500.svg","100","晴山沿い雷雨","CLEARINTHEPLAINS,RAINANDTHUNDERNEARMOUTAINOUSAREAS"],"124":["100.svg","500.svg","100","晴山沿い雪","CLEARINTHEPLAINS,SNOWNEARMOUTAINOUSAREAS"],"125":["112.svg","512.svg","300","晴午後は雷雨","CLEAR,RAINANDTHUNDERINTHEAFTERNOON"],"126":["112.svg","512.svg","300","晴昼頃から雨","CLEAR,RAININTHEAFTERNOON"],"127":["112.svg","512.svg","300","晴夕方から雨","CLEAR,RAININTHEEVENING"],"128":["112.svg","512.svg","300","晴夜は雨","CLEAR,RAININTHENIGHT"],"130":["100.svg","500.svg","100","朝の内霧後晴","FOGINTHEMORNING,CLEARLATER"],"131":["100.svg","500.svg","100","晴明け方霧","FOGAROUNDDAWN,CLEARLATER"],"132":["101.svg","501.svg","100","晴朝夕曇","CLOUDYINTHEMORNINGANDEVENING,CLEARDURINGTHEDAY"],"140":["102.svg","502.svg","300","晴時々雨で雷を伴う","CLEAR,FREQUENTSCATTEREDSHOWERSANDTHUNDER"],"160":["104.svg","504.svg","400","晴一時雪か雨","CLEAR,SNOWFLURRIESOROCCASIONALSCATTEREDSHOWERS"],"170":["104.svg","504.svg","400","晴時々雪か雨","CLEAR,FREQUENTSNOWFLURRIESORSCATTEREDSHOWERS"],"181":["115.svg","515.svg","400","晴後雪か雨","CLEAR,SNOWORRAINLATER"],"200":["200.svg","200.svg","200","曇","CLOUDY"],"201":["201.svg","601.svg","200","曇時々晴","MOSTLYCLOUDY"],"202":["202.svg","202.svg","300","曇一時雨","CLOUDY,OCCASIONALSCATTEREDSHOWERS"],"203":["202.svg","202.svg","300","曇時々雨","CLOUDY,FREQUENTSCATTEREDSHOWERS"],"204":["204.svg","204.svg","400","曇一時雪","CLOUDY,OCCASIONALSNOWFLURRIES"],"205":["204.svg","204.svg","400","曇時々雪","CLOUDYFREQUENTSNOWFLURRIES"],"206":["202.svg","202.svg","300","曇一時雨か雪","CLOUDY,OCCASIONALSCATTEREDSHOWERSORSNOWFLURRIES"],"207":["202.svg","202.svg","300","曇時々雨か雪","CLOUDY,FREQUENTSCCATEREDSHOWERSORSNOWFLURRIES"],"208":["202.svg","202.svg","300","曇一時雨か雷雨","CLOUDY,OCCASIONALSCATTEREDSHOWERSAND/ORTHUNDER"],"209":["200.svg","200.svg","200","霧","FOG"],"210":["210.svg","610.svg","200","曇後時々晴","CLOUDY,PARTLYCLOUDYLATER"],"211":["210.svg","610.svg","200","曇後晴","CLOUDY,CLEARLATER"],"212":["212.svg","212.svg","300","曇後一時雨","CLOUDY,OCCASIONALSCATTEREDSHOWERSLATER"],"213":["212.svg","212.svg","300","曇後時々雨","CLOUDY,FREQUENTSCATTEREDSHOWERSLATER"],"214":["212.svg","212.svg","300","曇後雨","CLOUDY,RAINLATER"],"215":["215.svg","215.svg","400","曇後一時雪","CLOUDY,SNOWFLURRIESLATER"],"216":["215.svg","215.svg","400","曇後時々雪","CLOUDY,FREQUENTSNOWFLURRIESLATER"],"217":["215.svg","215.svg","400","曇後雪","CLOUDY,SNOWLATER"],"218":["212.svg","212.svg","300","曇後雨か雪","CLOUDY,RAINORSNOWLATER"],"219":["212.svg","212.svg","300","曇後雨か雷雨","CLOUDY,RAINAND/ORTHUNDERLATER"],"220":["202.svg","202.svg","300","曇朝夕一時雨","OCCASIONALSCCATEREDSHOWERSINTHEMORNINGANDEVENING,CLOUDYDURINGTHEDAY"],"221":["202.svg","202.svg","300","曇朝の内一時雨","CLOUDYOCCASIONALSCCATEREDSHOWERSINTHEMORNING"],"222":["212.svg","212.svg","300","曇夕方一時雨","CLOUDY,OCCASIONALSCCATEREDSHOWERSINTHEEVENING"],"223":["201.svg","601.svg","200","曇日中時々晴","CLOUDYINTHEMORNINGANDEVENING,PARTLYCLOUDYDURINGTHEDAY,"],"224":["212.svg","212.svg","300","曇昼頃から雨","CLOUDY,RAININTHEAFTERNOON"],"225":["212.svg","212.svg","300","曇夕方から雨","CLOUDY,RAININTHEEVENING"],"226":["212.svg","212.svg","300","曇夜は雨","CLOUDY,RAININTHENIGHT"],"228":["215.svg","215.svg","400","曇昼頃から雪","CLOUDY,SNOWINTHEAFTERNOON"],"229":["215.svg","215.svg","400","曇夕方から雪","CLOUDY,SNOWINTHEEVENING"],"230":["215.svg","215.svg","400","曇夜は雪","CLOUDY,SNOWINTHENIGHT"],"231":["200.svg","200.svg","200","曇海上海岸は霧か霧雨","CLOUDY,FOGORDRIZZLINGONTHESEAANDNEARSEASHORE"],"240":["202.svg","202.svg","300","曇時々雨で雷を伴う","CLOUDY,FREQUENTSCCATEREDSHOWERSANDTHUNDER"],"250":["204.svg","204.svg","400","曇時々雪で雷を伴う","CLOUDY,FREQUENTSNOWANDTHUNDER"],"260":["204.svg","204.svg","400","曇一時雪か雨","CLOUDY,SNOWFLURRIESOROCCASIONALSCATTEREDSHOWERS"],"270":["204.svg","204.svg","400","曇時々雪か雨","CLOUDY,FREQUENTSNOWFLURRIESORSCATTEREDSHOWERS"],"281":["215.svg","215.svg","400","曇後雪か雨","CLOUDY,SNOWORRAINLATER"],"300":["300.svg","300.svg","300","雨","RAIN"],"301":["301.svg","701.svg","300","雨時々晴","RAIN,PARTLYCLOUDY"],"302":["302.svg","302.svg","300","雨時々止む","SHOWERSTHROUGHOUTTHEDAY"],"303":["303.svg","303.svg","400","雨時々雪","RAIN,FREQUENTSNOWFLURRIES"],"304":["300.svg","300.svg","300","雨か雪","RAINORSNOW"],"306":["300.svg","300.svg","300","大雨","HEAVYRAIN"],"308":["308.svg","308.svg","300","雨で暴風を伴う","RAINSTORM"],"309":["303.svg","303.svg","400","雨一時雪","RAIN,OCCASIONALSNOW"],"311":["311.svg","711.svg","300","雨後晴","RAIN,CLEARLATER"],"313":["313.svg","313.svg","300","雨後曇","RAIN,CLOUDYLATER"],"314":["314.svg","314.svg","400","雨後時々雪","RAIN,FREQUENTSNOWFLURRIESLATER"],"315":["314.svg","314.svg","400","雨後雪","RAIN,SNOWLATER"],"316":["311.svg","711.svg","300","雨か雪後晴","RAINORSNOW,CLEARLATER"],"317":["313.svg","313.svg","300","雨か雪後曇","RAINORSNOW,CLOUDYLATER"],"320":["311.svg","711.svg","300","朝の内雨後晴","RAININTHEMORNING,CLEARLATER"],"321":["313.svg","313.svg","300","朝の内雨後曇","RAININTHEMORNING,CLOUDYLATER"],"322":["303.svg","303.svg","400","雨朝晩一時雪","OCCASIONALSNOWINTHEMORNINGANDEVENING,RAINDURINGTHEDAY"],"323":["311.svg","711.svg","300","雨昼頃から晴","RAIN,CLEARINTHEAFTERNOON"],"324":["311.svg","711.svg","300","雨夕方から晴","RAIN,CLEARINTHEEVENING"],"325":["311.svg","711.svg","300","雨夜は晴","RAIN,CLEARINTHENIGHT"],"326":["314.svg","314.svg","400","雨夕方から雪","RAIN,SNOWINTHEEVENING"],"327":["314.svg","314.svg","400","雨夜は雪","RAIN,SNOWINTHENIGHT"],"328":["300.svg","300.svg","300","雨一時強く降る","RAIN,EXPECTOCCASIONALHEAVYRAINFALL"],"329":["300.svg","300.svg","300","雨一時みぞれ","RAIN,OCCASIONALSLEET"],"340":["400.svg","400.svg","400","雪か雨","SNOWORRAIN"],"350":["300.svg","300.svg","300","雨で雷を伴う","RAINANDTHUNDER"],"361":["411.svg","811.svg","400","雪か雨後晴","SNOWORRAIN,CLEARLATER"],"371":["413.svg","413.svg","400","雪か雨後曇","SNOWORRAIN,CLOUDYLATER"],"400":["400.svg","400.svg","400","雪","SNOW"],"401":["401.svg","801.svg","400","雪時々晴","SNOW,FREQUENTCLEAR"],"402":["402.svg","402.svg","400","雪時々止む","SNOWTHROUGHOUTTHEDAY"],"403":["403.svg","403.svg","400","雪時々雨","SNOW,FREQUENTSCCATEREDSHOWERS"],"405":["400.svg","400.svg","400","大雪","HEAVYSNOW"],"406":["406.svg","406.svg","400","風雪強い","SNOWSTORM"],"407":["406.svg","406.svg","400","暴風雪","HEAVYSNOWSTORM"],"409":["403.svg","403.svg","400","雪一時雨","SNOW,OCCASIONALSCCATEREDSHOWERS"],"411":["411.svg","811.svg","400","雪後晴","SNOW,CLEARLATER"],"413":["413.svg","413.svg","400","雪後曇","SNOW,CLOUDYLATER"],"414":["414.svg","414.svg","400","雪後雨","SNOW,RAINLATER"],"420":["411.svg","811.svg","400","朝の内雪後晴","SNOWINTHEMORNING,CLEARLATER"],"421":["413.svg","413.svg","400","朝の内雪後曇","SNOWINTHEMORNING,CLOUDYLATER"],"422":["414.svg","414.svg","400","雪昼頃から雨","SNOW,RAININTHEAFTERNOON"],"423":["414.svg","414.svg","400","雪夕方から雨","SNOW,RAININTHEEVENING"],"425":["400.svg","400.svg","400","雪一時強く降る","SNOW,EXPECTOCCASIONALHEAVYSNOWFALL"],"426":["400.svg","400.svg","400","雪後みぞれ","SNOW,SLEETLATER"],"427":["400.svg","400.svg","400","雪一時みぞれ","SNOW,OCCASIONALSLEET"],"450":["400.svg","400.svg","400","雪で雷を伴う","SNOWANDTHUNDER"]}
