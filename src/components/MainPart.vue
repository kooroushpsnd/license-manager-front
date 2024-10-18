<template>
    <div id="Main">
        <p class="MainData">
            <span id="welcomeM">Brief Information about the WebSite</span><hr>
            The ultimate solution for managing your licenses with ease and efficiency.<br>
            Whether you're a business professional or an individual, our platform allows you to keep track of all your licenses in one place, ensuring you never miss an expiration date.<br>
            With an intuitive dashboard and real-time notifications, you can view, update, and organize your licenses effortlessly.<br>
            Our secure system ensures that your data is safe, giving you peace of mind. Stay on top of your licenses, manage renewals seamlessly, and focus on what matters most.<br>
            Let <span id="name">{{ name }}</span> simplify your license management today
        </p>
    </div>
</template>
    
<script>
import { defineComponent } from 'vue';
  
export default defineComponent ({
    name : "Main",
    data(){
        return{
            name: "Licenger"
        }
    },
    methods: {}
})
</script>
    
<style>
    #Main{
        background-color:#E0F7FA;
        color: #3a3636;
        width: 60%;
        padding: 20px;
        border-radius: 12px;
        border: 1px solid #00A9E0;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        font-size: 25px;
    }
    .MainData{
        margin: 0;
        line-height: 1.7;
        text-align: left;
    }
    #welcomeM{
        display: block;
        text-align: center;
        font-size: 35px;
        padding: 0;
    }
    #name{
        font-weight: bold;
    }
</style>