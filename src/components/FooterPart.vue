<template>
    <div id="Footer">
      <div class="contentF">
        <span class="Topic">Creator</span> = <span class="name">{{ name }}</span>
      </div>
      <div class="contentF">
        <span class="Topic">GitHub</span> = <a :href="url" class="name">{{ github }}</a>
      </div>
      <div class="contentF">
        <span class="Topic">My Telegram</span> = <a :href="telegramLink" class="name">@{{ TelegramId }}</a>
      </div>
      <div class="contentF">
        <span class="Topic">Bot Telegram</span> = <a :href="Bot_Telegram" class="name">{{ Bot_Telegram_Id }}</a>
      </div>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue';
  
export default defineComponent ({
    name: "Footer",
    data(){
        return{
            name: "Kooroush Pasandideh",
            github: "kooroushpsnd",
            url: 'https://github.com/kooroushpsnd/Crypto-App-front',
            telegramLink: "https://t.me/kpthemighty",
            TelegramId: "kpthemighty",
            Bot_Telegram: "https://t.me/LicenseView_bot",
            Bot_Telegram_Id: "LicenseView_bot"
        }
    }
})
</script>
  
<style>   
    #Footer {
        display: flex;
        justify-content: space-between;
        padding: 30px;
        font-size: 25px;
        color: #f6efd1;
        background-color:#00A9E0;
        padding-left: 15px;
        padding-right: 15px;
    }
    .name{
        text-decoration: none;
        color: #f6efd1;
    }
    .Topic{
        color: black;
    }
    .name:hover{
        color:rgb(73, 221, 226);
    }
</style>